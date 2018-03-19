$('#goback').on('click', function () {
    window.location.href = 'admin_list.html';
})
$(function () {
    getBaseInfo();
    //角色列表加载
    setTimeout('toLoadRoleList()', 300);
})

function getBaseInfo() {
    var loginUser = window.localStorage.getItem('loginUser');
    var getLoginUser = JSON.parse(loginUser);
    //备用字段
    /*var adminType=getLoginUser.adminType;
     var cpyId=getLoginUser.cpyId;
     var userName=getLoginUser.userName;
     var userAccount=getLoginUser.userAccount;
     var userId=getLoginUser.userId;*/
    var userLevel = getLoginUser.userLevel;
    loadAdminType(userLevel);
}
function loadAdminType(userLevel) {
    if (userLevel == 1) {
        var html = '<li data-option="2" class="seleced">系统管理员</li><li data-option="8">业务管理员</li>';
    }
    if (userLevel == 2) {
        var html = '<li data-option="2" class="seleced">系统管理员</li><li data-option="8">业务管理员</li>';
    } else if (userLevel == 8) {
        var html = '<li data-option="8">业务管理员</li>';
    }
    $('.adminTypeUl').html(html);
}
//类型========================
$('.adminTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    //获取创建人类型的userLevel  setUserLevel
    var setUserLevel = $(this).attr('data-option');
    //获取登陆人userLevel  getUserLevel
    var loginUser = window.localStorage.getItem('loginUser');
    var getLoginUser = JSON.parse(loginUser);
    var getUserLevel = getLoginUser.userLevel;
    //根据创建人和登陆人的等级确定是否展示等级
    isCreatCpyCompnay(getUserLevel, setUserLevel);
    //alert(setUserLevel+"::"+getUserLevel)

})
function isCreatCpyCompnay(getUserLevel, setUserLevel) {
    //系统管理员创建系统管理员
    if ((getUserLevel == 1 || getUserLevel == 2) && (setUserLevel == 2)) {
        $('#showFlag').attr('disabled', true);
        $('#cpyProvinceCode').attr('data-value', '');
        $('#cypCityCode').attr('data-value', '');
        $('#cpyCompanyName').attr('data-value', '');
        $('#cpyProvinceCode').html('请选择');
        $('#cypCityCode').html('请选择');
        $('#cpyCompanyName').html('请选择');
        $('.cpyProvinceUl').html('');
        $('.cypCityUl').html('');
        $('.cpyCompanyUl').html('');
        $('#showFlag').attr('checked', false);
        $('#showFlag').val(0);
        return;
    }
    //系统管理员创建业务管理员
    if ((getUserLevel == 1 || getUserLevel == 2) && (setUserLevel == 8)) {
        toLoadProvince('', '#cpyProvinceCode', '.cpyProvinceUl', 'toUnbindEvent');
        $('#showFlag').attr('disabled', false);
        return;
    }
    //业务管理员创建业务管理员 将登陆的业务管理员传递
    if ((getUserLevel != 1 || getUserLevel != 2) && (setUserLevel == 8)) {
        toLoadCpy();
        $('#showFlag').attr('disabled', true);
        return;
    }

}
function toLoadCpy() {
    $.ajax({
        type: "post",
        url: basePath + getCompanyListUrl,
        async: true,
        data: {
            provinceCode: '',
            cityCode: ''
        },
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var cypCompanyLi = '<li data-option="">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.cpyCompanyUl').html(cypCompanyLi);
                toUnbindEvent();
            }
        }
    });
};
function toUnbindEvent() {
    $('.provinceBlock').unbind();
    $('.cpyCityBlock').unbind();
    $('.companyBlock').unbind();
    $('.statusBlock').unbind();
    $('.adminBlock').unbind();
    $('.roleBlock').unbind();
    selectModel();
}
//新建用户账号校验
$('#userAccount').on('blur', function () {
    if (testAccountNum()) {
        //isSaveBtnLight();
    }
})
function testAccountNum() {
    //不做校验，不为空即可
    var userAccountValue = $('#userAccount').val();
    var regUserName = /^([A-Z]|[a-z]|\d){6,16}$/;
    if (!userAccountValue) {
        $('#userAccount').focus();
        $('#userAccount').val('');
        $('#accountNumTip').html('管理员账号不能为空！');
        return false;
    } else if(!regUserName.test(userAccountValue)){
        $('#userAccount').focus();
        $('#userAccount').val('');
        $('#accountNumTip').html('管理员账号为6-16位字母和数字组成');
        return false;
    }
    else {
        $('#accountNumTip').html('');
        return true;
    }
    return true;

}
//判断密码不能为空
$('#password').on('blur', function () {
    if (testPasswod()) {
        //isSaveBtnLight();
    }
})
function testPasswod() {
    //不做校验，不为空即可
    var passwordValue = $('#password').val();
    if (!passwordValue) {
        $('#password').focus();
        $('#password').val('');
        $('#passwordTip').html('密码不能为空！');
        return false;
    } else {
        $('#passwordTip').html('');
        return true;
    }
    return true;
}

