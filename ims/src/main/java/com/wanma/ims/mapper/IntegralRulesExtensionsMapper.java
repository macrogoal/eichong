package com.wanma.ims.mapper;


import java.util.List;

import com.wanma.ims.common.domain.IntegralRulesExtensionsDO;

/**
 * 积分规则扩展表 
 * @author bingo
 * @date 2017-08-17
 */
public interface IntegralRulesExtensionsMapper {
	
	public Long getIntegralRulesExtensionsCount(IntegralRulesExtensionsDO integralRulesExtensions);
	
	public List<IntegralRulesExtensionsDO> getIntegralRulesExtensionsList(IntegralRulesExtensionsDO integralRulesExtensions);
	
	public int addIntegralRulesExtensions(IntegralRulesExtensionsDO integralRulesExtensions);
	
	public int modifyIntegralRulesExtensions(IntegralRulesExtensionsDO integralRulesExtensions);
	
	public int batchAddIntegralRulesExtensions(List<IntegralRulesExtensionsDO> list);

	public int removeIntegralRulesExtensions(IntegralRulesExtensionsDO integralRulesExtensions);

	public List<IntegralRulesExtensionsDO> getIntegralListByIntegralIds(List<String> ids);
}