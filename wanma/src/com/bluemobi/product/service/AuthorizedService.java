/**
  * FileName:AuthorizedService.java
  * Author: Administrator
  * Create: 2014年7月1日
  * Last Modified: 2014年7月1日
  * Version: V1.0 
  */
package com.bluemobi.product.service;

import java.util.Map;

/**
 * 
 * @version V1.0
 * @author Administrator
 * @date 2014年7月1日
 */
public interface AuthorizedService {

	/**
	 * 根据用户登录ID和功能ID，查询用户是否拥有使用权限
	 * 
	 * @author yangweir
	 * @since Version 1.0
	 * @param authMap
	 *            userId ：用户ID actionId：功能ID
	 * @return int 用户数
	 * @throws 无
	 */
	public long getActionRoleCount(Map<String, String> searchAuthMap);

}
