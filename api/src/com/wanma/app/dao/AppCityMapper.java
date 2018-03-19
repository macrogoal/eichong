/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.app.dao;

import java.util.List;
import java.util.Map;

import net.sf.ehcache.search.parser.MAggregate;

import com.wanma.model.TblCity;

/**
 * 反馈表操作用DAO接口Mapper
 * 
 * @version V1.0
 * @author Administrator
 * @date 2014年6月26日
 */
public interface AppCityMapper {

	

	/**
	 * 获取所有城市
	 * 
	 * @author yangweir
	 * @since Version 1.0
	 * @return List<Feedback> 反馈信息
	 * @throws 无
	 */
	public List<TblCity> find();

	public <K, V> List<Map<K, V>> getCityAndProvince();

	public void updateLatLng(Map<String, String> map);

	public List<Map<String, String>> getCityOrProvinceInfo();

}