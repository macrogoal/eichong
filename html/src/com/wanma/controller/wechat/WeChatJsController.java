package com.wanma.controller.wechat;

import com.wanma.controller.wechat.utils.PayConfig;
import com.wanma.controller.wechat.utils.PrepayIdRequestHandler;
import com.wanma.controller.wechat.utils.XMLUtil;
import com.wanma.model.TblWeChatDeal;
import com.wanma.model.WxRepay;
import com.wanma.service.WeChatService;
import com.wanma.support.common.*;
import com.wanma.support.utils.ControllerUtil;
import com.wanma.support.utils.WeChatUtil;
import org.apache.commons.lang.StringUtils;
import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller("WeChatJsController")
@RequestMapping("/WechatJs")
public class WeChatJsController {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(WeChatJsController.class);

    @Autowired
    private RedisService redisService;

    @Resource
    private WeChatService weChatService;

    @RequestMapping({"/config"})
    @ResponseBody
    public String config(HttpServletRequest request,
                         HttpServletResponse response, String page) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        try {

            String jsapi_ticket = "";
            String ticket = redisService.strGet("wechat:ticket");// 时间戳：jsapi_ticket

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");

            Date now = new Date();

            if (ticket == null) {
                jsapi_ticket = WeChatUtil
                        .getTicket(WeChatUtil.getAccessToken());
                redisService.strSet("wechat:ticket", sdf.format(now) + ":"
                        + jsapi_ticket);
            } else {
                String[] arr = ticket.split(":");

                jsapi_ticket = arr[1];// jsapi_ticket

                if (StringUtils.isNotBlank(ticket)) {
                    try {
                        Date d = sdf.parse(arr[0]);
                        // 超过两个小时,从新获取jsapi_ticket
                        if (now.getTime() - d.getTime() >= 2 * 3600000) {
                            jsapi_ticket = WeChatUtil.getTicket(WeChatUtil
                                    .getAccessToken());
                            // 把jsapi_ticket写入到redis
                            redisService.strSet("wechat:ticket",
                                    sdf.format(now) + ":" + jsapi_ticket);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        LOGGER.error("微信js获取配置信息时，获取jsapi_ticket失败");
                    }
                }
            }
            LOGGER.info("微信js获取配置信息时，获取jsapi_ticket为" + jsapi_ticket);
            String nonceStr = UUID.randomUUID().toString().replace("-", "")
                    .substring(0, 16);// 随机字符串
            String timestamp = String
                    .valueOf(System.currentTimeMillis() / 1000);// 时间戳

            Map<String, String> paraMap = new HashMap<String, String>();
            paraMap.put("jsapi_ticket", jsapi_ticket);
            paraMap.put("nonceStr", nonceStr);
            paraMap.put("timestamp", timestamp);
            paraMap.put("url", page);
            String str = WeChatUtil.formatUrlMap(paraMap, true, true);

            // 6、将字符串进行sha1加密
            String signature = WeChatUtil.SHA1(str);

            LOGGER.info("微信js获取配置信息时，获取signature为" + signature);
            modelMap.put("signature", signature);
            modelMap.put("timestamp", timestamp);
            modelMap.put("nonceStr", nonceStr);
            return new AccessSuccessResult(modelMap).toString();

        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("微信js获取配置信息失败");
            return new AccessErrorResult(1000, "error.msg.invalid.parameter")
                    .toString();
        }
    }

