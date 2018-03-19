var cpyId = getUrlParam('cpyId');
var cpyName = getUrlParam('cpyName');
$('#slaveCpyIdCode').html(cpyName);
$('#slaveCpyIdCode').attr('data-value', cpyId);
toGiveHiddenInput();
//获取公司列表的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['公司列表'];
$(function () {
    ctrlMenu(menuId);
    setTimeout('companyListSearch()', 150);
    setTimeout("toLoadProvince('','#provinceCode','.provinceUl','toUnbindEvent')", 250);
    setTimeout("toLoadSlaveCpyId()", 350);
});

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
                    if (contents.indexOf('禁用') > -1) {
                        $('#disabledCompanyBtn').show();
                    }
                    if (contents.indexOf('新建') > -1) {
                        $('#addCompany').show();
                    }
                    if (contents.indexOf('导出') > -1) {
                        $('#companyDataExport').show();
                    }

                }
            }
        }
    });
}

//去加载表格的数据

function companyListSearch() {
    toGiveHiddenInput();
    initTable("companyListForm", "companyListPage", getCompanyListPageUrl, companyListCallback);
}

//下拉选项
toUnbindEvent();
function toUnbindEvent() {
    $('.companyTypeBlock').unbind();
    $('.provinceBlock').unbind();
    $('.cityBlock').unbind();
    $('.manageCompanyBlock').unbind();
    $('.payTypeBlock').unbind();
    selectModel();
}
//表格数据
function companyListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        var companyArr = [];
        for (var j = 0; j < data.length; j++) {
            companyArr.push(data[i].cpyName);
        }

        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].cpyId + '"/></td>'
            + '<td class="companyList_cpyNumber"><a class="companyHome" onclick="return false" href="' + basePath + '/static/html/companyList/company_home.html?cpyId=' + data[i].cpyId + '&accountId=' + data[i].accountId + '&cpyNumber=' + data[i].cpyNumber + '&cpyName=' + data[i].cpyName + '&savingAccountId=' + data[i].savingAccountId + '">' + data[i].cpyNumber + '</a>'
            + '</td><td class="companyList_cpyName"><a class="companyHome" onclick="return false" href="' + basePath + '/static/html/companyList/company_home.html?cpyId=' + data[i].cpyId + '&accountId=' + data[i].accountId + '&cpyNumber=' + data[i].cpyNumber + '&cpyName=' + data[i].cpyName + '&savingAccountId=' + data[i].savingAccountId + '">' + data[i].cpyName + '</a>'
            + '</td><td class="companyList_cpyCity">' + data[i].cpyCity
            + '</td><td class="companyList_cpyType">' + data[i].cpyTypeText
            + '</td><td class="companyList_isValidText">' + data[i].isValidText
            + '</td><td class="companyList_payRule">' + data[i].payRuleText
            + '</td><td class="companyList_cpyParentName">' + data[i].cpyParentName
            + '</td><td class="companyList_slaveCpyName">' + data[i].slaveCpyName
            + '</td></tr>';
    }
    $("#myCompanyTb").html(listTr);
}
newTab(".companyHome", "公司主页");
//新增公司
$('#addCompany').on('click', function () {
    window.location.href = "add_company.html";
});

//点击禁用
$("body").off("click", "#disabledCompanyBtn").on("click", "#disabledCompanyBtn", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: $('.disabledContentCompany'),
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSubmitDisAbleCompany();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });


});
function toSubmitDisAbleCompany() {
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
            url: basePath + disableCompanyUrl,
            async: true,
            data: {
                cpyId: ids,
                type: 1
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
                        content: '禁用成功',
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
    var provinceCodeValue = $('#provinceCode').attr('data-value');
    var cityCodeValue = $('#cityCode').attr('data-value');
    var companyTypeValue = $('#companyType').attr('data-value');
    var manageCompanyValue = $('#slaveCpyIdCode').attr('data-value');
    var payRuleValue = $('#payRule').attr('data-value');
    if (provinceCodeValue == "") {
        $('input[name=cpyProvince]').val('');
    } else {
        $('input[name=cpyProvince]').val(provinceCodeValue);
    }
    if (cityCodeValue == "") {
        $('input[name=cpyCity]').val('');
    } else {
        $('input[name=cpyCity]').val(cityCodeValue);
    }
    if (companyTypeValue == "") {
        $('input[name=cpyType]').val('');
    } else {
        $('input[name=cpyType]').val(companyTypeValue);
    }
    if (manageCompanyValue == "") {
        $('input[name=slaveCpyId]').val('');
    } else {
        $('input[name=slaveCpyId]').val(manageCompanyValue);
    }
    if (payRuleValue == "") {
        $('input[name=payRule]').val('');
    } else {
        $('input[name=payRule]').val(payRuleValue);
    }
}
//公司的类别
$('.companyTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//公司的付费策略
$('.payRuleUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//城市筛选部分=======
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

//管理单位列表加载
function toLoadSlaveCpyId() {
    $.ajax({
        type: "post",
        url: basePath + initInvestCompanyListUrl,
        async: true,
        success: function (data) {
            if (data.success == true) {
                var dataModule = data.dataObject;
                var toLoadSlaveCpyIdLi = '<li data-option="" class="data-selected">请选择</li>';
                for (var i = 0; i < dataModule.length; i++) {
                    toLoadSlaveCpyIdLi += '<li data-option="' + dataModule[i].cpyId + '">' + dataModule[i].cpyName + '</li>';
                }
                $('.slaveCpyIdCodeUl').html(toLoadSlaveCpyIdLi);
                toUnbindEvent();
            }
        }
    });
}

//管理单位筛选部分

$('.slaveCpyIdCodeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})

//监听回车键
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        companyListSearch();
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
//数据导出	=====================
$('#companyDataExport').on("click", function () {
    toGiveHiddenInput();
    var obj = {
        cpyNumber: $('input[name=cpyNumber]').val(),
        cpyName: $('input[name=cpyName]').val(),
        cpyType: $('input[name=cpyType]').val(),
        cpyProvince: $('input[name=cpyProvince]').val(),
        cpyCity: $('input[name=cpyCity]').val(),
        slaveCpyId: $('input[name=slaveCpyId]').val()
    };

    window.location.href = basePath + exportCompanyUrl + '?cpyNumber='
        + obj.cpyNumber + '&cpyName='
        + obj.cpyName + '&cpyType='
        + obj.cpyType + '&cpyProvince='
        + obj.cpyProvince + '&cpyCity='
        + obj.cpyCity + '&slaveCpyId='
        + obj.slaveCpyId;
});