package com.wanma.ims.controller.vo;

import com.wanma.ims.common.domain.ConcentratorDO;

public class ConcentratorVO {
	private String concentratorId;//集中器ID
	private String concentratorName;//集中器名称
	private String simMac;//SIM卡号
	private String simCode;//SIM卡编号(电话号码)
	private String simType;//SIM运营商(1：联通,2：电信,3：移动)
	private String state;//集中器状态(0：离线,1：上线 2：无效)
	private String creator;//资产所属
	private String creatTime;//创建时间
	
	public ConcentratorVO(ConcentratorDO concentratorDO){
		this.concentratorId = concentratorDO.getConcentratorId() + "";
		this.concentratorName = concentratorDO.getConcentratorName();
//		this.simMac = concentratorDO.getSimMac();
//		this.simCode = concentratorDO.getSimCode();
//		if(concentratorDO.getSimType()==1){
//			this.simType="联通";
//		}else if(concentratorDO.getSimType()==2){
//			this.simType="电信";
//		}else {
//			this.simType="移动";
//		}
		if(concentratorDO.getState()==0){
			this.state="离线";
		}else if(concentratorDO.getState()==1){
			this.state="上线";
		}else {
			this.state="无效";
		}
		this.creator = concentratorDO.getCreator();
		this.creatTime = concentratorDO.getCreatTime();
	}
	
	
	public String getConcentratorId() {
		return concentratorId;
	}
	public void setConcentratorId(String concentratorId) {
		this.concentratorId = concentratorId;
	}
	public String getConcentratorName() {
		return concentratorName;
	}
	public void setConcentratorName(String concentratorName) {
		this.concentratorName = concentratorName;
	}
	public String getSimMac() {
		return simMac;
	}
	public void setSimMac(String simMac) {
		this.simMac = simMac;
	}
	public String getSimCode() {
		return simCode;
	}
	public void setSimCode(String simCode) {
		this.simCode = simCode;
	}
	public String getSimType() {
		return simType;
	}
	public void setSimType(String simType) {
		this.simType = simType;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getCreatTime() {
		return creatTime;
	}
	public void setCreatTime(String creatTime) {
		this.creatTime = creatTime;
	}
	
	
	
	
	

}
