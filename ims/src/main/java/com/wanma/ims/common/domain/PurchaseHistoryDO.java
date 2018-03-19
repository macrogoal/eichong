package com.wanma.ims.common.domain;

import java.util.Date;

import com.wanma.ims.common.domain.base.BasicModel;

/**
 * 消费记录
 * 
 * @author bingo
 * @date 2017-07-28
 */
public class PurchaseHistoryDO extends BasicModel {

	private static final long serialVersionUID = 1384931387908633816L;

	/** 消费记录主键 */
	private Long pkPurchaseHistory;

	/** 1-充电消费（预冻结） 2-充电消费退款 3-充值 4-充值退款 5-停车费 6-停车费退款 7-发票快递费 8-发票快递费退款 9-信用还款 10-信用还款退款 11-溢缴款 12-溢缴款领回 */
	private Integer puHiType;

	/** 消费时间 */
	private Date puHiPurchaseHistoryTime;

	/** 金额（元） */
	private Double puHiMonetary;

	/** 消费备注 */
	private String puHiConsumerRemark;

	/** 创建时间 */
	private Date puHiCreatedate;

	/** 修改时间 */
	private Date puHiUpdatedate;

	/** 收益内容 */
	private String puHiPurchaseContent;

	/** 用户ID */
	private Long puHiUserId;

	/** 充值类型，1-支付宝充值，2-微信充值，3-银联充值，4-充电卡现金充值 ，5-换卡转账 6-7月活动送 */
	private Integer puHiChargeType;

	/** 用户来源 1:富士康; 2:吉利; 3:绿地; 4:浙誉; 5:车纷享; 以后根据情况再扩展或修改 */
	private Integer puHiUserOrigin;

	/** 桩体编号 */
	private String puHiElectricPileCode;

	/** 卡号 */
	private String puHiExternalCardNumber;

	/** 充电交易流水号 */
	private String puHiTransactionNumber;

	/** 预约订单编号 */
	private String puHiBespokeNumber;

	/** 充值订单编号 */
	private String puHiPaymentNumber;

	/** 开票状态：0：未开票 1：已提交 2.已开票 */
	private Integer puhiInvoiceStatus;

	/** 发票主键 */
	private Long pkInvoice;

	/** 资金账户主键 */
	private Long accountId;

	private String chOrCode;// 订单编号
	private String accountNO;// 资金账户号
	private Integer tradeType;// 结算方式 1.后付费 2.预付费
	private String billAccountCode;// 账单科目编码
	private String billAccountName;// 账单科目名称

	private String puHiTypeName; // 消费类型名称
	private String puHiChargeTypeName; // 充值类型名称
	private String puHiUserOriginName; // 用户来源名称
	private String puhiInvoiceStatusName;// 开票状态名称
	private String tradeTypeName;

	private String startGmtCreate;
	private String endGmtCreate;

	private String userAccount;// 用户帐号
	private String flag;

	public Long getPkPurchaseHistory() {
		return pkPurchaseHistory;
	}

	public void setPkPurchaseHistory(Long pkPurchaseHistory) {
		this.pkPurchaseHistory = pkPurchaseHistory;
	}

	public Integer getPuHiType() {
		return puHiType;
	}

	public void setPuHiType(Integer puHiType) {
		this.puHiType = puHiType;
	}

	public Date getPuHiPurchaseHistoryTime() {
		return puHiPurchaseHistoryTime;
	}

	public void setPuHiPurchaseHistoryTime(Date puHiPurchaseHistoryTime) {
		this.puHiPurchaseHistoryTime = puHiPurchaseHistoryTime;
	}

	public Double getPuHiMonetary() {
		return puHiMonetary;
	}

	public void setPuHiMonetary(Double puHiMonetary) {
		this.puHiMonetary = puHiMonetary;
	}

	public String getPuHiConsumerRemark() {
		return puHiConsumerRemark;
	}

	public void setPuHiConsumerRemark(String puHiConsumerRemark) {
		this.puHiConsumerRemark = puHiConsumerRemark;
	}

	public Date getPuHiCreatedate() {
		return puHiCreatedate;
	}

	public void setPuHiCreatedate(Date puHiCreatedate) {
		this.puHiCreatedate = puHiCreatedate;
	}

	public Date getPuHiUpdatedate() {
		return puHiUpdatedate;
	}

	public void setPuHiUpdatedate(Date puHiUpdatedate) {
		this.puHiUpdatedate = puHiUpdatedate;
	}

	public String getPuHiPurchaseContent() {
		return puHiPurchaseContent;
	}