    @RequestMapping("/wxTempOrder")
    @ResponseBody
    public String wxTempOrder(HttpServletRequest request,
                              HttpServletResponse response) {
        String body = request.getParameter("body");
        String price = request.getParameter("price");

        String device_info = request.getParameter("device_info");
        String openId = request.getParameter("openId");
        String ipAddr = "127.0.0.1";

        String pileCode = request.getParameter("pileCode");
        String gunCode = request.getParameter("gunCode");

        // String chargeType = "wechat";
        /*
         * String body = "test"; String price = "1"; String ipAddr =
		 * "101.69.243.110"; String openId="oHTN_wY5UQj0PYDAJjhOWdVV9WDM";
		 * String device_info="iphone_6"; String epCodes="658571";
		 */
        // 微信支付获取签名时，初始化该openid缓存
        redisService.strRemove("wechat:" + openId);

        if (StringUtils.isEmpty(body) || StringUtils.isEmpty(price)
                || StringUtils.isEmpty(ipAddr)
                || StringUtils.isEmpty(device_info)
                || StringUtils.isEmpty(openId) || StringUtils.isEmpty(pileCode)
                || StringUtils.isEmpty(gunCode)) {
            return new AccessErrorResult(1050, "error.msg.miss.parameter")
                    .toString();
        }

        // 接收财付通通知的URL
        MessageManager mmg = new MessageManager();
        String notify_url = mmg.getSystemProperties("htmlRoot")
                + "/WechatJs/notify.do";// do";
        String noncestr = WeChatUtil.getNonceStr();
        String timestamp = WeChatUtil.getTimeStamp();
        // 订单号，此处用时间加充电桩识别码生成，商户根据自己情况调整，只要保持全局唯一就行
        String out_trade_no = timestamp + pileCode;
        // 获取prepayid的请求类
        PrepayIdRequestHandler prepayReqHandler = new PrepayIdRequestHandler(
                request, response);

        // 设置获取prepayid支付参数
        prepayReqHandler.setParameter("appid", PayConfig.WX_APP_ID);
        prepayReqHandler.setParameter("mch_id", PayConfig.MCH_ID);
        prepayReqHandler.setParameter("device_info", device_info);
        prepayReqHandler.setParameter("body", body);
        prepayReqHandler.setParameter("nonce_str", noncestr);

        // 增加非参与签名的额外参数

        prepayReqHandler.setParameter("out_trade_no", out_trade_no);
        prepayReqHandler.setParameter("total_fee", price);
        prepayReqHandler.setParameter("spbill_create_ip", ipAddr);
        prepayReqHandler.setParameter("notify_url", notify_url);
        prepayReqHandler.setParameter("trade_type", "JSAPI");
        prepayReqHandler.setParameter("openid", openId);
        prepayReqHandler.setParameter("attach", pileCode + "|" + gunCode);
        // 生成获取预支付签名
        String sign = prepayReqHandler.createSHA1Sign();

        prepayReqHandler.setParameter("sign", sign);
        prepayReqHandler.setGateUrl(PayConfig.WX_GATEURL);

        // 提交预支付后，获取prepayId
        String prepayid = "";
        try {
            prepayid = prepayReqHandler.sendPrepay();

        } catch (DocumentException e) {
            return new AccessErrorResult(1001, "error.msg.invalid.parameter")
                    .toString();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        // 吐回给客户端的参数
        if (null != prepayid && !"".equals(prepayid)) {

			/*
             * String noncestrs = WeChatUtil.getNonceStr(); String timestamps =
			 * WeChatUtil.getTimeStamp();
			 */

            PrepayIdRequestHandler paySignReqHandler = new PrepayIdRequestHandler(
                    request, response);
            paySignReqHandler.setParameter("appId", PayConfig.WX_APP_ID);
            paySignReqHandler.setParameter("timeStamp", timestamp);
            paySignReqHandler.setParameter("nonceStr", noncestr);
            paySignReqHandler.setParameter("package", "prepay_id=" + prepayid);
            paySignReqHandler.setParameter("signType", "MD5");

            String paysign = paySignReqHandler.createSHA1Sign();

            map.put("appid", PayConfig.WX_APP_ID);
            map.put("noncestr", noncestr);
            map.put("prepayid", prepayid);
            map.put("timestamp", timestamp);
            map.put("paysign", paysign);
            LOGGER.info("微信用户" + openId + "获取微信支付配置成功，预支付"
                    + Double.valueOf(price) / 100 + "元,微信订单为" + out_trade_no);

            return new AccessSuccessResult(map).toString();
        } else {
            LOGGER.error("微信支付获取配置信息prepayid失败!");
            return new AccessErrorResult(1061, "error.wx.msg.empty.prepayid")
                    .toString();
        }

    }

    @RequestMapping("/notify")
    public void notify(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 返回给微信服务器的xml
   /*     redisService.strSet("weChat:chargingAmt" + 1231231321, "" + 20);
        int rtCode = WanmaConstants.cs.startChange(
                Integer.parseInt("9006"), "1234", "3301231230000002",
                Integer.parseInt("1"), new Short("1"),
                Integer.parseInt("20"), 2, "", "", 0,
                "1231231321");*/
        LOGGER.info("weChat,notify is begin ");
        response.setContentType("text/xml");
        PrintWriter out = null;
        String openId = "";
        // String epcodes = "";

        Integer isRepay = 0;// 退款标志 1退款

        WxRepay wxrepay = new WxRepay();

        try {
            out = response.getWriter();
            // 获取微信服务器发来的数据
            BufferedReader reader = null;
            reader = request.getReader();
            String line = "";
            String xmlString = null;
            StringBuffer inputString = new StringBuffer();
            while ((line = reader.readLine()) != null) {
                inputString.append(line);
            }
            xmlString = inputString.toString();
            request.getReader().close();
            Map<String, String> map = new HashMap<String, String>();
            map = XMLUtil.doXMLParse(xmlString);
            String return_code = map.get("return_code");
            String result_code = map.get("result_code");
            String out_trade_no = map.get("out_trade_no");

            openId = map.get("openid");
            wxrepay.setOutTradeNo(out_trade_no);
            wxrepay.setTotalFee(map.get("total_fee"));
            wxrepay.setTransactionId(map.get("transaction_id"));

            // 判断通知是否回复过，防止重复操作业务，从缓存中取
            long count = weChatService.getDealLog(out_trade_no);

            if (count > 0) {

                LOGGER.info("微信支付回调多次，不做处理，并跳出！");

            } else {

                // 没回复过进行业务处理，首先进行签名校验
                if (WeChatUtil.checkSign(xmlString)
                        && "SUCCESS".equals(return_code)
                        && "SUCCESS".equals(result_code)) {
                    // 校验成功进行开始充电
                    try {

                        SimpleDateFormat sdf = new SimpleDateFormat(
                                "yyyy-MM-dd-HH-mm-ss");
                        Date now = new Date();

                        redisService.strSet("wechat:" + openId, sdf.format(now));

                        String[] attach = map.get("attach").split("\\|");
                        String pileCode = attach[0];
                        String gunCode = attach[1];
                        // 把充值记录写进数据库tbl_wechat_deal

                        TblWeChatDeal deal = new TblWeChatDeal();
                        deal.setOpenId(openId);
                        deal.setOutTradeNo(out_trade_no);
                        deal.setTotalFee(Integer.parseInt(map.get("total_fee")));
                        deal.setPilecode(pileCode);
                        deal.setGuncode(gunCode);
                        weChatService.addWeChatDeal(deal);

                        String chargingAmt = map.get("total_fee");

                        String org = PayConfig.WX_CODE;
                        String orderId = out_trade_no;
                        redisService.strSet("weChat:chargingAmt" + orderId, chargingAmt);
                        LOGGER.info("签名校验成功,开始下发充电指令,chargingAmt:{}", chargingAmt);
                        int rtCode = WanmaConstants.cs.startChange(
                                Integer.parseInt(org), openId, pileCode,
                                Integer.parseInt(gunCode), new Short("1"),
                                Integer.parseInt(chargingAmt), 2, "", "", 0,
                                orderId);

                        String result = ControllerUtil.back(
                                WanmaConstants.startCgEvt, openId);

                        if (rtCode > 0) {
                            isRepay = 1;
                            LOGGER.error("微信用户" + openId + "下发充电命令失败,微信订单为"
                                    + out_trade_no + "返回rtCode为:" + rtCode);
                        } else {
                            if ("success".equals(result)) {
                                LOGGER.info("微信用户" + openId + "下发充电命令成功,微信订单为"
                                        + out_trade_no);

                            } else {
                                isRepay = 1;
                                LOGGER.info("微信用户" + openId
                                        + "下发充电指令成功，但返回数据失败,微信订单为"
                                        + out_trade_no);
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        LOGGER.error("微信用户" + openId + "下发充电命令失败,微信订单为"
                                + out_trade_no);
                        isRepay = 1;
                        // out.print(returnXML("FAIL", "ok"));
                    }

                } else {
                    // 校验失败,把充值异常记录写到日志中,此异常是因为签名校验异常
                    LOGGER.error("充值返回签名校验失败,该订单编号out_trade_no:" + out_trade_no);

                }
            }

        } catch (Exception e) {

            LOGGER.error("微信支付回调获取数据失败！");
        }
        if (isRepay == 1) {
            redisService.strRemove("wechat:" + openId);

            LOGGER.info("下发充电命令失败,对微信订单" + wxrepay.getOutTradeNo() + "进行退款操作");
            wxrepay.setRefundFee(wxrepay.getTotalFee());
            weChatService.wxRepay(wxrepay);


        }
        out.print(returnXML("SUCCESS", "ok"));
        out.flush();
        out.close();
    }

    private String returnXML(String code, String msg) {

        return "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[" + msg
                + "]]></return_msg></xml>";
    }

}
