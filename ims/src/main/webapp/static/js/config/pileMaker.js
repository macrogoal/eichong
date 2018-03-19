//获取电桩制造商的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['电桩制造商列表'];
$(function () {
    ctrlMenu(menuId);
    //去加载表格的数据
    setTimeout("pileMakerListSearch()", 100);
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
                        $('#addPileMaker').show();
                    }
                    if (contents.indexOf('删除') > -1) {
                        $('#delPileMaker').show();
                    }
                }
            }


        }
    });
}

function pileMakerListSearch() {
    initTable("", "pileMakerListPage", getPileMakerListUrl, pileMakerListCallback);
}
function pileMakerListCallback(req) {
    var data = req.dataObject;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].id + '"/></td>'
        + '<td class="id"><a class="modifyPileMaker" data-pileMakerId="' + data[i].id + '" >' + data[i].id + '</a>'
        + '</td><td class="makerName">' + data[i].makerName
        + '</td><td class="makerRemark">' + data[i].makerRemark
        + '</td></tr>';
    }
    $("#myTbogy").html(listTr);
}

$("body").off("click", ".modifyPileMaker").on('click', ".modifyPileMaker", function () {
    window.location.href = "modifyPileMaker.html?pileMakerId=" + $(this).attr('data-pileMakerId');
});

$('#addPileMaker').on('click', function () {
    window.location.href = "addPileMaker.html";
});

//点击删除
$("body").off("click", "#delPileMaker").on("click", "#delPileMaker", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: $('.disabledContent'),
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
            url: basePath + delPileMakerUrl,
            async: true,
            data: {
                pileMakerIds: ids
            },
            success: function (data) {
                if (data.success == true) {
                    layer.closeAll();
                    window.location.reload();
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
        pileMakerListSearch();
    }
});
