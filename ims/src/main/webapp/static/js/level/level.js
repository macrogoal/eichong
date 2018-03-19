var cpyId = getUrlParam('cpyId');
var cpyName = getUrlParam('cpyName');
$('#cpyCompanyName').html(cpyName);
$('#cpyCompanyName').attr('data-value',cpyId);
initSelect();
//获取等级列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['等级列表'];
$(function () {
    ctrlMenu(menuId);
    //去加载表格的数据
    setTimeout('levelListSearch()', 150);
    //setTimeout("toLoadProvince('','#provinceCode','.provinceUl','toUnbindEvent')",250);
    setTimeout("getBaseInfo()", 300);

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
            if(data==null){
                return;
            }
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('新建') > -1) {
                        $('#addLevel').show();
                    }
                    if (contents.indexOf('删除') > -1) {
                        $('#delLevel').show();
                    }
                    if (contents.indexOf('默认') > -1) {
                        $('#setDefaultBtn').show();
                    }

                }
            }


        }
    });
}

function levelListSearch() {
    initSelect();
    initTable("levelListForm", "levelListPage", getLevelListUrl, levelListCallback);
}

function initSelect() {
    var cpyCompanyValue = $('#cpyCompanyName').attr('data-value');
    if (cpyCompanyValue == "") {
        $('input[name=cpyId]').val('');
    } else {
        $('input[name=cpyId]').val(cpyCompanyValue);
    }
}

function toUnbindEvent() {
    $('.cpyProvinceBlock').unbind();
    $('.cypCityBlock').unbind();
    $('.cpyCompanyBlock').unbind();
    selectModel();
}
toUnbindEvent();
//根据管理员类型判断是否去加载对应的渠道公司
function getBaseInfo() {
    var loginUser = window.localStorage.getItem('loginUser');
    var getLoginUser = JSON.parse(loginUser);
    var userLevel = getLoginUser.userLevel;
    isLoadCompany(userLevel);
}

function isLoadCompany(userLevel) {
    if (userLevel == 1) {
        toLoadProvince('', '#cpyProvinceCode', '.cpyProvinceUl', 'toUnbindEvent');
    }
    if (userLevel == 2) {
        toLoadProvince('', '#cpyProvinceCode', '.cpyProvinceUl', 'toUnbindEvent');
    } else if (userLevel == 8) {
        toLoadCpy();
    }
}

function toLoadCpy() {
    $.ajax({
        type: "post",
        url: basePath + getCompanyListUrl,
        async: true,
        data: {
            provinceCode: '',
            cityCode: ''
        },
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var cypCompanyLi = '<li data-option="">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.cpyCompanyUl').html(cypCompanyLi);
                toUnbindEvent();
            }
        }
    });
}

//渠道筛选部分=============
//思路：先加载省，省的li点击，加载对应的市，市点击加载对应的公司，点击公司加载对应等级
$('.cpyProvinceUl').on("click", "li", function () {
    $('#cypCityCode').html('请选择');
    $('.cypCityUl').html('');
    $('input[name=cityCode]').val('');
    $('#cpyCompanyName').html('请选择');
    $('.cpyCompanyUl').html('');
    $('#cpyCompanyName').attr('data-value', '');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#cypCityCode').html('请选择');
        $('.cypCityUl').html('');
        $('input[name=cityCode]').val('');
        $('#cpyCompanyName').html('请选择');
        $('.cpyCompanyUl').html('');
        $('#cpyCompanyName').attr('data-value', '');
    } else {
        toLoadCity(provinceCodeId, '', '#cypCityCode', '.cypCityUl', 'toUnbindEvent');
    }
});

$('.cypCityUl').on("click", "li", function () {
    $('#cpyCompanyName').html('请选择');
    $('.cpyCompanyUl').html('');
    $('#cpyCompanyName').attr('data-value', '');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    var cypCityCodeValue = $('#cypCityCode').attr('data-value');
    var cpyProvinceCodeValue = $('#cpyProvinceCode').attr('data-value');
    if (flag == "") {
        $('#cpyCompanyName').html('请选择');
        $('.cpyCompanyUl').html('');
        $('#cpyCompanyName').attr('data-value', '');
    } else {
        toLoadCompanyName(cypCityCodeValue, cpyProvinceCodeValue);
    }
});

