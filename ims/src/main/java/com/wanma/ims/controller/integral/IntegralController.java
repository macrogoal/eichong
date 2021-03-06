package com.wanma.ims.controller.integral;

import com.wanma.ims.common.domain.IntegralDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.domain.bo.IntegralStatisticsBO;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.IntegralService;
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
import java.util.List;

/**
 * 积分
 */
@RequestMapping("/manage/integral")
@Controller
public class IntegralController extends BaseController{
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private IntegralService integralService;
	
	/**
	* <p>Description: 获取积分列表</p>
	* @param
	* @author bingo
	* @date 2017-8-15
	 */
	@RequestMapping(value = "/getIntegralList")
	@ResponseBody
	public void getIntegralList(@ModelAttribute("pager") Pager pager,
			@ModelAttribute IntegralDO integral, Model model,HttpServletRequest request){
		JsonResult batchResult = new JsonResult();
		Long total = integralService.getIntegralCount(integral);
		if (total <= pager.getOffset()) {
			pager.setPageNo(1L);
		}
		pager.setTotal(total);
		integral.setPager(pager);
		
		List<IntegralDO> integralList = integralService.getIntegralList(integral);
		if (integralList == null) {
			integralList = new ArrayList<IntegralDO>();
		}
		batchResult.setDataObject(integralList);
		batchResult.setPager(pager);
		
		responseJson(batchResult);
	}	
	
	/**
	* <p>Description: 修改积分</p>
	* @param
	* @author bingo
	* @date 2017-8-15
	 */
	@RequestMapping(value = "/modifyIntegral")
	@ResponseBody
	public void modifyIntegral(@ModelAttribute IntegralDO integral, Model model, HttpServletRequest request) {
		//取当前登录用户
		UserDO user = getCurrentLoginUser();
		if (user == null) {
			log.error(this.getClass() + ".modifyIntegral() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER));
			return;
		}
		
		BaseResultDTO baseResultDTO = new BaseResultDTO();
		try {
			integral.setModifier(user.getUserId().toString());
			baseResultDTO = integralService.modifyIntegral(integral);
		} catch (Exception e) {
			log.error(this.getClass() + ".modifyIntegral() error : ", e);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, e.toString()));
		}
		
		if(!baseResultDTO.isSuccess()){
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, baseResultDTO.getErrorDetail()));
		}else {
			responseJson(new JsonResult());
		}
	}
	
	/**
	* <p>Description: 积分统计</p>
	* @param
	* @author bingo
	* @date 2017-8-17
	 */
	@RequestMapping(value = "/doIntegralStatistics")
	@ResponseBody
	public void doIntegralStatistics(@ModelAttribute IntegralDO integral, Model model,HttpServletRequest request){
		JsonResult batchResult = new JsonResult();
		
		IntegralStatisticsBO result;
		try {
			result = integralService.doIntegralStatistics(integral);
		} catch (Exception e) {
			log.error(this.getClass() + ".doIntegralStatistics() error : ", e);
			result = new IntegralStatisticsBO();
		}
		batchResult.setDataObject(result);
		
		responseJson(batchResult);
	}	
}
