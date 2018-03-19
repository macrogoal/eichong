package com.wanma.ims.controller.config.app;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.wanma.ims.common.domain.AppButtonDO;
import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.common.dto.ResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.AppButtonService;



/**
 * app首页功能按钮
 */
@Controller
@RequestMapping("/manage/app/appButton")
public class AppButtonController extends BaseController {
	// 日志输出对象
		private static Logger log = Logger.getLogger(AppButtonController.class);
		@Autowired
		private AppButtonService appButtonService;
	/**
	 * Button列表
	 * @author mb
	 * @param 
	 * @return
	 */
		@RequestMapping(value = "/getAppButtonList")
		@ResponseBody
		public void getAppButtonList(@ModelAttribute("pager") Pager pager,
				@ModelAttribute AppButtonDO appButtonDO,HttpServletRequest request) {
			JsonResult result = new JsonResult();
			List<AppButtonDO> appButtonList = null;
			long total = 0;
			try {
				total = appButtonService.selectAppButtonCount(appButtonDO);
				if (total <= pager.getOffset()) {
					pager.setPageNo(1L);
				}
				appButtonDO.setPager(pager);
				appButtonList = appButtonService.selectAppButtonList(appButtonDO);
				pager.setTotal(total);
				result.setDataObject(appButtonList);
				result.setPager(pager);
			} catch (Exception e) {
				log.error(this.getClass()+".getAppButtonList() error:",e);
			}
			responseJson(result);
			
		}
		/**
		 * 新增Button
		 * @author mb
		 * @param 
		 * @return
		 */
			@RequestMapping(value = "/addAppButton", method = RequestMethod.POST)
			@ResponseBody
			public void addAppButton(@ModelAttribute AppButtonDO appButtonDO,@RequestParam(value = "file", required = false) MultipartFile[] file,HttpServletRequest request){
				JsonResult result = new JsonResult();
				try {
					BaseResultDTO resultDTO  =appButtonService.addAppButton(appButtonDO,file,getCurrentLoginUser());
				    if (resultDTO.isFailed()) {
		                result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
		            }
				} catch (Exception e) {
					log.error(this.getClass()+".addAppButton() error:",e);
					responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,e.getMessage()));
					return;
				}
				responseJson(result);	
			}
		/**
		 * 根据button主键获取信息
		 * @author mb
		 * @param 
		 * @return
		 */
			@RequestMapping(value = "/getAppButtonById")
			@ResponseBody
			public void getAppButtonById(@ModelAttribute AppButtonDO appButtonDO,HttpServletRequest request){
				JsonResult result = new JsonResult();
				try {
					appButtonDO = appButtonService.getAppButtonById(appButtonDO);
					result.setDataObject(appButtonDO);
				} catch (Exception e) {
					log.error(this.getClass()+".getAppbuttonById() error:",e);
					responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"获取button失败"));
					return;
				}
				responseJson(result);	
			}
		/**
		 * 编辑button
		 * @author mb
		 * @param 
		 * @return
		 */
		@RequestMapping(value = "/editAppButton", method = RequestMethod.POST)
		@ResponseBody
		public void editAppButton(@ModelAttribute AppButtonDO appButtonDO,@RequestParam(value = "file", required = false) MultipartFile[] file,HttpServletRequest request){
			JsonResult result = new JsonResult();
			try {
				AppButtonDO appButtonDO2 = appButtonService.getAppButtonById(appButtonDO);
				int oldButtonStatus = appButtonDO2.getButtonStatus();
				int newButtonStatus = appButtonDO.getButtonStatus();
				if(oldButtonStatus==3&&newButtonStatus==1){
					appButtonDO.setButtonSort(99);
				}else{
					appButtonDO.setButtonSort(appButtonDO2.getButtonSort());
				}
				BaseResultDTO resultDTO = appButtonService.updateButton(appButtonDO,file,getCurrentLoginUser());
				if (resultDTO.isFailed()) {
		                result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
		        }
			} catch (Exception e) {
				log.error(this.getClass()+".editAppButton() error:",e);
				responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"编辑Button失败"));
				return;
			}
			responseJson(result);	
		}
			/**
			 * 下架button
			 * @author mb
			 * @param 
			 * @return
			 */
				@RequestMapping(value = "/downAppButton")
				@ResponseBody
				public void downAppButton(@ModelAttribute AppButtonDO appButtonDO,HttpServletRequest request){
					JsonResult result = new JsonResult();
					try {
						AppButtonDO appButtonDO2 = appButtonService.getAppButtonById(appButtonDO);
						if(appButtonDO2.getButtonStatus()==3){
							responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"已关闭的不能下架"));
							return;
						}
						if(!appButtonService.downAppButton(appButtonDO)){
							responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"下架Button失败"));
							return;
						};
					} catch (Exception e) {
						log.error(this.getClass()+".downAppButton() error:",e);
						responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"下架Button失败"));
						return;
					}
					responseJson(result);	
				}
			/**
			 * 删除button
			 * @author mb
			 * @param 
			 * @return
			 */
				@RequestMapping(value = "/deleteAppButton")
				@ResponseBody
				public void deleteAppButton(@ModelAttribute AppButtonDO appButtonDO,HttpServletRequest request){
					JsonResult result = new JsonResult();
					try {
						if(!appButtonService.deleteAppButton(appButtonDO)){
							responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"删除Button失败"));
							return;
						};
					} catch (Exception e) {
						log.error(this.getClass()+".deleteAppButton() error:",e);
						responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"删除Button失败"));
						return;
					}
					responseJson(result);	
				}	
	/**
	 * 修改顺序
	 * @author mb
	 * @param 
	 * @return
	 */
		@RequestMapping(value = "/editButtonOrder")
		@ResponseBody
		public void editButtonOrder(String pkButtonId,String newButtonSort,HttpServletRequest request){
			JsonResult result = new JsonResult();
			try {
				AppButtonDO appButtonDO = new AppButtonDO();
				appButtonDO.setPkButtonId(Integer.parseInt(pkButtonId));
				appButtonDO.setButtonSort(Integer.parseInt(newButtonSort));
				if(!appButtonService.changeButtonSort(appButtonDO)){
					responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"修改Button顺序失败"));
					return;
				};
			} catch (Exception e) {
				log.error(this.getClass()+".editButtonOrder() error:",e);
				responseJson(new JsonResult(false,ResultCodeConstants.EXCEPTION,"修改顺序失败"));
				return;
			}
			responseJson(result);	
		}
						
}
