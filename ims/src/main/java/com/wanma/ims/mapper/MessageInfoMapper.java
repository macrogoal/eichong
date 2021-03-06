package com.wanma.ims.mapper;

import java.util.List;
import java.util.Map;

import com.wanma.ims.common.domain.MessageInfoDO;



public interface MessageInfoMapper {

	List<MessageInfoDO> selectMessageInfoList(MessageInfoDO messageInfoDO);

	int insertMessageInfo(MessageInfoDO messageInfo);

	String getMprName(int powerstationId);

	void relationPowerStation(MessageInfoDO messageInfo);

	long selectMessageInfoCount(MessageInfoDO messageInfoDO);

	List<Object> getpowerstation(Map<String, String> params);

	MessageInfoDO getMessageInfoById(String pkMessageInfoId);

	List<Map<String, Object>> getPowerstationById(Integer pkMessageInfoId);

	void updateMessageInfo(MessageInfoDO messageInfo);

	String getMprNameByPkPowerstation(String id);

	void removeRelationPowerStation(MessageInfoDO messageInfo);

	int closeMessageInfoById(String pkMessageInfoId);

	boolean deleteMessageInfoById(String pkMessageInfoId);

	boolean deleteMessageInfoPointById(String pkMessageInfoId);

	
	
	
}
