package com.wanma.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wanma.model.TblCarinfo;
import com.wanma.model.TblParaconfig;

/**
 * @Description: 其他配置参数业务处理接口
 * @author songjf
 * @createTime：2015-3-13 下午05:04:53
 * @updator：
 * @updateTime：
 * @version：V1.0
 */
public interface WebParaconfigService {

	/**
	 * @Title: findParaconfig
	 * @Description: 获取配置信息
	 * @param params
	 *            查询条件
	 * @return
	 */
	public List<TblParaconfig> findParaconfigList(Map<String, Object> params);

	/**
	 * @Title: findCarinfoList
	 * @Description: 获取配置信息
	 * @param params
	 *            查询条件
	 * @return
	 */
	public List<TblCarinfo> findCarinfoList(Map<String, Object> params);
	
	/**
	 * @Title: findCarCompanyList
	 * @Description: 获取汽车厂家信息
	 * @param params
	 *            查询条件
	 * @return
	 */
	public List<HashMap<String, Object>> findCarCompanyList(Map<String, Object> params);

}
