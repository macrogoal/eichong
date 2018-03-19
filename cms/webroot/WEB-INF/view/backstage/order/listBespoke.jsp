<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>预约订单</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/order/listBespoke.css"/>
	</head>
	<body>
		<div id="container1">
			<div class="box">
			<form id="listBespokeForm">
				<div class="formList">
					<input name="bespResepaymentcode" type="text" style="width: 200px;" class="160width" placeholder="订单编号/电桩编号/电桩名称/手机号">
					<input type="" name="startDate" id="startDateBespoke" value="" placeholder="起始时间"
						onClick="WdatePicker({el:'startDateBespoke',minDate:'2015-01-01',maxDate:'#F{$dp.$D(\'endDateBespoke\')}'})"/>
					<span style="font-size: 12px; color: #999999;">至</span>
					<input type="" name="endDate" id="endDateBespoke" value="" placeholder="截止时间"
						onClick="WdatePicker({el:'endDateBespoke',minDate:'#F{$dp.$D(\'startDateBespoke\')}'})"/>
					
				</div>
				<div class="formList formListSelect">
					<select name="bespOrderType" id="elpiState">
						<option disabled selected>订单状态</option>
					</select>
					<select id="listBespokeProvince" name="provinceCode" onchange="ProvinceChange(this)">
					</select>
					<select id="listBespokeCity" name="cityCode" onchange="cityChange(this)">
						<option disabled selected>请选择市</option>
					</select>
					<select id="listBespokeArea" name="areaCode">
						<option disabled selected>请选择区</option>
					</select>
					<span class="check" onclick="listBespokeSearch()">查询</span>
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
									<th>预约单价</th>
									<th>金额</th>
									<th>预约开始时间</th>
									<th>预约结束时间</th>
									<th>实际预约结束时间</th>
									<th>订单状态</th>
								</tr>
							</thead>
							<tbody id="listBespokeTbody">
								
							</tbody>
						</table>
						<div id="" class="" style="height: 40px; width: auto;">
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
				</div>
			</div>
			<div id="listBespokePage" class="pagination fenYe col-md-10 col-sm-10">
			</div>
		</div>
	</body>
<script src="${ctx}/static/js/order/listBespoke.js" type="text/javascript" charset="utf-8"></script>
</html>