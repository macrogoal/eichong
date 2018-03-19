//获取订单列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['第三方API订单'];
$(function () {
    initInputSearch();
    ctrlMenu(menuId);
    setTimeout('thirdOrderListSearch()', 190);
    setTimeout('initInvestCompanyList()', 590);
})

function ctrlMenu(menuId) {
    $.ajax({
        type: "post",
        url: basePath + getSelfButtonTreeUrl,
        async: true,
        data: {
            menuId: menuId
        },
        success: function (data) {
            var data = data.dataObject;
            if(data==null){
                return;
            }
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('显示') > -1) {
                        $('#showSet').show();
                    }
                    if (contents.indexOf('导出') > -1) {
                        $('#dataExport').show();
                    }
                    if (contents.indexOf('结算') > -1) {
                        $('#manualClearing').show();
                    }

                }
            }
        }
    });
}
//去加载表格的数据

function thirdOrderListSearch() {
    toGiveHiddenInput();
    initTable("thirdOrderListForm", "thirdOrderListPage", getThirdOrderListPageUrl, thirdOrderListCallback);
}

//下拉选项
toUnbindEvent();
function toUnbindEvent() {
    $('.orderStatusBlock').unbind();
    $('.slaveCpyBlock').unbind();
    selectModel();
}
//表格数据
function thirdOrderListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        var startChargeTime = data[i].startChargeTime;
        var endChargeTime = data[i].endChargeTime;
        endtime = Date.parse(endChargeTime);
        starttime = Date.parse(startChargeTime);
        var s = endtime / 1000 - starttime / 1000;
        var ChargeTime = sec_to_time(s);
        var orderStatusHtml = '';
        if (data[i].orderStatus == 1) {
            orderStatusHtml = '未结算';
        }
        if (data[i].orderStatus == 2) {
            orderStatusHtml = '结算已到账';
        }
        if (data[i].orderStatus == 3) {
            orderStatusHtml = '结算未到账';
        }
        if (data[i].orderStatus == 4) {
            orderStatusHtml = '异常未处理';
        }
        if (data[i].orderStatus == 5) {
            orderStatusHtml = '异常已处理';
        }
        var invoiceStatusHtml = '';
        if (data[i].invoiceStatus == 0) {
            invoiceStatusHtml = '否';
        }
        if (data[i].invoiceStatus >0 ) {
            invoiceStatusHtml = '是';
        }

        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].orderId + '"/>'
        + '</td><td class="thirdOrderList_orderCode">' + data[i].orderCode
        + '</td><td class="thirdOrderList_electricPileCode">' + data[i].electricPileCode
        + '</td><td class="thirdOrderList_totalElectricMoney">' + data[i].totalElectricMoney
        + '</td><td class="thirdOrderList_totalServiceMoney">' + data[i].totalServiceMoney
        + '</td><td class="thirdOrderList_totalfavMoney">' + data[i].totalfavMoney
        + '</td><td class="thirdOrderList_totalElectricCharge">' + data[i].totalElectricCharge
        + '</td><td class="thirdOrderList_orderStatus">' + orderStatusHtml
        + '</td><td class="thirdOrderList_powerstationName">' + data[i].powerstationName
        + '</td><td class="thirdOrderList_invoiceStatus">' + invoiceStatusHtml
        + '</td><td class="thirdOrderList_soc">' + data[i].startSoc
        + '</td><td class="thirdOrderList_soc">' + data[i].endSoc
        + '</td><td class="thirdOrderList_carNum">'+data[i].carNo+'</td><td class="thirdOrderList_TIME">' + data[i].chargeTime
            + '</td><td class="thirdOrderList_accountNO">' + data[i].accountNo
        + '</td><td class="thirdOrderList_VIN">'+data[i].vinCode+'</td><td class="thirdOrderList_timeQuantum">' + data[i].timeQuantum
        + '</td><td class="thirdOrderList_cardNum">' + data[i].cardNum
        + '</td><td class="thirdOrderList_eMoney">' + data[i].JMoney
        + '</td><td class="thirdOrderList_eMoney">' + data[i].FMoney
        + '</td><td class="thirdOrderList_eMoney">' + data[i].PMoney
        + '</td><td class="thirdOrderList_eMoney">' + data[i].GMoney
        + '</td><td class="thirdOrderList_sMoney">' + data[i].JServiceMoney
        + '</td><td class="thirdOrderList_sMoney">' + data[i].FServiceMoney
        + '</td><td class="thirdOrderList_sMoney">' + data[i].PServiceMoney
        + '</td><td class="thirdOrderList_sMoney">' + data[i].GServiceMoney
        + '</td></tr>';
    }
    $("#myTbogy").html(listTr);
    var arr = ['thirdOrderList_orderCode', 'thirdOrderList_electricPileCode', 'thirdOrderList_totalElectricMoney', 'thirdOrderList_totalServiceMoney',
        'thirdOrderList_totalfavMoney', 'thirdOrderList_totalElectricCharge', 'thirdOrderList_orderStatus', 'thirdOrderList_powerstationName', 'thirdOrderList_invoiceStatus',
        'thirdOrderList_soc', 'thirdOrderList_carNum', 'thirdOrderList_accountNO', 'thirdOrderList_VIN', 'thirdOrderList_cardNum',
        'thirdOrderList_TIME', 'thirdOrderList_timeQuantum', 'thirdOrderList_eMoney', 'thirdOrderList_sMoney'];
    toGetLocalStorageInfo(arr);
}

