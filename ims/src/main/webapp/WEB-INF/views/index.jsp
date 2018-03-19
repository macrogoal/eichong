<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="base.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="common.jsp" %>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <title>新账户体系管理系统</title>
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html"/>
    <![endif]-->
    <link rel="shortcut icon" href="favicon.ico">
    <link href="${ctx}/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx}/static/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/static/css/animate.min.css" rel="stylesheet">
    <link href="${ctx}/static/css/style.min.css" rel="stylesheet">
</head>
<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
<div id="wrapper">
    <!--左侧导航开始-->
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="nav-close"><i class="fa fa-times-circle"></i>
        </div>
        <div class="sidebar-collapse" style="background: #FC942F;">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear">
                                <span class="block m-t-xs">
                                    <strong class="font-bold" id="userName"></strong>
                                </span>
                                <span class="text-muted text-xs block" id="userLevel"></span>
                            </span>
                        </a>
                        <span><a class="modifyPassword" onclick="return false;"
                                 href="${ctx}/static/html/password/modifyPassword.html">修改密码</a></span>
                    </div>
                    <div class="logo-element">eichong
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <!--左侧导航结束-->
    <!--右侧部分开始-->
    <div id="page-wrapper" class="gray-bg dashbard-1">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary"
                                              id="controlSlide" href="javascript:void(0);"><i
                        class="fa fa-bars"></i> </a>

                    <div style="line-height: 60px;text-align: left;">
                        爱充运营管理后台
                    </div>
                </div>
            </nav>
        </div>
        <div class="row content-tabs">
            <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
            </button>
            <nav class="page-tabs J_menuTabs">
                <div class="page-tabs-content">
                    <a href="javascript:;" class="active J_menuTab"
                       data-id="${ctx}/static/html/productInfo.html">首页</a>
                </div>
            </nav>
            <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
            </button>
            <div class="btn-group roll-nav roll-right">
                <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

                </button>
                <ul role="menu" class="dropdown-menu dropdown-menu-right">
                    <li class="J_tabShowActive"><a>定位当前选项卡</a>
                    </li>
                    <li class="divider"></li>
                    <li class="J_tabCloseAll"><a>关闭全部选项卡</a>
                    </li>
                    <li class="J_tabCloseOther"><a>关闭其他选项卡</a>
                    </li>
                    <li class="J_tabCloseThis" style="display:none;"><a>关闭当前选项卡</a></li>
                </ul>
            </div>
            <a onclick="return false;" id="loginOut" class="roll-nav roll-right J_tabExit"><i
                    class="fa fa fa-sign-out"></i> 退出</a>
        </div>
        <div class="row J_mainContent" id="content-main">
            <%--<iframe class="J_iframe" name="iframe0" width="100%" height="100%"--%>
            <%--src="${ctx}/static/html/dataCenter/index.html"--%>
            <%--frameborder="0" data-id="${ctx}/static/html/dataCenter/index.html" seamless></iframe>--%>
            <iframe class="J_iframe" name="iframe0" width="100%" height="100%"
                    src="${ctx}/static/html/productInfo.html"
                    frameborder="0" data-id="${ctx}/static/html/productInfo.html" seamless></iframe>
        </div>
    </div>
    <!--右侧部分结束-->
    <!--右侧边栏开始-->
    <div id="right-sidebar">
        <div class="sidebar-container">
            <div class="tab-content">
            </div>
        </div>
    </div>
    <!--右侧边栏结束-->
</div>
<script src="${ctx}/static/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/static/js/apiAddress-web.js"></script>
<script src="${ctx}/static/js/cookieHelper.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/static/js/index.js"></script>
<script src="${ctx}/static/js/bootstrap.min.js?v=3.3.6"></script>
<script src="${ctx}/static/js/lib/metisMenu/jquery.metisMenu.js"></script>
<script src="${ctx}/static/js/lib/slimscroll/jquery.slimscroll.min.js"></script>
<script src="${ctx}/static/js/lib/layer/layer.js" type="text/javascript" charset="utf-8"></script>
<script src="${ctx}/static/js/hplus.min.js?v=4.1.0"></script>
<script src="${ctx}/static/js/contabs.min.js"></script>
<script src="${ctx}/static/js/lib/pace/pace.min.js"></script>
<script>
    newTab(".modifyPassword", "修改密码");//打开修改密码页面
    getLoginUser();
    function getLoginUser() {
        var userId = new Base64().decode(getCookieValue('userId'));
        var userName = new Base64().decode(getCookieValue('userName'));
        var code = getCookieValue('code');
        var cpyId = getCookieValue('cpyId');
        var userLevel = getCookieValue('userLevel');
        userName = userName == "" ? "\"\"" : ("\""+userName+"\"");
        if(code.indexOf('"')>-1){
            code = code.substring(1, code.length - 1);
        }else if(code==""){
            code="";
        }else{
            code=code;
        }
        var loginUser = '{\"userId\":' + userId + ',\"userLevel\":' + userLevel+ ',\"userName\":' + userName + ',\"code\":' +"\""+ code +"\""+ ',\"cpyId\":' + '\"' + cpyId + '\"}';
        window.localStorage.setItem('loginUser', loginUser);

        if (userName == '""') {
            $('#userName').html('');
        } else {
            var loginUser=window.localStorage.getItem('loginUser');
            $('#userName').html(JSON.parse(loginUser).userName);
        }
        if (userId == '' || userId == null) {
            window.location.href = 'login.jsp';
        }

        if (userLevel == 1) {
            $('#userLevel').html('超级管理员');
        } else if (userLevel == 2) {
            $('#userLevel').html('系统管理员');
        } else if (userLevel == 8) {
            $('#userLevel').html('业务管理员');
        }


    }

</script>
</body>
</html>
