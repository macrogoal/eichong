package com.wanma.ims.common.domain;

import com.wanma.ims.common.domain.base.BasicModel;

import java.math.BigDecimal;

/**
 * 电动车车型实体类
 * xyc
 */
public class CarInfoDO extends BasicModel {
    private Long id;//主键 ref表字段：pk_CarInfo

    private String styleName;//电动车类型名称 ref表字段：CarInfo_StyleName

    private BigDecimal maxOdometer;//电动车最大续航里程 ref表字段：CarInfo_MaxOdometer

    private BigDecimal batteryCapacity;//电动车电池容量 ref表字段：CarInfo_BatteryCapacity

    private String remark;//备注 ref表字段：CarInfo_Remark

    private String brandIcon;//电动车品牌图标 ref表字段：CarInfo_BrandIcon

    private String brandName;//电动车品牌名称，根据配置参数内容表获取品牌名称 ref表字段：CarInfo_BrandName

    private Integer carStatus;//状态(0启用，1禁用) ref表字段：CarInfo_CarStatus

    private String chargingTime;//充电时间 ref表字段：CarInfo_ChargingTime

    private Integer batteryType;//电池类型 ref表字段：CarInfo_BatteryType

    private Integer carCompanyId;//汽车厂家关联主键 ref表字段：CarInfo_CompanyId

    private Integer chargingMode;//充电模式 14交流5直流1交流直流

    private Integer powerInterface;//接口标准 7国标20欧标19美标

    private String carCompanyName;//汽车厂家名

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStyleName() {
        return styleName;
    }

    public void setStyleName(String styleName) {
        this.styleName = styleName;
    }

    public BigDecimal getMaxOdometer() {
        return maxOdometer;
    }

    public void setMaxOdometer(BigDecimal maxOdometer) {
        this.maxOdometer = maxOdometer;
    }

    public BigDecimal getBatteryCapacity() {
        return batteryCapacity;
    }

    public void setBatteryCapacity(BigDecimal batteryCapacity) {
        this.batteryCapacity = batteryCapacity;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getBrandIcon() {
        return brandIcon;
    }

    public void setBrandIcon(String brandIcon) {
        this.brandIcon = brandIcon;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Integer getCarStatus() {
        return carStatus;
    }

    public void setCarStatus(Integer carStatus) {
        this.carStatus = carStatus;
    }

    public String getChargingTime() {
        return chargingTime;
    }

    public void setChargingTime(String chargingTime) {
        this.chargingTime = chargingTime;
    }

    public Integer getBatteryType() {
        return batteryType;
    }

    public void setBatteryType(Integer batteryType) {
        this.batteryType = batteryType;
    }

    public Integer getCarCompanyId() {
        return carCompanyId;
    }

    public void setCarCompanyId(Integer carCompanyId) {
        this.carCompanyId = carCompanyId;
    }

    public Integer getChargingMode() {
        return chargingMode;
    }

    public void setChargingMode(Integer chargingMode) {
        this.chargingMode = chargingMode;
    }

    public Integer getPowerInterface() {
        return powerInterface;
    }

    public void setPowerInterface(Integer powerInterface) {
        this.powerInterface = powerInterface;
    }

    public String getCarCompanyName() {
        return carCompanyName;
    }

    public void setCarCompanyName(String carCompanyName) {
        this.carCompanyName = carCompanyName;
    }
}