<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>充电消费订单</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/order/listCharge.css"/>
	</head>
	<body>
		<div id="container1">
			<div class="box">
			<form id="listChargeForm">
				<div class="formList">
					<input name="chorCode" type="text" style="width: 200px;" class="160width" placeholder="订单编号/电桩编号/电桩名称/手机号">
					<input name="chorUser" type="text" style="width: 160px;" class="160width" placeholder="商家">
					<input type="" name="startDate" id="startDateCharge" value="" placeholder="起始时间"
					onClick="WdatePicker({el:'startDateCharge',minDate:'2015-01-01',maxDate:'#F{$dp.$D(\'endDateCharge\')}'})"/>
					<span style="font-size: 12px; color: #999999;">至</span>
					<input type="" name="endDate" id="endDateCharge" value="" placeholder="截止时间"
					onClick="WdatePicker({el:'endDateCharge',minDate:'#F{$dp.$D(\'startDateCharge\')}'})"/>
					
				</div>
				<div class="formList formListSelect">
					<select name="chorChargingstatus" id="elpiState">
						<option disabled selected>订单状态</option>
						
					</select>
					<select id="listChargeProvince" name="provinceCode" onchange="ProvinceChange(this)">
						<option disabled selected>省</option>
						
					</select>
					<select id="listChargeCity" name="cityCode" onchange="cityChange(this)">
						<option disabled selected>请选择市</option>
					</select>
					<select id="listChargeArea" name="areaCode">
						<option disabled selected>请选择区</option>
					</select>
					<span class="check" onclick="listChargeSearch()">查询</span>
					<span class="exportTable marginLeft10 fileExport" rel="listChargeForm" href="/admin/order/chargeOrderExport.do">导出EXCEL</span>
				</div>
			</form>
			</div>
			<div class="box2 col-md-10 col-sm-8">
				<div class="padding30">
						<table class="myTable">
							<thead>
								<tr class="active">
									<th><input type="checkbox" name="" class="selAll" value=""/></th>
									<th>序号</th>
									<th>订单编号</th>
									<th>桩体编号</th>
									<th>电桩名称</th>
									<th>商家名称</th>
									<th>手机号</th>
									<th>金额</th>
									<th>电量</th>
									<th>实际优惠</th>
									<th>充电时间段</th>
									<th>订单状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="listChargeTbody">
								
							</tbody>
						</table>
						<div id="" class="" style="height: 40px; width: auto;">
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
				</div>
			</div>
			<div id="listChargePage" class="pagination fenYe col-md-10 col-sm-10">
				
			</div>
		</div>
	</body>
<script src="${ctx}/static/js/order/listCharge.js" type="text/javascript" charset="utf-8"></script>
</html>