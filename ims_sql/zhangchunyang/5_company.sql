#新建公司
DROP TABLE IF EXISTS `tbl_company`;
CREATE TABLE `tbl_company` (
  `cpy_id` bigint(11) NOT NULL COMMENT '主键',
  `cpy_number` int(4) NOT NULL DEFAULT '0' COMMENT '公司标识',
  `cpy_name` varchar(50) NOT NULL DEFAULT '' COMMENT '企业名称',
  `cpy_province` varchar(32) DEFAULT NULL COMMENT '省编码',
  `cpy_city` varchar(32) DEFAULT NULL COMMENT '市编码',
  `cpy_address` varchar(500) DEFAULT NULL COMMENT '企业地址',
  `cpy_phone` varchar(32) DEFAULT NULL COMMENT '联系方式',
  `cpy_email` varchar(50) DEFAULT NULL COMMENT '企业邮箱',
  `cpy_status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 0.正常 1.禁用',
  `cpy_type` int(4) NOT NULL DEFAULT '0' COMMENT '类型 1.投资公司 2.渠道公司 3.桩主公司 4.业主公司',
  `cpy_parent_id` bigint(11) DEFAULT NULL COMMENT '父级',
  `cpy_parent_type` int(4) NOT NULL DEFAULT '0' COMMENT '0.组织上的上下级关系 1.账户上的上下级关系',
  `trade_type` int(4) NOT NULL DEFAULT '0' COMMENT '结算方式 2.预付费 1.后付费',
  `warn_money` decimal(10,4) DEFAULT '0.0000' COMMENT '预警金额',
  `is_valid` int(4) NOT NULL DEFAULT '0' COMMENT '是否开启盗刷校验 0.否 1.是',
  `slave_cpy_id` bigint(11) DEFAULT NULL COMMENT '管理单位，与cpy_parent_type一起使用',
  `account_id` bigint(11) NOT NULL DEFAULT '0' COMMENT '账户ID',
  `is_del` int(4) NOT NULL DEFAULT '0' COMMENT '是否删除 0.否 1.禁用 ',
  `creator` varchar(32) NOT NULL DEFAULT '' COMMENT '创建人',
  `modifier` varchar(32) DEFAULT '' COMMENT '修改人',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
  `account_no` varchar(32) DEFAULT '' COMMENT '资金账户（临时字段，不可作业务逻辑处理）',
  `pay_rule` int(4) DEFAULT NULL COMMENT '付费策略 1.大账户付费 2.个人付费 （字段用来作历史数据处理，不作业务操作）',
  `cpy_num` int(4) NOT NULL DEFAULT '0' COMMENT '公司允许离线充电的最大数值',
  PRIMARY KEY (`cpy_id`),
  KEY `index_cpy_number` (`cpy_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8 COMMENT='公司表';
truncate table tbl_company;


#创建新表、导入公司
DROP TABLE IF EXISTS `tbl_company_data_sql`;
CREATE TABLE `tbl_company_data_sql` (
  `cpy_id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cpy_number` int(4) NOT NULL DEFAULT '0' COMMENT '公司标识',
  `cpy_name` varchar(50) NOT NULL DEFAULT '' COMMENT '企业名称',
  `cpy_province` varchar(32) DEFAULT NULL COMMENT '省编码',
  `cpy_city` varchar(32) DEFAULT NULL COMMENT '市编码',
  `cpy_type` int(4) NOT NULL DEFAULT '0' COMMENT '类型 1.投资公司 2.渠道公司 3.桩主公司 4.业主公司',
  `cpy_parent_id` varchar(32) DEFAULT NULL COMMENT '父级',
  `trade_type` int(4) NOT NULL DEFAULT '0' COMMENT '结算方式 2.预付费 1.后付费',
  `slave_cpy_id` bigint(11) DEFAULT 0 COMMENT '管理单位，与cpy_parent_type一起使用',
  `account_no` varchar(32) DEFAULT '' COMMENT '资金账户（临时字段，不可作业务逻辑处理）',
  `pay_rule` int(4) DEFAULT NULL COMMENT '付费策略',
  PRIMARY KEY (`cpy_id`),
  KEY `index_cpy_number` (`cpy_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=325 DEFAULT CHARSET=utf8 COMMENT='公司历史数据处理';
truncate table tbl_company_data_sql;


#投资公司

insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1023,'北京万京新能源科技有限公司','',1,'北京市','北京市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1017,'福州万充新能源科技有限公司','',1,'福建省','福州市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1200,'胡昌蓓','',1,'浙江省','杭州市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1019,'江苏万充新能源科技有限公司','',1,'江苏省','南京市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1021,'宁波万爱新能源科技有限公司','',1,'浙江省','宁波市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1015,'山东万恩新能源科技有限公司','',1,'山东省','潍坊市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1025,'陕西万充新能源科技有限公司','',1,'陕西省','西安市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1022,'上海万遥新能源科技有限公司','',1,'上海市','上海市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1549,'深圳万充新能源科技有限公司','',1,'广东省','深圳市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1020,'苏州万充新能源科技有限公司','',1,'江苏省','苏州市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1018,'万马联合新能源投资有限公司','',1,'浙江省','杭州市',0,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1016,'武汉万爱新能源科技有限公司','',1,'湖北省','武汉市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1543,'广州万充','',1,'广东省','广州市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1544,'重庆万充','',1,'重庆市','重庆市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1545,'无锡万充','',1,'江苏省','无锡市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1546,'杭州公司','',1,'浙江省','杭州市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1547,'四川万充','',1,'四川省','成都市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1548,'海南万充','',1,'海南省','海口市',1018,0,0,0);
insert into tbl_company_data_sql(cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1501,'商务拓展部投资公司','',1,'浙江省','杭州市',1018,0,0,0);


insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1091,'八宝山革命公墓','101888800551',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1087,'八宝山人民公墓','101888800511',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1089,'八达岭人民公墓','101888800531',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1086,'宝云岭墓园','101888800501',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1082,'北京SOS儿童村','101888800461',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1049,'北京出行汽车服务有限公司','136012684151',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1248,'北京泛利地毯有限公司','139110783361',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1236,'北京公司物流事业部','135208110981',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1050,'北京海通瑞达科技有限责任公司','131266312121',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1070,'北京教育音响杂志总社','101888800341',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1095,'北京社会福利管理中心','101888800591',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1071,'北京市殡仪服务中心','101888800351',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1230,'北京市畜牧总站延庆基地','101888802111',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1057,'北京市档案局','101888800221',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1074,'北京市东郊殡仪馆','101888800381',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1203,'北京市辐射安全中心海淀区','101888802021',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1202,'北京市辐射安全中心怀柔区','101888802011',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1096,'北京市辐射中心海淀区','101888800601',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1097,'北京市辐射中心怀柔区','101888800611',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1068,'北京市公安局','101888800331',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1224,'北京市海淀区食品药品监控中心','101888802101',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1062,'北京市行政副中心建设指挥中心-郝家府','101888800271',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1061,'北京市行政副中心建设指挥中心-潞城一期','101888800261',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1500,'北京市行政执法车辆管理中心','0',2,'北京市','北京市',0,2,0,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1099,'北京市行政执法车辆管理中心0','173268031001',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1100,'北京市行政执法车辆管理中心1','101888801011',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1109,'北京市行政执法车辆管理中心10','101888801101',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1199,'北京市行政执法车辆管理中心100','101888802001',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1110,'北京市行政执法车辆管理中心11','101888801111',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1111,'北京市行政执法车辆管理中心12','101888801121',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1112,'北京市行政执法车辆管理中心13','101888801131',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1113,'北京市行政执法车辆管理中心14','101888801141',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1114,'北京市行政执法车辆管理中心15','101888801151',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1115,'北京市行政执法车辆管理中心16','101888801161',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1116,'北京市行政执法车辆管理中心17','101888801171',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1117,'北京市行政执法车辆管理中心18','101888801181',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1118,'北京市行政执法车辆管理中心19','101888801191',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1101,'北京市行政执法车辆管理中心2','101888801021',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1119,'北京市行政执法车辆管理中心20','101888801201',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1120,'北京市行政执法车辆管理中心21','101888801211',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1121,'北京市行政执法车辆管理中心22','101888801221',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1122,'北京市行政执法车辆管理中心23','101888801231',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1123,'北京市行政执法车辆管理中心24','101888801241',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1124,'北京市行政执法车辆管理中心25','101888801251',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1125,'北京市行政执法车辆管理中心26','101888801261',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1126,'北京市行政执法车辆管理中心27','101888801271',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1127,'北京市行政执法车辆管理中心28','101888801281',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1128,'北京市行政执法车辆管理中心29','101888801291',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1102,'北京市行政执法车辆管理中心3','101888801031',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1129,'北京市行政执法车辆管理中心30','101888801301',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1130,'北京市行政执法车辆管理中心31','101888801311',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1131,'北京市行政执法车辆管理中心32','101888801321',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1132,'北京市行政执法车辆管理中心33','101888801331',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1133,'北京市行政执法车辆管理中心34','101888801341',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1134,'北京市行政执法车辆管理中心35','101888801351',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1135,'北京市行政执法车辆管理中心36','101888801361',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1136,'北京市行政执法车辆管理中心37','101888801371',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1137,'北京市行政执法车辆管理中心38','101888801381',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1138,'北京市行政执法车辆管理中心39','101888801391',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1103,'北京市行政执法车辆管理中心4','101888801041',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1139,'北京市行政执法车辆管理中心40','101888801401',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1140,'北京市行政执法车辆管理中心41','101888801411',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1141,'北京市行政执法车辆管理中心42','101888801421',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1142,'北京市行政执法车辆管理中心43','101888801431',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1143,'北京市行政执法车辆管理中心44','101888801441',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1144,'北京市行政执法车辆管理中心45','101888801451',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1145,'北京市行政执法车辆管理中心46','101888801461',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1146,'北京市行政执法车辆管理中心47','101888801471',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1147,'北京市行政执法车辆管理中心48','101888801481',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1148,'北京市行政执法车辆管理中心49','101888801491',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1104,'北京市行政执法车辆管理中心5','101888801051',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1149,'北京市行政执法车辆管理中心50','101888801501',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1150,'北京市行政执法车辆管理中心51','101888801511',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1151,'北京市行政执法车辆管理中心52','101888801521',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1152,'北京市行政执法车辆管理中心53','101888801531',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1153,'北京市行政执法车辆管理中心54','101888801541',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1154,'北京市行政执法车辆管理中心55','101888801551',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1155,'北京市行政执法车辆管理中心56','101888801561',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1156,'北京市行政执法车辆管理中心57','101888801571',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1157,'北京市行政执法车辆管理中心58','101888801581',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1158,'北京市行政执法车辆管理中心59','101888801591',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1105,'北京市行政执法车辆管理中心6','101888801061',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1159,'北京市行政执法车辆管理中心60','101888801601',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1160,'北京市行政执法车辆管理中心61','101888801611',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1161,'北京市行政执法车辆管理中心62','101888801621',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1162,'北京市行政执法车辆管理中心63','101888801631',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1163,'北京市行政执法车辆管理中心64','101888801641',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1164,'北京市行政执法车辆管理中心65','101888801651',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1165,'北京市行政执法车辆管理中心66','101888801661',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1166,'北京市行政执法车辆管理中心67','101888801671',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1167,'北京市行政执法车辆管理中心68','101888801681',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1168,'北京市行政执法车辆管理中心69','101888801691',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1106,'北京市行政执法车辆管理中心7','101888801071',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1169,'北京市行政执法车辆管理中心70','101888801701',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1170,'北京市行政执法车辆管理中心71','101888801711',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1171,'北京市行政执法车辆管理中心72','101888801721',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1172,'北京市行政执法车辆管理中心73','101888801731',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1173,'北京市行政执法车辆管理中心74','101888801741',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1174,'北京市行政执法车辆管理中心75','101888801751',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1175,'北京市行政执法车辆管理中心76','101888801761',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1176,'北京市行政执法车辆管理中心77','101888801771',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1177,'北京市行政执法车辆管理中心78','101888801781',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1178,'北京市行政执法车辆管理中心79','101888801791',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1107,'北京市行政执法车辆管理中心8','101888801081',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1179,'北京市行政执法车辆管理中心80','101888801801',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1180,'北京市行政执法车辆管理中心81','101888801811',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1181,'北京市行政执法车辆管理中心82','101888801821',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1182,'北京市行政执法车辆管理中心83','101888801831',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1183,'北京市行政执法车辆管理中心84','101888801841',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1184,'北京市行政执法车辆管理中心85','101888801851',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1185,'北京市行政执法车辆管理中心86','101888801861',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1186,'北京市行政执法车辆管理中心87','101888801871',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1187,'北京市行政执法车辆管理中心88','101888801881',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1188,'北京市行政执法车辆管理中心89','101888801891',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1108,'北京市行政执法车辆管理中心9','101888801091',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1189,'北京市行政执法车辆管理中心90','101888801901',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1190,'北京市行政执法车辆管理中心91','101888801911',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1191,'北京市行政执法车辆管理中心92','101888801921',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1192,'北京市行政执法车辆管理中心93','101888801931',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1193,'北京市行政执法车辆管理中心94','101888801941',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1194,'北京市行政执法车辆管理中心95','101888801951',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1195,'北京市行政执法车辆管理中心96','101888801961',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1196,'北京市行政执法车辆管理中心97','101888801971',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1197,'北京市行政执法车辆管理中心98','101888801981',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1198,'北京市行政执法车辆管理中心99','101888801991',2,'北京市','北京市',1500,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1225,'北京市豪络科技有限公司','186361327321',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1249,'北京市怀柔区世纪兴华医院','180012086891',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1052,'北京市排水集团','101888800181',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1217,'北京市水产技术推广站-小务基地','101888802081',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1210,'北京市水利局北运河管理处','101888802041',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1066,'北京市投资促进局','101888800311',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1211,'北京市药品检验所','101888802051',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1055,'北京文联','101888800201',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1053,'北京小京鱼科技有限公司','139109066931',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1012,'北京新源恒远科技发展有限公司','136935367111',2,'北京市','北京市',0,1,1,1012);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1051,'北京壹租科技有限公司','139105165901',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1228,'北京有行通达运输有限公司','185006143211',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1215,'北小河公园','101888802071',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1084,'殡仪服务中心1','101888800481',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1090,'殡仪服务中心2','101888800541',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1204,'昌平区地方税务局','101888802031',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1077,'朝阳陵园','101888800411',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1060,'朝阳区人民政府','101888800251',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1065,'城管执法局','101888800301',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1079,'大宝日化厂','101888800431',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1058,'大兴榆垡新机场办公室','101888800231',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1072,'第二社会福利院','101888800361',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1073,'第三社会福利院','101888800371',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1076,'第一社会福利院','101888800401',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1007,'福建三明公交公司','151591960861',2,'福建省','三明市',0,1,1,1017);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1092,'福田公墓','101888800561',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1212,'公安部警卫局第八局','101888802061',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9008,'广东惠东公交场站-盛弘充电桩','112222888111',2,'广东省','惠州市',1009,1,1,1009);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1219,'杭州树人大学','158244478801',2,'浙江省','杭州市',0,1,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9002,'杭州优行科技有限公司','189065158281',2,'浙江省','杭州市',0,1,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1004,'河南开封北站','158378653061',2,'河南省','开封市',0,1,1,1501);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1080,'红叶齿科厂','101888800441',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1003,'湖北咸宁咸运集团通山奔阳运输有限公司','158720837801',2,'湖北省','咸宁市',0,1,1,1016);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1093,'假肢中心','101888800571',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1216,'今凯旋出租汽车有限公司','138119692001',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1237,'京市泰广商务服务（北京）有限公司','130112971881',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1006,'开封交通运输集团有限公司','185037822661',2,'河南省','开封市',0,1,1,1501);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1056,'民防局本部','101888800211',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1067,'南水北调南干渠管理处','101888800321',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1214,'宁波市东钱湖商会','135665601051',2,'浙江省','宁波市',0,2,1,1021);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1002,'萍乡市公共交通总公司','0',2,'江西省','萍乡市',0,1,1,1016);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1063,'人民政府参事室','101888800281',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1213,'陕西海航思福汽车租赁有限公司','186910823471',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1250,'陕西辉煌物流有限公司','181619007891',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1223,'陕西秦邦速运物流有限公司','150092027831',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1008,'陕西万充新能源科技有限公司-西安一卡通','0',2,'陕西省','西安市',0,1,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1235,'上海道锦汽车服务有限公司2','102888810001',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1251,'上海锦江商旅汽车服务股份有限公司','135016615811',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1233,'上海麟配城配物流有限公司','131320962981',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1232,'上海麟配新能源科技有限公司','139165216221',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1227,'上海新进芯微电子有限公司','173211803611',2,'上海市','上海市',0,1,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1220,'上海众灵汽车服务有限公司','139177661201',2,'上海市','上海市',0,1,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1222,'上海周游汽车客运有限公司','136715373621',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1229,'深圳乾龙快运有限公司','139171609601',2,'广东省','深圳市',1009,1,1,1009);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1043,'市编办','101888800121',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1064,'市残联','101888800291',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1044,'市城管执法局','101888800131',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1035,'市地方志办公室','101888800041',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1046,'市发展改革委','101888800151',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1041,'市法学会','101888800101',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1045,'市规划委','101888800141',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1036,'市环保局','101888800051',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1048,'市教委','101888800171',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1033,'市老干部局','101888800021',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1034,'市民政局','101888800031',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1042,'市农村经济研究中心','101888800111',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1040,'市审计局','101888800091',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1037,'市委党史研究室','101888800061',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1038,'市委党校','101888800071',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1047,'市政府侨办','101888800161',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1032,'市政协办公厅','101888800011',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1083,'太子峪陵园','101888800471',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1081,'天慈墓园','101888800451',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1075,'外侨公墓','101888800391',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1085,'万佛华侨陵园有限公司','101888800491',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9006,'微信开放平台','123456789121',2,'浙江省','杭州市',0,1,2,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1094,'温泉墓园','101888800581',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1098,'无线电管理局','101888800621',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1013,'武汉斑马快跑科技有限公司','180866635851',2,'湖北省','武汉市',0,2,1,1016);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1014,'武汉公司铁龙通勤充电站','158272697391',2,'湖北省','武汉市',0,1,1,1016);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1252,'西安东翱物流有限公司','135722111271',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1226,'西安偕行新能源运营有限公司','135729071621',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1218,'西城区广内街道办事处','101888802091',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1039,'西站管委会','101888800081',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1078,'亚美日化厂','101888800421',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1059,'延庆区政府','101888800241',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1088,'养老护理照料示范中心','101888800521',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1209,'有车（北京）新能源汽车租赁有限公司','183010073101',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1054,'园林绿化局西区','101888800191',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1011,'中创三优科技有限公司-e充网','12345678912',2,'北京市','北京市',0,1,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1005,'重庆长安车联科技有限公司','158232349151',2,'重庆市','重庆市',0,1,1,1544);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1024,'陕西富达物流有限公司','159299070291',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1502,'爱充运营监控中心','0',2,'浙江省','杭州市',0,0,0,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9010,'北京停简单信息技术有限公司','188901090101',2,'北京市','北京市',0,1,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9009,'高德信息技术有限公司','0',2,'北京市','北京市',0,1,1,1018);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9004,'上海电器科学研究所有限公司','0',2,'上海市','上海市',0,1,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9007,'国家充电设施信息管理平台-充电联盟','0',2,'北京市','北京市',0,1,1,1018);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1245,'北京众旺达汽车租赁有限公司','0',2,'北京市','北京市',0,0,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1503,'上海芷新客运有限公司','139165061041',2,'上海市','上海市',0,2,1,1022);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1504,'北京彩虹巴士科技有限公司','185153931901',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1505,'陕西联合快递有限责任公司','187092639221',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1506,'北京无忧蚂蚁商贸有限公司西安分公司','180092221211',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1507,'北京市安全生产监督管理局','101888802221',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1001,'浙江爱充网络科技有限公司','0',2,'浙江省','杭州市',0,2,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1000,'浙江爱充网络科技有限公司总公司','0',2,'浙江省','杭州市',0,2,2,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1508,'紫金创业园开放（不对外）','157188800011',2,'浙江省','杭州市',0,2,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1509,'紫金创业园专属2','157188800001',2,'浙江省','杭州市',0,1,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1510,'紫金创业园专属1','157188800021',2,'浙江省','杭州市',0,1,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1512,'北京众旺达汽车租赁有限公司1','101888802191',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1513,'北京众旺达汽车租赁有限公司2','101888802201',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1514,'北京众旺达汽车租赁有限公司3','101888802121',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1515,'北京众旺达汽车租赁有限公司4','101888802131',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1516,'北京众旺达汽车租赁有限公司5','101888802141',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1517,'北京众旺达汽车租赁有限公司6','101888802151',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1518,'北京众旺达汽车租赁有限公司7','101888802161',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1519,'北京众旺达汽车租赁有限公司8','101888802171',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1520,'北京众旺达汽车租赁有限公司9','101888802181',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1521,'北京众旺达汽车租赁有限公司10','101888802211',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1009,'深圳万充新能源科技有限公司','159862394851',2,'广东省','深圳市',0,1,1,1009);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1522,'北京市稻香湖景酒店','101888802231',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1523,'北京育龙技术学校','0',2,'北京市','北京市',0,0,0,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1524,'爱充运维部门','0',2,'浙江省','杭州市',0,0,0,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1526,'陕西卓昊物流有限公司','183924056741',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1527,'陕西澎顺实业有限公司','180490676731',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1528,'北京首汽智行科技有限公司西安分公司','132014422091',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1529,'陕西迪马物流有限公司','189918005361',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1530,'武汉元光科技有限公司','185217091351',2,'浙江省','杭州市',0,2,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1531,'北京市东城区人民政府军队离休退休干部安置办公室','101888802241',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9011,'北京电动未来信息科技有限公司','200000000011',2,'北京市','北京市',0,1,1,1018);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1525,'北汽出行项目','0',2,'北京市','北京市',0,1,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1532,'苏南申通公司专用桩','188051200011',2,'江苏省','苏州市',0,2,1,1020);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1533,'石家庄市华翔经济信息咨询服务有限公司','152278813991',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9012,'北京市充电设施公共服务管理平台-e充网','',2,'北京市','北京市',0,1,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1534,'西安市长安区友邦停车场','180665098851',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1535,'首汽智行南京分公司','139516120941',2,'江苏省','南京市',0,2,1,1019);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1536,'杭州众车分享新能源汽车有限公司','186103815931',2,'浙江省','杭州市',0,2,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1537,'西安西旅集团旅游汽车有限公司','186293303991',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1538,'北京翼翔行汽车销售服务有限公司','101888802251',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1539,'颐和园管理处','101888802261',2,'北京市','北京市',0,2,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1540,'西安华瀚航空客货服务有限责任公司','186818825091',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1541,'锂动物流上海有限公司公司专用桩','188051200021',2,'江苏省','苏州市',0,2,1,1020);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(1542,'西安社发运输服务有限公司','158029699901',2,'陕西省','西安市',0,2,1,1025);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9013,'深圳公共充电平台','',2,'广东省','深圳市',0,1,1,1009);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9014,'浙江传化绿色慧联物流有限公司','',2,'浙江省','杭州市',0,1,1,1546);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9015,'北京新能源汽车营销有限公司','',2,'北京市','北京市',0,1,1,1023);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9016,'深圳南方和顺电动汽车产业服务有限公司','',2,'广东省','深圳市',0,1,1,1009);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9017,'百度地图对接','',2,'北京市','北京市',0,1,1,1018);		
insert into tbl_company_data_sql (cpy_number,cpy_name,account_no,cpy_type,cpy_province,cpy_city,cpy_parent_id,trade_type,pay_rule,slave_cpy_id) values(9018,'中国电力企业联合会','',2,'北京市','北京市',0,1,1,1018);		

#数据导入到新表
insert into tbl_company (cpy_id,cpy_number,cpy_name,cpy_address,cpy_province,cpy_city,cpy_num,gmt_create,gmt_modified)
SELECT pk_CompanyId,cpy_CompanyNumber,cpy_CompanyName,cpy_CompanyAddress,cpy_province,cpy_city,cpy_num,NOW(),NOW()
FROM tbl_company_old;

UPDATE tbl_company cpy,tbl_company_data_sql d
SET cpy.cpy_province = d.cpy_province,
    cpy.cpy_city = d.cpy_city,
    cpy.cpy_type = d.cpy_type,
    cpy.cpy_parent_id = d.cpy_parent_id,
    cpy.trade_type = d.trade_type,
    cpy.slave_cpy_id = d.slave_cpy_id,
    cpy.account_no = d.account_no,
    cpy.pay_rule = d.pay_rule 
WHERE cpy.cpy_number = d.cpy_number;

ALTER TABLE `tbl_company`
MODIFY COLUMN `cpy_id`  bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键' FIRST ;



#省市区
UPDATE tbl_company cpy,tb_m_province p
SET cpy.cpy_province = p.PROVINCE_ID
WHERE cpy.cpy_province = p.PROVINCE_NAME;

UPDATE tbl_company cpy,tb_m_city p
SET cpy.cpy_city = p.city_id
WHERE cpy.cpy_city = p.city_name;



#上下级、管理单位 标识改为ID
update tbl_company cpy,tbl_company a
set cpy.slave_cpy_id = a.cpy_id
  where cpy.slave_cpy_id = a.cpy_number
      and cpy.slave_cpy_id != 0 ;


update tbl_company cpy,tbl_company a
set cpy.cpy_parent_id = a.cpy_id
  where cpy.cpy_parent_id = a.cpy_number
      and cpy.cpy_parent_id != 0 ;

UPDATE tbl_company SET gmt_create = NOW();
UPDATE tbl_company SET pay_rule = 0 WHERE pay_rule is null;
UPDATE tbl_company SET slave_cpy_id = 0 WHERE slave_cpy_id is null;
UPDATE tbl_company SET cpy_parent_id = 0 WHERE cpy_parent_id is null;
UPDATE tbl_company SET creator = 'admin',modifier = 'admin';
#初始化等级
DELETE FROM tbl_level;
truncate table tbl_level;
insert into tbl_level (level_id,level_seq,level_name,is_default,cpy_id,is_del,creator,modifier,gmt_create,gmt_modified)
SELECT null,1,'默认等级',1,cpy_id,0,'admin','admin',NOW(),NOW() from tbl_company WHERE is_del = 0 ;





