package com.wanma.model.cdzts;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.wanma.support.common.BasicListAndMutiFile;

/**
 * 
 * tbl_PowerStation表
 * 
 * @author mew
 * 
 */
public class PowerstationPush  extends BasicListAndMutiFile implements Serializable {
	private static final long serialVersionUID = -4836112095380907102L;
	private java.lang.Integer pkPowerstation; // 主键
	private java.lang.String postName; // 充电点名称
	private java.lang.String postPic; // 充电点图片
	private java.lang.String postDetailpic; // 充电点详情图片
	private java.lang.String postAddress; // 地址
	private java.math.BigDecimal postLongitude; // 经度
	private java.math.BigDecimal postLatitude; // 纬度
	private java.lang.String postPhone; // 联系电话
	private java.lang.Integer postStatus; // 充电点状态（0草稿，5提交审核，3已驳回，10离线，15上线）
	private java.lang.String  postOwnProvinceCode;//所属省份code
	private java.lang.String  postOwnCityCode;//所属城市code
	private java.lang.String  postOwnCountyCode;//所属地区代码code
	private java.lang.Integer postAreacode; // 充电点所属区域代码，根据省、市、区代码表关联
	private java.util.Date postCreatedate; // 创建时间
	private java.util.Date postUpdatedate; // 修改时间
	private java.lang.String postRemark; // 备注
	private java.lang.Integer postPoweruser; // 电桩用途
	private java.lang.String rejectionReason; // 驳回原因
	private Integer chargingMode; //充电点的电桩充电模式
	private Integer elpiPowerinterface; // 电桩接口方式，配置参数内容的ID（国标、欧标、美标）7国标，19美标，20欧标
    private java.lang.String poStOnlineTime; // 开放时间
    private String creator;//所属用户
    private String creatorId;//电站创建人
    private String parkFree;//停车费
	// 页面搜索用，不以数据库对应
	private String electricPrices;// 价格(APP电桩查找列表模式，价格排序) 1-默认模式 2-按照最优排序
	private String electricEvaluate;// 评价(APP电桩查找列表模式，评价排序) 1-默认模式 2-按照最优排序
	private String screenRadius;// //距离(APP电桩查找列表模式，搜索半径) 单位m
	private String powerState;// 充电点状态
	private String powerStationSum;// 充电点电桩数量
	private String searchName; // 检索名称
	private int pkUserinfo;// 用户id
	private int isCollect;// 是否收藏 0未收藏 大于0收藏
	private int electricPilepileCount;// 桩体总数
	private Date startDate;// 开始时间
	private Date endDate;// 结束时间
	private int electricPileCount;//电桩总数
	private String distance;
	private String screenType; //3电动车 4电动自行车 13多功能
	private List<String> postPicUrl;
	private Integer org;//第三方标识
	private Integer rateId;
	private BigDecimal currentRate;
	private String poStLatitude;// 经度
	private String poStLongitude;// 纬度
	
	


	public String getPoStLatitude() {
		return poStLatitude;
	}

	public void setPoStLatitude(String poStLatitude) {
		this.poStLatitude = poStLatitude;
	}

	public String getPoStLongitude() {
		return poStLongitude;
	}

	public void setPoStLongitude(String poStLongitude) {
		this.poStLongitude = poStLongitude;
	}

	public BigDecimal getCurrentRate() {
		return currentRate;
	}

	public void setCurrentRate(BigDecimal currentRate) {
		this.currentRate = currentRate;
	}

	public Integer getRateId() {
		return rateId;
	}

	public void setRateId(Integer rateId) {
		this.rateId = rateId;
	}

	public Integer getOrg() {
		return org;
	}

	public void setOrg(Integer org) {
		this.org = org;
	}

	public java.lang.String getPostOwnProvinceCode() {
		return postOwnProvinceCode;
	}

	public void setPostOwnProvinceCode(java.lang.String postOwnProvinceCode) {
		this.postOwnProvinceCode = postOwnProvinceCode;
	}

