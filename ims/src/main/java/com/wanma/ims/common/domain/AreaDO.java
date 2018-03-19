package com.wanma.ims.common.domain;

import java.io.Serializable;


public class AreaDO implements Serializable{

	/**
	 * 区实体类
	 */
	private static final long serialVersionUID = 4968068291079402867L;
    private String areaId;
    private String cityId;
    private String areaName;
//    private String hotFlag;
//    private String deleteFlag;
	
	public String getAreaId() {
		return areaId;
	}
	
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	
	public String getCityId() {
		return cityId;
	}
	
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	
	public String getAreaName() {
		return areaName;
	}
	
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	
//	public String getHotFlag() {
//		return hotFlag;
//	}
//	
//	public void setHotFlag(String hotFlag) {
//		this.hotFlag = hotFlag;
//	}
//	
//	public String getDeleteFlag() {
//		return deleteFlag;
//	}
//	
//	public void setDeleteFlag(String deleteFlag) {
//		this.deleteFlag = deleteFlag;
//	}
    
    
}
