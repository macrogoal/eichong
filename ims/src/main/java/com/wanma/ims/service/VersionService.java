package com.wanma.ims.service;

import com.wanma.ims.common.domain.VersionDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.dto.BaseResultDTO;

import java.util.List;

/**
 * Created by xyc on 2017/7/21.
 * APP版本逻辑处理接口
 */
public interface VersionService {

    /**
     * 获取APP版本列表
     */
    List<VersionDO> getVersionList(VersionDO searchModel);

    /**
     * 获取标APP版本总数
     */
    long countVersion(VersionDO searchModel);

    /**
     * 获取当前最大APP版本号
     */
    long getMaxVersionNum(Integer versType);

    /**
     * 新增单个APP版本
     */
    BaseResultDTO addVersion(VersionDO version, UserDO loginUser);

    /**
     * 删除APP版本
     */
    BaseResultDTO delVersion(String versionIds, UserDO loginUser);
}