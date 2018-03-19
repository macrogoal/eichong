/**
 * Created by Administrator on 2017/8/16.
 */
homeUrl();
function homeUrl() {
    var cpyId = getUrlParam('cpyId');
    var cpyName = getUrlParam('cpyName');
    if (cpyId) {
        $('#slaveParentIdCode').html(cpyName);
        $('#slaveParentIdCode').attr('data-value', cpyId);
    } else(
        setTimeout("toLoadSlaveParentIdCode('','#slaveParentIdCode','.slaveParentIdUl','toUnbindEvent')", 400)
    )
}
function toUnbindEvent() {
    $('.cpyProvinceBlock').unbind();
    $('.cpyCityBlock').unbind();
    $('.cpyTypeBlock').unbind();
    $('.cpyParentIdBlock').unbind();
    $('.slaveParentIdBlock').unbind();
    $('.payTypeBlock').unbind();
    $('.tradeTypeBlock').unbind();
    selectModel();
}
toLoadProvince('', '#provinceCode', '.provinceUl', 'toUnbindEvent');
setTimeout(function () {
    toLoadProvince('', '#cpyProvinceCode', '.cpyProvinceUl', 'toUnbindEvent');
}, 200);

//新建公司标识唯一性校验
$('body').off('blur', '#cpyNumber').on('blur', '#cpyNumber', function () {
    testCompanyNumber();
});
function testCompanyNumber() {
    var cpyNumberValue = $('#cpyNumber').val();
    var reg = /^[0-9]{4}$/;
    if (!cpyNumberValue) {
        $('#cpyNumberTip').html('请输入公司标识！');
        $('#cpyNumber').val('');
        return false;
    }
    if (!reg.test(cpyNumberValue)) {
        $('#cpyNumberTip').html('公司标识格式错误，请输入四位数字！');
        $('#cpyNumber').val('');
        return false;
    } else {
        $('#cpyNumberTip').html('');
        $.ajax({
            type: "post",
            url: basePath + checkCompanyUniqueUrl,
            async: true,
            data: {
                cpyNumber: cpyNumberValue,
                cpyName: ''
            },
            success: function (data) {
                if (data.success == true) {
                    $('#cpyNumberTip').html('公司标识已存在，请重新输入！');
                    $('#cpyNumber').val('');
                    return false;
                }
            }
        });
    }
    return true;
}
//新建公司名称唯一性校验
$('body').off('blur', '#cpyName').on('blur', '#cpyName', function () {
    testCompanyName();
});
function testCompanyName() {
    var cpyNameValue = $('#cpyName').val();
    if (!cpyNameValue) {
        $('#cpyName').val('');
        $('#cpyNameTip').html('请输入公司名称！');
        return false;
    } else {
        $('#cpyNameTip').html('');
        var obj = {
            cpyNumber: '',
            cpyName: cpyNameValue
        }
        $.ajax({
            type: "post",
            url: basePath + checkCompanyUniqueUrl,
            async: true,
            data: obj,
            success: function (data) {
                if (data.success == true) {
                    $('#cpyNameTip').html('公司名称已存在，请重新输入！');
                    $('#cpyName').val('');
                    return false;
                }
            }
        });
    }

}
//公司类型
$('.cpyTypeUl').on("click", "li", function () {
    $('#cpyParentId').html('无');
    $('.cpyParentIdUl').html('');
    $('#cpyParentId').attr('data-value', '');
    var cpyTypeCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cpyParentId').html('无');
        $('.cpyParentIdUl').html('');
        $('#cpyParentId').attr('data-value', '');
    } else {
        toLoadCpyParentIdCode(cpyTypeCodeId, '', '#cityHtml', '.cityUl', 'toUnbindEvent');
    }
    if (cpyTypeCodeId == 1) {
        $('#payRule').html('无付费策略');
        $('#payRule').attr('data-value', '0');
        $('#payRuleUl').html(' <li data-option="0" class="seleced">无付费策略</li>'
        + '<li data-option="1">大账户付费</li>'
        + '<li data-option="2">个人付费</li>'
        + '<li data-option="3">大账户为个人配资</li>');
    } else if (cpyTypeCodeId == 2) {
        $('#payRule').html('大账户付费');
        $('#payRule').attr('data-value', '1');
        $('#payRuleUl').html(' <li data-option="1" class="seleced">大账户付费</li>'
        + '<li data-option="2">个人付费</li>'
        + '<li data-option="3">大账户为个人配资</li>');
    }
})
//上级公司列表加载
function toLoadCpyParentIdCode() {
    var cpyTypeValue = $('#cpyType').attr('data-value');
    var obj = {
        cpyType: cpyTypeValue
    }
    $.ajax({
        type: "post",
        url: basePath + getParentCompanyListUrl,
        async: true,
        data: obj,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var toLoadCpyParentIdLi = '<li data-option="" class="data-selected">无</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    toLoadCpyParentIdLi += '<li data-option="' + dataModule[i].cpyId + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.cpyParentIdUl').html(toLoadCpyParentIdLi);
                toUnbindEvent();
            }
        }
    });
}
//上级公司
setTimeout("toLoadCpyParentIdCode('','#cpyParentId','.cpyParentIdUl','toUnbindEvent')", 200);
$('.cpyParentIdUl').on("click", "li", function () {
    var cpyParentIdCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cpyParentId').html('无');
        $('#cpyParentId').attr('data-value', '');
        $('input[name=cpyParentId]').val('');
    } else {
        toLoadCpyParentIdCode('', '#cpyParentId', '.cpyParentIdUl', 'toUnbindEvent');
    }
})
//大账户类型
$('.tradeTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//管理单位列表加载
function toLoadSlaveParentIdCode() {
    $.ajax({
        type: "post",
        url: basePath + initInvestCompanyListUrl,
        async: true,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var toLoadSlaveCpyIdLi = '<li data-option="" class="data-selected">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    toLoadSlaveCpyIdLi += '<li data-option="' + dataModule[i].cpyId + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.slaveParentIdUl').html(toLoadSlaveCpyIdLi);
                toUnbindEvent();
            }
        }
    });
}
//管理单位筛选部分

