package com.wanma.ims.controller.integral;

import com.wanma.ims.common.domain.IntegralDetailsDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.domain.bo.IntegralBO;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.IntegralDetailsService;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 积分明细
 */
@Controller
public class IntegralDetailsController extends BaseController{
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private IntegralDetailsService integralDetailsService;
	
	/**
	* <p>Description: 获取积分明细列表</p>
	* @param
	* @author bingo
	* @date 2017-8-15
	 */
	@RequestMapping(value = "/manage/integral/getIntegralDetailsList")
	@ResponseBody
	public void getIntegralDetailsList(@ModelAttribute("pager") Pager pager,
			@ModelAttribute IntegralDetailsDO integralDetails, Model model,HttpServletRequest request){
		JsonResult batchResult = new JsonResult();
		Long total = integralDetailsService.getIntegralDetailsCount(integralDetails);
		if (total <= pager.getOffset()) {
			pager.setPageNo(1L);
		}
		pager.setTotal(total);
		integralDetails.setPager(pager);
		
		List<IntegralDetailsDO> integralDetailsList = integralDetailsService.getIntegralDetailsList(integralDetails);
		if (integralDetailsList == null) {
			integralDetailsList = new ArrayList<IntegralDetailsDO>();
		}
		for (IntegralDetailsDO integralDetailsDO : integralDetailsList) {
			integralDetailsDO.setDirectionName(integralDetailsDO.getDirection().equals(0) ? "获取" : "消耗");
		}
		batchResult.setDataObject(integralDetailsList);
		batchResult.setPager(pager);
		
		responseJson(batchResult);
	}	
	
	/**
	* <p>Description: 增加积分明细</p>
	* @param
	* @author bingo
	* @date 2017-8-15
	 */
	@RequestMapping(value = "/manage/integral/addIntegralDetails")
	@ResponseBody
	public void addIntegralDetails(@ModelAttribute IntegralBO integralBO, Model model, HttpServletRequest request) {
		//取当前登录用户
//		UserDO user = getCurrentLoginUser();
//		if (user == null) {
//			log.error(this.getClass() + ".addIntegralDetails() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER);
//		}
		
		BaseResultDTO baseResultDTO = new BaseResultDTO();
		try {
//			integralBO.setCreator(user == null ? "" : user.getUserId().toString());
			integralBO.setCreator("");
			integralBO.setCompleteDate(new Date());
			baseResultDTO = integralDetailsService.addIntegralDetails(integralBO, null);
		} catch (Exception e) {
			log.error(this.getClass() + ".addIntegralDetails() error : ", e);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, e.toString()));
		}
		
		if(!baseResultDTO.isSuccess()){
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, baseResultDTO.getErrorDetail()));
		}else {
			responseJson(baseResultDTO);
		}
	}

	/**
	* <p>Description: 增加积分明细</p>
	* @param
	* @author bingo
	* @date 2017-8-15
	 */
	@RequestMapping(value = "/integral/addIntegralDetails4Api")
	@ResponseBody
	public void addIntegralDetails4Api(@ModelAttribute IntegralBO integral, HttpServletRequest request) {
		BaseResultDTO baseResultDTO = new BaseResultDTO();
		log.info(this.getClass() + ".addIntegralDetails4Api() info : 增加积分明细已调用。");
		try {
			String contents = request.getParameter("contents");
			log.debug(this.getClass() + ".addIntegralDetails4Api() debug sources : ", contents);
			JSONObject obj = JSONObject.fromObject(contents);
			IntegralBO integralBO = (IntegralBO) JSONObject.toBean(obj, IntegralBO.class);
			if (integralBO == null) {
				responseJson(new JsonResult(false, ResultCodeConstants.FAILED, "积分对象不允许为空!"));
			}
			
			log.debug(this.getClass() + ".addIntegralDetails4Api() debug : ", integralBO.getIntegralActivityId()
					+ " " + integralBO.getMoneyInvolved() + " " + integralBO.getChargingOrderId()
					+ " " + integralBO.getDirection() + " " + integralBO.getIntegralValue()
					+ " " + integralBO.getCpCouponcode() + " " + integralBO.getUserId()
					+ " " + integralBO.getElectricPileId() + " " + integralBO.getCompleteDate()
					+ " " + integralBO.getCouponVarietyId() + " " + integralBO.getCreator());
			
			integralBO.setCreator("");
			integralBO.setCompleteDate(integralBO.getCompleteDate() == null ? new Date() : integralBO.getCompleteDate());
			baseResultDTO = integralDetailsService.addIntegralDetails(integralBO, null);
		} catch (Exception e) {
			log.error(this.getClass() + ".addIntegralDetails4Api() error : ", e);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, e.toString()));
		}
		
		if(!baseResultDTO.isSuccess()){
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, baseResultDTO.getErrorDetail()));
		}else {
			responseJson(baseResultDTO);
		}
	}
}
