package com.wanma.ims.common.domain;

import com.wanma.ims.common.domain.base.BasicModel;

/**
 * 申请卡实体类
 */
public class CardApplicationFormDO extends BasicModel {
    /**
	 * 
	 */
	private static final long serialVersionUID = 919550001172357944L;

	private Long id;//申请表ID

    private Long userId;//用户主表ID

    private String phone;//联系电话

    private String realName;//联系人姓名

    private String address;//地址

    private String email;//用户邮箱

    private String idCard;//用户身份证号

    private Integer sex;//用户性别 (1:男 2：女)

    private String birthday;//用户生日

    private Long carCompanyId;//用户汽车品牌ID

    private Long carTypeId;//用户汽车车型ID

    private String vehicleNumber;//车架号

    private String plateNum;//车牌号

    private String userCard;//充电卡号

    private Integer status;//状态 0：申请中，1：申请成功 , 2:申请失败


    //以下为非持久化字段
    private String userAccount;//用户账号

    private String cpyName;//渠道名

    private Integer cpyNumber;//公司标识

    private String applicationStartTime;//申请开始时间

    private String applicationEndTime;//申请结束时间

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Long getCarCompanyId() {
        return carCompanyId;
    }

    public void setCarCompanyId(Long carCompanyId) {
        this.carCompanyId = carCompanyId;
    }

    public Long getCarTypeId() {
        return carTypeId;
    }

    public void setCarTypeId(Long carTypeId) {
        this.carTypeId = carTypeId;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum;
    }

    public String getUserCard() {
        return userCard;
    }

    public void setUserCard(String userCard) {
        this.userCard = userCard;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getCpyName() {
        return cpyName;
    }

    public void setCpyName(String cpyName) {
        this.cpyName = cpyName;
    }

    public Integer getCpyNumber() {
        return cpyNumber;
    }

    public void setCpyNumber(Integer cpyNumber) {
        this.cpyNumber = cpyNumber;
    }

    public String getApplicationStartTime() {
        return applicationStartTime;
    }

    public void setApplicationStartTime(String applicationStartTime) {
        this.applicationStartTime = applicationStartTime;
    }

    public String getApplicationEndTime() {
        return applicationEndTime;
    }

    public void setApplicationEndTime(String applicationEndTime) {
        this.applicationEndTime = applicationEndTime;
    }
}