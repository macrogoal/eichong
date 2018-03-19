package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.RateInfoDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.dto.BaseResultDTO;


/**
 * 费率管理
 * @author bingo
 * @date 2017-06-26
 */
public interface RateInfoService {
	/**
	* <p>Description: 获取费率管理数量</p>
	* @param
	* @author bingo
	* @date 2017-6-26
	 */
	public Long getRateInfoCount(RateInfoDO rateInfo);
	
	/**
	* <p>Description: 获取费率管理数据</p>
	* @param
	* @author bingo
	* @date 2017-6-26
	 */
	public List<RateInfoDO> getRateInfoList(RateInfoDO rateInfo);
	
	/**
	* <p>Description: 新增费率管理</p>
	* @param
	* @author bingo
	* @date 2017-6-26
	 */
	public BaseResultDTO addRateInfo(RateInfoDO rateInfo, UserDO loginUser) throws Exception;
	
	/**
	* <p>Description: 修改费率管理</p>
	* @param
	* @author bingo
	* @date 2017-6-26
	 */
	public BaseResultDTO modifyRateInfo(RateInfoDO rateInfo, UserDO loginUser) throws Exception;
	
	/**
	* <p>Description: 删除费率管理</p>
	* @param
	* @author bingo
	* @date 2017-6-26
	 */
	public BaseResultDTO removeRateInfo(RateInfoDO rateInfo) throws Exception;
	
	/**
	* <p>Description: 通过Id获取费率</p>
	* @param
	* @author bingo
	* @date 2017-8-30
	 */
	public RateInfoDO getRateInfoById(RateInfoDO rateInfo);
}
