//下拉选项
$(function () {
    toUnbindEvent();
    loadVerNumber();
})

function toUnbindEvent() {
    $('.versTypeBlock').unbind();
    $('.isAutoUpdateBlock').unbind();
    selectModel();
}
//app类型
$('.versTypeUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    loadVerNumber();
})
//是否强制
$('.isAutoUpdateUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
//刚一进页面就要执行的所有验证
$('#goback').on('click', function () {
    window.location.href = 'androidUpdate_list.html';
});
//一进去页面就要加载序号
function loadVerNumber() {
    $.ajax({
        type: "post",
        url: basePath + getMaxVersionNumUrl,
        async: true,
        data:{
            versType:$('#versTypeHtml').attr('data-value')
        },
        success: function (data) {
            if (data.success == true) {
                var maxVerNumber = parseInt(data.dataObject) + 1;
                $('input[name=versNumber]').val(maxVerNumber);
            } else if (data.status == 9001) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '会话超时，请重新登陆！',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    }
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:center"],
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
//验证序号必须为纯数字并不为空

function testVerNumber() {
    var versNumberValue = $('input[name=versNumber]').val();
    var reg = /^[0-9]*$/;
    if (versNumberValue == '') {
        $('input[name=versNumber]').focus();
        $('#verNumTip').html('序号不能为空');
        return false;
    } else if (!reg.test(versNumberValue)) {
        $('input[name=versNumber]').focus();
        $('#verNumTip').html('序号必须是纯数字');
        return false;
    } else {
        $('#verNumTip').html('');
        return true;
    }
    return true;
}
//版本描述不能为空
function testVerRemark() {
    var versRemarkValue = $('input[name=versRemark]').val();
    if (versRemarkValue == '') {
        $('input[name=versRemark]').focus();
        $('#versRemarkTip').html('版本描述不能为空');
        return false;
    } else if (versRemarkValue.length > 150) {
        $('input[name=versRemark]').focus();
        $('#versRemarkTip').html('版本描述不能超过150字');
        return false;
    } else {
        $('#versRemarkTip').html('');
        return true;
    }
    return true;
}

//执行保存
function toSaveUpdateInfo() {
    if (testVerNumber() && testVerRemark()) {
        var obj = {
            versType: $('#versTypeHtml').attr('data-value'),
            versNumber: $('input[name=versNumber]').val(),
            versRemark: $('input[name=versRemark]').val(),
            isAutoUpdate: $('#isAutoUpdateHtml').attr('data-value')
        };
        submitUpdateInfo(obj);
    }
}
function submitUpdateInfo(obj) {
    $.ajax({
        type: "post",
        url: basePath + addVersionUrl,
        async: true,
        data: obj,
        success: function (data) {
            if (data.success == true) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:center"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 3000,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        window.location.href = 'androidUpdate_list.html';
                    }
                });
            } else if (data.status == 9001) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '会话超时，请重新登陆！',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    }
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:center"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                    }
                });

            }
        }
    });
}