<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/common/taglibs.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Add Album Test</title>
</head>
<body>
查询全国范围下的充电点
<br>
<form action="<%=basePath%>/amap/search.do" method="post">

<table>
<tr>
<td>org<font color="red">*</font></td>
<td><input id="org" name="org" type="text" value="9009" /></td>
</tr>

<tr>
<td>pageNo<font color="red">*</font></td>
<td><input id="pageNo" name="pageNo" type="text" value="1" /></td>
</tr>

<tr>
<td>pageSize<font color="red">*</font></td>
<td><input id="pageSize" name="pageSize" type="text" value="100" /></td>
</tr>



<tr>
<td>token<font color="red">*</font></td>
<td><input id="token" name="token" type="text" value="" /></td>
</tr>

</table>

<input type="submit" value="submit" />
<input type="reset" value="reset" />

</form>

</body>
</html>