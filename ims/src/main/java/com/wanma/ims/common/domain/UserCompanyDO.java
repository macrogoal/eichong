package com.wanma.ims.common.domain;

import java.util.Date;

/**
 * 渠道用户实体类
 */
public class UserCompanyDO {

	private Long userId;// 用户ID

	private Long cpyId;// 所属渠道ID

	private Integer userCpySex;// 用户性别 (0: 未知，1:男 2：女)

	private String userName;// 用户昵称

	private String userCpyName;// 用户名称

	private String userCpyPhone;// 用户渠道手机号

	private String userPlateNum; // 用户车牌号

	private Long accountId;// 资金账户ID

	private String creator;// 创建人

	private String modifier;// 修改人

	private Date gmtCreate;// 创建时间

	private Date gmtModified;// 修改时间

	public static UserCompanyDO valueOf(UserDO user, Long accountId, UserDO loginUser) {
		UserCompanyDO userCompany = new UserCompanyDO();
		userCompany.setUserId(user.getUserId());
		userCompany.setCpyId(user.getCpyId());
		userCompany.setUserCpySex(user.getUserSex());
		userCompany.setUserName(user.getUserName());
		userCompany.setUserCpyName(user.getUserCpyName());
		userCompany.setUserCpyPhone(user.getUserCpyPhone());
		userCompany.setAccountId(accountId);
        userCompany.setUserPlateNum(user.getNormPlateNum());
		userCompany.setCreator(loginUser.getUserAccount());
		userCompany.setModifier(loginUser.getUserAccount());
		return userCompany;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getCpyId() {
		return cpyId;
	}

	public void setCpyId(Long cpyId) {
		this.cpyId = cpyId;
	}

	public Integer getUserCpySex() {
		return userCpySex;
	}

	public void setUserCpySex(Integer userCpySex) {
		this.userCpySex = userCpySex;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserCpyName() {
		return userCpyName;
	}

	public void setUserCpyName(String userCpyName) {
		this.userCpyName = userCpyName;
	}

	public String getUserCpyPhone() {
		return userCpyPhone;
	}

	public void setUserCpyPhone(String userCpyPhone) {
		this.userCpyPhone = userCpyPhone;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
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

	public String getUserPlateNum() {
		return userPlateNum;
	}

	public void setUserPlateNum(String userPlateNum) {
		this.userPlateNum = userPlateNum;
	}

}
