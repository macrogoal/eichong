package com.wanma.ims.common.domain;

import java.util.Date;

import com.wanma.ims.common.domain.base.BasicModel;


/**
 * 积分活动表
 * @author bingo
 * @date 2017-08-11
 */
public class IntegralActivityDO extends BasicModel{

	private static final long serialVersionUID = -3427146503062337377L;

	/** 积分活动ID */
	private Long pkId;

	/** 活动名称（1：充值送；2：消费送；3：每日领取；4：资料修改；5：分享；6：积分兑换；7：积分抽奖；8：节假日；9：生日赠送）  */
	private String activityName;

	/** 积分方向（0：获取；1：消耗） */
	private Integer direction;

	/** 活动上限积分   */
	private Long maxIntegrals;

	/** 活动送出积分  */
	private Long launchIntegrals;

	/** 活动剩余积分  */
	private Long residuesIntegrals;

	private Long electricPileId;//电桩ID

	private Date integralDate;//积分日期

	private Integer activityStatus;//活动状态（0：开启；1：关闭）

	private Long integralValue;//消费的积分值

	private Integer couponVarietyId;//优惠券品种Id

	private Integer isWhole;//是否全国有效（0：否；1：是）

	private Integer highestPriority;//最高优先级（0：否；1：是）

	/** 积分活动ID */
	private Long integralRulesId;

	private Date startDate;//活动开始日期
	private Date endDate;//活动结束日期

	private String provinceId;//省ID
	private String cityId;//市ID
	//站ID
	private String powerStationId;
	private String electricPileCode; // 桩体编号

	public Long getPkId() {
		return pkId;
	}

	public void setPkId(Long pkId) {
		this.pkId = pkId;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public Integer getDirection() {
		return direction;
	}

	public void setDirection(Integer direction) {
		this.direction = direction;
	}

	public Long getMaxIntegrals() {
		return maxIntegrals;
	}

	public void setMaxIntegrals(Long maxIntegrals) {
		this.maxIntegrals = maxIntegrals;
	}

	public Long getLaunchIntegrals() {
		return launchIntegrals;
	}

	public void setLaunchIntegrals(Long launchIntegrals) {
		this.launchIntegrals = launchIntegrals;
	}

	public Long getResiduesIntegrals() {
		return residuesIntegrals;
	}

	public void setResiduesIntegrals(Long residuesIntegrals) {
		this.residuesIntegrals = residuesIntegrals;
	}

	public Long getElectricPileId() {
		return electricPileId;
	}

	public void setElectricPileId(Long electricPileId) {
		this.electricPileId = electricPileId;
	}

	public Date getIntegralDate() {
		return integralDate;
	}

	public void setIntegralDate(Date integralDate) {
		this.integralDate = integralDate;
	}

	public Integer getActivityStatus() {
		return activityStatus;
	}

	public void setActivityStatus(Integer activityStatus) {
		this.activityStatus = activityStatus;
	}

	public Long getIntegralValue() {
		return integralValue;
	}

	public void setIntegralValue(Long integralValue) {
		this.integralValue = integralValue;
	}

	public Integer getCouponVarietyId() {
		return couponVarietyId;
	}

	public void setCouponVarietyId(Integer couponVarietyId) {
		this.couponVarietyId = couponVarietyId;
	}

	public Integer getIsWhole() {
		return isWhole;
	}

	public void setIsWhole(Integer isWhole) {
		this.isWhole = isWhole;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getHighestPriority() {
		return highestPriority;
	}

	public void setHighestPriority(Integer highestPriority) {
		this.highestPriority = highestPriority;
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

	public String getPowerStationId() {
		return powerStationId;
	}

	public void setPowerStationId(String powerStationId) {
		this.powerStationId = powerStationId;
	}

	public String getElectricPileCode() {
		return electricPileCode;
	}

	public void setElectricPileCode(String electricPileCode) {
		this.electricPileCode = electricPileCode;
	}
}