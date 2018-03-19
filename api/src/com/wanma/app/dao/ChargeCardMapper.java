package com.wanma.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wanma.model.TblUser;


public interface ChargeCardMapper {
	
	public void initCard(Map<String, String> params);
	
	public int countCardByOutNum(String outNum);
	
	public List<HashMap<String, String>> getCompMarkList();
	
	public Map<String, Object> getCardInfoByInNum(String inNum);
	
	/**
	 * count card number by inside number and outside number 
	 * @param params
	 * 		inNum: inside number, outNum: outside number
	 * @return
	 */
	public int countCardByOutAndInNum(Map<String, Object> params);
	
	public List<Map<String, String>> cardListByUid(long uId);
	
	//<select id ="getcardByUid" parameterType="long" resultType="map">
	public Map<String,Object>getcardByUid (long userId);
	//myApplyInfo
	public Map<String,Object>myApplyInfo(long userId);
	
	public void updateStatusByUidAndOutNum(Map<String, String> params);

	public void addUser(TblUser user);
}