$('.slaveParentIdUl').on("click", "li", function () {
    var slaveCpyIdCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#slaveParentIdCode').html('请选择');
        $('#slaveParentIdCode').attr('data-value', '');
        $('input[name=slaveParentId]').val('');
    } else {
        toLoadSlaveParentIdCode('', '#slaveParentIdCode', '.slaveParentIdUl', 'toUnbindEvent');
    }
})
//付费策略
$('.payTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})


//城市的加载
$('.provinceUl').on("click", "li", function () {
    $('#cityCode').html('请选择');
    $('.cityUl').html('');
    $('#cityCode').attr('data-value', '');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cityCode').html('请选择');
        $('.cityUl').html('');
        $('#cityCode').attr('data-value', '');
    } else {
        toLoadCity(provinceCodeId, '', '#cityCode', '.cityUl', 'toUnbindEvent');
    }
})
$('.cityUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var cpyCityName = $('#cityCode').attr('data-value');
    //城市提示及验证
    if (!cpyCityName) {
        $('#cpyCityTip').html('请选择城市！');
    } else {
        $('#cpyCityTip').html('');
    }
})
//提交
$('#saveCompanyBtn').click(function () {
    var cpyNumberValue = $('#cpyNumber').val();
    var cpyNameValue = $('#cpyName').val();
    var cpyCityName = $('#cityCode').attr('data-value');
    if (!cpyNumberValue) {
        $('#cpyNumber').focus();
        $('#cpyNumber').val('');
        $('#cpyNumberTip').html('请输入公司标识！');
        return false;
    }
    if (!cpyNameValue) {
        $('#cpyName').focus();
        $('#cpyName').val('');
        $('#cpyNameTip').html('请输入公司名称！');
        return false;
    }
    if (!cpyCityName) {
        $('#cpyCityTip').html('请选择城市！');
        return false;
    }
// 把数据传递给后台
    toSaveCompanyInfo();
})
//数据传给后台
function toSaveCompanyInfo() {
    var cpyNumberValue = $('#cpyNumber').val();
    var cpyNameValue = $('#cpyName').val();
    var cpyTypeValue = $('#cpyType').attr('data-value');
    var payRuleValue = $('#payRule').attr('data-value');
    var cpyParentIdValue = $('#cpyParentId').attr('data-value');
    var slaveParentIdValue = $('#slaveParentIdCode').attr('data-value');
    var tradeTypeValue = $('#tradeType').attr('data-value');
    var cpyProvinceValue = $('#provinceCode').attr('data-value');
    var cpyCityValue = $('#cityCode').attr('data-value');
    var cpyAddressValue = $('#cpyAddress').val();
    var cpyPhoneValue = $('#cpyPhone').val();
    var obj = {
        cpyNumber: cpyNumberValue,
        cpyName: cpyNameValue,
        cpyType: cpyTypeValue,
        payRule: payRuleValue,
        cpyParentId: cpyParentIdValue,
        slaveCpyId: slaveParentIdValue,
        tradeType: tradeTypeValue,
        cpyProvince: cpyProvinceValue,
        cpyCity: cpyCityValue,
        cpyAddress: cpyAddressValue,
        cpyPhone: cpyPhoneValue
    };
    $.ajax({
        type: "post",
        url: basePath + addCompanyUrl,
        async: true,
        data: obj,
        success: function (data) {
            if (data.success == true) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '180px'],//宽高
                    content: "保存成功",
                    btn: ["确定"],
                    yes: function (index, layero) {
                        window.location.href = 'company_list.html';
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href = 'company_list.html';
                    }
                });
            } else if (data.status == 9001) {
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
                    yes: function (index, layero) {
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    },
                    cancel: function (index, layero) {
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

//刚一进页面就要执行的所有验证
$('#goCancel').on('click', function () {
    window.location.href = 'company_list.html';
})
