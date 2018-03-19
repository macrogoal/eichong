package com.wanma.ims.mapper;

import java.util.List;
import java.util.Map;

import com.wanma.ims.common.domain.ActivityDO;


public interface ActivityMapper {

	List<ActivityDO> getActivityForList(ActivityDO activity);

	long getActivityCount(ActivityDO activity);

	List<ActivityDO> getActivityList(ActivityDO activity);

	int changeActStatus(ActivityDO activity);

	void addMainActivity(ActivityDO activity);

	void addScheActivity(ActivityDO item);

	void generateCode(List<Map<String, Object>> list);

	long checkActUnique(ActivityDO activity);

	List<Map<String, String>> getCityScope();

	List<Map<String, String>> getCpyForList(ActivityDO activity);



	public List<ActivityDO> getDataForCouponBatch(ActivityDO activity);
}