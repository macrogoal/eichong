package com.sgcc.controller;

import com.sgcc.service.SGCCService;
import com.sgcc.utils.AppTool;
import com.sgcc.utils.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by zangyaoyi on 2016/12/29.
 */
@Controller
@Scope(WebApplicationContext.SCOPE_REQUEST)
public class SGCCController {
    protected final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private SGCCService sgccService;

    @RequestMapping(value = "/sgcc", method = RequestMethod.POST)
    @ResponseBody
    String index(Date beginTime, Date endTime) {
        if (null == beginTime) {
            Calendar yesterdayBeginTime = Calendar.getInstance();
            DateUtil.getYesterdayStartTime(yesterdayBeginTime);
            beginTime = yesterdayBeginTime.getTime();
        }
        if (null == endTime) {
            Calendar yesterdayEndTime = Calendar.getInstance();
            DateUtil.getYesterdayEndTime(yesterdayEndTime);
            endTime = yesterdayEndTime.getTime();
        }
        beginTime = DateUtil.getDailyStartTime(beginTime);
        endTime = DateUtil.getDailyEndTime(endTime);
        String accessToken = AppTool.ensureToken();
        sgccService.syncStationInfo(accessToken, beginTime, endTime);
        sgccService.syncEquipmentInfo(accessToken, beginTime, endTime);
        sgccService.syncConnectorInfo(accessToken, beginTime, endTime);
        sgccService.syncStationStatsInfo(accessToken, beginTime, endTime);
        sgccService.syncEquipmentStatsInfo(accessToken, beginTime, endTime);
        return "success";
    }

}
