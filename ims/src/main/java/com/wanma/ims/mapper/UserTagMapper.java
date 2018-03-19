package com.wanma.ims.mapper;

import com.wanma.ims.common.domain.TagDO;
import com.wanma.ims.common.domain.UserTagDO;

import java.util.List;

public interface UserTagMapper {
    List<UserTagDO> getUserTagList(UserTagDO searchModel);

    int deleteByTagId(UserTagDO userTag);

    int deleteById(UserTagDO userTag);

    int insertUserTag(UserTagDO userTag);

    TagDO selectUserTagById(Long id);

    int updateUserTagByIdSelective(UserTagDO userTag);

    int updateUserTagById(UserTagDO userTag);
}