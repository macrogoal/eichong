<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>电桩详细</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/electric/electricDetail.css"/>
	</head>
	<body>
		<div id="container1">
			<div class="nav">
				<span class="icon" id="goBack"></span><span>电桩详细</span>	
			</div>
			<div class="orderDetail">
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">桩体编码 </span>
						<span class="lineRight" id="elpiElectricpilecode"> </span>
					</div>
					<div class="line">
						<span class="lineLeft">电桩名称 </span>
						<span class="lineRight" id="elpiElectricpilename"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">充电方式</span>
						<span id="elpiChargingmode"></span>
					</div>
					<div class="line">
						<span class="lineLeft">电桩状态</span>
						<span id="elpiState"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">功率</span>
						<span id="elpiPowersize"></span>
					</div>
					<div class="line">
						<span class="lineLeft">类型</span>
						<span id="elpiType"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">接口标准</span>
						<span id="elpiPowerinterface"></span>
					</div>
					<div class="line">
						<span class="lineLeft">制造厂商</span>
						<span id="elpiMaker"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">产品型号</span>
						<span id="elpiTypeSpanId"></span>
					</div>
					<div class="line">
						<span class="lineLeft">公司标识</span>
						<input type="text" name="companyNumber" id="companyFlag" value="1" class="numTest" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">运营平台</span>
						<span id="elPiOwnerCompany"></span>
					</div>
					<div class="line">
						<span class="lineLeft">费率id</span>
						<span id="elPiRateInformationId"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">省份</span>
						<span id="electricDetailProvince"></span>
					</div>
					<div class="line">
						<span class="lineLeft">城市</span>
						<span id="electricDetailCity"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">区/县</span>
						<span id="electricDetailArea"></span>
					</div>
					<div class="line">
						<span class="lineLeft">具体地址</span>
						<input type="" name="elpiElectricpileaddress" id="elpiElectricpileaddress" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">经度</span>
						<input type="" name="elpiLongitude" id="longitude" value="" readonly="readonly"/>
					</div>
					<div class="line">
						<span class="lineLeft">纬度</span>
						<input type="" name="elpiLatitude" id="latitude" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">最大输出电压</span>
						<input type="" name="elpiOutputvoltage" id="maxVoltage" value="" readonly="readonly"/>
					</div>
					<div class="line">
						<span class="lineLeft">最大输出电流</span>
						<input type="" name="elpiOutputcurrent" id="maxCurrent" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">是否有枪</span>
						<span id="elPiHaveConnectLine"></span>
					</div>
					<div class="line">
						<span class="lineLeft">枪头数量</span>
						<input type="" name="elpiPowernumber" id="headNum" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">联系电话</span>
						<input type="" name="elPi_Tell" id="elPi_Tell" value="" readonly="readonly"/>
					</div>
					<div class="line">
						<span class="lineLeft">开放时间</span>
						<input type="" name="elPiOnlineTime" id="elPiOnlineTime" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">sim卡卡号</span>
						<input type="" name="elPiSimPhoneNum" id="elPiSimPhoneNum" value="" readonly="readonly"/>
					</div>
					<div class="line">
						<span class="lineLeft">sim卡编码</span>
						<input type="" name="elPiSimMac" id="elPiSimMac" value="" readonly="readonly"/>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft red">是否支持通讯</span>
						<span id="elPiHaveGps"></span>
					</div>
					<div class="line">
						<span class="lineLeft red">是否支持预约</span>
						<span id="elpiIsappoint"></span>
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft red">是否有LED灯</span>
						<span id="elPiHaveLedFlash"></span>
					</div>
					<div class="line">
						<span class="lineLeft">车位号</span>
						<input type="" name="" id="" value="" readonly="readonly"/>
					</div>
				</div>
			</div>
		</div>
	</body>
<script src="${ctx}/static/js/electric/electricDetail.js" type="text/javascript" charset="utf-8"></script>
</html>