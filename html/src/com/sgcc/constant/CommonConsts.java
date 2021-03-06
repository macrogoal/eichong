package com.sgcc.constant;

import com.echong.common.MessageManager;
import com.google.common.base.Strings;

/**
 * Created by zangyaoyi on 2016/12/30.
 */
public class CommonConsts {
    public static String SGCC_IS_TEST = "";
    //国网配置文件
    /**
     * API测试地址
     */
    public static String SGCC_BASE_URL = "";
    /**
     * 运营商标识（OperatorID）: 固定9位，运营商的组织机构代码，作为运营商的唯一标示
     */
    public static String SGCC_OPERATOR_ID = "";
    /**
     * 运营商密钥（Operator_Secret）
     */
    public static String SGCC_OPERATOR_SECRET = "";
    /**
     * 消息密钥（Data_Secret
     */
    public static String SGCC_DATA_SECRET = "";
    /**
     * 签名密钥（Sig_Secret
     */
    public static String SGCC_SIG_SECRET = "";
    /**
     * 消息密钥初始化向量（Data_Secret_IV）
     */
    public static String SGCC_DATA_SECRET_IV = "";
    public static String SGCC_QUERY_TOKEN = "query_token";
    public static String SGCC_SYNC_STATION_INFO = "sync_station_info";
    public static String SGCC_SYNC_STATION_STATS_INFO = "sync_station_stats_info";
    public static String SGCC_SYNC_EQUIPMENT_INFO = "sync_equipment_info";
    public static String SGCC_SYNC_EQUIPMENT_STATS_INFO = "sync_equipment_stats_info";
    public static String SGCC_SYNC_CONNECTOR_INFO = "sync_connector_info";
    public static String SGCC_SYNC_TIME = "sgcc:sync:time";
    public static String SGCC_COMPANY_NUMBER = "";


    static {
        if (Strings.isNullOrEmpty(SGCC_BASE_URL) || Strings.isNullOrEmpty(SGCC_DATA_SECRET_IV)) {
        	SGCC_IS_TEST= MessageManager.getSystemProperties("environment.is.formal");
            SGCC_BASE_URL = MessageManager.getSGCCProperties(SGCCWangConsts.BASE_URL);
            SGCC_OPERATOR_ID = MessageManager.getSGCCProperties(SGCCWangConsts.OPERATOR_ID);
            SGCC_OPERATOR_SECRET = MessageManager.getSGCCProperties(SGCCWangConsts.OPERATOR_SECRET);
            SGCC_DATA_SECRET = MessageManager.getSGCCProperties(SGCCWangConsts.DATA_SECRET);
            SGCC_SIG_SECRET = MessageManager.getSGCCProperties(SGCCWangConsts.SIG_SECRET);
            SGCC_DATA_SECRET_IV = MessageManager.getSGCCProperties(SGCCWangConsts.DATA_SECRET_IV);
            SGCC_COMPANY_NUMBER = MessageManager.getSGCCProperties(SGCCWangConsts.COMPANY_NUMBER);
        }

    }

}

