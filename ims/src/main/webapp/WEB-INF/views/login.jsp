<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="base.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>新账户体系</title>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/login.css"/>
</head>
<body>
<div class="Mean_Box">
    <div class="Guanggaoyu"><img src="${ctx}/static/images/ad.png" width="300" height="96" /></div>
  <div class="Denlu_Box"></div>
  <div class="Denlu_Main">
    <ul>
      <li class="tiele">登录</li>
        <%--onblur="testUserName()"--%>
      <li><span class="yonghuming"><input name="username" value="${username}" type="text" id="userName" minlength="6" maxlength="16" /></span></li>
      <li>
      	<span class="mima">
      		<input  type="password" id="password" minlength="6" maxlength="20"/>
      		<input type="hidden" name="passwd" id="password1"/>
     	</span>
      </li>
      <li>
      	<span class="yanzheng">
      		<input name="code" type="text" id="codeValue" maxlength="4"/>
      	</span>
      	<span class="yanzhengma">
      	<img id="codeImg" src="" onclick="reloadCode()" style="cursor: pointer;"  width="80" height="38" /></span>
      	<span class="huanyizhang">
      		<a href="#" onclick="reloadCode()">换一张</a>
      	</span>
      	
      </li>
      <li class="regTest" id="regTest" style="height:20px;display: none; line-height:20px;text-align:left;color:#ffff66; font-size:12px;"></li><!--提示这行Li在没有错误提示的时候不显示-->
      <li><span class="tijiao" id="loginUser">登陆</span></li>
      <li style="font-size:15px; color:#FFF; text-align:center; padding-top:7px;">如有疑问，请拔打：400-085-0006</li>
    </ul>
  </div>
</div>
<div class="BanQuan">Copyright © 1998 - 2016 Icharge. All Rights Reserved.         爱充网络科技 版权所有</div>
</body>
</html>
<script src="${ctx}/static/js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/static/js/cookieHelper.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/static/js/lib/layer/layer.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/static/lib/jquery.MD5/jquery.md5.js"></script>
<script src="${ctx}/static/js/apiAddress-web.js"></script>
<script src="${ctx}/static/js/login.js" type="text/javascript" charset="utf-8"></script>
