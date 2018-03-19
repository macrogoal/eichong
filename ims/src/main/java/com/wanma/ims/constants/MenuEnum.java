package com.wanma.ims.constants;

/**
 * 菜单图片URL 
 * (默认后台写死)
 */
public enum MenuEnum {
	
	 MENU_USER("用户管理","/static/images/menu/user.png"),
	 MENU_CARD("卡管理","/static/images/menu/card.png"),
	 MENU_COMPANY("公司管理","/static/images/menu/company.png"),
	 MENU_PERMISSION("权限管理","/static/images/menu/permission.png"),
	 MENU_ORDER("订单管理","/static/images/menu/order.png"),
	 MENU_ELECTRIC("站点桩体管理","/static/images/menu/electric.png"),
	 MENU_REPORT("统计报表","/static/images/menu/report.png"),
	 MENU_HISTORY("流水管理","/static/images/menu/history.png"),
	 MENU_FINANCE("财务管理","/static/images/menu/finance.png"),
	 MENU_ACCOUNT("资金账户管理","/static/images/menu/account.png"),
	 MENU_FIN("账务关系管理","/static/images/menu/fin.png"),
     MENU_APP("APP发布管理","/static/images/menu/app.png"),
     MENU_RATE("费率管理","/static/images/menu/rate.png"),
     MENU_TAG("标签管理","/static/images/menu/tag.png"),
     MENU_LEVEL("等级管理","/static/images/menu/level.png"),
     MENU_INTEGRAL("积分管理","/static/images/menu/integral.png"),
     MENU_COUPON("优惠券管理","/static/images/menu/coupon.png"),
     MENU_BASE("基础资料管理","/static/images/menu/base.png"),
     MENU_ACTIVITY("活动管理","/static/images/menu/activity.png"),
     MENU_VIN("盗刷校验管理","/static/images/menu/vin.png"),
	 MENU_WHITE_BLACK_USER("黑白名单管理","/static/images/menu/white_black_user.png"),
	 MENU_MONITOR("实时监控","/static/images/menu/monitor.png"),
	 MENU_PARKING_LOCK("地锁服务","/static/images/menu/parkingLock.png");
     
   
   private String menuName;
   private String menuImgUrl;
   
   private MenuEnum(String menuName,String menuImgUrl){
	   this.menuName = menuName;
	   this.menuImgUrl = menuImgUrl;
   }

   public static String getMenuUrl(String menuName) {  
       for (MenuEnum c : MenuEnum.values()) {  
           if (c.getMenuName().equals(menuName.trim())) {  
               return c.menuImgUrl;  
           }  
       }  
       return null;
    }  
   
	public String getMenuName() {
		return menuName;
	}
	
	
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	
	
	public String getMenuImgUrl() {
		return menuImgUrl;
	}
	
	
	public void setMenuImgUrl(String menuImgUrl) {
		this.menuImgUrl = menuImgUrl;
	}
	
}
