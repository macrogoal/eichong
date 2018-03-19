package com.wanma.ims.controller.vo;

import com.wanma.ims.common.domain.CompanyDO;
import com.wanma.ims.constants.CompanyEnum;
import com.wanma.ims.constants.WanmaConstants;

public class CompanyVO {

	private String cpyId; // 公司主键
	private String cpyNumber;// 公司标识
	private String cpyName;// 公司名称
	private String cpyCity;// 市
	private String cpyStatus;// 状态 0.正常 1.禁用
	private String cpyStatusText;
	private String cpyTypeText;// 类型
	private String cpyParentName;// 上级名称
	private String isValid;// 是否开启盗刷校验 0.否 1.是
	private String isValidText;
	private String slaveCpyName;// 管理单位名称
	private String accountId; // 资金账户ID
	private String tradeType;
	private String tradeTypeText;
	private String payRule;
	private String payRuleText; // 付费策略
	private String savingAccountId; // 储蓄账户

	public CompanyVO(CompanyDO companyDO){
		this.cpyId = companyDO.getCpyId() + "";
		this.cpyNumber = companyDO.getCpyNumber() + "";
		this.cpyName = companyDO.getCpyName();
		this.cpyTypeText = CompanyEnum.getName(companyDO.getCpyType());
		if (companyDO.getIsValid() == WanmaConstants.COMPANY_IS_VALID_ON) {
			this.isValidText = "是";
		} else {
			this.isValidText = "否";
		}
		this.cpyStatus = companyDO.getCpyStatus() + "";
		if (companyDO.getCpyStatus() == WanmaConstants.COMPANY_STATE_ENABLE) {
			this.cpyStatusText = "正常";
		} else {
			this.cpyStatusText = "禁用";
		}
		this.cpyParentName = companyDO.getCpyParentName();
		this.slaveCpyName = companyDO.getSlaveCpyName();
		this.cpyCity = companyDO.getCpyProvinceName() + companyDO.getCpyCityName();
		this.accountId = companyDO.getAccountId() + "";
		this.tradeType = companyDO.getTradeType() + "";
		if (companyDO.getTradeType() == 1) {
			this.tradeTypeText = "信用账户";
		} else {
			this.tradeTypeText = "储值账户";
		}
		this.payRule = companyDO.getPayRule() + "";
		if (null != companyDO.getPayRule()) {
			if (companyDO.getPayRule() == 0) {
				this.payRuleText = "无付费策略";
			}
			if (companyDO.getPayRule() == 1) {
				this.payRuleText = "公司付费";
			}
			if (companyDO.getPayRule() == 2) {
				this.payRuleText = "个人付费";
			}
			if (companyDO.getPayRule() == 3) {
				this.payRuleText = "大账户为个人配资";
			}
		}
		if (null != companyDO.getSavingAccountId()) {
			this.savingAccountId = companyDO.getSavingAccountId() + "";
		}

	}

	public String getCpyId() {
		return cpyId;
	}

	public void setCpyId(String cpyId) {
		this.cpyId = cpyId;
	}

	public String getCpyNumber() {
		return cpyNumber;
	}

	public void setCpyNumber(String cpyNumber) {
		this.cpyNumber = cpyNumber;
	}

	public String getCpyName() {
		return cpyName;
	}

	public void setCpyName(String cpyName) {
		this.cpyName = cpyName;
	}

	public String getCpyCity() {
		return cpyCity;
	}

	public void setCpyCity(String cpyCity) {
		this.cpyCity = cpyCity;
	}

	public String getCpyStatus() {
		return cpyStatus;
	}

	public void setCpyStatus(String cpyStatus) {
		this.cpyStatus = cpyStatus;
	}

	public String getCpyStatusText() {
		return cpyStatusText;
	}

	public void setCpyStatusText(String cpyStatusText) {
		this.cpyStatusText = cpyStatusText;
	}

	public String getCpyTypeText() {
		return cpyTypeText;
	}

	public void setCpyTypeText(String cpyTypeText) {
		this.cpyTypeText = cpyTypeText;
	}

	public String getCpyParentName() {
		return cpyParentName;
	}

	public void setCpyParentName(String cpyParentName) {
		this.cpyParentName = cpyParentName;
	}

	public String getIsValid() {
		return isValid;
	}

	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}

	public String getIsValidText() {
		return isValidText;
	}

	public void setIsValidText(String isValidText) {
		this.isValidText = isValidText;
	}

	public String getSlaveCpyName() {
		return slaveCpyName;
	}

	public void setSlaveCpyName(String slaveCpyName) {
		this.slaveCpyName = slaveCpyName;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getTradeType() {
		return tradeType;
	}

	public void setTradeType(String tradeType) {
		this.tradeType = tradeType;
	}

	public String getTradeTypeText() {
		return tradeTypeText;
	}

	public void setTradeTypeText(String tradeTypeText) {
		this.tradeTypeText = tradeTypeText;
	}

	public String getPayRule() {
		return payRule;
	}

	public void setPayRule(String payRule) {
		this.payRule = payRule;
	}

	public String getPayRuleText() {
		return payRuleText;
	}

	public void setPayRuleText(String payRuleText) {
		this.payRuleText = payRuleText;
	}

	public String getSavingAccountId() {
		return savingAccountId;
	}

	public void setSavingAccountId(String savingAccountId) {
		this.savingAccountId = savingAccountId;
	}

}
