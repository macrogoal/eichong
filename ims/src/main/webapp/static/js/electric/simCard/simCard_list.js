//获取sim卡列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['SIM卡列表'];
$(function () {
    ctrlMenu(menuId);
    setTimeout('simCardListSearch()', 100);
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
            //console.log(data);
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('更新') > -1) {
                        $('#updateBtn').show();
                    }
                }
            }


        }
    });
}
//去加载表格的数据

function simCardListSearch() {
    toGiveHiddenInput();
    initTable("simCardListForm", "simCardListPage", getSimCardListUrl, simCardListCallback);
}
function simCardListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;

    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        var updateDate = data[i].updateDate;
        var updateDateTime='';
        if(data[i].updateDate==null){
            updateDateTime='';
        }else{
            var updateDateTime = data[i].updateDate.time;
            updateDateTime=new Date(updateDateTime).format("yyyy-MM-dd");
        }
        var simOperatorHtml='';
        if(data[i].simOperator==46000||data[i].simOperator==46002||data[i].simOperator==46004||data[i].simOperator==46007
            ||data[i].simOperator==46020||data[i].simOperator==46060){
            simOperatorHtml='移动';
        }else if(data[i].simOperator==46001||data[i].simOperator==46006||data[i].simOperator==46010){
            simOperatorHtml='联通';
        }else if(data[i].simOperator==46003||data[i].simOperator==46005||data[i].simOperator==46011){
            simOperatorHtml='电信';
        }else{
            simOperatorHtml='';
        }
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox"  data-commStatus="' + data[i].commStatus + '" value="' + data[i].elpiElectricpilecode + '"/></td><td>'+(i+1+(pageNum-1)*20)
        + '</td><td>' + data[i].simCode
        + '</td><td>' + simOperatorHtml
        + '</td><td>' + data[i].postName
        + '</td><td>' + data[i].elpiElectricpilecode
        + '</td><td>' + data[i].epNum
        + '</td><td>' + data[i].commStatusName
        + '</td><td>' + updateDateTime
        + '</td></tr>';

    }
    $("#myTbogy").html(listTr);
}

function toUnbindEvent() {
    $('.simOperatorBlock').unbind();
    selectModel();
}
toUnbindEvent();
//点击更新
$("body").off("click", "#updateBtn").on("click", "#updateBtn", function () {
    toUpdateElectricPile();
});
function toUpdateElectricPile() {
    var ids = '',
    commStatus='';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids += $(this).attr('value') + ',';
            commStatus += $(this).attr('data-commStatus') + ',';
        }
    });
    ids = ids.substring(0, ids.length - 1);
    commStatus = commStatus.substring(0, commStatus.length - 1);
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

        var commStatus=commStatus.split(',');
        for(var i=0;i<commStatus.length;i++){
            if(commStatus[i]==0){
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '180px'],//宽高
                    content: '电桩离线，无法下发更新命令！',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                    }
                });
                return false;
            }
        }
        toUpdata(ids);
    }
}

function toUpdata(ids){
    var index = layer.load(1);
    $.ajax({
        type: "post",
        url: basePath + modifySimCardUrl,
        async: true,
        data: {
            elpiElectricpilecode: ids
        },
        success: function (data) {
            if (data.success == true) {
                layer.close(index);
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '更新成功',
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
//查询条件部分=========================
function toGiveHiddenInput() {
    var simOperatorHtmlValue = $('#simOperatorHtml').attr('data-value');

    if (simOperatorHtmlValue == "") {
        $('input[name=simOperator]').val('');
    } else {
        $('input[name=simOperator]').val(simOperatorHtmlValue);
    }
}
//SIM卡运营商
$('.simOperatorUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        simCardListSearch();
    }
});