//点击桩权限复选框交互
$('#showFlag').on('click', function () {
    var flag = $(this).prop('checked');
    if (flag == true) {
        $(this).val(1);
    } else {
        $(this).val(0);
    }
})

//新建用户 姓名长度校验，不超过10字符
function userName() {
    var userRealName = $('#userRealName').val();
    if (userRealName) {
        if (userRealName.length > 10) {
            $('#userRealName').focus();
            $('#userRealName').val('');
            $('#userNameTip').html('姓名长度不能超过10个字符');
            return false;
        } else {
            $('#userNameTip').html('');
            return true;
        }
    }
    return true;
}
//手机号校验
function telTest() {
    var userPhone = $('#userPhone').val();
    var rePhone = /^1[3|4|5|8]{1}[0-9]{9}$/;//手机号验证
    if (userPhone) {
        if (!rePhone.test(userPhone)) {
            $('#userPhone').focus();
            $('#userPhone').val('');
            $('#userPhoneTip').html('格式错误，请输入正确的手机格式');
            return false;
        } else {
            $('#userPhoneTip').html('');
            return true;
        }
    }
    return true;
}

//点击省加载市
$('.cpyProvinceUl').on("click", "li", function () {
    $('#cypCityCode').html('请选择');
    $('.cypCityUl').html('');
    $('#cypCityCode').attr('data-value', '');
    $('#cpyCompanyName').html('请选择');
    $('#cpyCompanyName').attr('data-value', '');
    $('.cpyCompanyUl').html('');
    //$('#saveBtn').removeAttr('onclick').addClass('saveBtn').removeClass('saveBtnStyle');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cypCityCode').html('请选择');
        $('.cypCityUl').html('');
        $('#cypCityCode').attr('data-value', '');
        $('#cpyCompanyName').html('请选择');
        $('#cpyCompanyName').attr('data-value', '');
        $('.cpyCompanyUl').html('');
        //$('#saveBtn').removeAttr('onclick').addClass('saveBtn').removeClass('saveBtnStyle');
    } else {
        toLoadCity(provinceCodeId, '', '#cypCityCode', '.cypCityUl', 'toUnbindEvent');
    }
})
$('.cypCityUl').on("click", "li", function () {
    $('#cpyCompanyName').html('请选择');
    $('.cpyCompanyUl').html('');
    $('#cpyCompanyName').attr('data-value', '');
    //$('#saveBtn').removeAttr('onclick').addClass('saveBtn').removeClass('saveBtnStyle');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    var cypCityCodeValue = $('#cypCityCode').attr('data-value');
    var cpyProvinceCodeValue = $('#cpyProvinceCode').attr('data-value');
    if (flag == "") {
        $('#cpyCompanyName').html('请选择');
        $('.cpyCompanyUl').html('');
        $('#cpyCompanyName').attr('data-value', '');
        //$('#saveBtn').removeAttr('onclick').addClass('saveBtn').removeClass('saveBtnStyle');
    } else {
        toLoadComponyName(cypCityCodeValue, cpyProvinceCodeValue);
    }
})
function toLoadComponyName(cypCityCodeValue, cpyProvinceCodeValue) {
    var cpyObject = {
        provinceCode: cpyProvinceCodeValue,
        cityCode: cypCityCodeValue
    };
    if (JSON.stringify(cpyObject) == "{}") {
        $('#cpyCompanyName').html("请选择");
    } else {
        toAjaxCompany(cpyObject);
    }
}
function toAjaxCompany(cpyObject) {
    $.ajax({
        type: "post",
        url: basePath + getCompanyListUrl,
        async: true,
        data: cpyObject,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var cypCompanyLi = '<li data-option="">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.cpyCompanyUl').html(cypCompanyLi);
                toUnbindEvent();
            }
        }
    });
}
$('.cpyCompanyUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option')).attr('data-cpyNumber', $(this).attr('data-cpyNumber'));
})

