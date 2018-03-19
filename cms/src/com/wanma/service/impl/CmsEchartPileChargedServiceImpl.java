package com.wanma.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.wanma.dao.CmsStatisticMapper;
import com.wanma.model.echarts.EchartsParamModel;

@Service
public class CmsEchartPileChargedServiceImpl extends CmsEchartsServiceImpl {

	@Autowired
	private CmsStatisticMapper CmsStatisticMapper;

	@Override
	public void setData(JSONObject obj, EchartsParamModel paramsModel) {
		List<Map<String, Object>> beanList = CmsStatisticMapper
				.queryPileChargeCountList(paramsModel);
		if (beanList != null && beanList.size() > 0) {
			int initMonthLength = 12;
			List<Object> monthList = new ArrayList<Object>();
			Map<String, String> dataMap = new HashMap<String, String>();
			for (Map<String, Object> beanMap : beanList) {
				monthList.add(beanMap.get("chargeMonth"));
				dataMap.put(
						beanMap.get("chargeMonth") + "",
						beanMap.get("chargeNumber") + ","
								+ toFix2Float(beanMap.get("chargingDegree")));

			}
			// X轴月份序列
			Object[] monthGroup = makeBeginMonthGroup(monthList);
			Object[] monthGroupInner = makeGroup(monthList, initMonthLength);
			// Y轴消费数据
			// 大图数据
			List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
			makeData(monthGroupInner, dataMap, dataList);
			// 小图数据
			List<Map<String, Object>> dataListTemp = new ArrayList<Map<String, Object>>();
			makeData(monthGroup, dataMap, dataListTemp);
			Map<String, Object> monthMap = new HashMap<String, Object>();
			monthMap.put("type", "category");
			monthMap.put("data", monthGroup);

			obj.put("xAxis", monthMap);
			obj.put("series", dataListTemp);
			obj.put("innerMonthGroup", monthGroupInner);
			obj.put("tempDataList", dataList);
		} else {
			obj.put("isEmpty", "Y");
		}
	}

	private String toFix2Float(Object value) {
		DecimalFormat df = new DecimalFormat("######0.00");
		return df.format(value);
	}

	/**
	 * 组装消费数据，Y轴左轴为消费次数，右轴为消费金额
	 * 
	 * @param list
	 * @param initLength
	 * @return
	 */
	private void makeData(Object[] monthGroup, Map<String, String> dataMap,
			List<Map<String, Object>> dataList) {
		String[] dataGroupNumber = new String[monthGroup.length];
		String[] dataGroupDegree = new String[monthGroup.length];
		Map<String, Object> dataMapEachYlefT = new HashMap<String, Object>();
		Map<String, Object> dataMapEachYRight = new HashMap<String, Object>();
		for (int i = 0; i < monthGroup.length; i++) {
			String dataString = dataMap.get(String.valueOf(monthGroup[i]));
			if (dataString != null) {
				dataGroupNumber[i] = dataString.split(",")[0];
				dataGroupDegree[i] = dataString.split(",")[1];
			} else {
				dataGroupNumber[i] = "0";
				dataGroupDegree[i] = "0";
			}
		}
		dataMapEachYlefT.put("type", "bar");
		dataMapEachYlefT.put("name", "充电次数");
		dataMapEachYlefT.put("data", dataGroupNumber);
		dataMapEachYRight.put("type", "line");
		dataMapEachYRight.put("name", "充电度数");
		dataMapEachYRight.put("data", dataGroupDegree);
		dataMapEachYRight.put("yAxisIndex", 1);
		dataList.add(dataMapEachYlefT);
		dataList.add(dataMapEachYRight);
	}

}
