package com.wanma.ims.common.domain;

import java.util.Date;
import java.util.List;

import com.wanma.ims.common.domain.base.BasicModel;

public class OrderDO extends BasicModel {

	/**
	 * 充电订单实体类
	 */
	private static final long serialVersionUID = 8351456889341682315L;
	private Long orderId; // 订单主键
	private String orderCode; // 订单编码
	private String electricPileCode; // 桩体编号
	private Integer electricPileHeadNo; // 枪口编号
	private String powerstationName; // 充电点名称
	private Long userId; // 用户ID
	private String userAccount; // 用户账号
	private Long cpyNumber; // 公司标识
	private String totalElectricCharge; // 总电量
	private String totalElectricMoney; // 总充电费用
	private String totalServiceMoney; // 总服务费
	private String totalfavMoney; // 总优惠
	private String startChargeTime; // 充电开始时间
	private String endChargeTime; // 充电结束时间
	private String chargeTime; // 充电时长
	private Integer startSoc; // 开始SOC
	private Integer endSoc; // 结束SOC
	private Integer orderStatus; // 订单状态 1：待支付 ,2：支付成功 ,3: 完成操作
	private String cardNum; // 卡号
	private Date gmtCreate; // 创建时间
	private Date gmtModified; // 修改时间
	private String timeQuantum; // 时间段
	private String JMoney; // 尖费用
	private String FMoney; // 峰费用
	private String PMoney; // 平费用
	private String GMoney; // 谷费用
	private String JPower; // 尖电量
	private String FPower; // 峰电量
	private String PPower; // 平电量
	private String GPower; // 谷电量
	private String JServiceMoney; // 尖服务费
	private String FServiceMoney; // 峰服务费
	private String PServiceMoney; // 平服务费
	private String GServiceMoney; // 谷服务费
	private String vinCode; // VIN
	private String carNo; // 车牌号
	private Long accountId; // 资金账号
	private String accountNo; // 资金账号
	private String favMoney; // 优惠后电费
	private String favServiceMoney; // 优惠后服务费
	private String totalMoney; // 订单费用
	private String pileHeadNum; // 枪口号

	private String startGmtCreate; // 开始创建时间
	private String endGmtCreate; // 开始创建时间
	private Integer invoiceStatus; // 发票状态
	private List<String> transNumbers;
	private List<Integer> cpyNumberList;

	private Double chOrMoeny;// 充电金额
	private Long electricPileId;// 桩Id
	private String transactionNumber; // 交易流水号
	private String frozenAmt; // 预冻结金额
	private Long pkChargingRecord;

	private String provinceId;// 省ID
	private String cityId;// 市ID
	private Long powerStationId;// 电站ID
	private Long tagId; // 标签ID

	private Long slaveCpyId;
	private String cpyName;
	private String provinceCode;
	private String cityCode;
	private String areaCode;
	private Integer orgNo;// 组织机构编号
	private Integer pkCoupon;// 优惠券主键

	private String normPlateNum;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getElectricPileCode() {
		return electricPileCode;
	}

	public void setElectricPileCode(String electricPileCode) {
		this.electricPileCode = electricPileCode;
	}

	public Integer getElectricPileHeadNo() {
		return electricPileHeadNo;
	}

	public void setElectricPileHeadNo(Integer electricPileHeadNo) {
		this.electricPileHeadNo = electricPileHeadNo;
	}

	public String getPowerstationName() {
		return powerstationName;
	}

