package com.wanma.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wanma.model.Message;
import com.wanma.model.TblWeChatDeal;
import com.wanma.model.WxAccount;
import com.wanma.model.WxAccountDetail;
import com.wanma.model.WxCharge;
import com.wanma.model.WxElectircpile;
import com.wanma.model.WxRepay;

public interface WeChatService {

	WxElectircpile getElectricPile(String openId);
	
	String toEvent(Message postData);

	String toText(Message postData);

	long getChgStatus(String openId);

	List<WxAccount> getWeChatAccount(String openId);


	List<WxAccountDetail> getWxAccountDetail(Map<String, String> map);

	//Map<String, Object> placeOrder(Map<String, Object> modelMap);

	//long checkWxReply(String out_trade_no);

	//String startCharge(WxCharge wxCharge);

	void wxRepay(WxRepay wxrepay) throws Exception;

	WxCharge getepCode(String epcodes);

	void addWeChatDeal(TblWeChatDeal deal);

	long getDealLog(String out_trade_no);  
	
}
