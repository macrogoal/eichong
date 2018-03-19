//获取首页故障通知的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['首页故障通知'];
$(function(){
    setTimeout('appIndexListSearch()', 150);
    setTimeout("toLoadProvince('','#provinceCode','.provinceUl','toUnbindEvent')", 250);
    //下拉选项
    toUnbindEvent();
    ctrlMenu(menuId);
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
            if (data == null) {
                return;
            }
            if (data == null) {
                return;
            }
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('新建') > -1) {
                        $('#addList').show();
                    }
                    if (contents.indexOf('编辑') > -1) {
                        $('#editList').show();
                    }
                    if (contents.indexOf('删除') > -1) {
                        $('#delList').show();
                    }
                    if (contents.indexOf('关闭') > -1) {
                        $('#closeList').show();
                    }
                }
            }
        }
    });
}

function toUnbindEvent() {
    $('.messageInfoTypeBlock').unbind();
    $('.provinceBlock').unbind();
    $('.cityBlock').unbind();
    selectModel();
}
//去加载表格的数据
function appIndexListSearch() {
    toGiveHiddenInput();
    initTable("AppIndexListForm", "appIndexListPage", getMessageInfoListUrl, appIndexListCallback);
}
//表格数据
function appIndexListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        var timeaaa=data[i].messageInfoUpdatedate.time;
        var messageInfoStatusName='';
        var messageInfoStatusNum =data[i].messageInfoStatus;
        if(messageInfoStatusNum==1){
            messageInfoStatusName='有效';
        }else if(messageInfoStatusNum==2){
            messageInfoStatusName='无效';
        }else if(messageInfoStatusNum==3){
            messageInfoStatusName='删除';
        }
        var messageInfoTypeName='';
        var messageInfoTypeNum =data[i].messageInfoType;
        if(messageInfoTypeNum==1){
            messageInfoTypeName='故障';
        }else if(messageInfoTypeNum==2){
            messageInfoTypeName='新建';
        }
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].pkMessageInfoId + '"/></td>'
            + '<td class="appIndexList_num">' + (i+1+(pageNum-1)*20)
            + '</td><td class="appIndexList_type">' + messageInfoTypeName
            + '</td><td class="appIndexList_title">' + data[i].messageInfoName
            + '</td><td class="appIndexList_address">' + data[i].messageInfoRegion
            + '</td><td class="appIndexList_startDate">' + data[i].messageInfoBegintime.substring(0,19)
            + '</td><td class="appIndexList_editDate">' + new Date(timeaaa).format("yyyy-MM-dd hh:mm:ss")
            //+ '</td><td class="appIndexList_editDate">' + timeaaaName
            + '</td><td class="appIndexList_closeDate">' + data[i].messageInfoEndtime.substring(0,19)
            + '</td><td class="appIndexList_status">' + messageInfoStatusName
            + '</td></tr>';
    }
    $("#myCompanyTb").html(listTr);
}
//点击新建
$('#addList').on('click', function () {
    window.location.href = "add_AppIndex.html";
});
//点击编辑
$('#editList').on('click', function () {
    var ids = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids = $(this).attr('value');
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
    }else {
        window.location.href = "AppIndexEdit.html?pkMessageInfoId="+ids;
    }

});
//点击关闭
$("body").off("click", "#closeList").on("click", "#closeList", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: "确认关闭该条消息？",
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSubmitCloseAppIndex();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
});
function toSubmitCloseAppIndex() {
    var ids = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids = $(this).attr('value');
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
            url: basePath + closeMessageInfoUrl,
            async: true,
            data: {
                pkMessageInfoId:ids
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
                        content: '关闭成功',
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
}
//点击删除
$("body").off("click", "#delList").on("click", "#delList", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: "确认删除该条消息？",
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSubmitDeleteAppIndex();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });


});
function toSubmitDeleteAppIndex() {
    var ids = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids = $(this).attr('value');
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
            url: basePath + deleteMessageInfoUrl,
            async: true,
            data: {
                pkMessageInfoId: ids
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
                        content: '删除成功',
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
}
//查询条件部分=========================
function toGiveHiddenInput() {
    var messageInfoNameValue = $('#messageInfoName').val();
    var provinceCodeValue = $('#provinceCode').attr('data-value');
    var cityCodeValue = $('#cityCode').attr('data-value');
    var messageInfoTypeValue = $('#messageInfoType').attr('data-value');
    if (messageInfoNameValue == "") {
        $('input[name=messageInfoName]').val('');
    } else {
        $('input[name=messageInfoName]').val(messageInfoNameValue);
    }
    if (provinceCodeValue == "") {
        $('input[name=messageInfoProvinceCode]').val('');
    } else {
        $('input[name=messageInfoProvinceCode]').val(provinceCodeValue);
    }
    if (cityCodeValue == "") {
        $('input[name=messageInfoCityCode]').val('');
    } else {
        $('input[name=messageInfoCityCode]').val(cityCodeValue);
    }
    if (messageInfoTypeValue == "") {
        $('input[name=messageInfoType]').val('');
    } else {
        $('input[name=messageInfoType]').val(messageInfoTypeValue);
    }

    getDateValue();
    getEndDateValue();
}
//类别
$('.messageInfoTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//城市筛选部分=============
$('.provinceUl').on("click", "li", function () {
    $('#cityCode').attr('data-value', '');
    $('#cityCode').html('请选择');
    $('input[name=cityCode]').val('');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#provinceCode').html('请选择');
        $('#provinceCode').attr('data-value', '');
        $('#cityCode').html('请选择');
        $('#cityCode').attr('data-value', '');
        $('.cityUl').html('');
        $('input[name=cityCode]').val('');
    } else {
        toLoadCity(provinceCodeId, '', '#cityCode', '.cityUl', 'toUnbindEvent');
    }
})
$('.cityUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});

//日期选择
laydate.render({
    elem: '#startDatePicker'
    , range: true,
    theme: '#ff7d00'
});

function getDateValue() {
    var dateValue = $('#startDatePicker').val();
    if (dateValue == "") {
        $('input[name=messageInfoBegintimeStartTime]').val('');
        $('input[name=messageInfoBegintimeEndTime]').val('');
    } else {
        var dateValue = $('#startDatePicker').val();
        var startGmtCreate = dateValue.substring(0, 10);
        var endGmtCreate = dateValue.substring(13, 23);
        $('input[name=messageInfoBegintimeStartTime]').val(startGmtCreate);
        $('input[name=messageInfoBegintimeEndTime]').val(endGmtCreate);
    }

}
laydate.render({
    elem: '#endDatePicker'
    , range: true,
    theme: '#ff7d00'
});

function getEndDateValue() {
    var dateValue = $('#endDatePicker').val();
    if (dateValue == "") {
        $('input[name=messageInfoEndtimeStartTime]').val('');
        $('input[name=messageInfoEndtimeEndTime]').val('');
    } else {
        var dateValue = $('#endDatePicker').val();
        var startGmtCreate = dateValue.substring(0, 10);
        var endGmtCreate = dateValue.substring(13, 23);
        $('input[name=messageInfoEndtimeStartTime]').val(startGmtCreate);
        $('input[name=messageInfoEndtimeEndTime]').val(endGmtCreate);
    }

}
//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        appIndexListSearch();
    }
});
//单个禁用
$('body').on('click', 'input[name=ids]', function () {
    var flag = $(this).prop('checked');
    if (flag == true) {
        $(this).parents('td').parents('tr').siblings().find('input[name=ids]').prop('checked', false).attr('disabled', true);
    } else {
        $(this).parents('td').parents('tr').siblings().find('input[name=ids]').attr('disabled', false);
    }

})