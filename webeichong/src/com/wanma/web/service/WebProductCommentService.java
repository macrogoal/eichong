/**
 * FileName:AppFeedbackMapper.java
 * Author: Administrator
 * Create: 2014年6月26日
 * Last Modified: 2014年6月26日
 * Version: V1.0 
 */
package com.wanma.web.service;

import java.util.List;
import java.util.Map;

import com.wanma.model.TblProductcomment;

/**
 * @Description:产品评论业务处理接口
 * @author songjf
 * @createTime：2015-3-16 下午03:34:08
 * @updator：
 * @updateTime：
 * @version：V1.0
 */
public interface WebProductCommentService {

	/**
	 * @Title: insertProCommnet
	 * @Description: 新增产品描述
	 * @param productcomment
	 * @return
	 */
	public void insertProCommnet(TblProductcomment productcomment);

	/**
	 * @Title: findProComments
	 * @Description: 获取产品评论
	 * @param params
	 * @return
	 */
	public List<TblProductcomment> findProComments(Map<String, Object> params);
	public long countProComments(Map<String, Object> params);

}
