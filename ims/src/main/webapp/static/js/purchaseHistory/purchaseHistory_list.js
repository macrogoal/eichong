//获取消费记录列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['消费记录列表'];
$(function () {
    ctrlMenu(menuId);
    //initInputSearch();
    setTimeout("dealJumpBtn()", 300);
    setTimeout("getFinBillAccountComboBox()", 200);
})
function dealJumpBtn(){
    var accountNO = getUrlParam('accountNO');
    if(accountNO){
        $('input[name=accountNO]').val(accountNO);
        purchaseHistoryListSearch();
    }else{
        $('input[name=accountNO]').val('');
        //purchaseHistoryListSearch();
    }
}
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

                }
            }
        }
    });
}
function toUnbindEvent() {
    $('.tradeTypeBlock').unbind();
    $('.billAccountCodeBlock').unbind();
    selectModel();
}
toUnbindEvent();
//去加载表格的数据

function purchaseHistoryListSearch() {
    toGiveHiddenInput();
    initTable("purchaseHistoryForm", "purchaseHistoryPage", getPurchaseHistoryUrl, getPurchaseHistoryListCallback);
}
function getPurchaseHistoryListCallback(req) {
    var data = req.dataObject;
    //var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
    	var dateTime = data[i].puHiCreatedate.time;
        listTr += '<tr><td><input type="checkbox" name="id" class="selectedBox" value="' + data[i].pkId + '"/></td>'
        + '<td class="purchaseHistory_puHiTransactionNumber">' + data[i].puHiTransactionNumber
        + '</td><td class="purchaseHistory_accountNO">' + data[i].accountNO
        + '</td><td class="purchaseHistory_billAccountName">' + data[i].billAccountName
        + '</td><td class="purchaseHistory_tradeType">' + data[i].tradeTypeName
        + '</td><td class="purchaseHistory_puHiMonetary">' + data[i].puHiMonetary
        + '</td><td class="purchaseHistory_puHiChargeType">' + data[i].puHiChargeTypeName
        + '</td><td class="purchaseHistory_chOrCode">' + data[i].chOrCode
        + '</td><td class="purchaseHistory_puHiCreatedate">' + new Date(dateTime).format("yyyy-MM-dd hh:mm:ss")
        + '</td><td class="purchaseHistory_userAccount">' + data[i].userAccount
        + '</td></tr>';

    }
    $("#myTbogy").html(listTr);
    var arr = ['purchaseHistory_puHiTransactionNumber','purchaseHistory_userAccount', 'purchaseHistory_accountNO', 'purchaseHistory_billAccountName', 'purchaseHistory_tradeType', 'purchaseHistory_puHiMonetary', 'purchaseHistory_puHiChargeType'];
    toGetLocalStorageInfo(arr);
}
function toGiveHiddenInput() {
    var tradeTypeHtmlValue = $('#tradeTypeHtml').attr('data-value');
    var billAccountCodeHtmlValue = $('#billAccountCodeHtml').attr('data-value');

    if (tradeTypeHtmlValue == "") {
        $('input[name=tradeType]').val('');
    } else {
        $('input[name=tradeType]').val(tradeTypeHtmlValue);
    }
    if (billAccountCodeHtmlValue == "") {
        $('input[name=billAccountCode]').val('');
    } else {
        $('input[name=billAccountCode]').val(billAccountCodeHtmlValue);
    }
    getDateValue();
}
$('.tradeTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});
//获取账单科目

function getFinBillAccountComboBox() {
    $.ajax({
        type: "post",
        url: basePath + getFinBillAccountComboBoxUrl,
        async: true,
        success: function (data) {
            if (data.success == true) {
                if (data.success == true) {
                    var dataModule = data.dataObject;
                    var billAccountCodeLi = '<li data-option="" class="data-selected">请选择</li>';
                    for (var i = 0; i < dataModule.length; i++) {
                        billAccountCodeLi += '<li data-option="' + dataModule[i].billAccountCode + '">' + dataModule[i].billAccountName + '</li>';
                    }
                    $('.billAccountCodeBlockUl').html(billAccountCodeLi);
                    toUnbindEvent();
                }
            }
        }
    });

}
$('.billAccountCodeBlockUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag=$(this).html();//1.0.7迭代，当充值时，多传一个参数flag=1
    if(flag=='充值'){
        var html='<input type="text" name="flag" value="" hidden="hidden"/>';
        $('#billBlock').append(html);
        $('input[name=flag]').val(1);
    }else{
        $('input[name=flag]').remove();
    }
});

//数据导出	=====================时间限制参数名字未确定
$('#dataExport').on("click", function () {
    toGiveHiddenInput();
    var obj = {
        puHiTransactionNumber: $('input[name=puHiTransactionNumber]').val(),
        chOrCode: $('input[name=chOrCode]').val(),
        tradeType: $('input[name=tradeType]').val(),
        accountNO: $('input[name=accountNO]').val(),
        startGmtCreate: $('input[name=startGmtCreate]').val(),
        endGmtCreate: $('input[name=endGmtCreate]').val(),
        billAccountCode: $('input[name=billAccountCode]').val(),
        userAccount:$('input[name=userAccount]').val()
    };
    window.location.href = basePath + exportPurchaseHistoryUrl + '?puHiTransactionNumber='
    + obj.puHiTransactionNumber + '&chOrCode='
    + obj.chOrCode + '&tradeType='
    + obj.tradeType + '&accountNO='
    + obj.accountNO + '&billAccountCode='
    + obj.billAccountCode + '&startGmtCreate='
    + obj.startGmtCreate + '&endGmtCreate='
    + obj.endGmtCreate+ '&userAccount='
    + obj.userAccount;

});
//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        purchaseHistoryListSearch();
    }
});
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
