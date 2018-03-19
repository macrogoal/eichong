<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="/WEB-INF/mytag.tld" prefix="my"%>
<%@ taglib uri="/WEB-INF/bluemobi-tag.tld" prefix="bmtag"%>
<script type="text/javascript">
</script>
<h2 class="contentTitle">
	<bmtag:message messageKey="编辑企业账户预警" />
</h2>
<div class="pageContent">
	<form method="post" action="warning/modifyWarning.do"
		class="pageForm required-validate" enctype="multipart/form-data"
		onsubmit="return iframeCallback(this, navTabAjaxDone)">
		<div class="pageFormContent nowrap" layoutH="97">
			
			
			<dl>
				<dt style="width:120px;">预警金额（元）</dt>
				<dd>
				<input hidden="true" name="thwPkId"  value="${TblWarning.thwPkId }"/>
					<input name="thwThreshold"  value="${TblWarning.thwThreshold }"class="textInput required"  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
						maxlength="50" style="width: 165px;" /> <span class="info"></span>
				</dd>
			</dl>
			<dl>
				<dt style="width:120px;">运营管理员手机号</dt>
				<dd>
					<input name="thwCellphone" value="${TblWarning.thwCellphone }" class="textInput required" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
						maxlength="50" style="width: 165px;"/> <span class="info"></span>
				</dd>
			</dl>
			<dl>
				<dt style="width:120px;">公司手机号</dt>
				<dd>
					<input name="thwCustomerPhone"   value="${TblWarning.thwCustomerPhone }"onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
						maxlength="50" style="width: 165px;"/> <span class="info"></span>
				</dd>
			</dl>
		</div>
		
		<div class="formBar">
			<ul>
				<li><bmtag:button messageKey="common.button.submit"
						type="submit" id="formSubmitter_editWarning" />
				</li>
				<li><bmtag:button messageKey="common.button.back" type="button"
						dwzClass="close" />
				</li>
			</ul>
		</div>
	</form>
</div>
