package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.ElectricParamDO;


/**
 * <p>电桩参数管理<p>
 * @author zhangchunyan
 * @date 2017-9-1
 */
public interface ElectricParamService {
	/**
	 * <p>电桩参数-统计<p>
	 * @param ElectricParamDO
	 * @author zhangchunyan
	 * @date 2017-9-1
	 */
	public Long countElectricParamList(ElectricParamDO electricParamDO);
	
	/**
	 * <p>电桩参数-查询<p>
	 * @param ElectricParamDO
	 * @author zhangchunyan
	 * @date 2017-9-1
	 */
	public List<ElectricParamDO> getElectricParamList(ElectricParamDO electricParamDO);
	
	/**
	 * <p>电桩参数-设置<p>
	 * @param ElectricParamDO
	 * @author zhangchunyan
	 * @date 2017-9-1
	 */
	public boolean setElectricParam(ElectricParamDO electricParamDO) throws Exception;
	
}
