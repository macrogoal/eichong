/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.web.dao;

import java.util.List;
import java.util.Map;

import com.wanma.model.TblCity;

/**
 * 反馈表操作用DAO接口Mapper
 * 
 * @version V1.0
 * @author Administrator
 * @date 2014年6月26日
 */
public interface WebCityMapper {

	

	/**
	 * 获取所有城市
	 * 
	 * @author yangweir
	 * @since Version 1.0
	 * @return List<Feedback> 反馈信息
	 * @throws 无
	 */
	public List<TblCity> getAll(Map<String,String> param);
	public long getCount(Map<String,String> param);

}
