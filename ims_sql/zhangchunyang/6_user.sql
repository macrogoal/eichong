#基表
ALTER TABLE `tbl_user`
ADD COLUMN `user_idcard`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '身份证号' AFTER `user_status`,
ADD COLUMN `province_code`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '活动区域：省' AFTER `user_idcard`,
ADD COLUMN `city_code`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' COMMENT '活动区域：市' AFTER `province_code`,
ADD COLUMN `area_code`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci  DEFAULT '' COMMENT '活动区域：区域' AFTER `city_code`,
ADD COLUMN  `creator` varchar(32) DEFAULT '' COMMENT '创建人',
ADD COLUMN  `modifier` varchar(32) DEFAULT '' COMMENT '修改人',
CHANGE COLUMN createdate `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
CHANGE COLUMN updatedate `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
ADD COLUMN `user_head_img` smallint(1) DEFAULT '0' COMMENT '0.充充侠 1.用户自定义';
ALTER TABLE `tbl_user`
MODIFY COLUMN `user_id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID';

ALTER TABLE tbl_user
ADD COLUMN `level_id`  bigint(1) NULL DEFAULT 0 COMMENT '等级ID';

ALTER TABLE `tbl_user`
MODIFY COLUMN `user_leval`  smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户类别1：超级管理员 2：系统管理员  3:渠道用户  6:普通用户 7.卡默认用户 8.业务管理员' AFTER `user_password`;

#历史数据
#基表
UPDATE tbl_user tuser,tbl_user_normal_old normal 
   set tuser.user_idcard = normal.norm_id_card,
       tuser.province_code = normal.norm_p_code,
       tuser.city_code = normal.norm_c_code,
       tuser.area_code = normal.norm_a_code,
       tuser.level_id = (SELECT level_id FROM tbl_company cpy LEFT JOIN tbl_level lev on cpy.cpy_id = lev.cpy_id where cpy.cpy_number = 1000 and lev.is_default = 1)
   WHERE tuser.user_id = normal.user_id 
   and LENGTH(tuser.user_account) = 11;

#normal表
 insert into tbl_user_normal 
(user_id,norm_name,norm_real_name,norm_registe_type,norm_device_id,norm_email,norm_address,norm_phone,norm_sex,norm_birthday,norm_integrate,norm_car_company_id,norm_car_type_id,norm_vehicle_number,norm_plate_num,norm_driving_licence,apply_card,norm_origin,norm_invitePhone,account_id,cpy_id)
 select 
old.user_id,norm_name,norm_real_name,norm_registe_type,norm_device_id,norm_email,norm_address,'',norm_sex,norm_birthday,norm_integrate,norm_car_company_id,norm_car_type_id,norm_vehicle_number,norm_plate_num,
norm_driving_licence,apply_card,IFNULL(norm_origin,0),norm_invitePhone,0,0
from tbl_user_normal_old old,tbl_user tuser
where old.user_id = tuser.user_id
and   length(tuser.user_account) = 11;


Update tbl_user_normal normal,(select cpy_id from tbl_company where cpy_number = 1000) a 
set normal.cpy_id = a.cpy_id
where normal.cpy_id = 0;


#渠道用户
#微信***************************************
-- INSERT INTO `tbl_user` 
-- (`user_account`, `user_password`, `user_leval`, `user_status`, `user_idcard`, `province_code`, `city_code`, `area_code`,`gmt_create`,`gmt_modified`, `creator`, `modifier`, `user_head_img`, `level_id`) 
-- SELECT 
-- chor_parter_user_logo,'e10adc3949ba59abbe56e057f20f883e','3','1','',NULL,NULL,NULL,NOW(),NOW(),'admin','admin','0','0'
-- FROM tbl_chargingorder WHERE chOr_OrgNo = 9006
-- GROUP BY chor_parter_user_logo;
-- #渠道用户表
-- INSERT INTO tbl_user_company
-- (user_id,cpy_Id,user_cpy_name,user_cpy_phone,account_id,creator,MODIFIER,gmt_create,gmt_modified)
-- SELECT
--  tuser.user_id,0,tuser.user_account,'',0,'','',NOW(),NOW() 
-- FROM tbl_user tuser
-- WHERE user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9006 GROUP BY chor_parter_user_logo) ;

-- #cpyId处理
-- update tbl_user_company tuser,(select cpy_id from tbl_company where cpy_number = 9006) a
-- set tuser.cpy_id = a.cpy_id
-- where tuser.cpy_id = 0
-- and tuser.user_cpy_name IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9006 GROUP BY chor_parter_user_logo) ;

-- #LEVEL_id处理
-- update tbl_user tuser,(select level_id from tbl_level l,tbl_company cpy where l.is_default = 1 and cpy.cpy_id = l.cpy_id and cpy.cpy_number = 9006) a
-- set tuser.level_id = a.level_id
-- WHERE tuser.user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9006 GROUP BY chor_parter_user_logo) ;

-- #曹操司机********************************************
-- INSERT INTO `tbl_user` 
-- (`user_account`, `user_password`, `user_leval`, `user_status`, `user_idcard`, `province_code`, `city_code`, `area_code`,`gmt_create`,`gmt_modified`, `creator`, `modifier`, `user_head_img`, `level_id`) 
-- SELECT 
-- chor_parter_user_logo,'e10adc3949ba59abbe56e057f20f883e','3','1','',NULL,NULL,NULL,NOW(),NOW(),'admin','admin','0',0
-- FROM tbl_chargingorder WHERE chOr_OrgNo = 9002
-- GROUP BY chor_parter_user_logo;

-- #渠道用户表
-- INSERT INTO tbl_user_company
-- (user_id,cpy_Id,user_cpy_name,user_cpy_phone,account_id,creator,MODIFIER,gmt_create,gmt_modified)
-- SELECT
--  tuser.user_id,0,tuser.user_account,'',0,'','',NOW(),NOW() 
-- FROM tbl_user tuser
-- WHERE user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9002 GROUP BY chor_parter_user_logo) ;

-- #cpyId处理
-- update tbl_user_company tuser,(select cpy_id from tbl_company where cpy_number = 9002) a
-- set tuser.cpy_id = a.cpy_id
-- where tuser.cpy_id = 0
-- and tuser.user_cpy_name IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9002 GROUP BY chor_parter_user_logo) ;

-- #LEVEL_id处理
-- update tbl_user tuser,(select level_id from tbl_level l,tbl_company cpy where l.is_default = 1 and cpy.cpy_id = l.cpy_id and cpy.cpy_number = 9002) a
-- set tuser.level_id = a.level_id
-- WHERE tuser.user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 9002 GROUP BY chor_parter_user_logo);


-- #e充网*********************************************************
-- INSERT INTO `tbl_user` 
-- (`user_account`, `user_password`, `user_leval`, `user_status`, `user_idcard`, `province_code`, `city_code`, `area_code`,`gmt_create`,`gmt_modified`, `creator`, `modifier`, `user_head_img`, `level_id`) 
-- SELECT 
-- chor_parter_user_logo,'e10adc3949ba59abbe56e057f20f883e','3','1','',NULL,NULL,NULL,NOW(),NOW(),'admin','admin','0',0
-- FROM tbl_chargingorder WHERE chOr_OrgNo = 1011
-- GROUP BY chor_parter_user_logo;

-- #渠道用户表
-- INSERT INTO tbl_user_company
-- (user_id,cpy_Id,user_cpy_name,user_cpy_phone,account_id,creator,MODIFIER,gmt_create,gmt_modified)
-- SELECT
--  tuser.user_id,0,tuser.user_account,'',0,'','',NOW(),NOW() 
-- FROM tbl_user tuser
-- WHERE user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 1011 GROUP BY chor_parter_user_logo);

-- #cpyId处理
-- update tbl_user_company tuser,(select cpy_id from tbl_company where cpy_number = 1011) a
-- set tuser.cpy_id = a.cpy_id
-- where tuser.cpy_id = 0
-- and tuser.user_cpy_name IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 1011 GROUP BY chor_parter_user_logo); 

-- #LEVEL_id处理
-- update tbl_user tuser,(select level_id from tbl_level l,tbl_company cpy where l.is_default = 1 and cpy.cpy_id = l.cpy_id and cpy.cpy_number = 1011) a
-- set tuser.level_id = a.level_id
-- WHERE tuser.user_account IN 
-- (SELECT chor_parter_user_logo FROM tbl_chargingorder WHERE chOr_OrgNo = 1011 GROUP BY chor_parter_user_logo);



#管理员
ALTER TABLE `tbl_user_admin`
ADD COLUMN `cpy_id`  bigint(11) DEFAULT 0 COMMENT '归属渠道公司或大账户' AFTER `admin_phone`,
ADD COLUMN  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
ADD COLUMN  `modifier` varchar(32) NOT NULL DEFAULT '' COMMENT '修改人',
CHANGE COLUMN  createdate `gmt_create` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
CHANGE COLUMN  updatedate `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间';


#去除基表唯一建索引
ALTER TABLE `tbl_user` DROP INDEX `user_account`;
