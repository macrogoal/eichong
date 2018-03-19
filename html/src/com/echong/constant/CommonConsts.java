package com.echong.constant;

import com.google.common.base.Strings;
import com.echong.common.MessageManager;

/**
 * Created by zangyaoyi on 2016/12/30.
 */
public class CommonConsts {
    //e充网配置文件
    public static String E_CHONG_APP_ID = "";
    public static String E_CHONG_APP_KEY = "";
    public static String E_CHONG_PILESTATE_URL = "";
    public static String E_CHONG_CALLBACK_URL = "";
    public static String E_CHONG_PILECHARGEREALTIME_URL = "";
    public static String E_CHONG_BILL_URL = "";
    public static String E_CHONG_STATUS_CHANGE_URL = "";
    public static String E_CHONG_ORG = "";

    static {
        if (Strings.isNullOrEmpty(E_CHONG_APP_ID) || Strings.isNullOrEmpty(E_CHONG_APP_KEY)) {
            MessageManager manager = MessageManager.getMessageManager();
            E_CHONG_APP_ID = manager.getEChongProperties(EChongWangConsts.APP_ID);
            E_CHONG_APP_KEY = manager.getEChongProperties(EChongWangConsts.APP_KEY);
            E_CHONG_PILESTATE_URL = manager.getEChongProperties(EChongWangConsts.PILESTATE_URL);
            E_CHONG_CALLBACK_URL = manager.getEChongProperties(EChongWangConsts.CALLBACK_URL);
            E_CHONG_PILECHARGEREALTIME_URL = manager.getEChongProperties(EChongWangConsts.PILECHARGEREALTIME_URL);
            E_CHONG_BILL_URL = manager.getEChongProperties(EChongWangConsts.BILL_URL);
            E_CHONG_STATUS_CHANGE_URL = manager.getEChongProperties(EChongWangConsts.STATUS_CHANGE_URL);
            E_CHONG_ORG = manager.getEChongProperties(EChongWangConsts.ORG);
        }

    }

}

