package com.wanma.ims.service.impl;

import com.google.common.base.Strings;
import com.wanma.ims.common.domain.CarInfoDO;
import com.wanma.ims.common.domain.UserDO;
import com.wanma.ims.common.dto.BaseResultDTO;
import com.wanma.ims.constants.ResultCodeConstants;
import com.wanma.ims.mapper.CarCompanyMapper;
import com.wanma.ims.mapper.CarInfoMapper;
import com.wanma.ims.service.CarInfoService;
import com.wanma.ims.util.SplitterUtil;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * Created by xyc on 2017/7/21.
 * 电动车型号逻辑处理接口
 */
@Service
public class CarInfoServiceImpl implements CarInfoService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CarInfoMapper carInfoMapper;
    @Autowired
    private CarCompanyMapper carCompanyMapper;

    @Override
    public List<CarInfoDO> getCarInfoList(CarInfoDO searchModel) {
        return carInfoMapper.getCarInfoList(searchModel);
    }

    @Override
    public long countCarInfo(CarInfoDO searchModel) {
        return carInfoMapper.countCarInfo(searchModel);
    }

    @Override
    public CarInfoDO getCarInfoById(Long carInfoId) {
        CarInfoDO carInfo = carInfoMapper.selectCarInfoById(carInfoId);
        carInfo.setCarCompanyName(carCompanyMapper.selectCarCompanyById((long) carInfo.getCarCompanyId()).getName());
        return carInfo;
    }

    @Override
    @Transactional
    public BaseResultDTO addCarInfo(CarInfoDO carInfo, UserDO loginUser) {
        if (carInfo == null) {
            LOGGER.warn(this.getClass() + "-addCarInfo is error, newCarInfo is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加电动车型号失败，电动车型号不能为空！");
        }

        CarInfoDO searchModel = new CarInfoDO();
        searchModel.setStyleName(carInfo.getStyleName());
        if (CollectionUtils.isNotEmpty(getCarInfoList(searchModel))) {
            LOGGER.warn(this.getClass() + "-addCarInfo is error, carInfo styleName is not unique|addCarInfo={}|loginUser={}", carInfo, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加电动车型号失败，电动车类型名称已存在！");
        }

        carInfo.setCarStatus(0);
        carInfo.setBatteryType(0);

        if (carInfoMapper.insertCarInfo(carInfo) < 1) {
            LOGGER.warn(this.getClass() + "-addCarInfo is error, insert carInfo to db is error|addCarInfo={}|loginUser={}", carInfo, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "添加电动车型号失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Override
    @Transactional
    public BaseResultDTO modifyCarInfo(CarInfoDO carInfo, UserDO loginUser) {
        if (carInfo == null) {
            LOGGER.warn(this.getClass() + "-modifyCarInfo is error, modifyCarInfo is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改电动车型号失败，被修改的电动车型号不能为空！");
        }

        CarInfoDO oldCarInfo = carInfoMapper.selectCarInfoById(carInfo.getId());
        if (oldCarInfo == null) {
            LOGGER.warn(this.getClass() + "-modifyCarInfo is error, oldCarInfo is null|carInfo={}|loginUser={}", carInfo, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改电动车型号失败，被修改的电动车型号不存在！");
        }

        CarInfoDO searchModel = new CarInfoDO();
        searchModel.setStyleName(carInfo.getStyleName());
        List<CarInfoDO> carInfoList = getCarInfoList(searchModel);
        if (CollectionUtils.isNotEmpty(carInfoList)) {
            for (CarInfoDO oldCar : carInfoList) {
                if (!Objects.equals(oldCar.getId(), carInfo.getId())) {
                    LOGGER.warn(this.getClass() + "-modifyCarInfo is error, carInfo styleName is not unique|carInfo={}|loginUser={}", carInfo, loginUser);
                    return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改电动车型号失败，电动车类型名称已存在！");
                }
            }
        }

        if (carInfoMapper.updateCarInfoByIdSelective(carInfo) < 1) {
            LOGGER.warn(this.getClass() + "-modifyCarInfo is error, update carInfo to db is error|carInfo={}|loginUser={}", carInfo, loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "修改电动车型号失败，请刷新页面后重试！");
        }

        return new BaseResultDTO();
    }

    @Override
    @Transactional
    public BaseResultDTO delCarInfo(String carInfoIds, UserDO loginUser) {
        if (Strings.isNullOrEmpty(carInfoIds)) {
            LOGGER.warn(this.getClass() + "-delCarInfo is error, delCarInfoIds is null|loginUser={}", loginUser);
            return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除电动车型号失败，电动车型号id不能为空！");
        }

        List<Long> carInfoIdList = SplitterUtil.splitToLongList(carInfoIds, ",", null);

        for (Long carInfoId : carInfoIdList) {
            CarInfoDO oldCarInfo = carInfoMapper.selectCarInfoById(carInfoId);
            if (oldCarInfo == null) {
                LOGGER.warn(this.getClass() + "-delCarInfo is error, oldCarInfo is null|delCarInfoId={}|loginUser={}", carInfoId, loginUser);
                return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除电动车型号失败，被删除的电动车型号不存在！");
            }

            if (carInfoMapper.deleteCarInfoById(carInfoId) < 1) {
                LOGGER.warn(this.getClass() + "-delCarInfo is error, del carInfo to db is error|delCarInfoId={}|loginUser={}", carInfoId, loginUser);
                return new BaseResultDTO(false, ResultCodeConstants.FAILED, "删除电动车型号失败，请刷新页面后重试！");
            }
        }
        return new BaseResultDTO();
    }
}
