/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.app.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bluemobi.product.utils.MultipartFileUtil;
import com.wanma.app.dao.AppElecPileCommentMapper;
import com.wanma.app.dao.AppElecPileStarMapper;
import com.wanma.app.dao.AppProductcommentMapper;
import com.wanma.app.dao.PowerStationCommentMapper;
import com.wanma.app.dao.PowerStationStarMapper;
import com.wanma.app.dao.TblElectricpileMapper;
import com.wanma.app.dao.TblElectricpileheadMapper;
import com.wanma.app.dao.TblPowerstationMapper;
import com.wanma.app.dao.TblRateinformationMapper;
import com.wanma.app.service.PowerStationDetailService;
import com.wanma.common.ApplicationConsts;
import com.wanma.common.JudgeNullUtils;
import com.wanma.common.WanmaConstants;
import com.wanma.model.PowerElectricPileHead;
import com.wanma.model.PowerStationDetail;
import com.wanma.model.PowerStationElictric;
import com.wanma.model.TblElectricpile;
import com.wanma.model.TblElectricpilehead;
import com.wanma.model.TblPowerstation;
import com.wanma.model.TblProductcomment;
import com.wanma.model.TblRateinformation;

/***
 *
 *   电站详情  
  * @Description:
  * @createTime：2015-3-13 下午04:51:34 
  * @updator： 
  * @updateTime：   
  * @version：V1.0
 */
@Service
public class PowerStationDetailServiceImpl implements PowerStationDetailService {

	@Autowired
	TblElectricpileMapper tblElectricpileMapper;
	@Autowired
	TblRateinformationMapper rateMapper;
	@Autowired
	TblPowerstationMapper tblPowerstationMapper;
	@Autowired
	TblElectricpileheadMapper tblElectricpileheadMapper;
	@Autowired
	AppProductcommentMapper appProductcommentMapper;
	@Autowired
	private PowerStationCommentMapper powerStationCommentMapper;
	@Autowired
	private PowerStationStarMapper powerStationStarMapper;
	@Autowired
	AppElecPileCommentMapper appElecPileCommentMapper;
	@Autowired
	AppElecPileStarMapper appElecPileStarMappr;
	
