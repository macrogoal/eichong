package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.CityDO;
import com.wanma.ims.common.domain.RateUniqueRelaDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.dto.BaseResultDTO;


/**
 * 唯一费率管理
 * @author bingo
 * @date 2017-07-25
 */
public interface RateUniqueRelaService {
	/**
	* <p>Description: 获取唯一费率数量</p>
	* @param
	* @author bingo
	* @date 2017-7-25
	 */
	public Long getRateUniqueRelaCount(RateUniqueRelaDO rateUniqueRela);
	
	/**
	* <p>Description: 获取唯一费率数据</p>
	* @param
	* @author bingo
	* @date 2017-7-25
	 */
	public List<RateUniqueRelaDO> getRateUniqueRelaList(RateUniqueRelaDO rateUniqueRela);
	
	/**
	* <p>Description: 新增唯一费率</p>
	* @param
	* @author bingo
	* @date 2017-7-25
	 */
	public BaseResultDTO addRateUniqueRela(RateUniqueRelaDO rateUniqueRela, UserDO loginUser) throws Exception;

	/**
	* <p>Description: 获取分组后的唯一费率数据</p>
	* @param
	* @author bingo
	* @date 2017-7-25
	 */
	public List<RateUniqueRelaDO> getRateUniqueRelaGroup(RateUniqueRelaDO rateUniqueRela);
	
	/**
	* <p>Description: 获取充电点和电桩</p>
	* @param
	* @author bingo
	* @date 2017-8-28
	 */
	public List<CityDO> getStationAndPile(RateUniqueRelaDO rateUniqueRela, UserDO loginUser) throws Exception;
	
	/**
	* <p>Description: 更新唯一费率</p>
	* @param
	* @author bingo
	* @date 2017-8-31
	 */
	public BaseResultDTO modifyRateUniqueRela(RateUniqueRelaDO rateUniqueRela, UserDO loginUser) throws Exception;
	
	/**
	* <p>Description: 修改唯一费率的费率值</p>
	* @param
	* @author bingo
	* @date 2017-9-1
	 */
	public BaseResultDTO modifyRateUniqueRelaRateinfoId(RateUniqueRelaDO rateUniqueRela, UserDO loginUser) throws Exception;

	/**
	 * 判断时间段是否一致
	 * @param electricPileIdArray
	 * @param rateUniqueRela
	 * @return
	 */
	public String contrastElectricPileRateTime(String[] electricPileIdArray, RateUniqueRelaDO rateUniqueRela);
}
