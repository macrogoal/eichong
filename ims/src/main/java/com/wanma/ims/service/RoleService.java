package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.RoleDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.dto.BaseResultDTO;

 
/**
 * 角色
 */
public interface RoleService {
	
	/**
	 * 根据user_id获取Role
	 * @param userId 用户ID
	 * @return RoleDO
	 */
	public List<RoleDO> getRoleListByUserId(Long userId);
	
	/**
	 * 根据user_id获取Role
	 * @param userId 用户ID
	 * @return RoleDO
	 */
	public List<String> getRoleIdsByUserId(Long userId);
	
	/**
	 * 统计-当前用户角色的信息
	 * @param userDO 
	 * @return long
	 */
	public Long countRoleList(UserDO userDO,RoleDO roleDO);
	
	/**
	 * 查询-当前用户角色的信息
	 * @param userDO
	 * @return RoleDO
	 */
	public List<RoleDO> getRoleList(UserDO userDO,RoleDO roleDO);
	
	/**
	 * 刷新session缓存中用户角色菜单信息
	 * @param userId 用户ID
	 * @return
	 */
//	public void initRolesAndMenus(HttpServletRequest request);
	
	/**
	 * 根据role_id查询角色信息
	 * @param roleId
	 * @return RoleDO
	 * @throws
	 */
	public RoleDO getRoleById(String roleId);
	
	/**
	 * 角色-添加
	 * @param roleId
	 * @return RoleDO
	 * @throws
	 */
	public boolean addRole(RoleDO roleDO, String menuIds) throws Exception;
	
	/**
	 * 角色-编辑
	 * @param roleId
	 * @param List<MenuId> 
	 */
	public boolean modifyRole(RoleDO roleDO,String menuIds) throws Exception;
	
	/**
	 * 角色-删除（只支持单个删除）
	 * @param roleId
	 * @param List<MenuId> 
	 */
	public BaseResultDTO removeRoleById(String roleId) throws Exception;
	
	/**
	 * 所有角色
	 * @return list 
	 */
    public List<RoleDO> getAllRoleList();	
    
    /**
	 * 校验角色唯一性
	 * @return boolean 
	 */
    public boolean checkRole(String roleId,String roleName);	
    
}
