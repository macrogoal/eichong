package com.wanma.ims.mapper;

import com.wanma.ims.common.domain.CompanyDO;

import java.util.List;
import java.util.Map;

/**
 * 公司Mapper
 *
 * @author zcy
 * @version V1.0
 * @date 2017年5月26日
 */
public interface CompanyMapper {
    /**
     * 系统管理员-查看渠道权限
     *
     * @param
     */
    public List<CompanyDO> selectCpyListBySystem(Map<String, String> map);

    /**
     * 投资公司-业务管理员
     *
     * @param
     */
    public List<CompanyDO> selectCpyListByWork(Map<String, String> map);
    /**
     * 投资公司-查看渠道权限
     * @param
     */
//	public List<CompanyDO> selectCpyListByInvest(Map<String,String> map);
    /**
     * 合作商公司-查看渠道权限
     * @param
     */
//	public List<CompanyDO> selectCpyListByOperate(Map<String,String> map);

    /**
     * 桩主公司-查看渠道权限
     *
     * @param
     */
    public List<CompanyDO> selectCpyListByOwner(Map<String, String> map);

    /**
     * 根据Ids查看渠道信息
     *
     * @param
     */
    public List<CompanyDO> selectCpyListByIds(List<Long> list);

    /**
     * 根据Id查看渠道信息
     *
     * @param
     */
    public CompanyDO selectCpyListById(Long cpyId);

    /**
     * 分页-统计
     */
    public Long countCompanyList(CompanyDO companyDO);

    /**
     * 分页-查询
     */
    public List<CompanyDO> selectCompanyList(CompanyDO companyDO);

    /***
     * 公司-新增
     */
    public Integer insertCompany(CompanyDO companyDO);

    /**
     * 公司-编辑
     */
    public Integer updateCompany(CompanyDO companyDO);

    /**
     * 公司-用户状态
     */
    public void updateUserStatusByCpyId(Long cpyId, int state);

    /**
     * 公司-校验唯一性
     */
    public Integer checkCompanyUnique(Map<String, String> param);

    /**
     * 公司-联营合作商
     */
    public List<CompanyDO> selectOperateCompanyList();

    /**
     * 公司-管理单位
     */
    public List<CompanyDO> selectCpyListByMaster(Long cpyId);

    /**
     * 公司-查询
     */
    public CompanyDO selectCompanyByCpyInfo(CompanyDO companyDO);

    /**
     * 根据公司名称获取公司列表
     */
    public List<CompanyDO> getCompanyListByCpyName(CompanyDO companyDO);

    /**
     * 根据cpyNumber公司标识查看渠道信息
     */
    public CompanyDO selectCompanyByCpyNumber(Integer cpyNumber);
}
