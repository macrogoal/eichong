<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="/WEB-INF/mytag.tld" prefix="my"%>
<%@ taglib uri="/WEB-INF/bluemobi-tag.tld" prefix="bmtag"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<div class="pageHeader">
	<form id="pagerForm" method="post" action="activity/listActivity.do"
		onsubmit="return navTabSearch(this);">
		<input type="hidden" name="status" value="${pager.status}" /> <input
			type="hidden" name="keywords" value="${pager.keywords}" /> <input
			type="hidden" name="pageNum" value="${pager.pageNum}" /> <input
			type="hidden" name="numPerPage" value="${pager.numPerPage}" />
	 	<div class="searchBar">
			<table class="searchContent">
				<tbody>
					<tr>
						<td style="align: left"><span>状态</span> <select
							name="actStatus" id="actStatus" class="select_Style"
							style="width: 150px;">
								<option value="">全部</option>
								<option value="0"
									${TblActivity.actStatus=="0"
									? 'selected' : ''}>未开始</option>
								<option value="2"
									${TblActivity.actStatus=="2"
									? 'selected' : ''}>进行中</option>
								<option value="3"
									${TblActivity.actStatus=="3"
									? 'selected' : ''}>已结束</option>
								<option value="1"
									${TblActivity.actStatus=="1"
									? 'selected' : ''}>终止</option>
						</select></td>


					<%-- 	<td style="align: left"><span>渠道</span> <select
							name="actChanneltype" id="actChanneltype" class="select_Style"
							style="width: 150px;">
							<option value="">全部</option>
								<option value="1"
									${TblActivity.actChanneltype=='1'
									? 'selected' : ''}>吉利集团</option>
								<option value="2"
									${TblActivity.actChanneltype=='2'
									? 'selected' : ''}>车分享</option>
								
						</select></td> --%>

<td style="align: left"><span>渠道</span> <select
							name="actChanneltype" class="select_Style" style="width: 150px;">
							<option value="">全部</option>
								<c:forEach var="item" items="${ChannelType}">
									<option value="${item.pkCompanyId}"
										${item.pkCompanyId==TblCoupon.pkCompanyId?'selected="selected"' : ''}>${item.cpyCompanyName}</option>
								</c:forEach>
						</select></td>

						<td align="right"><bmtag:button
								messageKey="common.button.search" type="submit"
								id="formSubmitter_chactivity" /></td>

					</tr>
				</tbody>
			</table>
		</div>

	</form>
</div>
<div class="pageContent">
	<div class="panelBar">
		<ul class="toolBar">
		<li>
				<bmtag:link isAuth="true" target="navTab" href="activity/addChaActivity.do"
				rel="ids"  messageKey="common.icon.new" dwzClass="add" id="addActivity" />
			</li>
			<%--  <li>
				 <bmtag:link isAuth="true"  target="selectedTodo" href="electric/changeElectricPileState.do?changeType=examineOkPage"
				 	rel="ids" postType="string" altKey="确定通过吗？" dwzClass="edit" messageKey="通过" />
			 </li> --%>
		</ul>
	</div>
	<table class="table" width="100%" layoutH="132">
		<thead>
			<tr align="center">
				<th><input type="checkbox" group="ids" class="checkboxCtrl">
				</th>
				<th style="width:3%"><bmtag:message messageKey="编号" /></th>
                <th style="width:12%"><bmtag:message messageKey="活动名称" /></th>
				<th style="width:10%"><bmtag:message messageKey="状态" /></th>
				<th style="width:12%"><bmtag:message messageKey="渠道" /></th>
				<th style="width:10%"><bmtag:message messageKey="奖品" /></th>
				<th style="width:10%"><bmtag:message messageKey="开始时间" /></th>
				<th style="width:10%"><bmtag:message messageKey="结束时间" /></th>
				<th style="width:13%"><bmtag:message messageKey="备注" /></th>
				<th style="width:10%"><bmtag:message messageKey="操作" /></th>
				<th style="width:10%"><bmtag:message messageKey="操作人" /></th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${activityList}" var="item" varStatus="status">
				<tr target="id" rel="${item.pkActivity}" align="center">
					<td><input name="ids" value="${item.pkActivity}"
						type="checkbox"></td>
					<td>${item.pkActivity}</td>
					<td>${item.actActivityname}</td>
					<td>
					<c:if test="${item.actStatus ==0}">未开始</c:if> 
					<c:if test="${item.actStatus ==2}"><a style="color:red;">进行中</a></c:if>
					<c:if test="${item.actStatus ==3}">已结束 </c:if>
					<c:if test="${item.actStatus ==1}">终止 </c:if>
					</td>
					<td>${item.cpyCompanyName}</td>
					<td title="${item.prizeName}">${item.prizeName}</td>
					<td><fmt:formatDate value="${item.actBegindate }"
							pattern="yyyy-MM-dd" /></td>
					<td><fmt:formatDate value="${item.actEnddate }"
							pattern="yyyy-MM-dd" /></td>
					<td title="${item.actRemark}">${item.actRemark }</td>
					<td style="width:170px;">
                    <a style = "color:blue;cursor:pointer;" onclick='toEdit_cha("${item.pkActivity}","${item.actStatus}")'title="确定要处理吗？">终止活动</a>
                    </td>
					<td>${item.actUpdateuserid}</td>
					
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<div class="panelBar">
		<div class="pages">
			共${pager.total }条, 共${pager.pageTotal}页</span>
		</div>
		<div class="pagination" targetType="navTab"
			totalCount="${pager.total}" numPerPage="${pager.numPerPage}"
			pageNumShown="10" currentPage="${pager.pageNum}"></div>
	</div>
</div>

<script type="text/javascript">
function toEdit_cha(i,j) {
	alertMsg.confirm("终止是活动的最终状态，终止后不可恢复。活动终止后，该活动对应现金券状态会发生改变，未兑换的现金券将失效；已经兑换的，现金券可以继续使用。活动的结束时间，更改为终止活动的时间。", {
		okCall: function(){
			//$.post(url, data, DWZ.ajaxDone, "json");
			$.ajax({
				type : 'post',
				url : "/wanma/admin/activity/changeActivityState.do?pkActivity="+i,
				dataType : "json",
				success : function(datas) {
				if(datas==1){
				
				   document.getElementById("formSubmitter_chactivity").click();
					alertMsg.info("修改成功！");
				}
				else{
					alertMsg.error("修改失败！");
				}
				}
			});
		}
	});/* 
	if(j==3){
		alertMsg.error("请输入发票号码！");
	}

	else{
	$.ajax({
		type : 'post',
		url : "/wanma/admin/finance/changeInvoiceDetail.do?pkInvoice="+pkInvoice+"&ivNumber="+ivNumber,
		dataType : "json",
		success : function(datas) {
		if(datas==1){
		
		   document.getElementById("formSubmitter_invoice").click();
			alertMsg.info("修改成功！");
		}
		else{
			alertMsg.error("修改失败！");
		}
		}
	});
	} */
}	
	

	
	
</script>


