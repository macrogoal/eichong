<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../base.jsp" %>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>电动车品牌和车型</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/static/css/config/carinfoList.css" />
	</head>

	<body>
		<div id="container1">
			<div class="box">
				<ul class="tabCarInfo">
					<li class="tabStyle">车型</li>
					<li class="carCompany">品牌</li>
				</ul>
			</div>
			<div class="box2 col-md-10 col-sm-8">
				<div class="padding30">
					<div class="tabCarType">
						<div class="formList">
							<form id="carinfoListForm">
								<input type="text" name="extValue1" class="160width" placeholder="电动车品牌">
								<span class="check" onclick="carinfoListSearch()">查询</span>
							</form>
						</div>
						<div class="btnGroup">
							<span style="margin-left: 0;" id="carinfoAdd">新增</span>
							<a target="selectedTodo" rel="ids" href="/admin/carinfo/carinfoRemove.do"  posttype="string" title="确定删除吗？"><span>删除</span></a>
						</div>
						<table class="myTable">
							<thead>
								<tr class="active">
									<th class="smallWidth"><input type="checkbox" name="" class="selAll"  /></th>
									<th class="smallWidth">序号</th>
									<th>车型名称</th>
									<th>电动车品牌</th>
									<th>电池类型</th>
									<th>电池容量</th>
									<th>充电方式</th>
									<th>接口</th>
									<th>创建时间</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="carinfoListTbody">

							</tbody>
						</table>
						<div id="" class="" style="height: 40px; width: auto;">
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					</div>
					<!--品牌-->
					<div class="tabCarType" style="display: none;">
						<div class="formList">
							<form id="carCompanyListForm" >
								<input type="text" name="carcompanyName" class="160width" placeholder="电动车品牌">
								<span class="check" onclick="carCompanyListSearch()">查询</span>
							</form>
						</div>
						<div class="btnGroup">
							<span style="margin-left: 0;" id="carCompanyAdd">新增</span>
							<a target="selectedTodo" rel="pkCarcompany" href="/admin/carinfo/carcompanyRemove.do"  posttype="string" title="确定删除吗？"><span>删除</span></a>
						</div>
						<table class="myTable">
							<thead>
								<tr class="active">
									<th class="smallWidth"><input type="checkbox" name="" class="selAll"  /></th>
									<th class="smallWidth">序号</th>
									<th>电动车品牌</th>
									<th>创建时间</th>
									<th>备注</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="carCompanyListTbody">
							</tbody>
						</table>
						<div id="" class="" style="height: 40px; width: auto;">
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
			</div>
			<div id="carCompanyListPage" class="pagination col-md-10 col-sm-10">
			</div>
		</div>
		
		<!--车型新增-->
		<div class="carInfoStyle" id="carInfoAddContent" style="display: none;">
				<form id="carinfoAddForm" method="post"
				action="/admin/carinfo/carinfoSave.do" callback="refreshCurrent()">
				<div class="validateBlockAdd">
					<div class="lineBlock">
						<div class="line">
							<span>车型名称</span>
							<input type="text" name="carinfoStylename"   class="marginLeft30" autofocus="autofocus"  id="modelNameAdd"/>
						</div>
						<div class="line">
							<span>电池容量</span>
							<input type="text" name="carinfoBatterycapacity"   class="marginLeft30" id="batteryCapacity"/>
						</div>
					</div>
					<div class="lineBlock">
						<div class="line">
							<span>最大续航</span>
							<input type="text" name="carinfoMaxodometer"   class="marginLeft30" id="maxJourney"/>
						</div>
						<div class="line">
							<span>充电时间</span>
							<input type="text" name="carinfoChargingTime"   class="marginLeft30" id="chargeTime"/>
						</div>
					</div>
				</div>
			<div class="lineBlock">
				<div class="line">
					<span>电池类型</span>
					<select name="carinfoBatteryType" id="addCarinfoBatteryType"  class="marginLeft30">
					</select>
				</div>
				<div class="line">
					<span>充电类型</span>
					<select name="carinfoChargingMode" id="addCarinfoChargingMode" class="marginLeft30">
					</select>
				</div>
			</div>
			<div class="lineBlock">
				<div class="line">
					<span>接口标准</span>
					<select name="carinfoPowerInterface" id="addCarinfoPowerInterface" class="marginLeft30">
					</select>
				</div>
				<div class="line">
					<span>品牌名称</span>
					<select name="carinfoCompanyId" id="addCarinfoCompanyId" class="marginLeft30">
					</select>
				</div>
			</div>
			<div class="addCarInfoTipText" style="display: none; margin-top: 6px; color: #FF0000;">
				
			</div>
			</form>
		</div>
		<!--车型编辑-->
		<div class="carInfoStyle" id="carInfoEditContent" style="display: none;">
			<form id="carinfoEditForm" method="post"
				action="/admin/carinfo/carinfoModify.do" callback="refreshCurrent()">
			<div class="validateBlock">
				<div class="lineBlock">
					<input type="hidden" name="pkCarinfo" id="pkCarinfo"  />
					<div class="line">
						<span>车型名称</span>
						<input type="text" name="carinfoStylename" id="carinfoStylename"   class="marginLeft30" />
					</div>
					<div class="line">
						<span>电池容量</span>
						<input type="text" name="carinfoBatterycapacity" id="carinfoBatterycapacity"   class="marginLeft30" />
					</div>
				</div>
				<div class="lineBlock">
					<div class="line">
						<span>最大续航</span>
						<input type="text" name="carinfoMaxodometer" id="carinfoMaxodometer"   class="marginLeft30" />
					</div>
					<div class="line">
						<span>充电时间</span>
						<input type="text" name="carinfoChargingTime" id="carinfoChargingTime"  class="marginLeft30" />
					</div>
				</div>
			</div>
			<div class="lineBlock">
				<div class="line">
					<span>电池类型</span>
					<select name="carinfoBatteryType" id="editCarinfoBatteryType" class="marginLeft30">
					</select>
				</div>
				<div class="line">
					<span>充电类型</span>
					<select name="carinfoChargingMode" id="editCarinfoChargingMode" class="marginLeft30">
					</select>
				</div>
			</div>
			<div class="lineBlock">
				<div class="line">
					<span>接口标准</span>
					<select name="carinfoPowerInterface" id="editCarinfoPowerInterface" class="marginLeft30">
						<option ></option>
					</select>
				</div>
				<div class="line">
					<span>品牌名称</span>
					<select name="carinfoCompanyId" id="editCarinfoCompanyId" class="marginLeft30">
						<option ></option>
					</select>
				</div>
			</div>
			<div class="editCarInfoTipText" style="display: none; margin-top: 6px; color: #FF0000;">
				
			</div>
			</form>
		</div>
		<!--品牌新增-->
		<div class="carCompanyStyle" id="carCompanyAddContent" style="display: none;">
			<form id="carcompanyAddForm" method="post"
				action="/admin/carinfo/carcompanySave.do" callback="refreshCurrent()">
			<div class="line">
				<span>品牌名称</span>
				<input  name="carcompanyName"   class="marginLeft30" id="addCarCompany"/>
			</div>
			<div class="line">
				<span>备注</span>
				<input  name="carcompanyRemark"   class="marginLeft54"/>
			</div>
			<div class="addCarCompanyTipText" style="display: none; color: #FF0000;margin-top:6px ;">
				
			</div>
			</form>
		</div>
		<!--品牌编辑框-->
		<div class="carCompanyStyle" id="carCompanyEditContent" style="display: none;">
			<form id="carcompanyEditForm" method="post"
				action="/admin/carinfo/carcompanyModify.do" callback="refreshCurrent()">
				<input type="hidden" name="pkCarcompany" id="pkCarcompany" />
			<div class="line">
				<span>品牌名称</span>
				<input  name="carcompanyName" id="carcompanyName"   class="marginLeft30" />
			</div>
			<div class="line">
				<span>备注</span>
				<input  name="carcompanyRemark" id="carcompanyRemark"  class="marginLeft54"/>
			</div>
			<div class="editCarCompanyTipText" style="display: none; color: #FF0000;margin-top:6px;">
				
			</div>
			</form>
		</div>
	</body>
	<script src="${ctx}/static/js/config/carinfoList.js" type="text/javascript" charset="utf-8"></script>

</html>