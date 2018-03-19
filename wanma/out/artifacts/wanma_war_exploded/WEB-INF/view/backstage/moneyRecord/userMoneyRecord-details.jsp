<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="/WEB-INF/mytag.tld" prefix="my"%>
<%@ taglib uri="/WEB-INF/bluemobi-tag.tld" prefix="bmtag"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<script type="text/javascript">
	var webroot = "${webroot}";
	function checkDetails() {
	}
</script>
<div class="pageHeader">
	<form id="pagerForm" method="post"
		action="moneyRecord/getUserMoneyRecordDetials.do?puHi_UserId=${params.puHi_UserId}"
		onsubmit="return navTabSearch(this);">
		<input type="hidden" name="status" value="${pager.status}" /> <input
			type="hidden" name="keywords" value="${pager.keywords}" /> <input
			type="hidden" name="pageNum" value="${pager.pageNum}" /> <input
			type="hidden" name="numPerPage" value="${pager.numPerPage}" />
		<div class="searchBar">
			<table class="searchContent">
				<tbody>
					<tr>
						<!-- value="搜索关键字"  -->
						<td style="padding-left: 25px;"><span>消费类型&nbsp;</span> <select
							onchange="typeChange(this)" name="puHi_Type"
							style="align: left; width: 162px">
								<option value="">全部消费</option>
								<option value="1"
									${params.puHi_Type == 1? 'selected="selected"' : ''}>充电消费</option>
								<option value="2"
									${params.puHi_Type == 2? 'selected="selected"' : ''}>预约消费</option>
								<option value="3"
									${params.puHi_Type == 3? 'selected="selected"' : ''}>购物消费</option>
								<option value="4"
									${params.puHi_Type == 4? 'selected="selected"' : ''}>充值</option>
						</select></td>
						<td><span>消费时间&nbsp;</span> <input
							id="moneyDetails_createDate" name="startTime"
							value="${params.startTime }" class="date" style="width: 155px"
							onClick="WdatePicker({el:'moneyDetails_createDate',minDate:'2015-01-01',maxDate:'#F{$dp.$D(\'moneyDetails_lastUpdateDate\')}'})">
							至 <input id="moneyDetails_lastUpdateDate" name="endTime"
							value="${params.endTime }" class="date" style="width: 155px"
							onClick="WdatePicker({el:'moneyDetails_lastUpdateDate',minDate:'#F{$dp.$D(\'moneyDetails_createDate\')}'})">

						</td>
						<td id="areaSelecter"><span>区域选择</span> <select
							class="provinceCode required" id="electricSelProvince"
							next="electricSelCity" name="provinceCode"
							style="float: none; width: 130px;">
								<option value="">--请选择省份--</option>
								<c:forEach var="item" items="${proviceMap}">
									<option value="${item.key}"
										${item.key== params.proviceCode ? 'selected="selected"' : ''}>
										${item.value.PROVINCE_NAME}</option>
								</c:forEach>
						</select> <select class="cityCode required" id="electricSelCity"
							next="electricSelDistrict"
							data-val="${params.cityCode}" name="cityCode"
							style="float: none; width: 130px;">
								<option value="">--请选择城市--</option>
						</select> <select id="electricSelDistrict"
							data-val="${params.countyCode}" name="countyCode"
							class="required" style="float: none; width: 130px;">
								<option value="">--请选择区/县--</option>
						</select></td>
						<td align="right"><bmtag:button
								messageKey="common.button.search" type="submit"
								id="formSubmitter" /></td>
					</tr>
					<tr height="10px;"></tr>
				</tbody>
			</table>
			<table class="searchContent">
				<tr style="color: green;">
					<td style="font-size: 20px; padding-left: 20px; line-height: 30px;">总充值:${userTotalRecharge.userAllPaypuHi_Monetary}元</td>
					<td style="font-size: 18px;">支付宝充值:${userTotalRecharge.aliPayUserPu_Monetary}元</td>
					<td style="font-size: 18px;">微信充值:${userTotalRecharge.weChatUserPu_Monetary}元</td>
					<td style="font-size: 18px;">平台人工充值:${userTotalRecharge.chargeCardUserPu_Monetary}元</td>
					<td style="font-size: 18px;">换卡转账:${userTotalRecharge.TransferAccount_Monetary}元</td>
					<td style="font-size: 18px;">7月活动送:${userTotalRecharge.activity_Monetary}元</td>
					<!-- <td style="font-size:18px;">银联充值:${userTotalRecharge.unionpayUserPu_Monetary}</td> -->
				</tr>
				<tr style="color: red;">
					<td style="font-size: 20px; padding-left: 20px; line-height: 30px;">总消费:${userTotalPurchase.userAllConsume}元</td>
					<td style="font-size: 18px;">充电消费:${userTotalPurchase.chargeUserConsume}元</td>
					<td style="font-size: 18px;">预约消费:${userTotalPurchase.orderUserConsume}元</td>
					<!-- <td style="font-size:18px;">购物消费:${userTotalPurchase.shopUserConsume}</td> -->
				</tr>
				<tr style="color: red;">
					<td style="font-size: 20px; padding-left: 20px; line-height: 30px;">余额:${params.allAccount}元</td>

				</tr>
			</table>
		</div>
	</form>
