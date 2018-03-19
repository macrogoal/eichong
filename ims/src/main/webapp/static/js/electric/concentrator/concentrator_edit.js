var concentratorId = getUrlParam('concentratorId');
//下拉列表
toUnbindEvent();
function toUnbindEvent() {
    $('.electricChargeModeBlock').unbind();
    $('.stateBlock').unbind();
    selectModel();
}
//状态
$('.stateUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//页面加载时获取集中器信息
setTimeout('getConcentratorInfo()', 200);
function getConcentratorInfo() {
    $.ajax({
        type: "post",
        url: basePath + getConcentratorInfoByIdUrl,
        async: true,
        data: {
            concentratorId: concentratorId
        },
        success: function (req) {
            var data = req.dataObject;
            var concentratorName = data.concentratorName;//集中器名称
            var state = data.state;//集中器状态(0：离线,1：上线 2：无效)
            $('#concentratorName').val(concentratorName);
            $('#stateCode').html(state);
            if (state == '上线') {
                $('#stateCode').attr('data-value', 1);
            } else {
                $('#stateCode').attr('data-value', 0);
            }
        }
    });
}


//点击返回按钮
$('#toPowerStationDetail').on('click', function () {
    //window.location.href = 'concentrator_detail.html?concentratorId=' + concentratorId;
    window.location.href = 'concentrator_list.html';
})
//加载绑定电桩列表
getBindElectricPileInfo()
function getBindElectricPileInfo() {
    $.ajax({
        type: "post",
        url: basePath + getAllElectricPileListUrl,
        async: true,
        data: {
            concentratorId: concentratorId
        },
        success: function (req) {
            console.log(req)
            var data = req.dataObject;
            var listTr = "";
            for (var i = 0; i < data.length; i++) {
                var xuhaoNum = i + 1;
                listTr += '<tr><td><input type="checkbox" name="ids" data-flag="0" class="selectedBox" value="' + data[i].id + '"/></td>'
                + '<td class="concentratorList_concentratorId">' + xuhaoNum
                + '</td><td class="concentratorList_code">' + data[i].code
                + '</td><td class="concentratorList_num">' + data[i].num
                + '</td><td class="concentratorList_chChargingMethod">' + data[i].chChargingMethod
                + '</td><td class="concentratorList_chPower">' + data[i].chPower
                + '</td><td class="concentratorList_type">' + data[i].type
                + '</td></tr>';
            }
            $("#electricPile").html(listTr);

        }
    });
}
var selectMap = {
    3: 'electricChargeMode'
}
initSelects(selectMap);
//充电方式选择
$('#electricChargeMode').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//绑定电桩
$("body").on("click", "#selectPileBtn", function () {
    $(".selAllElectric").attr("checked", false);
    getElectricPileList();
    layer.closeAll();
    layer.open({
        type: 1,
        title: '选择电桩',
        btn: ["确定"],
        shadeClose: true,
        closeBtn: 1,//点击遮罩关闭层
        area: ['860px', '400px'],
        content: $("#bindPile"),
        yes: function () {
            $(".selAllElectric").attr("checked", false);
            selectElectricCallback();
            layer.closeAll();
        }
    });
})
//加载绑定电桩部分电数据
//去加载表格的数据

function getElectricPileList() {
    getHiddenInputValue();
    initTable("BindElectricForm", "BindElectricPage", electricListUrl, bindElectricListCallback);
}
function bindElectricListCallback(req) {
    var data = req.dataObject;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        listTr += '<tr><td><input type="checkbox" name="electricIds" class="selectedElectric" value="' + data[i].id
        + '" code="' + data[i].code + '" num="' + data[i].num
        + '" chStatus="' + data[i].chStatus
        + '" chChargingMethod="' + data[i].chChargingMethod
        + '"  data-type="' + data[i].type
        + '"  chPower="' + data[i].chPower
        + '"  productModel="' + data[i].productModel
        + '"  rateInformationId="' + data[i].rateInformationId
        + '"/></td><td class="electricPileList_electricPileCode"><span data-id="' + data[i].id + '">' + data[i].code
        + '</span></td><td>' + data[i].num
        + '</td><td>' + data[i].chChargingMethod
        + '</td><td>' + data[i].chPower
        + '</td><td>' + data[i].type
        + '</td></tr>';

    }
    $("#bindPileTbody").html(listTr);

}
function getHiddenInputValue() {
    var chargingMethodHtmlValue = $('#chargingMethodHtml').attr('data-value');//充电方式
    var codeValue = $('input[name=code]').val();
    if (codeValue == "") {
        codeValue = $('input[name=code]').val('');
    } else {
        $('input[name=code]').val();
    }
    if (chargingMethodHtmlValue == "") {
        $('input[name=chargingMethod]').val('');
    } else {
        $('input[name=chargingMethod]').val(chargingMethodHtmlValue);
    }
}
//点击全部选择电桩，选择对应电桩
// 全选和反选样式
$("body").on('click', ".selAllElectric", function () {
    $(".selectedElectric").prop("checked", $(this).is(':checked'));
})
//点击绑定往后面添加绑定后的电桩

