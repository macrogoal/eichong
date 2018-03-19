/**     
 * @Title:  TblElectricpileheadMapper.java   
 * @Package com.wanma.dao   
 * @Description:    TODO  
 * @author: Android_Robot     
 * @date:   2016年4月28日 下午2:27:33   
 * @version V1.0     
 */
package com.wanma.dao;

import com.wanma.model.TblElectricpilehead;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author bc
 *
 */
@Repository
public interface TblElectricpileHeadMapper {
	public TblElectricpilehead getBespokeHeadDetailByPile(
			TblElectricpilehead head);

	public TblElectricpilehead getBespokeHeadDetailByStation(
			TblElectricpilehead head);

	public List<TblElectricpilehead> getList(TblElectricpilehead hModel);

	public List<TblElectricpilehead> getListByPsId(TblElectricpilehead hModel);

	public List<Map<String, Object>> getHeadStsByPsId(TblElectricpilehead hModel);

	public List<Map<String, Object>> echongGetHeadStsByPsId(TblElectricpilehead hModel);

    public TblElectricpilehead getHeadByQrCode(@Param("qrCode")String qrCode, @Param("nowTime")long nowTime);
    /**
     * 根据枪口主键查询枪头信息
     * @param hModel
     * @return
     */
    public Map<String, Object> getHeadByPkhead(TblElectricpilehead hModel);

    /**
     * 根据枪口主键进行设备认证
     * @param eleHead
     * @return
     */
    public int getEquipAuthByEleHead(Map<String, Object> maph);
	
	/**
	 * 查询设备状态(南京南瑞)
	 * @param hModel
	 * @return
	 */
	public List<Map<String, Object>> NariGetHeadStsByPsId(TblElectricpilehead hModel);

	/**
	 * 中电联-设备认证-检验设备是否在白名单
	 * @param mapl
	 * @return
	 */
	public int checkEquipIsRela(Map<String, Object> mapl);
	
}
