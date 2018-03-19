//获取费率列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['费率列表'];
$(function () {
    ctrlMenu(menuId);
    //去加载表格的数据
    setTimeout("getPerInfo()", 100);
    setTimeout("toLoadProvince('','#raIn_province_id','.provinceUl','toUnbindEvent')", 200);
})
function ctrlMenu(menuId) {
    $.ajax({
        type: "post",
        url: basePath + getSelfButtonTreeUrl,
        async: true,
        data: {
            menuId: menuId
        },
        success: function (req) {
            var data = req.dataObject;
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('新建') > -1) {
                        $('#addRateInfo').show();
                    }
                    if (contents.indexOf('删除') > -1) {
                        $('#delRateInfo').show();
                    }
                }
            }


        }
    });
}
function giveHiddenValue(){
    var pk_RateInformationValue=$('input[name=pk_RateInformation]').val();
    var raIn_NameValue=$('input[name=raIn_Name]').val();
    var raIn_typeValue=$('#raIn_type').attr('data-value');
    if(pk_RateInformationValue==''){
        $('input[name=pk_RateInformation]').val('');
    }else{
        $('input[name=pk_RateInformation]').val(pk_RateInformationValue);
    }
    if(raIn_NameValue==''){
        $('input[name=raIn_Name]').val('');
    }else{
        $('input[name=raIn_Name]').val(raIn_NameValue);
    }
    if(raIn_typeValue==''){
        $('input[name=raIn_type]').val('');
    }else{
        $('input[name=raIn_type]').val(raIn_typeValue);
    }
}
function rateInfoListSearch(){
    giveHiddenValue();
    initTable("rateInfoListForm", "rateInfoListPage", getRateInfoListUrl, rateInfoListCallback);
}
function getPerInfo(){
    var rateInformationId=getUrlParam('rateInformationId');
    if(rateInformationId){
        $('input[name=pk_RateInformation]').val(rateInformationId);
        rateInfoListSearch();
    }else{
        rateInfoListSearch();
    }
}
//下拉选项
toUnbindEvent();
function toUnbindEvent() {
    $('.raIn_typeBlock').unbind();
    selectModel();
}
function rateInfoListCallback(req) {
    $("#myTbogy").nextAll().remove();
    var data = req.dataObject;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        listTr += '<tbody><tr><td colspan="3" rowspan="2"><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].pk_RateInformation + '"/></td>'
            + '<td colspan="3" rowspan="2" class="id"><a class="rateInfoDetail" data-rateInfoId="' + data[i].pk_RateInformation + '" >' + data[i].pk_RateInformation + '</a>'
            + '</td><td colspan="3" rowspan="2" class="raIn_Name">' + data[i].raIn_Name
            + '</td><td colspan="3" rowspan="2" class="raIn_ServiceCharge">' + data[i].raIn_ServiceCharge
            + '</td><td class="raIn_TipTimeTariffMoney">' + data[i].raIn_TipTimeTariffPrice
            + '</td><td class="raIn_PeakElectricityMoney">' + data[i].raIn_TipTimeTariffMoney
            + '</td><td class="raIn_UsualMoney">' + data[i].raIn_PeakElectricityPrice
            + '</td><td class="raIn_ValleyTimeMoney">' + data[i].raIn_PeakElectricityMoney
            + '</td><td class="raIn_TipTimeTariffPrice">' + data[i].raIn_UsualPrice
            + '</td><td class="raIn_PeakElectricityPrice">' + data[i].raIn_UsualMoney
            + '</td><td class="raIn_UsualPrice">' + data[i].raIn_ValleyTimePrice
            + '</td><td class="raIn_ValleyTimePrice">' + data[i].raIn_ValleyTimeMoney
            + '</td><td colspan="3" rowspan="2" class="raIn_ValleyTimePrice">' + data[i].raIn_remarks
            + '</td></tr></tbody>';
    }
    $("#myTbogy").after(listTr);
}

$("body").off("click", ".rateInfoDetail").on('click', ".rateInfoDetail", function () {
    window.location.href = "rateInfoDetail.html?rateInfoId=" + $(this).attr('data-rateInfoId');
});

$('#addRateInfo').on('click', function () {
    window.location.href = "addRateInfo.html";
});

//点击删除
$("body").off("click", "#delRateInfo").on("click", "#delRateInfo", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: '确定删除吗？',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSubmitDisAble();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
});

function toSubmitDisAble() {
    var ids = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids += $(this).attr('value') + ',';
        }
    });
    if (!ids) {
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '160px'],//宽高
            content: '请指定表单元素',
            time: 3000,
            btn: ["确定"]
        });
    } else {
        $.ajax({
            type: "post",
            url: basePath + delRateInfoUrl,
            async: true,
            data: {
                rateInfoIds: ids
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
                        content: data.msg,
                        btn: ["确定"],
                        yes:function(index,layero){
                            window.location.reload();
                        },
                        cancel: function (index, layero) {
                            layer.closeAll();
                            window.location.reload();
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
                        btn: ["确定"],
                        yes:function(index,layero){
                            window.location.reload();
                        }
                    });
                }
            }
        });
    }
}

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        rateInfoListSearch();
    }
});
//选择费率类型
$('.raIn_typeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})

