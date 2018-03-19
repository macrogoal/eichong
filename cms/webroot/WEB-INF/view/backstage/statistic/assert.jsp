<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<html>
	<head>
		<meta charset="UTF-8">
		<title>资产统计</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/electricStatistics/electricStatistics.css"/>
		<style type="text/css">
			.myTable tbody tr td:first-Child{
				cursor: pointer;
				padding-left: 80px;
				width: 300px;
			}
		</style>
	</head>
	<body>
		<div class="container-statistics">
			<section class="header">
				<div class="title">
					资产统计
				</div>
			</section>
			<section class="unitData">
				<div class="realtimeBlock">
					<div class="unitDataTitle">
						充电点数
					</div>
					<div class="unitDataValue" id="v1">
					</div>
				</div>
				<div class="realtimeBlock">
					<div class="unitDataTitle">
						直流桩数
					</div>
					<div class="unitDataValue" id="v2">
					</div>
				</div>
				<div class="realtimeBlock">
					<div class="unitDataTitle">
						交流桩数
					</div>
					<div class="unitDataValue" id="v3">
					</div>
				</div>
				<div class="realtimeBlock">
					<div class="unitDataTitle">
						电桩枪口数
					</div>
					<div class="unitDataValue" id="v4">
					</div>
				</div>
			</section>
			<section class="main">
				<div class="mainTab">
					<span class="active">电桩区域分布（地图）</span>
					<span>交直流电桩占比</span>
					
				</div>
				<div class="mainTabContent">
					<div class="mainTabBlock" id="mapChart" style="width:1000px;height: 350px;margin: 0 auto;">
						1
					</div>
					<div class="mainTabBlock" id="pieChart" style="display: none;width:1000px;height: 350px;margin: 0 auto;">
						
					</div>
				</div>
				<div class="mainTabContent">
					<div class="detaiData">
						<div class="detailDateTitle">
							详细数据
						</div>
						<table class="myTable" style="margin-top:0 ;">
							<thead>
								<tr class="active">
									<th>省份</th>
									<th style="padding-left: 12px;">充电点数</th>
									<th>电桩数</th>
									<th>交流桩</th>
									<th>直流桩</th>
								</tr>
							</thead>
							<!--动态添加的tbody-->
							<tbody id="assetDataTbody">
								<!--<tr class="proTr">
									<td class="provinceStyle">浙江省</td>
									<td>200</td>
									<td>45</td>
									<td>99</td>
									<td>35</td>
								</tr>
								<div class="haha">
									<tr class="cityTr">
										<td class="cityActive">杭州市</td>
										<td>200</td>
										<td>45</td>
										<td>99</td>
										<td>35</td>
									</tr>
									<tr class="cityTr">
										<td class="cityActive">宁波市</td>
										<td>200</td>
										<td>45</td>
										<td>99</td>
										<td>35</td>
									</tr>
								</div>
								<tr class="proTr">
									<td class="provinceStyle">内蒙古</td>
									<td>200</td>
									<td>45</td>
									<td>99</td>
									<td>35</td>
								</tr>
								<div class="haha">
									<tr class="cityTr">
									<td class="cityActive">赤峰市</td>
									<td>200</td>
									<td>45</td>
									<td>99</td>
									<td>35</td>
								</tr>
								<tr class="cityTr">
									<td class="cityActive">包头市</td>
									<td>200</td>
									<td>45</td>
									<td>99</td>
									<td>35</td>
								</tr>
								</div>-->
							</tbody>
							
						</table>
					</div>
				</div>
				
			</section>
		</div>
	</body>
	<script src="${ctx}/static/lib/Echarts/echarts.js" type="text/javascript" charset="utf-8"></script>
	<script src="${ctx}/static/lib/Echarts/china.js" type="text/javascript" charset="utf-8"></script>
	<!--<script src="static/lib/Echarts/macarons.js" type="text/javascript" charset="utf-8"></script>-->
	<script src="${ctx}/static/js/electricStatistics/assetData.js" type="text/javascript" charset="utf-8"></script>
</html>

