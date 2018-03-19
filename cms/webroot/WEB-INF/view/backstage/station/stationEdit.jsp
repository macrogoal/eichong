<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>充电点编辑</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/station/stationEdit.css"/>
	</head>
	<body>
		<div id="container1">
			<div class="nav">
				充电点编辑	
			</div>
			<form id="stationEditForm" method="post" action="/admin/station/stationModify.do">
			<input type="hidden" name="pkPowerstation" id="pkPowerstation" value="" />
			<div class="orderDetail">
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">充电点名称  </span>
						<span class="lineRight" id="postName"> </span>
					</div>
					<div class="line">
						<span class="lineLeft">充电点状态 </span>
						<span class="lineRight" id="postStatus"></span>
					</div>
				</div>
				
					<div class="lineBlock">
						<div class="line">
							<span class="lineLeft">省份</span>
							<select name="postOwnProvinceCode" id="stationEditProvince" onchange="ProvinceChange(this)">
							</select>
						</div>
						<div class="line">
							<span class="lineLeft">市</span>
							<select name="postOwnCityCode" id="stationEditCity" onchange="cityChange(this)">
							</select>
						</div>
					</div>
					<div class="validateBlock">
					<div class="lineBlock">
						<div class="line">
							<span class="lineLeft">区/县</span>
							<select name="postOwnCountyCode" id="stationEditArea">
							</select>
						</div>
						<div class="line">
							<span class="lineLeft">具体地址</span>
							<input type="text" name="postAddress" id="postAddress" value="" />
						</div>
					</div>
					<div class="lineBlock">
						<div class="line">
							<span class="lineLeft">经度</span>
							<input type="text" name="postLongitude" id="longitude" value="" />
						</div>
						<div class="line">
							<span class="lineLeft">纬度</span>
							<input type="text" name="postLatitude" id="latitude" value="" />
						</div>
					</div>
				</div>
				
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">联系电话</span>
						<input type="text" name="postPhone" id="postPhone" value="" />
					</div>
					<div class="line">
						<span class="lineLeft">开放时间</span>
						<input type="text" name="poStOnlineTime" id="poStOnlineTime" value="" />
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span class="lineLeft">停车费</span>
						<input type="" name="" id="" value="" />
					</div>
					<div class="line">
						<span class="lineLeft red">是否支持预约</span>
						<select name="postIsappoint" id="postIsappoint">
						</select>
					</div>
				</div>
				<div class="lineBlock">
					<div class="stationEditTextTip" style="display: none; color: #FF0000;font-size: 14px;">
						
					</div>
				</div>
				<div class="pileListTitle">所属电桩列表</div>
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
								<th>费率id</th>
							</tr>
						</thead>
						<tbody id="stationEditTbody">
							<!--<tr>
								<td>1</td>
								<td>6101131010000001</td>
								<td>西安中兴和泰酒店</td>
								<td>专属</td>
								<td>交流充电桩</td>
								<td>7kw</td>
								<td><input type="" name="" id="" value="" /></td>
							</tr>-->
							
						</tbody>
					</table>
					<div class="saveBlock">
						<div class="saveBtn submitBtn" id="stationEditSaveBtn" rel="stationEditForm">
							保存
						</div>
						<div class="stationEditCancelBtn cancelBtn" id="stationEditCancelBtn">
							取消
						</div>
					</div>
				</div>
				
			</div>
			</form>
		</div>
		<div id="pileListPage" class="pagination col-md-10 col-sm-10">
		
		</div>
	</body>
<script src="${ctx}/static/js/station/stationEdit.js" type="text/javascript" charset="utf-8"></script>
</html>