	@Override
	public List<PowerStationDetail> getPowerStationDetail(
			TblPowerstation tblPowerstation) {
		// TODO Auto-generated method stub
		
		List<PowerStationDetail>  powerStationDetailList=new ArrayList();
		//01：获取电站信息
		Map<String, Object> PowerstationInfoMap=tblPowerstationMapper.getPowerstationById(tblPowerstation);
		PowerStationDetail powerStationDetail=new PowerStationDetail();
		powerStationDetail.setPowerStationId(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("pkPowerstation")));
		powerStationDetail.setPowerStationName(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postName")));
		powerStationDetail.setPowerStationImage(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postPic")));
		powerStationDetail.setPowerStationState(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postStatus")));
		powerStationDetail.setPowerElectricpileSum(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("powerStationSum")));
		powerStationDetail.setPowerStationAddress(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postAddress")));
		powerStationDetail.setPowerStationTell(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postPhone")));
		powerStationDetail.setIsCollect(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("isCollect")));
		powerStationDetail.setPowerStationRemark(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postRemark")));
		powerStationDetail.setPostLongitude(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postLongitude")));
		powerStationDetail.setPostLatitude(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("postLatitude")));
		powerStationDetail.setOnlineTime(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("poSt_OnlineTime")));
		powerStationDetail.setZlHeadNum(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("zlHeadNum")));
		powerStationDetail.setZlFreeHeadNum(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("zlFreeHeadNum")));
		powerStationDetail.setJlHeadNum(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("jlHeadNum")));
		powerStationDetail.setJlFreeHeadNum(JudgeNullUtils.nvlStr(PowerstationInfoMap.get("jlFreeHeadNum")));
		powerStationDetail.setHaslock(Integer.valueOf(PowerstationInfoMap.get("haslock").toString()));
		String dis = JudgeNullUtils.nvlStr(PowerstationInfoMap.get("distance"));
		if("".equals(dis)){
			powerStationDetail.setDistance("0");
		}else{
			powerStationDetail.setDistance(dis);
		}
		//02：获取电桩列表
		TblElectricpile tblElectricpile =new TblElectricpile();
		tblElectricpile.setElPiRelevancePowerStation(tblPowerstation.getPkPowerstation());
		List<TblElectricpile> electricpileList=tblElectricpileMapper.getElectricpileById(tblElectricpile);
		List<PowerStationElictric>  powerStationElictricList=new ArrayList();
		int commentNum = 0;
		double starNum = 0;
		int epNum = 0;
		for (int i = 0; i < electricpileList.size(); i++) {
			Map<String,Object> electricpileListMap=(Map<String,Object>)electricpileList.get(i);
			PowerStationElictric powerStationElictric=new PowerStationElictric();
			powerStationElictric.setElictricPicId(JudgeNullUtils.nvlStr(electricpileListMap.get("pkElectricpile")));
			powerStationElictric.setElictricPicName(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiElectricpilename")));
			powerStationElictric.setPicPowerSum(JudgeNullUtils.nvlStr(electricpileListMap.get("pileHeadSum")));
			powerStationElictric.setElpiState(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiState")));
			powerStationElictric.setRateId(JudgeNullUtils.nvlInteget(electricpileListMap.get("rateId")));
			powerStationElictric.setRaIn_ReservationRate(
					new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("raIn_ReservationRate"))));
			powerStationElictric.setElpiPowerinterface(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiPowerinterface")));
			powerStationElictric.setElpiElectricpilecode(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiElectricpilecode")));
			powerStationElictric.setRaIn_ServiceCharge(
					new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("raIn_ServiceCharge"))));
			powerStationElictric.setEp_num(JudgeNullUtils.nvlInteget(electricpileListMap.get("ep_num")));
			powerStationElictric.setComm_status(JudgeNullUtils.nvlInteget(electricpileListMap.get("comm_status")));
			powerStationElictric.setEpaddr(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiElectricpileaddress"))); 
			powerStationElictric.setOwnerCompany(JudgeNullUtils.nvlStr(electricpileListMap.get("elPi_OwnerCompany")));
			powerStationElictric.setHaveLine(JudgeNullUtils.nvlInteget(electricpileListMap.get("haveLine")));
			//电费格式化
			String mark = PowerStationDetailServiceImpl.getCurrentPowerRateMark(JudgeNullUtils.nvlStr(electricpileListMap.get("rateDate")));
			switch(mark){
				case "1":
					powerStationElictric.setCurrentRate(new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("jPrice"))));
					break;
				case "2":
					powerStationElictric.setCurrentRate(new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("fPrice"))));
					break;
				case "3":
					powerStationElictric.setCurrentRate(new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("pPrice"))));
					break;
				case "4":
					powerStationElictric.setCurrentRate(new BigDecimal(JudgeNullUtils.nvlStr(electricpileListMap.get("gPrice"))));
					break;
				default:
					powerStationElictric.setCurrentRate(new BigDecimal(0));
			}
			
			String ps = "";
			if(!StringUtils.isEmpty(electricpileListMap.get("elpiPowersize"))){
				String st = electricpileListMap.get("elpiPowersize").toString();
				if("6".equals(st)){
					ps = "3.5kw";
				}else if("15".equals(st)){
					ps = "7kw";
				}else if("16".equals(st)){
					ps = "20kw";
				}else if("17".equals(st)){
					ps = "50kw";
				}else if("18".equals(st)){
					ps = "75kw";
				}else if("44".equals(st)){
					ps = "10kw";
				}else if("43".equals(st)){
					ps = "120kw";
				}
			}
			powerStationElictric.setElpiPowersize(ps);
			powerStationElictric.setElpiChargingmode(JudgeNullUtils.nvlStr(electricpileListMap.get("elpiChargingmode")));
			//03:获取枪头列表
			TblElectricpilehead tblElectricpilehead=new TblElectricpilehead();
			tblElectricpilehead.setPkElectricpile(JudgeNullUtils.nvlInteget(electricpileListMap.get("pkElectricpile")));
			List<TblElectricpilehead> electricpileheadList=tblElectricpileheadMapper.find(tblElectricpilehead);
			List<PowerElectricPileHead>  pileHeadList =new ArrayList();
			
			for (int j = 0; j < electricpileheadList.size(); j++) {
				Map<String,Object> electricpileheadListMap=(Map<String,Object>)electricpileheadList.get(j);
				PowerElectricPileHead powerElectricPileHead=new PowerElectricPileHead();
				powerElectricPileHead.setPileHeadName(JudgeNullUtils.nvlStr(electricpileheadListMap.get("epheElectricpileheadname")));
				powerElectricPileHead.setPileHeadState(JudgeNullUtils.nvlStr(electricpileheadListMap.get("epheElectricpileheadstate")));
				powerElectricPileHead.setPileHeadId(JudgeNullUtils.nvlStr(electricpileheadListMap.get("pkElectricpilehead")));
				powerElectricPileHead.setHeadNum(JudgeNullUtils.nvlStr(electricpileheadListMap.get("ePHe_ElectricpileHeadId")));
				powerElectricPileHead.setParkNum(JudgeNullUtils.nvlStr(electricpileheadListMap.get("eph_num")));
				pileHeadList.add(powerElectricPileHead);
			}
			//添加枪头
			powerStationElictric.setPileHeadList(pileHeadList);
			powerStationElictricList.add(powerStationElictric);
			
			List<?> commentList = appElecPileCommentMapper.countEpCommentsByPowerId(JudgeNullUtils.nvlInteget(electricpileListMap.get("pkElectricpile")));
			Map<String, Object> commentMap = (Map<String, Object>) commentList.get(0);
			commentNum += JudgeNullUtils.nvlInteget(commentMap.get("powerCommentCount"));
			
			List<?> starList = appElecPileStarMappr.countAllStarByElecPileId(JudgeNullUtils.nvlInteget(electricpileListMap.get("pkElectricpile")));
			if(null != starList && starList.size() > 0){
				for(int x = 0; x < starList.size(); x++){
					Map<String, Object> starMap = (Map<String, Object>) starList.get(x);
					starNum += (double)starMap.get("epStarCount");
				}
				
				epNum++;
			}
		}
		//添加电桩列表
		powerStationDetail.setPowerElectricpileList(powerStationElictricList);
		//03：获取电站评论
		TblProductcomment tblProductcomment =new TblProductcomment();
		//tblProductcomment.setPrcoProductid(JudgeNullUtils.nvlLang(tblPowerstation.getPkPowerstation()).intValue());
		//tblProductcomment.setPrcoCommentType(ApplicationConsts.ElectricPileManager.ELECTRIC_POWER);
		/*List<?> commentList = powerStationCommentMapper.countPsCommentsByPowerId(tblPowerstation.getPkPowerstation());
		Map<String,Object> commentMap=(Map<String,Object>)commentList.get(0);
		powerStationDetail.setPowerCommentSum(JudgeNullUtils.nvlStr(commentMap.get("powerCommentCount")));
		
		List<?> starList = powerStationStarMapper.countPsStarByPowerId(tblPowerstation.getPkPowerstation());
		Map<String,Object> starMap=(Map<String,Object>)starList.get(0);
		powerStationDetail.setPowerCommentStar(JudgeNullUtils.nvlStr(starMap.get("powerStarCount")));*/
		powerStationDetail.setPowerCommentSum(JudgeNullUtils.nvlStr(commentNum));
		if(commentNum < 2){
			powerStationDetail.setPowerCommentStar(JudgeNullUtils.nvlStr(starNum));
		}else{
			powerStationDetail.setPowerCommentStar(JudgeNullUtils.nvlStr(starNum/(commentNum)));
		}
		powerStationDetailList.add(powerStationDetail);
		return powerStationDetailList;
	}
	
	
	/**
	 * @Title: getSharePowerstation
	 * @Description: 查询分享电站信息
	 * @param TblPowerstation
	 * @return
	 */
	@Override
	public TblPowerstation getSharePowerstation(TblPowerstation tblPowerstation){
		// 获取分享电站信息
		TblPowerstation newPowerstation=tblPowerstationMapper.getSharPowerstation(tblPowerstation);
		//获取电站图片
		List<String> listImage=MultipartFileUtil.getAllMultiUrl(WanmaConstants.MULTI_TYPE_POWER_LIST_IMAGE,
				newPowerstation.getPkPowerstation() + "");
		if(listImage.size()==0){
			newPowerstation.setPostPic("http://localhost:8080/wanma/upload/shareImage/share.jpg");
		}else{
			newPowerstation.setPostPic(JudgeNullUtils.nvlStr(listImage.get(0)));
		}	
		return newPowerstation;
	}
	
	/**
	 * @Title: searchCount
	 * @Description: 查询分享电站信息
	 * @param TblPowerstation
	 * @return
	 */
	@Override
	public long searchCount(TblPowerstation tblPowerstation){
		return tblPowerstationMapper.searchCount(tblPowerstation);
	}
	 
	/**
	 * 获取当前时间对应的尖峰平谷那个段
	 * @param jsonRate 格式化的费率字符串
	 * @return 1尖2峰3平4谷
	 */
	public static String getCurrentPowerRateMark(String jsonRate){
		if(StringUtils.isEmpty(jsonRate)){
			return "0";
		}
		JSONObject jo = JSONObject.parseObject(jsonRate);
		JSONArray ja = jo.getJSONArray("data");
		Calendar c = Calendar.getInstance();
		for(int i = 0;i < ja.size();i++){
			JSONObject cjo = ja.getJSONObject(i);
			int currentM = (c.get(Calendar.HOUR_OF_DAY)*60 + c.get(Calendar.MINUTE));
			if(Integer.parseInt(cjo.getString("st")) < currentM && Integer.parseInt(cjo.getString("et")) > currentM){
				return cjo.getString("mark");
			}
		}
		return "0";
	}


	@Override
	public Map<String, Object> getDetailById(TblPowerstation tblPowerstation) {
		Map<String, Object> data = (Map<String, Object>) tblPowerstationMapper.getPowerstationById(tblPowerstation);
		Map<String, Object> rtData = new HashMap<String, Object>();
		rtData.put("powerStationId", data.get("pkPowerStation"));
		rtData.put("name", data.get("postName"));
		rtData.put("addr", data.get("postAddress"));
		rtData.put("distance", data.get("distance"));
		rtData.put("jlHeadNum", data.get("jlHeadNum"));
		rtData.put("zlHeadNum", data.get("zlHeadNum"));
		rtData.put("jlFreeHeadNum", data.get("jlFreeHeadNum"));
		rtData.put("zlFreeHeadNum", data.get("zlFreeHeadNum"));
		rtData.put("onLineTime", data.get("poSt_OnlineTime"));
		rtData.put("parkFee", data.get("parkFee"));
		rtData.put("postPic", data.get("postPic"));
		rtData.put("longitude", data.get("postLongitude"));
		rtData.put("latitude", data.get("postLatitude"));
		rtData.put("haslock", data.get("haslock"));
		TblElectricpile pile = new TblElectricpile();
		pile.setRelevancePowerStation(tblPowerstation.getPkPowerstation());
		List<TblElectricpile> pList = tblElectricpileMapper.findRelevancePowerStation(pile);
		pile = pList.get(0);
		Map<String, Object> rateParm = new HashMap<String, Object>();
		rateParm.put("pkRateinformation", pile.getRateId());
		rtData.put("rateId", pile.getRateId());
		TblRateinformation rate = rateMapper.find(rateParm);
		String mark = getCurrentPowerRateMark(JudgeNullUtils.nvlStr(rate
						.getRainQuantumdate()));
		switch (mark) {
		case "1":
			rtData.put("elecPrice", rate.getRainTiptimetariff().add(rate.getRainServicecharge()));
			break;
		case "2":
			rtData.put("elecPrice", rate.getRainPeakelectricityprice().add(rate.getRainServicecharge()));
			break;
		case "3":
			rtData.put("elecPrice", rate.getRainUsualprice().add(rate.getRainServicecharge()));
			break;
		case "4":
			rtData.put("elecPrice", rate.getRainValleytimeprice().add(rate.getRainServicecharge()));
			break;
		default:
			rtData.put("elecPrice", "0.00");
		}
		return rtData;
	}

}