var pkCouponVariety = getUrlParam('pkCouponVariety');
getDetailById(pkCouponVariety);
function getDetailById(pkCouponVariety) {
    $.ajax({
        type: "post",
        url: basePath + getCouponVarietyInfoUrl,
        async: true,
        data: {
            pkCouponVariety: pkCouponVariety
        },
        success: function (data) {
            var data = data.dataObject;
            var covaActivityName = data.covaActivityName;
            $('input[name=covaActivityName]').val(covaActivityName);

            var covaCouponValue = data.covaCouponValue;
            $('input[name=covaCouponValue]').val(covaCouponValue);

            var covaCouponCondition = data.covaCouponCondition;
            $('input[name=covaCouponCondition]').val(covaCouponCondition);

            var covaRemark = data.covaRemark;
            $('input[name=covaRemark]').val(covaRemark);


            var covaLabel = data.covaLabel;
            $('input[name=covaLabel]').val(covaLabel);

            var covaScope = data.covaScope;
            if (covaScope == 0) {
                $('#covaScopeHtml').attr('data-value', 0).html('全国通用');
            }
            if (covaScope == 1) {
                $('#covaScopeHtml').attr('data-value', 1).html('城市通用');
                $('.ctrAllChoice').show();
                $('.cityChoice').show();
                $('.powerStationChoice').hide();
                var provinceCode = data.provinceCode;
                var cityCode = data.cityCode;
                //去加载城市的省
                toLoadProvince(provinceCode, '#provinceCodeHtml', '.cpyProvinceUl', 'toUnbindEvent');
                toLoadCity(provinceCode, cityCode, '#cityCodeHtml', '.cypCityUl', 'toUnbindEvent');
                $('#provinceCodeHtml').attr('data-value',provinceCode);
                $('#cityCodeHtml').attr('data-value',cityCode);
            }
            if (covaScope == 2) {
                $('#covaScopeHtml').attr('data-value', 2).html('站点用');
                $('.ctrAllChoice').show();
                $('.cityChoice').show();
                $('.powerStationChoice').show();
                var provinceCode = data.provinceCode;
                var cityCode = data.cityCode;
                var areaCode = data.areaCode;
                var pkPowerstation = data.pkPowerstation;
                //去加载城市的省
                toLoadProvince(provinceCode, '#provinceCodeHtml', '.cpyProvinceUl', 'toUnbindEvent');
                toLoadCity(provinceCode, cityCode, '#cityCodeHtml', '.cypCityUl', 'toUnbindEvent');
                toLoadArea(cityCode, areaCode, '#areaCodeHtml', '.areaUl', 'toUnbindEvent');
                toLoadPowerStationList(areaCode, pkPowerstation, '#powerstationHtml', '.powerstationUl', 'toUnbindEvent');
                $('#provinceCodeHtml').attr('data-value',provinceCode);
                $('#cityCodeHtml').attr('data-value',cityCode);
                $('#areaCodeHtml').attr('data-value',areaCode);
                $('#powerstationHtml').attr('data-value',pkPowerstation);
            }
            var covaStutas = data.covaStutas;
            if (covaStutas == 0) {
                $('#covaStutasHtml').attr('data-value', 0).html('上架');
            }
            if (covaStutas == 1) {
                $('#covaStutasHtml').attr('data-value', 1).html('下架');
            }
        }
    });
}
$('#goback').off('click').on('click', function () {
    window.location.href = 'couponVariety_detail.html?pkCouponVariety=' + pkCouponVariety;
})
function toUnbindEvent() {
    $('.covaLimitationBlock').unbind();
    $('.covaStutasBlock').unbind();
    $('.cpyProvinceBlock').unbind();
    $('.cypCityBlock').unbind();
    $('.cpyAreaBlock').unbind();
    $('.powerstationBlock').unbind();
    $('.covaScopeBlock').unbind();
    selectModel();
}
toUnbindEvent();

