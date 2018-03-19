package com.wanma.ims.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Strings;
import com.wanma.ims.common.domain.TagDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.domain.UserTagDO;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.constants.WanmaConstants;
import com.wanma.ims.mapper.TagMapper;
import com.wanma.ims.mapper.UserTagMapper;
import com.wanma.ims.service.TagService;
import com.wanma.ims.util.SplitterUtil;

/**
 * Created by xyc on 2017/7/21.
 * 标签逻辑处理类
 */
@Service
public class TagServiceImpl implements TagService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TagMapper tagMapper;
    @Autowired
    private UserTagMapper userTagMapper;

    @Override
    public List<UserTagDO> getUserTagList(UserTagDO searchModel) {
        if (searchModel == null) {
            LOGGER.warn(this.getClass() + "-getUserTagList is warn, searchModel is null");
            return new ArrayList<>();
        }

        List<UserTagDO> resultList = userTagMapper.getUserTagList(searchModel);
        Map<Long, String> tagMap = new HashMap<>();
        Long tagId;
        for (UserTagDO userTag : resultList) {
            tagId = userTag.getTagId();
            if (Strings.isNullOrEmpty(tagMap.get(tagId))) {
                TagDO tag = tagMapper.selectTagById(tagId);
                tagMap.put(tag.getId(), tag.getName());
            }

            userTag.setTagName(tagMap.get(tagId));
        }

        return resultList;
    }

    @Override
    public List<TagDO> getTagList(TagDO searchModel) {
        return tagMapper.getTagList(searchModel);
    }

    @Override
    public long countTag(TagDO searchModel) {
        return tagMapper.countTag(searchModel);
    }

    @Override
    @Transactional
    public BaseResultDTO addTag(TagDO tag, UserDO loginUser) {
        if (tag == null) {
            LOGGER.warn(this.getClass() + "-addTag is error, newTag is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加标签失败，标签不能为空！");
        }

        if (CollectionUtils.isNotEmpty(getTagList(tag))) {
            LOGGER.warn(this.getClass() + "-addTag is error, tagName is unique|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加标签失败，标签名已存在！");
        }

        tag.setIsDel(0);
        tag.setCreatorId(loginUser.getUserId());
        tag.setCreator(loginUser.getUserAccount());
        tag.setModifier(loginUser.getUserAccount());
        if (tagMapper.insertTag(tag) < 1) {
            LOGGER.warn(this.getClass() + "-addTag is error, insert tag to db is error|addTag={}|loginUser={}", tag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加标签失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Override
    @Transactional
    public BaseResultDTO addUserTag(UserTagDO userTag, UserDO loginUser) {
        if (userTag == null) {
            LOGGER.warn(this.getClass() + "-addUserTag is error, newUserTag is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加用户标签失败，用户标签不能为空！");
        }
        if (userTag.getUserId() == null) {
            LOGGER.warn(this.getClass() + "-addUserTag is error, userId is null|newUserTag={}|loginUser={}", userTag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加用户标签失败，请先选择用户再添加标签！");
        }
        if (userTag.getTagId() == null) {
            LOGGER.warn(this.getClass() + "-addUserTag is error, tagId is null|newUserTag={}|loginUser={}", userTag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加用户标签失败，添加标签不能为空！");
        }

        List<UserTagDO> oldUserTags = userTagMapper.getUserTagList(userTag);
        if (CollectionUtils.isNotEmpty(oldUserTags)) {
            LOGGER.warn(this.getClass() + "-addUserTag is error, oldUserTags is not null|oldUserTags={}|newUserTag={}|loginUser={}", oldUserTags, userTag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加用户标签失败，该标签已存在！");
        }

        userTag.setIsDel(0);
        userTag.setCreatorId(loginUser.getUserId());
        userTag.setCreator(loginUser.getUserAccount());
        userTag.setModifier(loginUser.getUserAccount());

        if (userTagMapper.insertUserTag(userTag) < 1) {
            LOGGER.warn(this.getClass() + "-addTag is error, insert tag to db is error|addUserTag={}|loginUser={}", userTag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加用户标签失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Override
    public TagDO getTag(Long tagId) {
        return tagMapper.selectTagById(tagId);
    }

    @Override
    @Transactional
    public BaseResultDTO modifyTag(TagDO tag, UserDO loginUser) {
        if (tag == null) {
            LOGGER.warn(this.getClass() + "-modifyTag is error, modifyTag is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改标签失败，被修改的标签不能为空！");
        }

        TagDO oldTag = tagMapper.selectTagById(tag.getId());
        if (oldTag == null) {
            LOGGER.warn(this.getClass() + "-modifyTag is error, oldTag is null|tag={}|loginUser={}", tag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改标签失败，被修改的标签不存在！");
        }

        tag.setModifier(loginUser.getUserAccount());
        if (tagMapper.updateTagByIdSelective(tag) < 1) {
            LOGGER.warn(this.getClass() + "-modifyTag is error, update tag to db is error|tag={}|loginUser={}", tag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改标签失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Override
    @Transactional
    public BaseResultDTO delTag(String tagIds, UserDO loginUser) throws Exception {
        if (Strings.isNullOrEmpty(tagIds)) {
            LOGGER.warn(this.getClass() + "-delTag is error, delTagIds is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，标签id不能为空！");
        }

        List<Long> tagIdList = SplitterUtil.splitToLongList(tagIds, ",", null);
        if (CollectionUtils.isEmpty(tagIdList)) {
            LOGGER.warn(this.getClass() + "-delTag is error, delTagIds is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，标签id不能为空！");

        }

        for (Long tagId : tagIdList) {
            TagDO oldTag = tagMapper.selectTagById(tagId);
            if (oldTag == null) {
                LOGGER.warn(this.getClass() + "-delTag is error, oldTag is null|delTagId={}|loginUser={}", tagId, loginUser);
                return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，被删除的标签不存在！");
            }

            oldTag.setModifier(loginUser.getUserAccount());
            if (tagMapper.deleteTag(oldTag) < 1) {
                LOGGER.warn(this.getClass() + "-delTag is error, del tag to db is error|delTagId={}|loginUser={}", tagId, loginUser);
                return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，请刷新页面后重试！");
            }

            delTagRelated(oldTag, loginUser);
        }

        return new BaseResultDTO();
    }

    @Transactional
    private BaseResultDTO delTagRelated(TagDO delTag, UserDO loginUser) {
        BaseResultDTO result = new BaseResultDTO();
        Integer tagType = delTag.getType();

        if (tagType == WanmaConstants.USER_TAG) {
            result = delUserTag(delTag, loginUser);
        }

        if (result.isFailed()) {
            rollBackTag(delTag, loginUser);
        }

        return result;
    }

    @Transactional
    private BaseResultDTO delUserTag(TagDO delTag, UserDO loginUser) {
        UserTagDO userTag = new UserTagDO();
        userTag.setTagId(delTag.getId());
        userTag.setModifier(loginUser.getUserAccount());

        List<UserTagDO> userTagList = userTagMapper.getUserTagList(userTag);
        if (CollectionUtils.isEmpty(userTagList)) {
            return new BaseResultDTO();
        }

        if (userTagMapper.deleteByTagId(userTag) < 1) {
            LOGGER.warn(this.getClass() + "-delUserTag is error, del userTag to db is error|delTag={}|loginUser={}", delTag, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Transactional
    private void rollBackTag(TagDO rollBackTag, UserDO loginUser) {
        TagDO tag = new TagDO();
        tag.setId(rollBackTag.getId());
        tag.setIsDel(0);
        tag.setModifier(loginUser.getUserAccount());

        if (tagMapper.updateTagByIdSelective(tag) < 1) {
            LOGGER.error(this.getClass() + "-rollBackTag is error, update tag to db is error|rollBackTag={}|loginUser={}", rollBackTag, loginUser);
        }
    }

    @Override
    @Transactional
    public BaseResultDTO delUserTag(String userTagIds, UserDO loginUser) {
        if (Strings.isNullOrEmpty(userTagIds)) {
            LOGGER.warn(this.getClass() + "-delUserTag is error, userTagIds is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除用户标签失败，用户标签id不能为空！");
        }

        List<Long> userTagIdList = SplitterUtil.splitToLongList(userTagIds, ",", null);
        if (CollectionUtils.isEmpty(userTagIdList)) {
            LOGGER.warn(this.getClass() + "-delUserTag is error, delTagIds is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除用户标签失败，用户标签id不能为空！");
        }

        for (Long userTagId : userTagIdList) {
            UserTagDO userTag = new UserTagDO();
            userTag.setId(userTagId);
            userTag.setModifier(loginUser.getUserAccount());

            if (userTagMapper.deleteById(userTag) < 1) {
                LOGGER.warn(this.getClass() + "-delUserTag is error, del tag to db is error|delTagId={}|loginUser={}", userTagId, loginUser);
                return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除标签失败，请刷新页面后重试！");
            }
        }
        return new BaseResultDTO();
    }
}