	public void setPuHiPurchaseContent(String puHiPurchaseContent) {
		this.puHiPurchaseContent = puHiPurchaseContent;
	}

	public Long getPuHiUserId() {
		return puHiUserId;
	}

	public void setPuHiUserId(Long puHiUserId) {
		this.puHiUserId = puHiUserId;
	}

	public Integer getPuHiChargeType() {
		return puHiChargeType;
	}

	public void setPuHiChargeType(Integer puHiChargeType) {
		this.puHiChargeType = puHiChargeType;
	}

	public Integer getPuHiUserOrigin() {
		return puHiUserOrigin;
	}

	public void setPuHiUserOrigin(Integer puHiUserOrigin) {
		this.puHiUserOrigin = puHiUserOrigin;
	}

	public String getPuHiElectricPileCode() {
		return puHiElectricPileCode;
	}

	public void setPuHiElectricPileCode(String puHiElectricPileCode) {
		this.puHiElectricPileCode = puHiElectricPileCode;
	}

	public String getPuHiExternalCardNumber() {
		return puHiExternalCardNumber;
	}

	public void setPuHiExternalCardNumber(String puHiExternalCardNumber) {
		this.puHiExternalCardNumber = puHiExternalCardNumber;
	}

	public String getPuHiTransactionNumber() {
		return puHiTransactionNumber;
	}

	public void setPuHiTransactionNumber(String puHiTransactionNumber) {
		this.puHiTransactionNumber = puHiTransactionNumber;
	}

	public String getPuHiBespokeNumber() {
		return puHiBespokeNumber;
	}

	public void setPuHiBespokeNumber(String puHiBespokeNumber) {
		this.puHiBespokeNumber = puHiBespokeNumber;
	}

	public String getPuHiPaymentNumber() {
		return puHiPaymentNumber;
	}

	public void setPuHiPaymentNumber(String puHiPaymentNumber) {
		this.puHiPaymentNumber = puHiPaymentNumber;
	}

	public Integer getPuhiInvoiceStatus() {
		return puhiInvoiceStatus;
	}

	public void setPuhiInvoiceStatus(Integer puhiInvoiceStatus) {
		this.puhiInvoiceStatus = puhiInvoiceStatus;
	}

	public Long getPkInvoice() {
		return pkInvoice;
	}

	public void setPkInvoice(Long pkInvoice) {
		this.pkInvoice = pkInvoice;
	}

	public String getChOrCode() {
		return chOrCode;
	}

	public void setChOrCode(String chOrCode) {
		this.chOrCode = chOrCode;
	}

	public String getAccountNO() {
		return accountNO;
	}

	public void setAccountNO(String accountNO) {
		this.accountNO = accountNO;
	}

	public Integer getTradeType() {
		return tradeType;
	}

	public void setTradeType(Integer tradeType) {
		this.tradeType = tradeType;
	}

	public String getBillAccountCode() {
		return billAccountCode;
	}

	public void setBillAccountCode(String billAccountCode) {
		this.billAccountCode = billAccountCode;
	}

	public String getBillAccountName() {
		return billAccountName;
	}

	public void setBillAccountName(String billAccountName) {
		this.billAccountName = billAccountName;
	}

	public String getPuHiTypeName() {
		return puHiTypeName;
	}

	public void setPuHiTypeName(String puHiTypeName) {
		this.puHiTypeName = puHiTypeName;
	}

	public String getPuHiChargeTypeName() {
		return puHiChargeTypeName;
	}

	public void setPuHiChargeTypeName(String puHiChargeTypeName) {
		this.puHiChargeTypeName = puHiChargeTypeName;
	}

	public String getPuHiUserOriginName() {
		return puHiUserOriginName;
	}

	public void setPuHiUserOriginName(String puHiUserOriginName) {
		this.puHiUserOriginName = puHiUserOriginName;
	}

	public String getPuhiInvoiceStatusName() {
		return puhiInvoiceStatusName;
	}

	public void setPuhiInvoiceStatusName(String puhiInvoiceStatusName) {
		this.puhiInvoiceStatusName = puhiInvoiceStatusName;
	}

	public String getTradeTypeName() {
		return tradeTypeName;
	}

	public void setTradeTypeName(String tradeTypeName) {
		this.tradeTypeName = tradeTypeName;
	}

	public String getStartGmtCreate() {
		return startGmtCreate;
	}

	public void setStartGmtCreate(String startGmtCreate) {
		this.startGmtCreate = startGmtCreate;
	}

	public String getEndGmtCreate() {
		return endGmtCreate;
	}

	public void setEndGmtCreate(String endGmtCreate) {
		this.endGmtCreate = endGmtCreate;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

}