//点击范围选择 需要判断0 1 2
$('.covaScopeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    ctlCityScope(flag);
});
function ctlCityScope(flag) {
    var flag = flag;
    //0 全国 1城市 2站点
    if (flag == 0) {
        $('.ctrAllChoice').hide();
    } else if (flag == 1) {
        $('.ctrAllChoice').show();
        $('.cityChoice').show();
        $('.powerStationChoice').hide();
        toLoadProvince('', '#provinceCodeHtml', '.cpyProvinceUl', 'toUnbindEvent');
        clearValue();
    } else if (flag == 2) {
        $('.ctrAllChoice').show();
        $('.cityChoice').show();
        $('.powerStationChoice').show();
        toLoadProvince('', '#provinceCodeHtml', '.cpyProvinceUl', 'toUnbindEvent');
        clearValue();
    } else {
        $('.ctrAllChoice').hide();
    }
}
function clearValue() {
    $('#provinceCodeHtml').attr('data-value', '').html('请选择省');
    $('#cityCodeHtml').attr('data-value', '').html('请选择市');
    $('#areaCodeHtml').attr('data-value', '').html('请选择区');
    $('#powerstationHtml').attr('data-value', '').html('请选择充电点');
}
//点击省加载市
$('.cpyProvinceUl').on("click", "li", function () {
    $('#cityCodeHtml').html('请选择');
    $('.cypCityUl').html('');
    $('#cityCodeHtml').attr('data-value', '');
    $('#areaCodeHtml').html('请选择');
    $('.areaUl').html('');
    $('#areaCodeHtml').attr('data-value', '');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cityCodeHtml').html('请选择');
        $('.cypCityUl').html('');
        $('#cityCodeHtml').attr('data-value', '');
        $('#areaCodeHtml').html('请选择');
        $('.areaUl').html('');
        $('#areaCodeHtml').attr('data-value', '');
    } else {
        toLoadCity(provinceCodeId, '', '#cityCodeHtml', '.cypCityUl', 'toUnbindEvent');
    }
})
//点击市加载区
$('.cypCityUl').on("click", "li", function () {
    $('#areaCodeHtml').html('请选择');
    $('.areaUl').html('');
    $('#areaCodeHtml').attr('data-value', '');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    var cityCodeId = '';
    var provinceCodeHtmlValue = '';
    if (flag == "") {
        $('#areaCodeHtml').html('请选择');
        $('.areaUl').html('');
        $('#areaCodeHtml').attr('data-value', '');
    } else {
        provinceCodeHtmlValue = $('#provinceCodeHtml').attr('data-value');
        cityCodeId = $(this).attr('data-option');
        toLoadArea(cityCodeId, '', '#areaCodeHtml', '.areaUl', 'toUnbindEvent');

    }
})
//点击区获充电点列表
$('.areaUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cityCodeHtml').html('请选择').attr('data-value', '');
        $('.cypCityUl').html('');
        $('#provinceCodeHtml').html('请选择').attr('data-value', '');
        $('.areaUl').html('');
    } else {
        //去加载电站
        toLoadPowerStationList(flag, '', '#powerstationHtml', '.powerstationUl', 'toUnbindEvent');
    }

})

