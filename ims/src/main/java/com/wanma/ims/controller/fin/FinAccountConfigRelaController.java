package com.wanma.ims.controller.fin;

import com.wanma.ims.common.domain.FinAccountConfigRelaDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.FinAccountConfigRelaService;
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
 * 账务配置
 */
@RequestMapping("/manage/fin")
@Controller
public class FinAccountConfigRelaController extends BaseController{
	
	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private FinAccountConfigRelaService finAccountConfigRelaService;
	
	/**
	* <p>Description: 获取账务配置列表</p>
	* @param
	* @author bingo
	* @date 2017-6-15
	 */
	@RequestMapping(value = "/getFinAccountConfigRela")
	@ResponseBody
	public void getFinAccountConfigRelaList(@ModelAttribute("pager") Pager pager,
			@ModelAttribute FinAccountConfigRelaDO finAccountConfigRela, Model model,HttpServletRequest request){
		JsonResult batchResult = new JsonResult();
		Long total = finAccountConfigRelaService.getFinAccountConfigRelaCount(finAccountConfigRela);
		if (total <= pager.getOffset()) {
			pager.setPageNo(1L);
		}
		pager.setTotal(total);
		finAccountConfigRela.setPager(pager);
		
		List<FinAccountConfigRelaDO> finAccountConfigRelaList = finAccountConfigRelaService.getFinAccountConfigRelaList(finAccountConfigRela);
		if (finAccountConfigRelaList == null) {
			finAccountConfigRelaList = new ArrayList<FinAccountConfigRelaDO>();
		}
		batchResult.setDataObject(finAccountConfigRelaList);
		batchResult.setPager(pager);
		
		responseJson(batchResult);
	}
	
	/**
	* <p>Description: 新增账务配置</p>
	* @param
	* @author bingo
	* @date 2017-6-15
	 */
	@RequestMapping(value = "/addFinAccountConfigRela")
	@ResponseBody
	public void addFinAccountConfigRela(@ModelAttribute FinAccountConfigRelaDO finAccountConfigRela, Model model, HttpServletRequest request) {
		//取当前登录用户
		UserDO user = getCurrentLoginUser();
		if (user == null) {
			log.error(this.getClass() + ".addFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER));
			return;
		}
		
		int result = 0;
		try {
			result = finAccountConfigRelaService.addFinAccountConfigRela(finAccountConfigRela, user);
		} catch (Exception e) {
			log.error(this.getClass() + ".addFinAccountConfigRela() error : ", e);
		}
		if (result == 0) {
			log.error(this.getClass() + ".addFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_ERROR_ADD);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_ERROR_ADD));
		}else {			
			responseJson(new JsonResult());
		}
	}
	
	/**
	* <p>Description: 修改账务配置</p>
	* @param
	* @author bingo
	* @date 2017-6-15
	 */
	@RequestMapping(value = "/modifyFinAccountConfigRela")
	@ResponseBody
	public void modifyFinAccountConfigRela(@ModelAttribute FinAccountConfigRelaDO finAccountConfigRela, Model model, HttpServletRequest request) {
		//取当前登录用户
		UserDO user = getCurrentLoginUser();
		if (user == null) {
			log.error(this.getClass() + ".modifyFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EMPTY_SESSION_USER));
			return;
		}
		
		int result = 0;
		try {
			result = finAccountConfigRelaService.modifyFinAccountConfigRela(finAccountConfigRela, user);
		} catch (Exception e) {
			log.error(this.getClass() + ".modifyFinAccountConfigRela() error : ", e);
		}
		if (result == 0) {
			log.error(this.getClass() + ".modifyFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_ERROR_MODIFY);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_ERROR_MODIFY));
		}else if (result == 2) {
			log.error(this.getClass() + ".modifyFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_MODIFY_BILL_ACCOUNT);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EMPTY_MODIFY_BILL_ACCOUNT));
		}else {
			responseJson(new JsonResult());
		}
	}
	

	/**
	* <p>Description: 删除账务配置</p>
	* @param
	* @author bingo
	* @date 2017-6-15
	 */
	@RequestMapping(value = "/removeFinAccountConfigRela")
	@ResponseBody
	public void removeFinAccountConfigRela(@ModelAttribute FinAccountConfigRelaDO finAccountConfigRela, Model model, HttpServletRequest request) {
		int result = 0;
		try {
			result = finAccountConfigRelaService.removeFinAccountConfigRela(finAccountConfigRela);
		} catch (Exception e) {
			log.error(this.getClass() + ".removeFinAccountConfigRela() error : ", e);
		}
		
		if (result == 0) {
			log.error(this.getClass() + ".removeFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_ERROR_REMOVE);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_ERROR_REMOVE));
		}else if (result == 2) {
			log.error(this.getClass() + ".removeFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_EMPTY_MODIFY_ACCOUNT_CONFIG_RELA);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_EMPTY_MODIFY_ACCOUNT_CONFIG_RELA));
		}else if (result == 3) {
			log.error(this.getClass() + ".removeFinAccountConfigRela() error : " + ResultCodeConstants.ERROR_MSG_REMOVE_BILL_ACCOUNT_RELATION);
			responseJson(new JsonResult(false, ResultCodeConstants.FAILED, ResultCodeConstants.ERROR_MSG_REMOVE_BILL_ACCOUNT_RELATION));
		}else {
			responseJson(new JsonResult());
		}
	}
	
	/**
	* <p>Description: 获取渠道对应的账务配置列表</p>
	* @param
	* @author bingo
	* @date 2017-8-21
	 */
	@RequestMapping(value = "/getFinAccountConfigRela4Cpy")
	@ResponseBody
	public void getFinAccountConfigRela4Cpy(@ModelAttribute FinAccountConfigRelaDO finAccountConfigRela, Model model,HttpServletRequest request){
		JsonResult batchResult = new JsonResult();
		List<FinAccountConfigRelaDO> finAccountConfigRelaList = finAccountConfigRelaService.getFinAccountConfigRela4Cpy(finAccountConfigRela);
		if (finAccountConfigRelaList == null) {
			finAccountConfigRelaList = new ArrayList<FinAccountConfigRelaDO>();
		}
		batchResult.setDataObject(finAccountConfigRelaList);
		
		responseJson(batchResult);
	}
}
