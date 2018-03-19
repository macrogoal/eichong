package com.wanma.ims.controller.electric;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;
import com.wanma.ims.common.domain.ElectricPileDO;
import com.wanma.ims.common.domain.PowerStationDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.DownFileConstants;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.constants.WanmaConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonException;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.CountAdminEpRelaService;
import com.wanma.ims.service.ElectricPileService;
import com.wanma.ims.service.PowerStationService;
import com.wanma.ims.service.RateInfoService;
import com.wanma.ims.util.ImsBaseUtil;

/**
 * 电桩管理-充电站管理
 * @author zhangchunyan
 */
@RequestMapping("/manage/electric")
@Controller
public class PowerStationController extends BaseController{
	
	private final Logger LOGGER =  LoggerFactory.getLogger(this.getClass());  
	
    @Autowired
    private PowerStationService powerStationService;
    @Autowired
    private CountAdminEpRelaService countAdminEpRelaService;
    @Autowired
    private ElectricPileService electricPileService;
    @Autowired
    private RateInfoService rateInfoService;
    
	/**
	 * 分页查询
	 * @param 充电点名称,省市区
	 * @return list 
	 */
	@RequestMapping(value = "/getPowerStationListPage", method = RequestMethod.POST)
	@ResponseBody
	public void getPowerStationListPage(Pager pager,PowerStationDO powerStationDO){
		JsonResult result = new JsonResult();
		try{
			UserDO loginUser = getCurrentLoginUser();
			if(loginUser.getUserLevel() == WanmaConstants.USER_LEVEL_WORK){
				List<Long> ids = countAdminEpRelaService.getPowerStationIdsByLoginId(loginUser.getUserId());
				powerStationDO.setIds(ids);
			}
			Long total = powerStationService.countPowerStationList(powerStationDO,loginUser);
			if (total <= pager.getOffset()) {
				pager.setPageNo(1L);
			}
			pager.setTotal(total);
			powerStationDO.setPager(pager);
			List<PowerStationDO> list = powerStationService.getPowerStationList(powerStationDO,loginUser);
			result.setPager(pager);
            result.setDataObject(list);
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".getPowerStationListPage() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
	
	/**
	 * 明细
	 * @param id
	 * @return list 
	 */
	@RequestMapping(value = "/getPowerStationById")
	@ResponseBody
	public void getPowerStationById(Long powerstationId){
		JsonResult result = new JsonResult();
		try{
			PowerStationDO powerStationDO = powerStationService.getPowerStationById(powerstationId);
			result.setDataObject(powerStationDO);
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".viewPowerStation() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
	
	/**
	 * 新增
	 * @param powerStationDO
	 * @return boolean 
	 */
	@RequestMapping(value = "/addPowerStation", method = RequestMethod.POST)
	@ResponseBody
	public void addPowerStation(PowerStationDO powerStationDO,@RequestParam(value = "file", required = false) MultipartFile[] file){
		JsonResult result = new JsonResult();
		try{
			UserDO loginUser = getCurrentLoginUser();
			powerStationDO.setCreatorId(loginUser.getUserId());
			powerStationDO.setCreator(loginUser.getUserAccount());
			BaseResultDTO dto = powerStationService.addPowerStation(powerStationDO,file,loginUser);
			if(!dto.isSuccess()){
				responseJson(new JsonResult(false, ResultCodeConstants.FAILED, dto.getErrorDetail()));
				return;
			}
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".addPowerStation() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
	
	/**
	 * 删除
	 * @param powerStationId
	 * @return boolean 
	 */
	@RequestMapping(value = "/removePowerStation")
	@ResponseBody
	public void removePowerStation(String ids){
		JsonResult result = new JsonResult();
		try{  //TODO: 有时间改成批量
			if(StringUtils.isBlank(ids)){
				result.setSuccess(false);
				result.setMsg("请求参数错误");
				result.setStatus(ResultCodeConstants.FAILED);
				return;
			}
			List<String> powerstationIds = Arrays.asList(ids.split(","));
			for (String string : powerstationIds) {
				if(!powerStationService.removePowerStation(new Long(string))){
					responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_REMOVE_POWERSTATION));
					return;
				}
			}
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".removePowerStation() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
	
	/**
	 * 修改
	 * @param powerStationDO
	 * @return boolean 
	 */
	@RequestMapping(value = "/modifyPowerStation", method = RequestMethod.POST)
	@ResponseBody
	public void modifyPowerStation(PowerStationDO powerStationDO,@RequestParam(value = "file", required = false) MultipartFile[] file){
		JsonResult result = new JsonResult();
		try{
			if(StringUtils.isBlank(powerStationDO.getPowerstationId()+"")){
				 responseJson(new JsonResult(false, ResultCodeConstants.ERROR_PARAM, ResultCodeConstants.ERROR_MSG_REQUEST_PARAM));
				 return;
			}
			String infos = request.getParameter("infos"); //JSON格式
			List<ElectricPileDO> infoList = new ArrayList<ElectricPileDO>();
			if(StringUtils.isNotEmpty(infos)){
				JSONArray infosArr = JSONArray.fromObject(infos);
				for (int i = 0; i < infosArr.size(); i++) {
					JSONObject jsonO = infosArr.getJSONObject(i);
					ElectricPileDO pileDO = new ElectricPileDO();
					pileDO.setId(jsonO.getLong("id"));
					pileDO.setRateInformationId(jsonO.getLong("rateInfoId"));
					pileDO.setPowerStationId(powerStationDO.getPowerstationId());
					infoList.add(pileDO);
				}
			}
			String listImgUrl = request.getParameter("listImgUrl");
			powerStationDO.setModifier(getCurrentUserName());
			BaseResultDTO dto = powerStationService.modifyPowerStation(powerStationDO,infoList,file,getCurrentLoginUser(),listImgUrl);
			if(!dto.isSuccess()){
				responseJson(new JsonResult(false, ResultCodeConstants.FAILED, dto.getErrorDetail()));
				return;
			}	
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".modifyPowerStation() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
	
	/**
	 * 导出
	 * @param powerStationDO
	 * @return boolean 
	 */
	@RequestMapping(value = "/exportPowerStation")
	@ResponseBody
	public void exportPowerStation(PowerStationDO powerStationDO){
		try{
			UserDO loginUser = getCurrentLoginUser();
			if(loginUser.getUserLevel() != WanmaConstants.USER_LEVEL_WORK){
				List<Long> ids = countAdminEpRelaService.getPowerStationIdsByLoginId(loginUser.getUserId());
				powerStationDO.setIds(ids);
			}
			List<PowerStationDO> list = powerStationService.getPowerStationList(powerStationDO,loginUser);
			if(CollectionUtils.isEmpty(list)){
				responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EXPORT_DATA_EMPTY));
				return;
			}
			List<String> headList = Lists.newArrayList("powerstationId,充电点ID","powerstationName,充电点名称 ","electricPileNum,上线电桩总数","address,地址","parkingFee,停车费","onlineTime,开放时间");
			List<Map<String, Object>> datalist = createDataExcelList(list);
			ImsBaseUtil.responseExcel(response,headList,datalist, DownFileConstants.FILE_POWERSTATION_EXPORT,DownFileConstants.FILE_POWERSTATION_EXPOR_SHEET);
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".exportPowerStation() error : ", e);
			responseJson(new JsonException());
		}
	}
	
	private List<Map<String, Object>> createDataExcelList(List<PowerStationDO> list){
		List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
		for (PowerStationDO ps : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("powerstationId", ps.getPowerstationId());
			map.put("powerstationName", ps.getPowerstationName());
			map.put("electricPileNum", ps.getElectricPileNum());
			map.put("address", ps.getAddress());
			map.put("parkingFee", ps.getParkingFee());
			map.put("onlineTime", ps.getOnlineTime());
			dataList.add(map);
		}
		return dataList;
	}
	/**
	 * 优惠券 活动 省市区联动 获取电站
	 * @param 充电点名称,省市区
	 * @return list 
	 */
	@RequestMapping(value = "/getPowerStationList")
	@ResponseBody
	public void getPowerStationList(PowerStationDO powerStationDO){
		JsonResult result = new JsonResult();
		try{
			List<Map<String, String>> list = powerStationService.getPowerStationForList(powerStationDO);
            result.setDataObject(list);
		}catch(Exception e){
			LOGGER.error(this.getClass() + ".getPowerStationList() error : ", e);
			responseJson(new JsonException());
			return;
		}
		responseJson(result);
	}
}
