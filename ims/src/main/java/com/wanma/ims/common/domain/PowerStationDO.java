package com.wanma.ims.common.domain;

import java.util.List;

import com.wanma.ims.common.domain.base.BasicModel;

public class PowerStationDO extends BasicModel {

	/**
	 * 充电点DO
	 */
	private static final long serialVersionUID = -2999381832772235743L;

	private Long powerstationId; // 主键

	private String powerstationName; // 名称

	private String provinceCode; // 省

	private String provinceName;

	private String cityCode; // 市

	private String cityName;

	private String areaCode; // 区

	private String areaName;

	private String address; // 地址

	private Double longitude; // 经度

	private Double latitude; // 纬度

	private String phone; // 联系电话

	private Long rateInfoId; // 默认费率

	private String parkingFee; // 停车费

	private String onlineTime; // 开放时间<一段文本,APP展示>

	private Long electricPileNum; // 充电桩总数

	private List<String> picImgList; // 充电点图片集合

	private List<Long> ids; // 当前登录人拥有的充电点权限
	private Long selectedElectricPileNum; // 充电范围 已选电桩数
	// 以下为在获取充电范围树时使用的字段
	private String name;// 树节点名
	private Boolean isSelected;// 是否被勾选

	private List<ElectricPileDO> list;// 子节点集合
	private Long id;

	public Long getPowerstationId() {
		return powerstationId;
	}

	public void setPowerstationId(Long powerstationId) {
		this.powerstationId = powerstationId;
	}

	public String getPowerstationName() {
		return powerstationName;
	}

	public void setPowerstationName(String powerstationName) {
		this.powerstationName = powerstationName;
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

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getRateInfoId() {
		return rateInfoId;
	}

	public void setRateInfoId(Long rateInfoId) {
		this.rateInfoId = rateInfoId;
	}

	public String getParkingFee() {
		return parkingFee;
	}

	public void setParkingFee(String parkingFee) {
		this.parkingFee = parkingFee;
	}

	public String getOnlineTime() {
		return onlineTime;
	}

	public void setOnlineTime(String onlineTime) {
		this.onlineTime = onlineTime;
	}

	public Long getElectricPileNum() {
		return electricPileNum;
	}

	public void setElectricPileNum(Long electricPileNum) {
		this.electricPileNum = electricPileNum;
	}

	public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	public Long getSelectedElectricPileNum() {
		return selectedElectricPileNum;
	}

	public void setSelectedElectricPileNum(Long selectedElectricPileNum) {
		this.selectedElectricPileNum = selectedElectricPileNum;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsSelected() {
		return isSelected;
	}

	public void setIsSelected(Boolean isSelected) {
		this.isSelected = isSelected;
	}

	public List<ElectricPileDO> getList() {
		return list;
	}

	public void setList(List<ElectricPileDO> list) {
		this.list = list;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<String> getPicImgList() {
		return picImgList;
	}

	public void setPicImgList(List<String> picImgList) {
		this.picImgList = picImgList;
	}

}