function selectElectricCallback() {
    var i = parseInt($("#electricPile tr").length);
    var listTr = "";
    var arr = [];
    var b = 0;
    $('input[name="electricIds"]:checked').each(function () {
        listTr += '<tr><td>'
        + '<input type="checkBox" name="ids" class="selectedBox" data-flag="1"  value="' + $(this).val() + '" /></td><td>'
        + (++i) + '</td><td>'
        + $(this).attr("code") + '</td><td>'
        + $(this).attr("num") + '</td><td>'
        + $(this).attr("chChargingMethod") + '</td><td>'
        + $(this).attr("chPower") + '</td><td>'
        + $(this).attr("data-type") + '</td></tr>'
        arr[b] = $(this).val();
        b++;
    });
    //console.log(arr);
    $("#electricPile").append(listTr);
}

//集中器编辑、、、、点击保存，校验集中器名称的合法性
$('body').off('click', '#saveBtn').on('click', '#saveBtn', function () {
    var nameLength = lengthTest($('#concentratorName'), 30);
    if (nameLength == false) {
        layer.tips('请输入正确的名称，最多30字符！', '#concentratorName', {
            tips: 4
        });
        return false;
    }
    concentratorEdit();
})
function concentratorEdit() {
    var con_ids = '';
    $('input[name=ids]').each(function () {
        con_ids += $(this).attr('value') + ',';
    });
    con_ids = con_ids.substring(0, con_ids.length - 1);
    var concentratorName = $('#concentratorName').val();
    var state = $('#stateCode').attr('data-value');
    var obj = {
        concentratorId: concentratorId,
        concentratorName: concentratorName,
        state: state,
        ids: con_ids
    };
    $.ajax({
        type: "post",
        url: basePath + modifyConcentratorUrl,
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
                        window.location.href = 'concentrator_list.html';
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href = 'concentrator_list.html';
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

//解绑
$('body').off('click', '#unBindBtn').on('click', '#unBindBtn', function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '160px'],//宽高
        content: '是否解绑？',
        btn: ["确定"],
        yes: function (index, layero) {
            layer.closeAll();
            toUnBindElectric();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }


    })
})
function toUnBindElectric() {
    //传默认加载的电桩id
    var electricPileIds = "";
    $('#electricPile').find('input[data-flag=0]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            electricPileIds += $(this).attr('value') + ',';
        }
    })
    electricPileIds = electricPileIds.substring(0, electricPileIds.length - 1);
    if (!electricPileIds) {
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '160px'],//宽高
            content: '请选择已经绑定的电桩',
            time: 3000,
            btn: ["确定"]
        });
        return false;
    }
    $.ajax({
        type: "post",
        url: basePath + unBindUrl,
        async: true,
        data: {
            electricPileIds: electricPileIds,
            bindType: 1//充电点0 集中器1
        },
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
                    content: '解绑成功',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        $('.selAll').prop('checked', false);
                        window.location.href = "concentrator_list.html";
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        $('.selAll').prop('checked', false);
                        window.location.href = "concentrator_list.html";
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