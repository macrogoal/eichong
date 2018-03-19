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
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<link href="<%=request.getContextPath()%>/res/commen.css"
	rel="stylesheet" />
<script type="text/javascript">
var webroot = "${webroot}";

function formatButton_edit() {
    var AdSize = $("#editbtImage t").length;
	if (AdSize == 0) {
		alertMsg.error("banner图片不可为空！");
		return;
  }
	var buttonType = $(' input[name="buttonType"]:checked ').val();
	if(buttonType==1){
		var buttonAction = $("#buttonAction").val();
		if(buttonAction==0){
			alertMsg.error("请选择具体的内部动作");
			return;
		}
	}else if(buttonType==2){
		$("#buttonAction").val(0)
		var buttonUrl = $("#buttonUrl").val();
		if(buttonUrl==""){
			alertMsg.error("外部链接不能为空");
			return;
		}
	}
	$("#buttonFormEdit").submit();
}
</script>
<head>

 <style type="text/css">
.divcss5{ border-left:10px solid #00F} ;
 </style>
 </head>

<h2 class="contentTitle">编辑功能按钮</h2>
<div  class="pageContent">
	<form  method="post" action="appButton/editAppButton.do" id="buttonFormEdit"
		class="pageForm required-validate" enctype="multipart/form-data"
		onsubmit="return iframeCallback(this, navTabAjaxDone)">
		<div class="pageFormContent nowrap" layoutH="97"> 
		<input type="hidden" name="pkButtonId" value="${appButton.pkButtonId}" />
		<dl><dt>功能按钮图片</dt>
			<dd id="editbtImage">
					<c:forEach var="item" items="${appButton.buttonPicUrl}" varStatus="status" >
							<t>
							<img  src="${item}" style="width: 150px; height: 150px;" />
							<a href="javascript:void(0);" onclick="deleteFile('${item}',this,'${appButton.pkButtonId}')">删除</a>
							</t>
					</c:forEach>
					<input type="hidden" id="businessType_edit" name="businessType" value="appButtonPic" />
					<input type="hidden" id="buttonFileId_edit" name="buttonPicFileId" />
					<input  id="buttonFileInput_edit"  type="file" name="listImage" class="file" style="width: 260px;" 
					uploaderOption="{
							swf:'<%=request.getContextPath()%>/res/dwz/uploadify/scripts/uploadify.swf',
							uploader:'<%=request.getContextPath()%>/common/uploadFile.do',
							formData:{type:'appButtonPic',isZip:'1'},
							buttonText:'上传',
							queueSizeLimit:'1',
							fileSizeLimit:'4096K',
							fileTypeDesc:'*.jpg;*.png;',
							fileTypeExts:'*.jpg;*.png;',
							fileObjName: 'file', 
							auto:true,
							multi:true,
							overrideEvents:[ 'onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError' ],
							onSelectError:uploadify_onSelectError,
   							onUploadError:uploadify_onUploadError,
							onUploadStart:FileUploadStart,
							onUploadSuccess:FileUploadSuccess,
							onQueueComplete:FileUploadComplete
						}"
					/> 	
			</dd>
		</dl>
		<dl>
			<dt>名称</dt>
			<dd>
				<input name="buttonName" id="buttonName"  class="required"  maxlength="10" value="${appButton.buttonName}"/> <span class="info"></span>
			</dd>
		</dl>
		<dl>
			<dt>操作</dt>
			<dd>
				<div style="height:30px;line-height:30px;width:400px;">
				<input name="buttonType"  type="radio" class="required" ${appButton.buttonType==1?'checked' : ''} value="1" style="float:left;margin-top:5px;"/><span style="float:left;margin-top:5px;">内部动作</span>  
				 <select  style="width: 172px !important;margin-left:10px" class="select_Style" id="buttonAction" name="buttonAction">
								<option value="0">-请选择-</option>
								<option value="1" ${appButton.buttonAction == 1?"selected":""}>扫码充电</option>
								<option value="2" ${appButton.buttonAction == 2?"selected":""}>地图找桩</option>
								<option value="3" ${appButton.buttonAction == 3?"selected":""}>我的充电</option>
								<option value="4" ${appButton.buttonAction == 4?"selected":""}>余额充值</option>
				 </select>
				</div>
				<div style="height:30px;line-height:30px;width:400px;">
				<input name="buttonType"  type="radio" class="required" ${appButton.buttonType==2?'checked' : ''} value="2" style="float:left;margin-top:5px;"/><span style="float:left;margin-top:5px;">外部链接</span>
				<input   type="text"style="width: 300px !important;margin-left:10px" class="url" id="buttonUrl" name="buttonUrl" value="${appButton.buttonUrl}"/>
				</div>
			</dd>
		</dl>
		<dl>
			<dt>状态</dt>
			<dd>
				<input type="radio"  value='1' name='buttonStatus' ${appButton.buttonStatus==1?'checked' : ''} />开启 
				<input type="radio"  value='3' name='buttonStatus' ${appButton.buttonStatus==3?'checked' : ''} />关闭
			</dd>
		</dl>
		<dl>
			<dt>备注</dt>
			<dd>
				<textarea class="required" rows="5" cols="50" name="buttonDesc" maxlength="250">${appButton.buttonDesc}</textarea>
			</dd>
		</dl>
	</div>	
		<div class="formBar">
			<ul>
				<li><bmtag:button messageKey="common.button.submit" onclick="formatButton_edit()"
						type="button" id="formSubmitter" />
				</li>
				<li><bmtag:button messageKey="common.button.back" type="button"
						dwzClass="close" />
				</li>
			</ul>
		</div>
	</form>
</div>
<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/appButton/uploadButton_edit.js" />