function toLoadCompanyName(cypCityCodeValue, cpyProvinceCodeValue, cpyId) {
    var cpyObject = {
        provinceCode: cpyProvinceCodeValue,
        cityCode: cypCityCodeValue
    };
    if (JSON.stringify(cpyObject) == "{}") {
        $('#cpyCompanyName').html("请选择");
    } else {
        toAjaxCompany(cpyObject, cpyId);
    }
}

function toAjaxCompany(cpyObject, cpyId) {
    $.ajax({
        type: "post",
        url: basePath + getCompanyListUrl,
        async: true,
        data: cpyObject,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                if (cpyId == '') {
                    var cypCompanyLi = '<li data-option="">请选择</li>';
                    for (var i = 0; i < dataModule.length; i++) {
                        cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '">' + dataModule[i].cpyName + '</li>';
                    }
                } else {
                    var cypCompanyLi = '<li data-option="">请选择</li>';
                    for (var i = 0; i < dataModule.length; i++) {
                        if (dataModule[i].cpyId == cpyId) {
                            $('#cpyCompanyName').html(dataModule[i].cpyId);
                            cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '" class="data-selected">' + dataModule[i].cpyName + '</li>';
                        } else {
                            cypCompanyLi += '<li data-option="' + dataModule[i].cpyId + '" data-cpyNumber="' + dataModule[i].cpyNumber + '">' + dataModule[i].cpyName + '</li>';
                        }

                    }
                }
                $('.cpyCompanyUl').html(cypCompanyLi);
                toUnbindEvent();
            }
        }
    });
}

$('.cpyCompanyUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option')).attr('data-cpyNumber', $(this).attr('data-cpyNumber'));
});

function levelListCallback(req) {
    var data = req.dataObject;
    var listTr = "";
    var typeAry = {'0': '否', '1': '是'};
    for (var i = 0; i < data.length; i++) {
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].levelId + '" data-cpyId="' + data[i].cpyId + '"/>'
        + '</td><td class="cpyCompanyName">' + data[i].cpyCompanyname
        + '</td><td class="levelSeq">' + data[i].levelSeq
        + '</td><td class="levelName">' + data[i].levelName
        + '</td><td class="isDefault">' + typeAry[data[i].isDefault]
        + '</td></tr>';
    }
    $("#myTbogy").html(listTr);
}

$("body").off("click", ".modifyLevel").on('click', ".modifyLevel", function () {
    window.location.href = "modifyLevel.html?levelId=" + $(this).attr('data-levelId');
});

$('#addLevel').on('click', function () {
    window.location.href = "add_level.html";
});

//点击删除
$("body").off("click", "#delLevel").on("click", "#delLevel", function () {
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
    ids = ids.substring(0, ids.length - 1);
    if (!ids) {
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '160px'],//宽高
            content: '请选择要删除的等级',
            time: 3000,
            btn: ["确定"]
        });
    } else {
        $.ajax({
            type: "post",
            url: basePath + delLevelUrl,
            async: true,
            data: {
                levelId: ids
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
                        yes: function(index,layero){
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

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        levelListSearch();
    }
});
//全选按钮单个控制
$('body').on('click', 'input[name=ids]', function () {
    var flag = $(this).prop('checked');
    if (flag == true) {
        $(this).parents('td').parents('tr').siblings().find('input[name=ids]').prop('checked', false).attr('disabled', true);
    } else {
        $(this).parents('td').parents('tr').siblings().find('input[name=ids]').attr('disabled', false);
    }

})

// 设置默认
$("body").off("click", "#setDefaultBtn").on("click", "#setDefaultBtn", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: '确定设置为默认等级吗？',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSetDefaultLevel();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
});

function toSetDefaultLevel() {
    var ids = '';
    var cpyIds='';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            ids += $(this).attr('value') + ',';
            cpyIds += $(this).attr('data-cpyId') + ',';
        }
    });
    ids = ids.substring(0, ids.length - 1);
    cpyIds = cpyIds.substring(0, cpyIds.length - 1);
    if (!ids) {
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '160px'],//宽高
            content: '请选择要设置的等级',
            time: 3000,
            btn: ["确定"]
        });
    } else {
        $.ajax({
            type: "post",
            url: basePath + setLevelDefaultUrl,
            async: true,
            data: {
                levelId: ids,
                cpyId:cpyIds
            },
            success: function (data) {
                if (data.success == true) {
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: data.msg,
                        btn: ["确定"],
                        yes: function(index,layero){
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
