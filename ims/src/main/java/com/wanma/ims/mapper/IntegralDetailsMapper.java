package com.wanma.ims.mapper;


import java.util.List;

import com.wanma.ims.common.domain.IntegralDetailsDO;

/**
 * 积分明细表 
 * @author bingo
 * @date 2017-08-11
 */
public interface IntegralDetailsMapper {
	
	public Long getIntegralDetailsCount(IntegralDetailsDO integralDetails);
	
	public List<IntegralDetailsDO> getIntegralDetailsList(IntegralDetailsDO integralDetails);
	
	public int addIntegralDetails(IntegralDetailsDO integralDetails);
	
	public int modifyIntegralDetails(IntegralDetailsDO integralDetails);
	
	public Long getIntegralDetailsNum(IntegralDetailsDO integralDetails);

	public int deleteIntegralDetails(IntegralDetailsDO integralDetails);
}