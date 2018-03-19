package com.wanma.ims.common.domain;

import com.wanma.ims.common.domain.base.BasicModel;

/**
 * VIN码鉴权表
 *
 * @author bingo
 * @date 2017-7-5
 */
public class CarVinRelaDO extends BasicModel {

    private static final long serialVersionUID = 5049841833947830535L;

    private Long pkId; //主键

    private String cvVinCode; //VIN码

    private Long cpyId; //公司ID

    private Integer isUsed; //是否可充电 0.否 1.是

    private String cvLicenseNumber;//车牌号

    // 公司标识
    private Integer cpyNumber;

    // 公司名称
    private String cpyName;

    public Long getPkId() {
        return pkId;
    }

    public void setPkId(Long pkId) {
        this.pkId = pkId;
    }

    public String getCvVinCode() {
        return cvVinCode;
    }

    public void setCvVinCode(String cvVinCode) {
        this.cvVinCode = cvVinCode;
    }

    public Long getCpyId() {
        return cpyId;
    }

    public void setCpyId(Long cpyId) {
        this.cpyId = cpyId;
    }

    public Integer getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(Integer isUsed) {
        this.isUsed = isUsed;
    }

    public String getCvLicenseNumber() {
        return cvLicenseNumber;
    }

    public void setCvLicenseNumber(String cvLicenseNumber) {
        this.cvLicenseNumber = cvLicenseNumber;
    }

    public Integer getCpyNumber() {
        return cpyNumber;
    }

    public void setCpyNumber(Integer cpyNumber) {
        this.cpyNumber = cpyNumber;
    }

    public String getCpyName() {
        return cpyName;
    }

    public void setCpyName(String cpyName) {
        this.cpyName = cpyName;
    }
}
