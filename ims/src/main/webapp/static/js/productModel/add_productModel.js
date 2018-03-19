function toUnbindEvent() {
    $('.elPiMakerBlock').unbind();
    $('.elPiPowerSizeBlock').unbind();
    $('.electricPowerBlock').unbind();
    $('.elPiTypeBlock').unbind();
    selectModel();
}
toUnbindEvent();
//制造商
toLoadelPiMaker();
function toLoadelPiMaker(){
    $.ajax({
        type: "post",
        url: basePath + getPileMakerListUrl,
        async: true,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var elPiMakerUlLi = '<li data-option="" class="data-selected">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    elPiMakerUlLi += '<li data-option="' + dataModule[i].id + '">' + dataModule[i].makerName + '</li>';
                }
                $('#elPiMakerUl').html(elPiMakerUlLi);
                toUnbindEvent();
            }
        }
    });
}
$('#elPiMakerUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//功率
var selectMap = {
    1: 'electricPileType',
    3: 'electricChargeMode',
    4: 'electricPower'
}
initSelects(selectMap);
$('#electricPower').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//充电方式
$('#electricChargeMode').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//电桩类型
$('#electricPileType').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});

//内部产品型号校验
$('body').off('blur', '#tsTypeSpan').on('blur', '#tsTypeSpan', function () {
    var tsTypeSpanValue =$('#tsTypeSpan').val();
    //var reg=/^([a-z]|[A-Z]|[-]|[0-9])*$/;
    if(!tsTypeSpanValue){
        $('#tsTypeSpan').val('');
        layer.tips('请输入内部产品型号，最多20个字符！', '#tsTypeSpan', {
            tips: 4
        });
   /* }else if(!reg.test(tsTypeSpanValue)){
        $('#tsTypeSpan').val('');
        layer.tips('请输入正确的内部产品型号，可以由数字、字母和-组成，最多20个字符！', '#tsTypeSpan', {
            tips: 4
        });*/
    }else if(tsTypeSpanValue.length>20){
        $('#tsTypeSpan').val('');
        layer.tips('请输入正确的内部产品型号，最多20个字符！', '#tsTypeSpan', {
            tips: 4
        });
    }else{
        $.ajax({
            type: "post",
            url: basePath + checkTsTypeSpanUrl,
            async: true,
            data: {
                tsTypeSpan: tsTypeSpanValue
            },
            success: function (data) {
                if (data.success == false) {
                    $('#tsTypeSpan').val('');
                    layer.tips('产品型号已存在，请重新输入！', '#tsTypeSpan', {
                        tips: 4
                    });
                    return false;
                }
            }
        });
    }
});
//外部产品型号
$('body').off('blur', '#tsProductNumber').on('blur', '#tsProductNumber', function () {
    var tsProductNumberValue =$('#tsProductNumber').val();
    //var reg=/^[a-zA-Z0-9\-\u4e00-\u9fa5]+$/;
    if(!tsProductNumberValue){
        $('#tsProductNumber').val('');
        layer.tips('请输入外部产品型号，最多20个字符！', '#tsProductNumber', {
            tips: 4
        });
    /*}else if(!reg.test(tsProductNumberValue)){
        $('#tsProductNumber').val('');
        layer.tips('请输入正确的外部产品型号，可以由数字、字母、-和中文组成，最多20个字符！', '#tsProductNumber', {
            tips: 4
        });*/
    }else if(tsProductNumberValue.length>20){
        $('#tsProductNumber').val('');
        layer.tips('请输入正确的外部产品型号，最多20个字符！', '#tsProductNumber', {
            tips: 4
        });
    }
});
//产品型号名称
$('body').off('blur', '#tsModelName').on('blur', '#tsModelName', function () {
    var tsModelNameValue =$('#tsModelName').val();
    if(!tsModelNameValue){
        $('#tsModelName').val('');
        layer.tips('请输入产品型号名称，最多20个字符！', '#tsModelName', {
            tips: 4
        });
    }else if(tsModelNameValue.length>20){
        $('#tsModelName').val('');
        layer.tips('请输入正确的产品型号名称，最多20个字符！', '#tsModelName', {
            tips: 4
        });
    }
});
//枪头数量
$('body').off('blur', '#elPiPowerNumber').on('blur', '#elPiPowerNumber', function () {
    var elPiPowerNumberValue =$('#elPiPowerNumber').val();
    var reg=/^[0-9][\d]*$/;
    if(!elPiPowerNumberValue){
        $('#elPiPowerNumber').val('');
        layer.tips('请输入枪头数量，整数！', '#elPiPowerNumber', {
            tips: 4
        });
    }else if(!reg.test(elPiPowerNumberValue)){
        $('#elPiPowerNumber').val('');
        layer.tips('输入有误，请重新输入枪头数量，整数！', '#elPiPowerNumber', {
            tips: 4
        });
    }
});

//点击保存
function toSavetsTypeSpan() {
    var tsTypeSpan = $('#tsTypeSpan').val();
    var tsProductNumber = $('#tsProductNumber').val();
    var tsModelName = $('#tsModelName').val();
    var tsRemarks = $('#tsRemarks').val();
    var elPiMaker = $('#elPiMaker').attr('data-value');
    var elPiPowerSize = $('#elPiPowerSize').attr('data-value');
    var elPiChargingMode = $('#elPiChargingMode').attr('data-value');
    var elPiType = $('#elPiType').attr('data-value');
    var elPiPowerNumber = $('#elPiPowerNumber').val();

    if (!tsTypeSpan) {
        $('#tsTypeSpan').focus();
        return false;
    }
    if (!tsProductNumber) {
        $('#tsProductNumber').focus();
        return false;
    }
    if (!tsModelName) {
        $('#tsModelName').focus();
        return false;
    }
    if(!elPiPowerNumber){
        $('#elPiPowerNumber').focus();
        return false;
    }
    if(!elPiMaker){
        layer.tips('请选择制造商！', '#elPiMaker', {
            tips: 4
        });
        return false;
    }
    if(!elPiPowerSize){
        layer.tips('请选择功率！', '#elPiPowerSize', {
            tips: 4
        });
        return false;
    }
    if(!elPiChargingMode){
        layer.tips('请选择充电方式！', '#elPiChargingMode', {
            tips: 4
        });
        return false;
    }
    if(!elPiType){
        layer.tips('请选择电桩类型！', '#elPiType', {
            tips: 4
        });
        return false;
    }
    var obj = {
        tsTypeSpan:tsTypeSpan,
        tsModelName:tsModelName,
        tsProductNumber:tsProductNumber,
        tsRemarks:tsRemarks,
        elPiPowerNumber:elPiPowerNumber,
        elPiChargingMode:elPiChargingMode,
        elPiPowerSize:elPiPowerSize,
        elPiMaker:elPiMaker,
        elPiType:elPiType
    };
    $.ajax({
        type: "post",
        url: basePath + addTypeSpanUrl,
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
                    content: data.msg,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        window.location.href = "productModel_list.html";
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href = "productModel_list.html";
                    }
                });

            }else if(data.status == 9001) {
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

            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    btn: ["确定"]
                });
            }

        }

    });

}

//返回电桩列表页面
$('body').off('click','#toProductModelList').on('click', '#toProductModelList', function () {
    window.location.href = 'productModel_list.html';
})