//用户状态
$('.userStatusUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})

//角色选择
$('.roleIdUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});

//将数据提交到后台处理   接口未定义
function toSaveUserInfo() {
    if (testType() && testCPYCompany() && testRoleAndPassWorld() && userName() && telTest()) {
        var userLevel = $('#adminType').attr('data-value');
        var cpyCompanyName = $('#cpyCompanyName').attr('data-value');
        var userAccount = $('#userAccount').val();
        var userStatus = $('#userStatus').attr('data-value');
        var roleId = $('#roleId').attr('data-value');
        var userPassword = $('input[name=password]').val();
        var isCpyEp = $('#showFlag').val(); //桩权限字段未知
        var adminName = $('#userRealName').val();
        var adminPhone = $('#userPhone').val();
        var obj = {
            userLevel: userLevel,
            cpyId: cpyCompanyName,
            userAccount: userAccount,
            userStatus: userStatus,
            roleId: roleId,
            userPassword: userPassword,
            isCpyEp: isCpyEp, //桩权限 0 否 1 是
            adminName: adminName,
            adminPhone: adminPhone
        };
        $.ajax({
            type: "post",
            url: basePath + addUserAdminUrl,
            async: true,
            data: obj,
            success: function (data) {
                //alert(JSON.stringify(data));
                if (data.success == true) {
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: data.msg,
                        btn: ["确定"],
                        yes: function (index, layero) {
                            layer.closeAll();
                            window.location.href = 'admin_list.html';
                        },
                        cancel: function (index, layero) {
                            layer.closeAll();
                            window.location.href = 'admin_list.html';
                        }
                    });
                } else if(data.status == 9001) {
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: '会话超时，请重新登陆！',
                        btn: ["确定"],
                        yes:function(index,layero){
                            layer.closeAll();
                            window.top.location.href = basePath + toLoginUrl;
                        },
                        cancel:function(index,layero){
                            layer.closeAll();
                            window.top.location.href = basePath + toLoginUrl;
                        }
                    });

                }else {
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: data.msg,
                        time: 3000,
                        btn: ["确定"]
                    });
                }
            }
        });
    }
}
function testType() {
    var adminType = $('#adminType').attr('data-value');
    if (adminType == '') {
        $('#adminTypeTip').html('管理员类型不能为空');
        return false;
    }else{
        $('#adminTypeTip').html('');
        return true;
    }

}
function testCPYCompany() {
    var adminType = $('#adminType').attr('data-value');
    var cpyCompanyName = $('#cpyCompanyName').attr('data-value');

    if (adminType == 8) {
        if (cpyCompanyName == '') {
            $('#cpyCompanyTip').html('渠道不能为空');
            return false;
        }else{
            $('#cpyCompanyTip').html('');
            return true;
        }
    }
    return true;
}
function testRoleAndPassWorld() {
    var roleId = $('#roleId').attr('data-value');
    var password = $('#password').val();
    if (roleId == '') {
        $('#roleTip').html('角色不能为空');
        return false;
    } else {
        $('#roleTip').html('');
        if (password == '') {
            $('#passwordTip').html('密码不能为空');
            return false;
        } else {
            $('#passwordTip').html('');
            return true;
        }
    }
}