	public void setPowerstationName(String powerstationName) {
		this.powerstationName = powerstationName;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public Long getCpyNumber() {
		return cpyNumber;
	}

	public void setCpyNumber(Long cpyNumber) {
		this.cpyNumber = cpyNumber;
	}

	public String getTotalElectricCharge() {
		return totalElectricCharge;
	}

	public void setTotalElectricCharge(String totalElectricCharge) {
		this.totalElectricCharge = totalElectricCharge;
	}

	public String getTotalElectricMoney() {
		return totalElectricMoney;
	}

	public void setTotalElectricMoney(String totalElectricMoney) {
		this.totalElectricMoney = totalElectricMoney;
	}

	public String getTotalServiceMoney() {
		return totalServiceMoney;
	}

	public void setTotalServiceMoney(String totalServiceMoney) {
		this.totalServiceMoney = totalServiceMoney;
	}

	public String getTotalfavMoney() {
		return totalfavMoney;
	}

	public void setTotalfavMoney(String totalfavMoney) {
		this.totalfavMoney = totalfavMoney;
	}

	public String getStartChargeTime() {
		return startChargeTime;
	}

	public void setStartChargeTime(String startChargeTime) {
		this.startChargeTime = startChargeTime;
	}

	public String getEndChargeTime() {
		return endChargeTime;
	}

	public void setEndChargeTime(String endChargeTime) {
		this.endChargeTime = endChargeTime;
	}

	public String getChargeTime() {
		return chargeTime;
	}

	public void setChargeTime(String chargeTime) {
		this.chargeTime = chargeTime;
	}

	public Integer getStartSoc() {
		return startSoc;
	}

	public void setStartSoc(Integer startSoc) {
		this.startSoc = startSoc;
	}

	public Integer getEndSoc() {
		return endSoc;
	}

	public void setEndSoc(Integer endSoc) {
		this.endSoc = endSoc;
	}

	public Integer getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(Integer orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getCardNum() {
		return cardNum;
	}

	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public Date getGmtModified() {
		return gmtModified;
	}

	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}

	public String getTimeQuantum() {
		return timeQuantum;
	}

	public void setTimeQuantum(String timeQuantum) {
		this.timeQuantum = timeQuantum;
	}

	public String getJMoney() {
		return JMoney;
	}

	public void setJMoney(String jMoney) {
		JMoney = jMoney;
	}

	public String getFMoney() {
		return FMoney;
	}

	public void setFMoney(String fMoney) {
		FMoney = fMoney;
	}

	public String getPMoney() {
		return PMoney;
	}

	public void setPMoney(String pMoney) {
		PMoney = pMoney;
	}

	public String getGMoney() {
		return GMoney;
	}

	public void setGMoney(String gMoney) {
		GMoney = gMoney;
	}

	public String getJServiceMoney() {
		return JServiceMoney;
	}

	public void setJServiceMoney(String jServiceMoney) {
		JServiceMoney = jServiceMoney;
	}

	public String getFServiceMoney() {
		return FServiceMoney;
	}

	public void setFServiceMoney(String fServiceMoney) {
		FServiceMoney = fServiceMoney;
	}

	public String getPServiceMoney() {
		return PServiceMoney;
	}

	public void setPServiceMoney(String pServiceMoney) {
		PServiceMoney = pServiceMoney;
	}

	public String getGServiceMoney() {
		return GServiceMoney;
	}

	public void setGServiceMoney(String gServiceMoney) {
		GServiceMoney = gServiceMoney;
	}

	public String getVinCode() {
		return vinCode;
	}

	public void setVinCode(String vinCode) {
		this.vinCode = vinCode;
	}

	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getFavMoney() {
		return favMoney;
	}

	public void setFavMoney(String favMoney) {
		this.favMoney = favMoney;
	}

	public String getFavServiceMoney() {
		return favServiceMoney;
	}

	public void setFavServiceMoney(String favServiceMoney) {
		this.favServiceMoney = favServiceMoney;
	}

	public String getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(String totalMoney) {
		this.totalMoney = totalMoney;
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

	public Integer getInvoiceStatus() {
		return invoiceStatus;
	}

	public void setInvoiceStatus(Integer invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	public List<String> getTransNumbers() {
		return transNumbers;
	}

	public void setTransNumbers(List<String> transNumbers) {
		this.transNumbers = transNumbers;
	}

	public List<Integer> getCpyNumberList() {
		return cpyNumberList;
	}

	public void setCpyNumberList(List<Integer> cpyNumberList) {
		this.cpyNumberList = cpyNumberList;
	}

	public Double getChOrMoeny() {
		return chOrMoeny;
	}

	public void setChOrMoeny(Double chOrMoeny) {
		this.chOrMoeny = chOrMoeny;
	}

	public Long getElectricPileId() {
		return electricPileId;
	}

	public void setElectricPileId(Long electricPileId) {
		this.electricPileId = electricPileId;
	}

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
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

	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}

	public Long getSlaveCpyId() {
		return slaveCpyId;
	}

	public void setSlaveCpyId(Long slaveCpyId) {
		this.slaveCpyId = slaveCpyId;
	}

	public String getCpyName() {
		return cpyName;
	}

	public void setCpyName(String cpyName) {
		this.cpyName = cpyName;
	}

	public String getProvinceCode() {
		return provinceCode;
	}

	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public Integer getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(Integer orgNo) {
		this.orgNo = orgNo;
	}

	public Integer getPkCoupon() {
		return pkCoupon;
	}

	public void setPkCoupon(Integer pkCoupon) {
		this.pkCoupon = pkCoupon;
	}

	public String getJPower() {
		return JPower;
	}

	public void setJPower(String jPower) {
		JPower = jPower;
	}

	public String getFPower() {
		return FPower;
	}

	public void setFPower(String fPower) {
		FPower = fPower;
	}

	public String getPPower() {
		return PPower;
	}

	public void setPPower(String pPower) {
		PPower = pPower;
	}

	public String getGPower() {
		return GPower;
	}

	public void setGPower(String gPower) {
		GPower = gPower;
	}

	public String getPileHeadNum() {
		return pileHeadNum;
	}

	public void setPileHeadNum(String pileHeadNum) {
		this.pileHeadNum = pileHeadNum;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getFrozenAmt() {
		return frozenAmt;
	}

	public void setFrozenAmt(String frozenAmt) {
		this.frozenAmt = frozenAmt;
	}

	public Long getPkChargingRecord() {
		return pkChargingRecord;
	}

	public void setPkChargingRecord(Long pkChargingRecord) {
		this.pkChargingRecord = pkChargingRecord;
	}

	public String getNormPlateNum() {
		return normPlateNum;
	}

	public void setNormPlateNum(String normPlateNum) {
		this.normPlateNum = normPlateNum;
	}

}
