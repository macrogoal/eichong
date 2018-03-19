package com.wanma.ims.mapper;


import java.util.List;

import com.wanma.ims.common.domain.IntegralRulesDO;
import com.wanma.ims.common.domain.bo.IntegralAreaBO;

/**
 * 积分规则表 
 * @author bingo
 * @date 2017-08-11
 */
public interface IntegralRulesMapper {
	
	public Long getIntegralRulesCount(IntegralRulesDO integralRules);
	
	public List<IntegralRulesDO> getIntegralRulesList(IntegralRulesDO integralRules);
	
	public int addIntegralRules(IntegralRulesDO integralRules);
	
	public int modifyIntegralRules(IntegralRulesDO integralRules);
	
	public int deleteIntegralRules(IntegralRulesDO integralRules);

	public Long getRepeatIntegralRulesCount(IntegralRulesDO integralRules);

	public List<IntegralAreaBO> getIntegralRulesProvince(IntegralRulesDO integralRules);

	public List<IntegralAreaBO> getIntegralRulesCity(IntegralRulesDO integralRules);

	public List<IntegralAreaBO> getIntegralRulesPowerStation(IntegralRulesDO integralRules);

	public List<IntegralAreaBO> getIntegralRulesElectricPile(IntegralRulesDO integralRules);

	public int updateIntegralRules(IntegralRulesDO integralRules);
}