/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.web.dao;

import java.util.List;
import java.util.Map;

import com.wanma.model.TblUsercollect;



/**
 * 反馈表操作用DAO接口Mapper
 * 
 * @version V1.0
 * @author Administrator
 * @date 2014年6月26日
 */
public interface WebUsercollectMapper {
	public List<TblUsercollect> find(TblUsercollect tblUsercollect);
	public List<Map<String,Object>> getUserCollectDetail(TblUsercollect tblUsercollect);
	public void insert(TblUsercollect tblUsercollect);
	public void delete(TblUsercollect tblUsercollect);
}
