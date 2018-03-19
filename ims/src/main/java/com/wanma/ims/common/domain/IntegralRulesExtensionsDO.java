package com.wanma.ims.common.domain;

import com.wanma.ims.common.domain.base.BasicModel;


/**
 * 积分规则扩展表 
 * @author bingo
 * @date 2017-08-17
 */
public class IntegralRulesExtensionsDO extends BasicModel{

	private static final long serialVersionUID = -7995891383252053624L;

	/** 积分规则扩展ID */
	private Long pkId;
	
	/** 积分规则ID  */
	private Long integralRulesId;

	/** 省ID */
	private String provinceId;

	/** 市ID */
	private String cityId;

	/** 电站ID   */
	private Long powerStationId;
	
	/** 电桩ID  */
	private Long electricPileId;
	
	/** 优惠券品种Id */
	private Integer couponVarietyId;
	
	/** 消费的积分值 */
	private Long integralValue;

	public Long getPkId() {
		return pkId;
	}

	public void setPkId(Long pkId) {
		this.pkId = pkId;
	}

	public Long getIntegralRulesId() {
		return integralRulesId;
	}

	public void setIntegralRulesId(Long integralRulesId) {
		this.integralRulesId = integralRulesId;
	}

	public String getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public Long getPowerStationId() {
		return powerStationId;
	}

	public void setPowerStationId(Long powerStationId) {
		this.powerStationId = powerStationId;
	}

	public Long getElectricPileId() {
		return electricPileId;
	}

	public void setElectricPileId(Long electricPileId) {
		this.electricPileId = electricPileId;
	}

	public Integer getCouponVarietyId() {
		return couponVarietyId;
	}

	public void setCouponVarietyId(Integer couponVarietyId) {
		this.couponVarietyId = couponVarietyId;
	}

	public Long getIntegralValue() {
		return integralValue;
	}

	public void setIntegralValue(Long integralValue) {
		this.integralValue = integralValue;
	}
}