//数据导出	=====================
$('#dataExport').on("click", function () {
    toGiveHiddenInput();
    var obj = {
        orderCode: $('input[name=orderCode]').val(),
        electricPileCode: $('input[name=electricPileCode]').val(),
        cpyNumber: $('input[name=cpyNumber]').val(),
        orderStatus: $('input[name=orderStatus]').val(),
        slaveCpyId: $('input[name=slaveCpyId]').val(),
        startGmtCreate: $('input[name=startGmtCreate]').val(),
        endGmtCreate: $('input[name=endGmtCreate]').val()
    };
    window.location.href = basePath + exportThirdOrderUrl + '?orderCode='
    + obj.orderCode + '&electricPileCode='
    + obj.electricPileCode + '&cpyNumber='
    + obj.cpyNumber + '&orderStatus='
    + obj.orderStatus + '&slaveCpyId='
    + obj.slaveCpyId + '&startGmtCreate='
    + obj.startGmtCreate + '&endGmtCreate='
    + obj.endGmtCreate;
});
//查询条件部分=========================
function toGiveHiddenInput() {
    var orderCodeValue = $('#orderCode').val();
    var electricPileCodeValue = $('#electricPileCode').val();
    var cpyNumberValue = $('#cpyNumber').val();
    var orderStatusValue = $('#orderStatus').attr('data-value');
    var slaveCpyHtmlValue = $('#slaveCpyHtml').attr('data-value');

    if (orderCodeValue == "") {
        $('input[name=orderCode]').val('');
    } else {
        $('input[name=orderCode]').val(orderCodeValue);
    }
    if (electricPileCodeValue == "") {
        $('input[name=electricPileCode]').val('');
    } else {
        $('input[name=electricPileCode]').val(electricPileCodeValue);
    }
    if (cpyNumberValue == "") {
        $('input[name=cpyNumber]').val('');
    } else {
        $('input[name=cpyNumber]').val(cpyNumberValue);
    }
    if (orderStatusValue == "") {
        $('input[name=orderStatus]').val('');
    } else {
        $('input[name=orderStatus]').val(orderStatusValue);
    }
    if (slaveCpyHtmlValue == "") {
        $('input[name=slaveCpyId]').val('');
    } else {
        $('input[name=slaveCpyId]').val(slaveCpyHtmlValue);
    }
    getDateValue();
}

//订单状态筛选部分
$('.orderStatusUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})

//日期选择
laydate.render({
    elem: '#datePicker'
    , range: true,
    theme: '#ff7d00'
});
//时间的默认值
function initInputSearch(){
    var nowTime =new Date().getTime();
    var etTime = nowTime-3600*24*1000;
    var stTime = nowTime-3600*24*1000*7;
    var et =new Date(etTime).format("yyyy-MM-dd");
    var st =new Date(stTime).format("yyyy-MM-dd");
    $('#datePicker').val(st+' - '+et);
}
function getDateValue() {
    var dateValue = $('#datePicker').val();
    if (dateValue == "") {
        $('input[name=startGmtCreate]').val('');
        $('input[name=endGmtCreate]').val('');
    } else {
        var dateValue = $('#datePicker').val();
        var startGmtCreate = dateValue.substring(0, 10);
        var endGmtCreate = dateValue.substring(13, 23);
        $('input[name=startGmtCreate]').val(startGmtCreate);
        $('input[name=endGmtCreate]').val(endGmtCreate);
    }

}

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        thirdOrderListSearch();
    }
});

//手工结算
$("body").off("click", ".selectedBox").on("click", ".selectedBox", function () {
    var orderStatusName = $(this).parent().siblings('.thirdOrderList_orderStatus').html();
    if(orderStatusName!='结算未到账'){
        this.checked = !this.checked;
    }else{
        this.checked = this.checked;
    }
});
$(".selAll").on("click",function () {
    var orderStatusName = $('#orderStatus').attr('data-value');
    if(orderStatusName!=3){
        this.checked = !this.checked;
    }else{
        this.checked = this.checked;
    }
});
$("body").off("click", "#manualClearing").on("click", "#manualClearing", function(){
    var orderStatusName = $('#orderStatus').attr('data-value');
    if(orderStatusName!=3){
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: '订单状态选择有误，请选择结算未到账的订单！',
            btn: ["确定"],
            yes: function (index, layero) {
                layer.closeAll();
            },
            cancel: function (index, layero) {
                layer.closeAll();
            }
        });
        return false;
    }
    var ids = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids += $(this).attr('value')+',';
        }
    });
    var orderIds=ids.substring(0,ids.length-1);
    if (!ids){
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
        var num=ids.length/7;
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: '您已选择'+ num +'条订单，是否结算？',
            btn: ["确定结算", "取消"],
            yes: function (index, layero) {
                layer.closeAll();
                toManualClearing(orderIds);
            },
            cancel: function (index, layero) {
                layer.closeAll();
            }
        });
    }
});
function toManualClearing(a){
    $.ajax({
        type: "post",
        url: basePath + manualAccountOrderUrl,
        async: true,
        data: {
            orderIds: a
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
                    content: '结算成功',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        window.location.reload();
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.reload();
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

function initInvestCompanyList(){
    $.ajax({
        type: "post",
        url: basePath + initInvestCompanyListUrl,
        async: true,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var  initInvestCompanyLi = '<li data-option="">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    initInvestCompanyLi += '<li data-option="' + dataModule[i].cpyId + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.slaveCpyUl').html(initInvestCompanyLi);
                toUnbindEvent();
            }
        }
    });
}
//投资公司筛选部分
$('.slaveCpyUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})