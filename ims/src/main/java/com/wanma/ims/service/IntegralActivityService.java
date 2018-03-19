package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.IntegralActivityDO;
import com.wanma.ims.common.domain.ProvinceDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.bo.IntegralActivityAndRulesBO;
import com.wanma.ims.common.dto.BaseResultDTO;

/**
 * 积分活动
 * @author bingo
 * @date 2017-08-15
 */
public interface IntegralActivityService {
	/**
	* <p>Description: 获取积分活动数量</p>
	* @param
	* @author bingo
	* @date 2017-08-15
	 */
	public Long getIntegralActivityCount(IntegralActivityDO integralActivity);
	
	/**
	* <p>Description: 获取积分活动数据</p>
	* @param
	* @author bingo
	* @date 2017-08-15
	 */
	public List<IntegralActivityAndRulesBO> getIntegralActivityList(IntegralActivityDO integralActivity);
	
	/**
	* <p>Description: 修改积分活动</p>
	* @param
	* @author bingo
	* @date 2017-08-15
	 */
	public BaseResultDTO modifyIntegralActivity(IntegralActivityAndRulesBO integralActivityAndRulesBO) throws Exception;
	
	/**
	* <p>Description: 增加积分活动</p>
	* @param
	* @author bingo
	* @date 2017-08-15
	 */
	public BaseResultDTO addIntegralActivity(IntegralActivityAndRulesBO integralActivityAndRulesBO) throws Exception;
	
	/**
	* <p>Description: 删除积分活动</p>
	* @param
	* @author bingo
	* @date 2017-08-15
	 */
	public BaseResultDTO deleteIntegralActivity(IntegralActivityDO integralActivity) throws Exception;

	public List<ProvinceDO> getStationAndPile(IntegralActivityAndRulesBO integralActivityAndRulesBO,
											  UserDO loginUser) throws Exception;

	public List<IntegralActivityAndRulesBO> getIntegralActivityAndRulesList(IntegralActivityDO integralActivity);

	public List<IntegralActivityAndRulesBO> getIntegralActivityForBatch(IntegralActivityDO integralActivity);
}
