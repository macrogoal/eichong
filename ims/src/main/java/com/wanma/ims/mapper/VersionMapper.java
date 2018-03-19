package com.wanma.ims.mapper;


import com.wanma.ims.common.domain.VersionDO;

import java.util.List;

public interface VersionMapper {
    int deleteVersionById(Long id);

    int insertVersion(VersionDO version);

    VersionDO selectVersionById(Long id);

    List<VersionDO> selectVersionList(VersionDO version);

    long countVersion(VersionDO version);

    Long selectMaxVersionNum(Integer versType);

    int updateVersionByIdSelective(VersionDO version);
}