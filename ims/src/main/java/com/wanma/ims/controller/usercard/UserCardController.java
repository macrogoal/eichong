package com.wanma.ims.controller.usercard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wanma.ims.common.domain.CompanyDO;
import com.wanma.ims.common.domain.UserCardDO;
import com.wanma.ims.common.domain.UserCompanyDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.UserNormalDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.constants.WanmaConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.controller.vo.UserCardVO;
import com.wanma.ims.mapper.UserMapper;
import com.wanma.ims.service.CompanyService;
import com.wanma.ims.service.FinAccountService;
import com.wanma.ims.service.UserCardService;
import com.wanma.ims.service.UserService;
import com.wanma.ims.util.ErrorHtmlUtil;

/**
 * 用戶管理-卡管理
 */
@RequestMapping("/manage/usercard")
@Controller
public class UserCardController extends BaseController{
	/** 日志文件生成器 */
	private static Logger log = Logger.getLogger(UserCardController.class);
	@Autowired
	private UserCardService userCardService;
	@Autowired
	private UserService userService;
	@Autowired
	private FinAccountService finAccountService;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private UserMapper userMapper;
	/**
	 * 卡列表
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/getUsercardList")
	@ResponseBody
	public void getUsercardList(@ModelAttribute("pager") Pager pager,
			@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		JsonResult result = new JsonResult();
		List<UserCardDO> userCardList = null;
		long total = 0;
		try {
			userCard.setCpyIdList(getCurrentLoginUser().getCpyIdList());
			total = userCardService.getCardCount(userCard);
			if (total <= pager.getOffset()) {
				pager.setPageNo(1L);
			}
			userCard.setPager(pager);
			userCardList = userCardService.getCardList(userCard);
			pager.setTotal(total);
			result.setDataObject(userCardList);
			result.setPager(pager);
		} catch (Exception e) {
			log.error(this.getClass()+".getUsercardList() error:",e);
		}
		responseJson(result);
		
	}
	/**
	 * 卡挂失
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/cardLoss")
	@ResponseBody
	public void cardLoss(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		userCard = userCardService.getUserCard(userCard);
		userCard.setModifier(loginUser.getUserAccount());//设置修改人
		if(userCard.getUcStatus()==WanmaConstants.UCSTATUSLOSS){//卡状态为挂失
			responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该充电卡已挂失"));
			return;
		}
		if(userCard.getUcStatus()==WanmaConstants.UCSTATUSCANCEL){
			responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该充电卡已注销不能挂失"));
			return;
		}
		if(!userCardService.lossUserCard(userCard)){
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡修改失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 卡列表批量挂失
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/cardLossForList")
	@ResponseBody
	public void cardLossForList(String ids,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		try {
			UserCardDO userCard = new UserCardDO();
			userCard.setModifier(loginUser.getUserAccount());//设置修改人
			userCardService.lossUserCardForList(userCard,ids);
		} catch (Exception e) {
			log.error(this.getClass()+".cardLossForList() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡修改失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 解挂
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/relieveCardLoss")
	@ResponseBody
	public void relieveCardLoss(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		userCard = userCardService.getUserCard(userCard);
		userCard.setModifier(loginUser.getUserAccount());
		if(userCard.getUcStatus()!=WanmaConstants.UCSTATUSLOSS){//卡状态为挂失
			responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该充电卡不是挂失状态"));
		    return;
		}
		if(!userCardService.relieveLossUserCard(userCard)){
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡修改失败"));
		    return;
		}
		responseJson(result);
	}
	/**
	 * 卡冻结
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/cardFrozen")
	@ResponseBody
	public void cardFrozen(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		userCard = userCardService.getUserCard(userCard);
		userCard.setModifier(loginUser.getUserAccount());
		if(userCard.getUcStatus()!=WanmaConstants.UCSTATUSNORMAL){
			responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该充电卡不能冻结"));
			return;
		}
		if(!userCardService.frozenUserCard(userCard)){
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡冻结失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 卡解冻 
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/relieveCardFrozen")
	@ResponseBody
	public void relieveCardFrozen(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		userCard = userCardService.getUserCard(userCard);
		userCard.setModifier(loginUser.getUserAccount());
		if(userCard.getUcStatus()!=WanmaConstants.UCSTATUSFROZEN){
			responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该充电卡不是冻结状态"));
			return;
		}
		if(!userCardService.relieveFrozenUserCard(userCard)){
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡解冻失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 卡注销
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/cardCancel")
	@ResponseBody
	public void cardCancel(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		userCard = userCardService.getUserCard(userCard);
		userCard.setModifier(loginUser.getUserAccount());
		if(!userCardService.cancelUserCard(userCard)){
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"充点卡注销失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 获取用户拥有的卡信息
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/getUserCardInfo")
	@ResponseBody
	public void getUserCardInfo(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		JsonResult result = new JsonResult();
		List<UserCardDO> userCardList = null;
		try {
			userCardList = userCardService.getCardInfoByUserId(userCard);
			result.setDataObject(userCardList);
		} catch (Exception e) {
			log.error(this.getClass()+".getUserCardInfo() error:",e);
		}
		responseJson(result);
	}
	/**
	 * 用户主页 用户绑卡
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/userBindCard")
	@ResponseBody
	public void userBindCard(HttpServletRequest request,String ucExternalCardNumber,Long userId) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new JsonResult();
		UserCardDO userCard = new UserCardDO();
		int isApp = 0;
		try {
			if(ucExternalCardNumber.isEmpty()){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"外卡号为空，请重新输入"));
				return;
			}
			UserDO userDO = userService.getUserById(userId);//获取用户信息
			if(userDO.getUserStatus()==2){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该用户已被禁用不能绑卡"));
				return;
			}
			UserNormalDO userNormalDO = userService.getUserNormalByUserId(userDO.getUserId());
			if(userNormalDO==null){//判断是否为爱充app用户 
				isApp =0 ;
				UserCompanyDO userCompanyDO  = userService.getUserCompanyByUserId(userDO.getUserId());
				userCard.setUcCpyId(userCompanyDO.getCpyId().intValue());
			}else{
				isApp = 1;
				userCard.setUcCpyId(userNormalDO.getCpyId().intValue());
			}
			userCard.setUcExternalCardNumber(ucExternalCardNumber);
			userCard = userCardService.checkExternalCardNumber(userCard);
			if( userCard==null){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"外卡号不存在或卡渠道与用户不一致"));
				return;
			}
			if(userCard.getNewUserId()!=0){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该卡已经绑定用户"));
				return;
			}
			userCard.setIsApp(isApp);
			userCard.setModifier(loginUser.getUserAccount());
			BaseResultDTO resultDTO =userCardService.bindCard(userCard,userDO);
			if (resultDTO.isFailed()) {
				result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
			}
		} catch (Exception e) {
			log.error(this.getClass()+".userBindCard() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"绑定失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 卡主页 卡绑用户
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/cardBindUser")
	@ResponseBody
	public void cardBindUser(HttpServletRequest request,Long ucId,String userAccount) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new JsonResult();
		UserCardDO userCard = new UserCardDO();
		userCard.setUcId(ucId);
		try {
			if(userAccount.isEmpty()){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"账号为空，请重新输入"));
				return;
			}
			userCard = userCardService.getUserCard(userCard);
			if(userCard==null){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"卡主键不存在"));
				return;
			}
			if(userCard.getNewUserId()!=0){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该卡已经绑定用户"));
				return;
			}
			if(userCard.getUcCpyId()==0){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该卡还没有绑定公司"));
				return;
			}
			UserDO userDO = userMapper.selectUserByUserAccountAndCpyId(userAccount, userCard.getUcCpyId().longValue());//获取用户信息
			if(userDO==null){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该用户不存在或与卡渠道不一致"));
				return;
			}
			if(userDO.getUserStatus()==2){
				responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"该用户已被禁用不能绑卡"));
				return;
			}
			UserNormalDO userNormalDO = userService.getUserNormalByUserId(userDO.getUserId());
			if(userNormalDO==null){//判断是否为爱充app用户 
				userCard.setIsApp(0);
				userDO.setCpyId(userCard.getUcCpyId().longValue());
			}else{
				userCard.setIsApp(1);
				userDO.setCpyId(userNormalDO.getCpyId());
			}
			userCard.setModifier(loginUser.getUserAccount());
			BaseResultDTO resultDTO =userCardService.bindCard(userCard,userDO);
			if (resultDTO.isFailed()) {
				result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
			}
		} catch (Exception e) {
			log.error(this.getClass()+".cardBindUser() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"绑定失败"));
			return;
		}
		responseJson(result);
	}
	/**
	 * 卡主页基本信息 
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/getCardBasicInfo")
	@ResponseBody
	public void getCardBasicInfo(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		JsonResult batchResult = new JsonResult();
		batchResult.setSuccess(false);
		try {
			userCard =  userCardService.getCardBasicInfo(userCard);
			batchResult.setDataObject(UserCardVO.valueOf(userCard));
			batchResult.setSuccess(true);
		} catch (Exception e) {
			log.error(this.getClass()+".getCardBasicInfo() error:",e);
		}
		responseJson(batchResult);
	}
	/**
	 * 重置卡支付密码 
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/resetCardPassword")
	@ResponseBody
	public void resetCardPassword(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		JsonResult baseResult = new JsonResult();
		UserDO loginUser = getCurrentLoginUser();
		try {
			 userCard = userCardService.getUserCard(userCard); 
			 if(finAccountService.modifyFinAccountPwd(userCard.getAccountId(), loginUser)!=1){
				 responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"重置失败"));
				 return;
			 }
		} catch (Exception e) {
			log.error(this.getClass()+".resetCardPassword() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"重置卡支付密码失败"));
		}
		responseJson(baseResult);
	}
	
	/**
	 * 卡列表批量重置卡支付密码 
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/resetCardPasswordForList")
	@ResponseBody
	public void resetCardPasswordForList(String ids,String accountPwd,HttpServletRequest request) {
		UserDO loginUser = getCurrentLoginUser();
		JsonResult result = new  JsonResult() ;
		try {
			String[] idArr = ids.split(",");
			for(int i=0;i<idArr.length;i++){
				UserCardDO userCard = new UserCardDO();
				userCard.setUcId(Long.parseLong(idArr[i]));
				 userCard = userCardService.getUserCard(userCard); 
				 if(finAccountService.updateFinAccountPwd(userCard.getAccountId(),accountPwd, loginUser)!=1){
					 responseJson(new JsonResult(false,ResultCodeConstants.FAILED,userCard.getUcExternalCardNumber()+"重置失败"));
					 return;
				 }
			}
		} catch (Exception e) {
			log.error(this.getClass()+".resetCardPasswordForList() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"重置卡支付密码失败"));
			return;
		}
		responseJson(result);
	}

	/**
     * 导出卡信息
     */
    @RequestMapping(value = "/exportCard")
    @ResponseBody
    public void exportUser(HttpServletResponse response, UserCardDO searchModel) {
        UserDO loginUser = getCurrentLoginUser();
        try {
        	searchModel.setCpyIdList(loginUser.getCpyIdList());
            BaseResultDTO resultDTO = userCardService.exportCard(response, searchModel, loginUser);
            if (resultDTO.isFailed()) {
            	 ErrorHtmlUtil.createErrorPage(response, resultDTO.getErrorDetail());
            }
        } catch (Exception e) {
        	log.error(this.getClass()+".exportCard() error:",e);
            ErrorHtmlUtil.createErrorPage(response, "导出卡信息失败！");
        }
    }
    /**
	 * 公司主页 充点卡信息
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/getCardForCompany")
	@ResponseBody
	public void getCardForCompany(@ModelAttribute UserCardDO userCard,HttpServletRequest request) {
		JsonResult result = new JsonResult();
		Map<String, Integer> userCardMap =  new HashMap<String, Integer>();
		try {
			userCardMap = userCardService.getCardForCompany(userCard);
			result.setDataObject(userCardMap);
		} catch (Exception e) {
			log.error(this.getClass()+".getCardForCompany() error:",e);
		}
		responseJson(result);
	}
	
	/**
	 * 卡列表绑公司 
	 * @author mb
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/bindCompanyForCard")
	@ResponseBody
	public void bindCompanyForCard(String ids,Integer cpyNumber,Long levelId,Integer tradeType,HttpServletRequest request) {
		JsonResult result = new JsonResult();
		UserDO loginUser = getCurrentLoginUser();
		CompanyDO company = new CompanyDO();
		try {
			if (StringUtils.isBlank(ids)) {
				 responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"请选择充电卡"));
				 return;
            }
			company.setCpyNumber(cpyNumber);
			company = companyService.getCompanyByCpyInfo(company);
			if(company == null){
				 responseJson(new JsonResult(false,ResultCodeConstants.FAILED,"公司标识错误或公司状态不正常"));
				 return;
			}
			 BaseResultDTO resultDTO =userCardService.bindCompanyForCard(ids,company,loginUser,tradeType,levelId);
			if (resultDTO.isFailed()) {
			   responseJson(new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail()));
			   return;
            }
		} catch (Exception e) {
			log.error(this.getClass()+".bindCompanyForCard() error:",e);
			responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"卡列表绑公司失败"));
			 return;
		}
		responseJson(result);
	}
	
}