	public java.lang.String getPostOwnCityCode() {
		return postOwnCityCode;
	}

	public void setPostOwnCityCode(java.lang.String postOwnCityCode) {
		this.postOwnCityCode = postOwnCityCode;
	}

	public java.lang.String getPostOwnCountyCode() {
		return postOwnCountyCode;
	}

	public void setPostOwnCountyCode(java.lang.String postOwnCountyCode) {
		this.postOwnCountyCode = postOwnCountyCode;
	}

	private String userLevel;
	
	
	public String getScreenType() {
		return screenType;
	}

	public void setScreenType(String screenType) {
		this.screenType = screenType;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	/**
	 * 获取主键属性
	 * 
	 * @return pkPowerstation
	 */
	public java.lang.Integer getPkPowerstation() {
		return pkPowerstation;
	}

	/**
	 * 设置主键属性
	 * 
	 * @param pkPowerstation
	 */
	public void setPkPowerstation(java.lang.Integer pkPowerstation) {
		this.pkPowerstation = pkPowerstation;
	}

	public java.lang.String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(java.lang.String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	/**
	 * 获取充电点名称属性
	 * 
	 * @return postName
	 */
	public java.lang.String getPostName() {
		return postName;
	}

	/**
	 * 设置充电点名称属性
	 * 
	 * @param postName
	 */
	public void setPostName(java.lang.String postName) {
		this.postName = postName;
	}

	/**
	 * 获取充电点图片属性
	 * 
	 * @return postPic
	 */
	public java.lang.String getPostPic() {
		return postPic;
	}

	/**
	 * 设置充电点图片属性
	 * 
	 * @param postPic
	 */
	public void setPostPic(java.lang.String postPic) {
		this.postPic = postPic;
	}

	/**
	 * 获取充电点详情图片属性
	 * 
	 * @return postDetailpic
	 */
	public java.lang.String getPostDetailpic() {
		return postDetailpic;
	}

	/**
	 * 设置充电点详情图片属性
	 * 
	 * @param postDetailpic
	 */
	public void setPostDetailpic(java.lang.String postDetailpic) {
		this.postDetailpic = postDetailpic;
	}

	/**
	 * 获取地址属性
	 * 
	 * @return postAddress
	 */
	public java.lang.String getPostAddress() {
		return postAddress;
	}

	/**
	 * 设置地址属性
	 * 
	 * @param postAddress
	 */
	public void setPostAddress(java.lang.String postAddress) {
		this.postAddress = postAddress;
	}

	/**
	 * 获取经度属性
	 * 
	 * @return postLongitude
	 */
	public java.math.BigDecimal getPostLongitude() {
		return postLongitude;
	}

	/**
	 * 设置经度属性
	 * 
	 * @param postLongitude
	 */
	public void setPostLongitude(java.math.BigDecimal postLongitude) {
		this.postLongitude = postLongitude;
	}

	/**
	 * 获取纬度属性
	 * 
	 * @return postLatitude
	 */
	public java.math.BigDecimal getPostLatitude() {
		return postLatitude;
	}

	/**
	 * 设置纬度属性
	 * 
	 * @param postLatitude
	 */
	public void setPostLatitude(java.math.BigDecimal postLatitude) {
		this.postLatitude = postLatitude;
	}

	/**
	 * 获取联系电话属性
	 * 
	 * @return postPhone
	 */
	public java.lang.String getPostPhone() {
		return postPhone;
	}

	/**
	 * 设置联系电话属性
	 * 
	 * @param postPhone
	 */
	public void setPostPhone(java.lang.String postPhone) {
		this.postPhone = postPhone;
	}

	/**
	 * 获取充电点状态（0草稿，5提交审核，3已驳回，10离线，15上线）属性
	 * 
	 * @return postStatus
	 */
	public java.lang.Integer getPostStatus() {
		return postStatus;
	}

	/**
	 * 设置充电点状态（0草稿，5提交审核，3已驳回，10离线，15上线）属性
	 * 
	 * @param postStatus
	 */
	public void setPostStatus(java.lang.Integer postStatus) {
		this.postStatus = postStatus;
	}

	/**
	 * 获取充电点所属区域代码，根据省、市、区代码表关联属性
	 * 
	 * @return postAreacode
	 */
	public java.lang.Integer getPostAreacode() {
		return postAreacode;
	}

	/**
	 * 设置充电点所属区域代码，根据省、市、区代码表关联属性
	 * 
	 * @param postAreacode
	 */
	public void setPostAreacode(java.lang.Integer postAreacode) {
		this.postAreacode = postAreacode;
	}

	/**
	 * 获取创建时间属性
	 * 
	 * @return postCreatedate
	 */
	public java.util.Date getPostCreatedate() {
		return postCreatedate;
	}

	/**
	 * 设置创建时间属性
	 * 
	 * @param postCreatedate
	 */
	public void setPostCreatedate(java.util.Date postCreatedate) {
		this.postCreatedate = postCreatedate;
	}

	/**
	 * 获取修改时间属性
	 * 
	 * @return postUpdatedate
	 */
	public java.util.Date getPostUpdatedate() {
		return postUpdatedate;
	}

	/**
	 * 设置修改时间属性
	 * 
	 * @param postUpdatedate
	 */
	public void setPostUpdatedate(java.util.Date postUpdatedate) {
		this.postUpdatedate = postUpdatedate;
	}

	/**
	 * 获取备注属性
	 * 
	 * @return postRemark
	 */
	public java.lang.String getPostRemark() {
		return postRemark;
	}

	/**
	 * 设置备注属性
	 * 
	 * @param postRemark
	 */
	public void setPostRemark(java.lang.String postRemark) {
		this.postRemark = postRemark;
	}

	/**
	 * 获取电桩用途属性
	 * 
	 * @return postPoweruser
	 */
	public java.lang.Integer getPostPoweruser() {
		return postPoweruser;
	}

	/**
	 * 设置电桩用途属性
	 * 
	 * @param postPoweruser
	 */
	public void setPostPoweruser(java.lang.Integer postPoweruser) {
		this.postPoweruser = postPoweruser;
	}

	public String getElectricPrices() {
		return electricPrices;
	}

	public void setElectricPrices(String electricPrices) {
		this.electricPrices = electricPrices;
	}

	public String getElectricEvaluate() {
		return electricEvaluate;
	}

	public void setElectricEvaluate(String electricEvaluate) {
		this.electricEvaluate = electricEvaluate;
	}

	public String getScreenRadius() {
		return screenRadius;
	}

	public void setScreenRadius(String screenRadius) {
		this.screenRadius = screenRadius;
	}

	public String getPowerState() {
		return powerState;
	}

	public void setPowerState(String powerState) {
		this.powerState = powerState;
	}

	public String getPowerStationSum() {
		return powerStationSum;
	}

	public void setPowerStationSum(String powerStationSum) {
		this.powerStationSum = powerStationSum;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	public int getPkUserinfo() {
		return pkUserinfo;
	}

	public void setPkUserinfo(int pkUserinfo) {
		this.pkUserinfo = pkUserinfo;
	}

	public int getIsCollect() {
		return isCollect;
	}

	public void setIsCollect(int isCollect) {
		this.isCollect = isCollect;
	}

	public int getElectricPilepileCount() {
		return electricPilepileCount;
	}

	public void setElectricPilepileCount(int electricPilepileCount) {
		this.electricPilepileCount = electricPilepileCount;
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

	public Integer getChargingMode() {
		return chargingMode;
	}

	public void setChargingMode(Integer chargingMode) {
		this.chargingMode = chargingMode;
	}

	public Integer getElpiPowerinterface() {
		return elpiPowerinterface;
	}

	public void setElpiPowerinterface(Integer elpiPowerinterface) {
		this.elpiPowerinterface = elpiPowerinterface;
	}
	
	public int getElectricPileCount() {
		return electricPileCount;
	}

	public void setElectricPileCount(int electricPileCount) {
		this.electricPileCount = electricPileCount;
	}

	public java.lang.String getPoStOnlineTime() {
		return poStOnlineTime;
	}

	public void setPoStOnlineTime(java.lang.String poStOnlineTime) {
		this.poStOnlineTime = poStOnlineTime;
	}
	
	

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public String getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	

	public List<String> getPostPicUrl() {
		return postPicUrl;
	}

	public void setPostPicUrl(List<String> postPicUrl) {
		this.postPicUrl = postPicUrl;
	}
	
	
	public String getParkFree() {
		return parkFree;
	}

	public void setParkFree(String parkFree) {
		this.parkFree = parkFree;
	}

	@Override
	public String toString() {
		return "PowerstationPush [pkPowerstation=" + pkPowerstation
				+ ", postName=" + postName + ", postPic=" + postPic
				+ ", postDetailpic=" + postDetailpic + ", postAddress="
				+ postAddress + ", postLongitude=" + postLongitude
				+ ", postLatitude=" + postLatitude + ", postPhone=" + postPhone
				+ ", postStatus=" + postStatus + ", postOwnProvinceCode="
				+ postOwnProvinceCode + ", postOwnCityCode=" + postOwnCityCode
				+ ", postOwnCountyCode=" + postOwnCountyCode
				+ ", postAreacode=" + postAreacode + ", postCreatedate="
				+ postCreatedate + ", postUpdatedate=" + postUpdatedate
				+ ", postRemark=" + postRemark + ", postPoweruser="
				+ postPoweruser + ", rejectionReason=" + rejectionReason
				+ ", chargingMode=" + chargingMode + ", elpiPowerinterface="
				+ elpiPowerinterface + ", poStOnlineTime=" + poStOnlineTime
				+ ", creator=" + creator + ", creatorId=" + creatorId
				+ ", parkFree=" + parkFree + ", electricPrices="
				+ electricPrices + ", electricEvaluate=" + electricEvaluate
				+ ", screenRadius=" + screenRadius + ", powerState="
				+ powerState + ", powerStationSum=" + powerStationSum
				+ ", searchName=" + searchName + ", pkUserinfo=" + pkUserinfo
				+ ", isCollect=" + isCollect + ", electricPilepileCount="
				+ electricPilepileCount + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", electricPileCount="
				+ electricPileCount + ", distance=" + distance
				+ ", screenType=" + screenType + ", postPicUrl=" + postPicUrl
				+ ", org=" + org + ", rateId=" + rateId + ", currentRate="
				+ currentRate + ", poStLatitude=" + poStLatitude
				+ ", poStLongitude=" + poStLongitude + ", userLevel="
				+ userLevel + "]";
	}

	/*@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append("TblPowerstation");
		sb.append("{pkPowerstation=").append(pkPowerstation);
		sb.append(", postName=").append(postName);
		sb.append(", postPic=").append(postPic);
		sb.append(", postDetailpic=").append(postDetailpic);
		sb.append(", postAddress=").append(postAddress);
		sb.append(", postLongitude=").append(postLongitude);
		sb.append(", postLatitude=").append(postLatitude);
		sb.append(", postPhone=").append(postPhone);
		sb.append(", postStatus=").append(postStatus);
		sb.append(", postAreacode=").append(postAreacode);
		sb.append(", postCreatedate=").append(postCreatedate);
		sb.append(", postUpdatedate=").append(postUpdatedate);
		sb.append(", postRemark=").append(postRemark);
		sb.append(", postPoweruser=").append(postPoweruser);
		sb.append(", creator=").append(creator);
		sb.append(", creatorId=").append(creatorId);
		sb.append(", parkFree=").append(parkFree);
		sb.append(", postOwnProvinceCode=").append(postOwnProvinceCode);
		sb.append(", postOwnCityCode=").append(postOwnCityCode);
		sb.append(", postOwnCountyCode=").append(postOwnCountyCode);
		sb.append('}');
		return sb.toString();
	}*/
	
}