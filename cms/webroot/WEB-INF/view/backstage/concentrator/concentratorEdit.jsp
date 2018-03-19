<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>集中器编辑</title>
<link rel="stylesheet" type="text/css"
	href="${ctx}/static/css/concentrator/concentratorEdit.css" />
</head>
<body>
	<form id="concentratorEditForm" method="post"
		action="/admin/concentrator/concentratorModify.do">
		<div id="container1">
			<div class="orderDetail">
				<div class="nav">集中器编辑</div>
				<input type="hidden" name="pkConcentratorID" id="pkConcentratorID"
					value="" />
				<div class="validateBlock">
					<div class="lineBlock">
						<div class="line">
							<span class="lineLeft">集中器名称 </span> <input type=""
								name="coctConcentratorName" id="coctConcentratorName" value=""
								class="concentratorName" autofocus="autofocus" />
						</div>
						<div class="line">
							<span class="lineLeft">sim卡运营商 </span> <select name="coctSIMTYPE"
								id="serviceProvider">
							</select>
						</div>
					</div>
					<div class="lineBlock"
						style="border-bottom: 1px solid #E1E1E1; padding-bottom: 20px;">
						<div class="line">
							<span class="lineLeft">sim卡卡号</span> <input type="text"
								name="coctSIMMAC" id="coctSIMMAC" value="" class="cardNumber" />
						</div>
						<div class="line">
							<span class="lineLeft">sim卡编码</span> <input type="text"
								name="coctSIMCODE" id="coctSIMCODE" value="" class="cardCode" />
						</div>
					</div>
					<div class="lineBlock">
						<div class="concentratorEditTextTip"
							style="display: none; color: #FF0000; font-size: 14px;"></div>
					</div>
				</div>

				<div class="pileListTitle">
					<span>绑定电桩列表</span> <span id="selectPileBtn">选择电桩</span>
				</div>
				<div class="pileList">
					<table class="myTable stationEditTable">
						<thead>
							<tr class="active">
								<th class="smallWidth">序号</th>
								<th>桩体编码</th>
								<th>电桩名称</th>
								<th>电桩状态</th>
								<th>充电方式</th>
								<th>功率</th>

							</tr>
						</thead>
						<tbody id="concentratorEditTbody">

						</tbody>
					</table>
					<div class="saveBlock">
						<div class="saveBtn submitBtn" id="concentratorEditSaveBtn"
							rel="concentratorEditForm">保存</div>
						<div class="concentratorEditCancelBtn cancelBtn"
							id="concentratorEditCancelBtn">取消</div>
					</div>
				</div>

			</div>
		</div>
	</form>
	<!--绑定电桩部分=======================-->
	<div class="bindPile" id="bindPile" style="display: none;">
		<form id="BindElectricForm">
			<div class="bindPileSelect">
				<input type="hidden" name="pkConcentratorID" value="0" /> <input
					type="text" name="elpiElectricpilecode" placeholder="桩体编码/电桩名称" />
				<span onclick="electricSearch()">查询</span>
			</div>
		</form>

		<div class="bindPileBlock">
			<table class="bindPileTable table">
				<thead>
					<tr class="active">
						<th class="smallWidth"><input type="checkbox" name=""
							class="selAll" value="" /></th>
						<th class="smallWidth">序号</th>
						<th>桩体编码</th>
						<th>电桩名称</th>
						<th>电桩状态</th>
						<th>充电方式</th>
					</tr>
				</thead>
				<tbody id="bindPileTbody">

				</tbody>
			</table>
		</div>
		<div id="BindElectricPage" class="pagination myPagination"></div>
	</div>
</body>
<script src="${ctx}/static/js/concentrator/concentratorEdit.js"
	type="text/javascript" charset="utf-8"></script>
</html>