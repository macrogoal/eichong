package com.wanma.dao;


import java.util.List;
import java.util.Map;

import com.wanma.model.RateInfo;
import com.wanma.model.TblWeChatDeal;
import com.wanma.model.TblWeChatNews;
import com.wanma.model.WxAccount;
import com.wanma.model.WxAccountDetail;
import com.wanma.model.WxCharge;
import com.wanma.model.WxElectircpile;



public interface WeChatMapper {

	long getChgStatus(String openId);

	RateInfo getRateInfo(RateInfo de);

	WxElectircpile getElectricPile(String epCodes);

	List<WxAccount> getWeChatAccount(String openId);

	List<WxAccountDetail> getWxAccountDetail(Map<String, String> map);

	WxCharge getepCode(String epcodes);

	//long checkWxReply(String outTradeNo);

	
	TblWeChatNews getWeChatNews(String type);

	void addWeChatDeal(TblWeChatDeal deal);

	long getDealLog(String outTradeNo);

	void updateDealLog(TblWeChatDeal deal);
	
	
}
