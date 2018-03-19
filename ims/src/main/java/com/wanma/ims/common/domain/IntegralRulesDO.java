package com.wanma.ims.common.domain;

import java.util.Date;

import com.wanma.ims.common.domain.base.BasicModel;


/**
 * 积分规则表
 * @author bingo
 * @date 2017-08-11
 */
public class IntegralRulesDO extends BasicModel{

	private static final long serialVersionUID = -6126557768936125679L;

	/** 积分规则ID */
	private Long pkId;
	
	/** 积分活动ID */
	private Long integralActivityId;
	
	/** 最高优先级（0：否；1：是）  */
	private Integer highestPriority;
	
	/** 活动状态（0：开启；1：关闭）   */
	private Integer activityStatus;
	
	/** 固定积分值  */
	private Long fixedIntegralValue;
	
	/** 比例积分值 */
	private Long ratioIntegralValue;
	
	/** 活动开始日期  */
	private Date startDate;

	/** 活动结束日期  */
	private Date endDate;
	
	/** 有效次数（1：第一次时赠送积分；2：每次都赠送）   */
	private Integer effectiveTimes;
	
	/** 是否全国有效（0：否；1：是）   */
	private Integer isWhole;
	
	/** 充电消费满足最小金额，才开始赠送、可以积分抵扣 */
	private Long minValue;

	/** 按照充值/消费金额赠送抽奖机会（0：启用；1：未启用）  */
	private Integer isChoice;

	/** 每消费多少金额赠送一次抽奖机会  */
	private Long choiceMoney;
	
	/** 充电消费分享赠送积分、抽奖机会（0：不赠送；1：首次分享； 2：每次分享）   */
	private Integer isShareChoice;
	
	/** 分享成功后赠送积分值 */
	private Long shareIntegralValue;
	
	/** 分享成功后赠送一次抽奖机会（0：是；1：否） */
	private Integer shareChoice;

	/** 消费赠送的上限积分 */
	private Long limitIntegral;
	
	/** 积分规则内容  */
	private String contents;

	public Long getPkId() {
		return pkId;
	}

	public void setPkId(Long pkId) {
		this.pkId = pkId;
	}

	public Long getIntegralActivityId() {
		return integralActivityId;
	}

	public void setIntegralActivityId(Long integralActivityId) {
		this.integralActivityId = integralActivityId;
	}

	public Integer getHighestPriority() {
		return highestPriority;
	}

	public void setHighestPriority(Integer highestPriority) {
		this.highestPriority = highestPriority;
	}

	public Integer getActivityStatus() {
		return activityStatus;
	}

	public void setActivityStatus(Integer activityStatus) {
		this.activityStatus = activityStatus;
	}

	public Long getFixedIntegralValue() {
		return fixedIntegralValue;
	}

	public void setFixedIntegralValue(Long fixedIntegralValue) {
		this.fixedIntegralValue = fixedIntegralValue;
	}

	public Long getRatioIntegralValue() {
		return ratioIntegralValue;
	}

	public void setRatioIntegralValue(Long ratioIntegralValue) {
		this.ratioIntegralValue = ratioIntegralValue;
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

	public Integer getEffectiveTimes() {
		return effectiveTimes;
	}

	public void setEffectiveTimes(Integer effectiveTimes) {
		this.effectiveTimes = effectiveTimes;
	}
	
	public Integer getIsWhole() {
		return isWhole;
	}

	public void setIsWhole(Integer isWhole) {
		this.isWhole = isWhole;
	}

	public Long getMinValue() {
		return minValue;
	}

	public void setMinValue(Long minValue) {
		this.minValue = minValue;
	}

	public Integer getIsChoice() {
		return isChoice;
	}

	public void setIsChoice(Integer isChoice) {
		this.isChoice = isChoice;
	}

	public Long getChoiceMoney() {
		return choiceMoney;
	}

	public void setChoiceMoney(Long choiceMoney) {
		this.choiceMoney = choiceMoney;
	}

	public Integer getIsShareChoice() {
		return isShareChoice;
	}

	public void setIsShareChoice(Integer isShareChoice) {
		this.isShareChoice = isShareChoice;
	}

	public Long getShareIntegralValue() {
		return shareIntegralValue;
	}

	public void setShareIntegralValue(Long shareIntegralValue) {
		this.shareIntegralValue = shareIntegralValue;
	}

	public Integer getShareChoice() {
		return shareChoice;
	}

	public void setShareChoice(Integer shareChoice) {
		this.shareChoice = shareChoice;
	}

	public Long getLimitIntegral() {
		return limitIntegral;
	}

	public void setLimitIntegral(Long limitIntegral) {
		this.limitIntegral = limitIntegral;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}
}