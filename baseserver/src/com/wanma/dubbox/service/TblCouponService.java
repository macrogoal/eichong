/**     
 * @Title:  TblUserService.java   
 * @Package com.wanma.service   
 * @Description:    TODO  
 * @author: Android_Robot     
 * @date:   2016年4月28日 下午3:59:00   
 * @version V1.0     
 */
package com.wanma.dubbox.service;

import java.util.List;

import com.wanma.dubbox.model.TblCoupon;

/**
 * @author lhy
 *
 */
public interface TblCouponService {

	int delete(TblCoupon record);

	TblCoupon selectOne(TblCoupon model);

	int getCount(TblCoupon model);
	
	List<TblCoupon> getList(TblCoupon model);
	
}
