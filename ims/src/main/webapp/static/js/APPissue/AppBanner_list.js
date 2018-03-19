//获取首页故障通知的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['首页banner发布'];
$(function(){
    setTimeout('appBannerListSearch()', 150);
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
                    if (contents.indexOf('排序') > -1) {
                        $('#editBannerSort').show();
                    }
                }
            }
        }
    });
}


//去加载表格的数据
function appBannerListSearch() {
    initTable("AppBannerListForm", "appBannerListPage", getBannerListUrl, appBannerListCallback);
}
//表格数据
function appBannerListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].pkBannerId + '"/></td>'
            + '<td ><input type="text" class="bannerSortInput" data-id="'+ data[i].pkBannerId +'" data-type="'+ data[i].bannerStatusType +'" data-option="'+ data[i].bannerSort +'" value="'+ data[i].bannerSort +'" />'
            + '</td><td ><a title="预览" onclick="pictureShow('+"'"+data[i].bannerPicUrl+"'"+')">缩略图</a>'
            + '</td><td >' + data[i].bannerRegion
            + '</td><td >' + data[i].bannerBeginTime
            + '</td><td >' + data[i].bannerEndTime
            + '</td><td >' + data[i].bannerCreatedate
            + '</td><td >' + data[i].bannerStatusType
            + '</td><td >' + data[i].bannerDesc
            + '</td></tr>';
    }
    $("#appBannerTb").html(listTr);

    $(".bannerSortInput").each(function(){
        var type = $(this).attr("data-type");
        if(type=="已结束"){
            $(this).hide();
        }
    });

    //for (var j=0;j<data.length;j++){
    //    if(data[j].bannerStatusType=='已结束'){
    //        $('#appBannerTb tr').eq(j).children('td').eq(1).children('input').val('');
    //        $('#appBannerTb tr').eq(j).children('td').eq(1).children('input').attr('readonly','readonly');
    //    }
    //}
}
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
//播放顺序----失焦判断输入框内容的合法性
$('body').off('blur', '.bannerSortInput').on('blur', '.bannerSortInput', function () {
    var newBannerSort = $(this).val();
    var reg=/(^[1-9]{1}$)|(^10$)/;
    if(!newBannerSort){
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: "播放顺序输入有误，请确认后重新输入1-10的整数",
            btn: ["确定"]
        });
        $(this).val('');
        return false;
    }else if(!reg.test(newBannerSort)){
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: "播放顺序输入有误，请确认后重新输入1-10的整数",
            btn: ["确定"]
        });
        $(this).val('');
        return false;
    }
});
var arr=[];
$("#editBannerSort").click(function(){
    var bannerList = new Array();
    var i = 0;
    var flag = 0;
    $(".bannerSortInput").each(function(){
        var newBannerSort = $(this).val();
        var type = $(this).attr("data-type");
        if(newBannerSort==0){
            layer.closeAll();
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 1,
                area: ['310px', '180px'],//宽高
                content: "播放顺序不能为空",
                btn: ["确定"],
                yes:function (index,layero){
                    layer.closeAll();
                    $(this).val('');
                },
                cancel: function (index, layero) {
                    layer.closeAll();
                    $(this).val('');
                }
            });
            flag=1;
        }
        if(type=="开启"||type=="未开始"){
            bannerList[i]=newBannerSort;
            i++;
        }
    });
    if(flag==1){
        return;
    }
    if(isRepeat(bannerList)==true){
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: "播放循序重复，请重新确认！",
            btn: ["确定"]
        });
        return;
    }else {
        arr=[];
        $(".bannerSortInput").each(function(){
            var newBannerSort = $(this).val();
            var oldBannerSort =$(this).attr("data-option");
            var pkBannerId =$(this).attr("data-id");
            var type = $(this).attr("data-type");
            if(newBannerSort!==oldBannerSort){
                var obj = {'a':pkBannerId,'b':newBannerSort};
                arr.push(obj);
            }else{
                window.location.href = 'AppBannerList.html';
            }
        });
        if(arr.length>0){
            toChangeSort();
        }
    }
});
function toChangeSort(){
    for(var j=0;j<arr.length;j++){
        while(changeSortAjax(arr[j].a,arr[j].b)){
            changeSortAjax(arr[j+1].a,arr[j+1].b);
        }
    }
}
function changeSortAjax(a,b){
    $.ajax({
        type: "post",
        url: basePath + editBannerOrderUrl,
        async: false,
        data: {
            pkBannerId:a,
            newBannerSort:b
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
                    area: ['310px', '180px'],//宽高
                    content: "保存成功",
                    btn: ["确定"],
                    yes:function (index,layero){
                        window.location.href = 'AppBannerList.html';
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href = 'AppBannerList.html';
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

//判断开启的banner播放顺序是否有重复
function isRepeat(arr){
    var hash = {};
    for(var i in arr) {
        if(hash[arr[i]])
            return true;
        hash[arr[i]] = true;
    }
    return false;
}

//点击新建
$('#addList').on('click', function () {
    window.location.href = "add_AppBanner.html";
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
        var timestamp = Date.parse(new Date());
        window.location.href = "AppBannerEdit.html?pkBannerId="+ids+"&_="+timestamp;
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
        ids=eval(ids);
        $.ajax({
            type: "post",
            url: basePath + downBannerUrl,
            async: true,
            data: {
                pkBannerId:ids
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
            url: basePath + deleteBannerUrl,
            async: true,
            data: {
                pkBannerId: ids
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

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        appBannerListSearch();
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