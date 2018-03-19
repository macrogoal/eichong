package com.wanma.ims.service;

import java.util.List;

import com.wanma.ims.common.domain.OrderDO;
import com.wanma.ims.common.domain.OrderInvoiceDO;
import com.wanma.ims.common.dto.BaseResultDTO;


public interface OrderService {
    
	/**
	 * 开票优惠 
	 */
	public List<OrderInvoiceDO> getFav(List<Long> invoiceIds);
	/**
	 * 开票详情 
	 */
	public Long countOrderInvoiceDetail(OrderInvoiceDO orderInvoiceDO);
	public List<OrderInvoiceDO> getOrderInvoiceDetail(OrderInvoiceDO orderInvoiceDO);
	
	/**
	 * 非第三方订单 
	 */
	public Long countOrderList(OrderDO orderDO);
	public List<OrderDO> getOrderList(OrderDO orderDO);
	
	/**
	 * 第三方 
	 */
	public Long countThirdOrderList(OrderDO orderDO);
	public List<OrderDO> getThirdOrderList(OrderDO orderDO);
	
	/**
	 *手工结算 
	 */
	public BaseResultDTO manualAccountOrder(String ids,Integer status,String modifier) throws Exception;

	public List<OrderDO> getOrdersForBatch(OrderDO orderDO);
}