</div>
<div class="pageContent">
	<c:choose>
		<c:when test="${params.puHi_Type == '1' || params.puHi_Type == '2'}">
			<table class="table" width="100%" layoutH="180">
				<thead>
					<tr align="center">
						<th width="30"><bmtag:message messageKey="序号" /></th>
						<th><bmtag:message messageKey="消费时间" /></th>
						<th><bmtag:message messageKey="消费金额(元)" /></th>
						<th><bmtag:message messageKey="消费方式" /></th>
						<th><bmtag:message messageKey="电桩名称" /></th>
						<th><bmtag:message messageKey="电桩地址" /></th>
					</tr>
				</thead>
				<tbody>

					<c:forEach items="${moneyRecordListByUserId}"
						var="moneyRecordByUserId" varStatus="status">
						<tr target="" rel="${moneyRecordByUserId.pk_PurchaseHistory }"
							align="center">
							<td>${ status.index + 1 + pager.numPerPage*(pager.pageNum-1)}</td>
							<td><fmt:formatDate
									value="${moneyRecordByUserId.puHi_PurchaseHistoryTime }"
									pattern="yyyy-MM-dd HH:mm:ss" /></td>
							<td>${moneyRecordByUserId.puHi_Monetary}</td>
							<td><c:if
									test="${moneyRecordByUserId.puHi_ChargeType == '1'}">
							支付宝充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '2'}">
							微信充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '4'}">
							平台人工充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '5'}">
							换卡转账
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '6'}">
							7月活动送
					</c:if> <c:if test="${moneyRecordByUserId.puHi_Type == '1'}">
							充电消费
					</c:if> <c:if test="${moneyRecordByUserId.puHi_Type == '2'}">
							预约消费
					</c:if></td>
							<td>${moneyRecordByUserId.elPi_ElectricPileName}</td>
							<td>${moneyRecordByUserId.elPi_ElectricPileAddress}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</c:when>
		<c:otherwise>
			<table class="table" width="100%" layoutH="180">
				<thead>
					<tr align="center">
						<th width="30"><bmtag:message messageKey="序号" /></th>
						<th><bmtag:message messageKey="消费时间" /></th>
						<th><bmtag:message messageKey="消费金额(元)" /></th>
						<th><bmtag:message messageKey="消费类型" /></th>
						<th><bmtag:message messageKey="消费方式" /></th>
					</tr>
				</thead>
				<tbody>

					<c:forEach items="${moneyRecordListByUserId}"
						var="moneyRecordByUserId" varStatus="status">
						<tr target="" rel="${moneyRecordByUserId.pk_PurchaseHistory }"
							align="center">
							<td>${ status.index + 1 + pager.numPerPage*(pager.pageNum-1)}</td>
							<td><fmt:formatDate
									value="${moneyRecordByUserId.puHi_PurchaseHistoryTime }"
									pattern="yyyy-MM-dd HH:mm:ss" /></td>
							<td>${moneyRecordByUserId.puHi_Monetary}</td>
							<td><c:if
									test="${moneyRecordByUserId.puHi_Type == '1'||moneyRecordByUserId.puHi_Type == '2'||moneyRecordByUserId.puHi_Type == '3'}">
									<p style="color: red;">消费</p>
								</c:if> <c:if test="${moneyRecordByUserId.puHi_Type == '4'}">
									<p style="color: green;">充值</p>
								</c:if></td>
							<td><c:if
									test="${moneyRecordByUserId.puHi_ChargeType == '1'}">
							支付宝充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '2'}">
							微信充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '4'}">
							平台人工充值
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '5'}">
							换卡转账
					</c:if> <c:if test="${moneyRecordByUserId.puHi_ChargeType == '6'}">
							7月活动送
					</c:if> <c:if test="${moneyRecordByUserId.puHi_Type == '1'}">
							充电消费
					</c:if> <c:if test="${moneyRecordByUserId.puHi_Type == '2'}">
							预约消费
					</c:if></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</c:otherwise>
	</c:choose>
	<div class="panelBar">
		<div class="pages">
			<span> 共${pager.total }条, 共${pager.pageTotal}页</span>
		</div>
		<div class="pagination" targetType="navTab"
			totalCount="${pager.total}" numPerPage="${pager.numPerPage}"
			pageNumShown="10" currentPage="${pager.pageNum}"></div>
	</div>
</div>
<script type="text/javascript">
	$(function() {
		loadCity($("#electricSelProvince"));
		loadArea($("#electricSelCity"));
	});
	var phType = '${params.puHi_Type}';
	areaSelect(phType);
	function typeChange(this_e) {
		phType = $(this_e).val();
		areaSelect(phType);
	}
	function areaSelect(pt) {
		if (pt == '1' || pt == '2') {
			$("#areaSelecter").show();
		} else {
			$("#areaSelecter").hide();
		}
	}
</script>
