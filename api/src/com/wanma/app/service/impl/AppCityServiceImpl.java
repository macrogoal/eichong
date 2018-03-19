/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.app.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wanma.app.dao.AppCityMapper;
import com.wanma.app.service.AppCityService;
import com.wanma.model.TblCity;

/**
 * 反馈信息业务处理类
 * 
 * @version V1.0
 * @author Administrator
 * @date 2014年6月26日
 */
@Service
public class AppCityServiceImpl implements AppCityService {

	/** 聊天主表操作用DAO */
	@Autowired
	AppCityMapper appCityMapper;

	/**
	 *  获取所有城市接口
	 *  
	 * @return
	 */
	@Override
	public List<TblCity> getCityList() {
		return appCityMapper.find();
	}

	@Override
	public <K, V> List<Map<K, V>> getCityAndProvince() {
		return appCityMapper.getCityAndProvince();
	}

	@Override
	public void updateLatLng(Map<String, String> map) {
		 appCityMapper.updateLatLng(map);
		
	}

	@Override
	public List<Map<String, String>> getCityOrProvinceInfo() {
		// TODO Auto-generated method stub
		return appCityMapper.getCityOrProvinceInfo();
	}


}
