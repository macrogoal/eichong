package com.wanma.ims.controller.sys;

import com.wanma.ims.common.domain.VersionDO;
import com.wanma.ims.common.domain.UserDO;

import com.wanma.ims.common.domain.base.Pager;
import com.wanma.ims.common.dto.BaseResultDTO;

import com.wanma.ims.controller.BaseController;
import com.wanma.ims.controller.result.JsonException;
import com.wanma.ims.controller.result.JsonResult;
import com.wanma.ims.service.VersionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by xyc on 2017/7/21.
 * APP版本controller
 */
@RequestMapping("/manage/version")
@Controller
public class VersionController extends BaseController {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private VersionService versionService;

    /**
     * 查询APP版本列表
     */
    @RequestMapping(value = "/getVersionList", method = RequestMethod.POST)
    @ResponseBody
    public void getVersionList(VersionDO searchModel, Pager pager) {
        JsonResult result = new JsonResult();
        UserDO loginUser = getCurrentLoginUser();

        try {
            long total = versionService.countVersion(searchModel);
            if (total <= pager.getOffset()) {
                pager.setPageNo(1L);
            }
            pager.setTotal(total);
            searchModel.setPager(pager);
            List<VersionDO> VersionList = versionService.getVersionList(searchModel);
            result.setPager(pager);
            result.setDataObject(VersionList);

            responseJson(result);
        } catch (Exception e) {
            LOGGER.error(this.getClass() + "-getVersionList is error|searchModel={}|loginUser={}", searchModel, loginUser, e);
            responseJson(new JsonException("查询APP版本列表失败，请刷新页面后重试！"));
        }
    }

    /**
     * 获取当前最大APP版本号
     */
    @RequestMapping(value = "/getMaxVersionNum", method = RequestMethod.POST)
    @ResponseBody
    public void getMaxVersionNum(Integer versType) {
        JsonResult result = new JsonResult();
        try {
            result.setDataObject(versionService.getMaxVersionNum(versType));
            responseJson(result);
        } catch (Exception e) {
            LOGGER.error(this.getClass() + "-getMaxVersionNum is error|loginUser={}", getCurrentLoginUser(), e);
            responseJson(new JsonException("获取当前最大APP版本号失败，请刷新页面后重试！"));
        }
    }

    /**
     * 新增APP版本
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public void addVersion(VersionDO version) {
        JsonResult result = new JsonResult();
        UserDO loginUser = getCurrentLoginUser();

        try {
            BaseResultDTO resultDTO = versionService.addVersion(version, loginUser);
            if (resultDTO.isFailed()) {
                result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
            }

            responseJson(result);
        } catch (Exception e) {
            LOGGER.error(this.getClass() + "-addVersion is error|addVersion={}|loginUser={}", version, loginUser, e);
            responseJson(new JsonException("添加失败，请刷新页面后重试！"));
        }
    }

    /**
     * 删除APP版本
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public void delVersion(String versionIds) {
        JsonResult result = new JsonResult();
        UserDO loginUser = getCurrentLoginUser();

        try {
            BaseResultDTO resultDTO = versionService.delVersion(versionIds, loginUser);
            if (resultDTO.isFailed()) {
                result = new JsonResult(false, resultDTO.getResultCode(), resultDTO.getErrorDetail());
            }

            responseJson(result);
        } catch (Exception e) {
            LOGGER.error(this.getClass() + "-delVersion is error|delVersionIds={}|loginUser={}", versionIds, loginUser, e);
            responseJson(new JsonException("删除失败，请刷新页面后重试！"));
        }
    }
}