$('.powerstationUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
$('.covaStutasUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//保存优惠券按钮addCouponVarietyUrl
function saveCouponVariety() {
    if (testCovaActivityName() && testCovaRemarkName() && testScope()) {
        if (isInteger('#covaCouponValue', '#covaCouponValueTip')) {
            if (isInteger('#covaCouponCondition', '#covaCouponConditionTip')) {
                var covaActivityName = $('input[name=covaActivityName]').val();
                var covaLabelValue = $('input[name=covaLabel]').val();
                var covaCouponValue = $('input[name=covaCouponValue]').val();
                var covaCouponCondition = $('input[name=covaCouponCondition]').val();
                var covaRemark = $('input[name=covaRemark]').val();
                var covaLimitationHtml = $('#covaLimitationHtml').attr('data-value');
                var covaStutasHtml = $('#covaStutasHtml').attr('data-value');
                var provinceCode = $('#provinceCodeHtml').attr('data-value');
                var covaScopeHtml = $('#covaScopeHtml').attr('data-value');
                var cityCode = $('#cityCodeHtml').attr('data-value');
                var areaCode = $('#areaCodeHtml').attr('data-value');
                var pkPowerstation = $('#powerstationHtml').attr('data-value');
                var obj = {
                    pkCouponVariety: pkCouponVariety,
                    covaActivityName: covaActivityName,
                    covaCouponValue: covaCouponValue,
                    covaCouponCondition: covaCouponCondition,
                    covaRemark: covaRemark,
                    covaStutas: covaStutasHtml,
                    covaLabel: covaLabelValue,
                    covaLimitation: covaLimitationHtml,
                    covaScope: covaScopeHtml,
                    provinceCode: provinceCode,
                    cityCode: cityCode,
                    areaCode: areaCode,
                    pkPowerstation: pkPowerstation
                };
                $.ajax({
                    type: "post",
                    url: basePath + changeCouponVarietyUrl,
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
                                area: ['310px', '160px'],//宽高
                                content: '修改成功',
                                btn: ["确定"],
                                yes: function (index, layero) {
                                    layer.closeAll();
                                    window.location.href = 'couponVariety_list.html';
                                },
                                cancel: function (index, layero) {
                                    layer.closeAll();
                                    window.location.href = 'couponVariety_list.html';
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

                        } else {
                            layer.open({
                                type: 1,
                                offset: '100px',
                                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                                shadeClose: false,
                                closeBtn: 1,
                                area: ['310px', '160px'],//宽高
                                content: data.msg,
                                btn: ["确定"],
                                time: 3000
                            });
                        }
                    }
                });
            }
        }
    }
}

//现金券名称校验
function testCovaActivityName() {
    var covaActivityName = $('input[name=covaActivityName]').val();
    if (covaActivityName == '') {
        $('#covaActivityNameTip').html('现金券名称不能为空');
        return false;
    }
    if (covaActivityName.length > 20) {
        $('#covaActivityNameTip').html('现金券名称长度少于20');
        return false;
    }
    $('#covaActivityNameTip').html('');
    return true;
}
//验证纯数字
function isInteger(obj, tipClass) {
    var objValue = $(obj).val();
    var reg = /^[0-9][\d]*$/;
    if (!objValue) {
        $(obj).focus();
        $(tipClass).html('不能为空');
        return false;
    } else if (!reg.test(objValue)) {
        $(obj).focus();
        $(tipClass).html('必须为纯数字');
        return false;
    } else if (objValue.length > 4) {
        $(obj).focus();
        $(tipClass).html('数字不能超过4位');
        return false;
    }
    $(tipClass).html('');
    return true;
}
//备注校验
function testCovaRemarkName() {
    var covaRemarkValue = $('input[name=covaRemark]').val();
    if (covaRemarkValue.length > 100) {
        $('#covaRemarkTip').html('备注文字不能超过100字');
        return false;
    }
    $('#covaRemarkTip').html('');
    return true;
}
function testScope() {
    var covaScopeValue = $('#covaScopeHtml').attr('data-value');
    if (covaScopeValue == 0) {
        clearValue();
        return true;
    } else if (covaScopeValue == 1) {
        var cityCodeValue = $('#cityCodeHtml').attr('data-value');
        if (cityCodeValue == '') {
            $('#cityTip').html('城市不能为空');
            return false;
        } else {
            $('#cityTip').html('');
            return true;
        }
    } else if (covaScopeValue == 2) {
        var powerstationValue = $('#powerstationHtml').attr('data-value');
        if (powerstationValue == '') {
            $('#powerstationTip').html('充电点不能为空');
            return false;
        } else {
            $('#powerstationTip').html('');
            return true;
        }
    }
    return true;
}