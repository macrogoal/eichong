package com.wanma.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wanma.dao.TblPowerstationMapper;
import com.wanma.model.ElectricMap;
import com.wanma.model.TblPowerstation;
import com.wanma.service.ChargePowerstainService;
import com.wanma.support.simple.JudgeNullUtils;

@Service("amapChargeService")
public class ChargePowerstationServiceImpl implements ChargePowerstainService {
	@Autowired
	private TblPowerstationMapper tblPowerstationMapper;

	@Override
	public Map<String, Object> getAmapChargePowerstation(
			Map<String, Object> params) {
		Map<String, Object> map = tblPowerstationMapper
				.getAmapChargePowerstation(params);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("cscf", Integer.parseInt((String) map.get("cscf")));
		data.put("pay_type", "2;3;4");
		data.put("opentime2", map.get("opentime2"));
		data.put("num_fast", map.get("num_fast"));
		data.put("num_slow", map.get("num_slow"));
		data.put("price_parking", "");
		data.put("pic_info", makePicInfo(map));
		data.put("charge_info", makeChargeInfo(map));
		data.put("price_charging", "");
		return data;
	}

	@Override
	public Map<String, String> getChargePowerstationList(Map<String,Object> params) {
		Map<String, String> maps =tblPowerstationMapper.getChargePowerstationList(params);
		maps.put("name", maps.get("name"));
		maps.put("address", maps.get("address"));
		maps.put("adm1_chn", maps.get("adm1_chn"));
		maps.put("adm2_chn", maps.get("adm2_chn"));
		maps.put("adm3_chn", maps.get("adm3_chn"));
		maps.put("x", String.valueOf(maps.get("x")));
		maps.put("y", String.valueOf(maps.get("y")));
		maps.put("telephone", maps.get("telephone"));
		maps.put("src_id", String.valueOf(maps.get("src_id")));
		return maps;
		
	}

	public List<Map<String, Object>> makePicInfo(Map<String, Object> map) {
		List<Map<String, Object>> rateMapList = new ArrayList<Map<String, Object>>();
		Map<String, Object> pice = new HashMap<String, Object>();
		pice.put("iscover", 1);
		pice.put("url", JudgeNullUtils.nvlStr(map.get("url")));
		pice.put("title", "");
		rateMapList.add(pice);
		return rateMapList;
	}

	public List<Map<String, Object>> makeChargeInfo(Map<String, Object> map) {
		List<Map<String, Object>> electricPileList = tblPowerstationMapper
				.getElecticByPonitId(map);
		List<Map<String, Object>> chargeInfoList = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> item : electricPileList) {
			Map<String, Object> charge_info = new HashMap<String, Object>();
			charge_info.put("plugstype", item.get("plugstype"));
			charge_info.put("plugs_info", makeFengzhiStr1(item));
			chargeInfoList.add(charge_info);
		}
		return chargeInfoList;
	}

	public List<Map<String, Object>> makeFengzhiStr1(Map<String, Object> item) {
		List<Map<String, Object>> rateMapList = new ArrayList<Map<String, Object>>();
		Map<String, Object> plugs_info = new HashMap<String, Object>();
		plugs_info.put("fastvol", item.get("fastvol"));
		plugs_info.put("convol", item.get("convol"));
		plugs_info.put("brand_desc", "");
		rateMapList.add(plugs_info);
		return rateMapList;
	}

	@Override
	public List<ElectricMap> getPowerstationMapBysearch(
			Map<String, Object> params) {
		List<ElectricMap> powerList_data = tblPowerstationMapper
				.getPowerstationMapBysearch(params);
		return powerList_data;

	}

}
