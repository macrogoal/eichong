package com.wanma.service;

import java.util.List;
import java.util.Map;

import com.wanma.model.ElectricMap;
import com.wanma.model.TblPowerstation;

public interface ChargePowerstainService {
	/**
	 * 根据充电站id查询电站以及电桩信息
	 * 
	 * @param params
	 * @return
	 */

	public Map<String, Object> getAmapChargePowerstation(
			Map<String, Object> params);

	/**
	 * 查询电站详情
	 * 
	 * @param model
	 * @return
	 */
	public Map<String, String> getChargePowerstationList(Map<String, Object> params);

	/**
	 * 查询全国范围下的充电点
	 * 
	 * @param model
	 * @return
	 */
	public List<ElectricMap> getPowerstationMapBysearch(
			Map<String, Object> params);

}