package com.wanma.ims.common.domain.param;

import com.wanma.ims.common.domain.CompanyChargeRelaDO;

import java.util.List;

/**
 * Created by xyc on 2017/8/24.
 * 设置充电范围参数
 */
public class CompanyChargeRelaParam {

    private Long cpyId;

    private List<CompanyChargeRelaDO> relaList;


    public Long getCpyId() {
        return cpyId;
    }

    public void setCpyId(Long cpyId) {
        this.cpyId = cpyId;
    }

    public List<CompanyChargeRelaDO> getRelaList() {
        return relaList;
    }

    public void setRelaList(List<CompanyChargeRelaDO> relaList) {
        this.relaList = relaList;
    }
}
