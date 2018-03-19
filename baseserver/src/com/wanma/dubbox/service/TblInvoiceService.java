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

import com.wanma.dubbox.model.TblInvoice;

/**
 * @author gx
 *
 */
public interface TblInvoiceService {

	int insert(TblInvoice record);

	int update(TblInvoice record);

	TblInvoice selectOne(TblInvoice model);

	int getCount(TblInvoice model);
	
	List<TblInvoice> getList(TblInvoice model);
	
}
