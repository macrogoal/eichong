//获取首页故障通知的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['首页资讯发布'];
$(function(){
    setTimeout('appNewsListSearch()', 150);
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
                    if (contents.indexOf('下架') > -1) {
                        $('#closeList').show();
                    }
                }
            }
        }
    });
}

//去加载表格的数据
function appNewsListSearch() {
    toGiveHiddenInput();
    initTable("AppNewsListForm", "appNewsListPage", getNewsInfoListUrl, appNewsListCallback);
}
//表格数据
function appNewsListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        var timeaaa=data[i].newsInfoUpdatedate.time;
        var newsInfoStatusName='';
        var newsInfoStatus =data[i].newsInfoStatus;
        if(newsInfoStatus==1){
            newsInfoStatusName='有效';
        }else if(newsInfoStatus==2){
            newsInfoStatusName='无效';
        }else if(newsInfoStatus==3){
            newsInfoStatusName='删除';
        }

        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].newsInfoId + '"/></td>'
            + '<td class="appNewsList_num">' + (i+1+(pageNum-1)*20)
            + '</td><td class="appNewsList_title"><a class="newsInfo" onclick="return false" href="'+ data[i].newsInfoUrl +'">' + data[i].newsInfoName+'</a>'
            + '</td><td class="appNewsList_picture"><a title="预览" onclick="pictureShow('+"'"+data[i].newsInfoPicUrl+"'"+')">缩略图</a>'
            + '</td><td class="appNewsList_editDate">' + new Date(timeaaa).format("yyyy-MM-dd hh:mm:ss")
            + '</td><td class="appNewsList_status">' + newsInfoStatusName
            + '</td></tr>';
    }
    $("#myCompanyTb").html(listTr);
}
newTab(".newsInfo", "资讯详细");
//点击查看图片
function pictureShow(picUrl){
    $('.pic').attr('src',picUrl);
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['360px', '380px'],//宽高
        content: $('.pictureShow')
    });
}
//点击新建
$('#addList').on('click', function () {
    window.location.href = "add_AppNews.html";
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
        window.location.href = "AppNewsEdit.html?newsInfoId="+ids;
    }

});
//点击下架
$("body").off("click", "#closeList").on("click", "#closeList", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: "确认下架该条消息？",
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
            url: basePath + downNewsInfoUrl,
            async: true,
            data: {
                newsInfoId:ids
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
                        content: '下架成功',
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
            url: basePath + deleteNewsInfoUrl,
            async: true,
            data: {
                newsInfoId: ids
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
                        },
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
    var newsInfoNameValue = $('#newsInfoName').val();
    if (newsInfoNameValue == "") {
        $('input[name=newsInfoName]').val('');
    } else {
        $('input[name=newsInfoName]').val(newsInfoNameValue);
    }
    getDateValue();
}
//日期选择
laydate.render({
    elem: '#datePicker'
    , range: true,
    theme: '#ff7d00'
    ,change: function(value, date, endDate){

    }
});

function getDateValue() {
    var dateValue = $('#datePicker').val();
    if (dateValue == "") {
        $('input[name=startTime]').val('');
        $('input[name=endTime]').val('');
    } else {
        var dateValue = $('#datePicker').val();
        var startGmtCreate = dateValue.substring(0, 10);
        var endGmtCreate = dateValue.substring(13, 23);
        $('input[name=startTime]').val(startGmtCreate);
        $('input[name=endTime]').val(endGmtCreate);
    }

}
//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        appNewsListSearch();
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

});
