package com.wanma.ims.util;

import com.google.common.base.Strings;
import com.wanma.ims.common.domain.ElectricPileDO;
import com.wanma.ims.constants.WanmaConstants;

import java.util.Date;
import java.util.Objects;
import java.util.Random;
import java.util.UUID;

/**
 * 主键 生成工具
 */
public class PKUtil {
    /**
     * menu_id,菜单ID
     * 以62进制（字母加数字）生成19位UUID，最短的UUID
     *
     * @return
     */
    public static String generatePkMenuId() {
        UUID uuid = UUID.randomUUID();
        StringBuilder sb = new StringBuilder();
        sb.append(digits(uuid.getMostSignificantBits() >> 32, 8));
        sb.append(digits(uuid.getMostSignificantBits() >> 16, 4));
        sb.append(digits(uuid.getMostSignificantBits(), 4));
        sb.append(digits(uuid.getLeastSignificantBits() >> 48, 4));
        sb.append(digits(uuid.getLeastSignificantBits(), 12));
        return sb.toString();
    }

    private static String digits(long val, int digits) {
        long hi = 1L << (digits * 4);
        return NumbersUtil.toString(hi | (val & (hi - 1)), NumbersUtil.MAX_RADIX)
                .substring(1);
    }

    /**
     * role_id,角色ID
     * 10位随机数
     *
     * @return
     */
    public static String generatePkRoleId() {
        return getRandomKey(10);
    }

    public static String getRandomKey(int length) {
        Random randGen = null;
        char[] numbersAndLetters = null;
        if (length < 1) {
            return null;
        }

        randGen = new Random();
        numbersAndLetters = ("0123456789abcdefghijklmnopqrstuvwxyz"
                + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").toCharArray();

        char[] randBuffer = new char[length];
        for (int i = 0; i < randBuffer.length; i++) {
            randBuffer[i] = numbersAndLetters[randGen.nextInt(71)];
        }
        return new String(randBuffer);
    }

    /**
     * 生成电桩编码
     */
    public static void generateElectricPileCode(ElectricPileDO electricPile) {
        String code = electricPile.getCode();
        if (Strings.isNullOrEmpty(code)) {
            code = "0000001";
        } else {
            int a = Integer.parseInt(code) + 1;
            code = String.format("%07d", a);
        }
        String chargingMethod = "";
        if (Objects.equals(electricPile.getChargingMethod(), WanmaConstants.CHARGE_MODE_DC)) {
            chargingMethod = WanmaConstants.ELECTRIC_TYPE_DIRECT;
        } else if (Objects.equals(electricPile.getChargingMethod(), WanmaConstants.CHARGE_MODE_AC)) {
            chargingMethod = WanmaConstants.ELECTRIC_TYPE_COMMUNICATION;
        }
        // 订单编号 (6位地区编号+1位电桩类型（直流|交流）+ 2位厂家编号 + 7位序号（一个地区下面的电桩排序号）)
        code = electricPile.getAreaCode() + chargingMethod + electricPile.getPileMakerRemark() + code;
        electricPile.setCode(code);
    }

    /**
     * <p>Description: 生成资金账户号</p>
     * 规则：  FA + 标识位：1.用户  2.公司 3.卡 + 标识位对应的ID(需补足5位) + 年月日时分秒毫秒的时间戳 + 修改的版本号
     *
     * @param
     * @author bingo
     * @date 2017-7-4
     */
    public static String generateAccountNo(Long id, Integer sysType) {
        StringBuffer accountNO = new StringBuffer();
        accountNO.append("FA");
        accountNO.append(sysType);

        String strId = String.valueOf(id);
        int length = strId.length();
        String newId = "";
        if (sysType == 2) {
            newId = length == 1 ? ("0000" + strId) : length == 2 ? ("000" + strId) : length == 3 ? ("00" + strId) : length == 4 ? ("0" + strId) : strId;
        } else {
            newId = "0" + strId;
        }
        accountNO.append(newId);

        accountNO.append(DateUtil.getNow("yyyyMMddHHmmssSSS"));
        accountNO.append("10");

        return accountNO.toString();
    }

    /**
     * 生成不带-的UUID
     *
     * @return UUID
     */
    public static String getUUID() {
        // 返回用UUID
        String uuidResult;
        // 临时用UUID
        String uuidTemp;
        // 取得UUID存储到临时用UUID
        uuidTemp = UUID.randomUUID().toString();

        // 替换掉所有-字符
        uuidResult = uuidTemp.replaceAll("-", "");

        // 返回UUID
        return uuidResult;
    }

    /**
     * <p>Description: 生成交易流水</p>
     * 规则：  PH + 标识位对应的ID(需补足5位) + 年月日时分秒毫秒的时间戳 + 修改的版本号
     *
     * @param
     * @author bingo
     * @date 2017-7-4
     */
    public static String generatePhNo() {
        StringBuffer phNo = new StringBuffer();
        phNo.append("PH");
        phNo.append(getRandomNumberKey(6));
        phNo.append(DateUtil.getNow("yyyyMMddHHmmssSSS"));
        phNo.append("10");

        return phNo.toString();
    }

    private static String getRandomNumberKey(int strLength) {
        Random rm = new Random();
        double pross = (1 + rm.nextDouble()) * Math.pow(10, strLength);
        String fixLenthString = String.valueOf(pross);
        // 返回固定的长度的随机数  
        return fixLenthString.substring(1, strLength + 1);
    }

    /**
     * 地锁编码生成
     * 生成规则为2位版本号(01)加上8位时间(20180125)加上2位parkingLockPlatformId长度(02)加上parkingLockPlatform(1)加上platformLockKey(123456)
     */
    public static String generateParkingLockCode(Long platformId, String platformLockKey) {
        String versions01 = "01";
        String lockCode;
        String generateTime = DateUtil.format(new Date(), "yyyyMMdd");
        Integer idLength = platformId.toString().length();
        String platformIdLength = "0";
        if (idLength < 10) {
            platformIdLength += idLength.toString();
        } else {
            platformIdLength = idLength.toString();
        }
        lockCode = versions01 + generateTime + platformIdLength + platformId + platformLockKey;
        return lockCode;
    }
}
