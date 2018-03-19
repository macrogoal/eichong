var carCompanyId = getUrlParam('carCompanyId');

setTimeout("loadCarCompany()", 100);
function loadCarCompany() {
    $.ajax({
        type: "post",
        url: basePath + getCarCompanyUrl,
        async: true,
        data: {
            carCompanyId: carCompanyId
        },
        success: function (data) {
            $("#name").val(data.dataObject.name);
            $('#remark').val(data.dataObject.remark);
            $('#carCompanyId').val(data.dataObject.id);
        }
    });
}

//修改电桩制造商校验
$('body').off('blur', '#name').on('blur', '#name', function () {
    checkName($('#name').val());
});

$('body').off('blur', '#remark').on('blur', '#remark', function () {
    checkRemark($('#remark').val());
});

function checkName(name) {
    if (!name) {
        $('#nameTip').html('电桩制造商名称不能为空');
        return false;
    }

    $('#nameTip').html('');
    return true;
}

function checkRemark(remark) {
    if (!remark) {
        $('#remarkTip').html('制造商标识不能为空');
        return false;
    }

    $('#remarkTip').html('');
    return true;
}


//将数据提交到后台处理
function modifyCarCompany() {
    var name = $('#name').val();
    var remark = $('#remark').val();
    var carCompanyId = $('#carCompanyId').val();
    if (!checkName(name) || !checkRemark(remark)) {
        return;
    }

    var obj = {
        id: carCompanyId,
        name: name,
        remark: remark
    };
    $.ajax({
        type: "post",
        url: basePath + modifyCarCompanyUrl,
        async: true,
        data: obj,
        success: function (data) {
            if (data.success == true) {
                window.location.href = 'carCompany.html';
            } else if(data.status == 9001) {
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
                    yes:function(index,layero){
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    },
                    cancel:function(index,layero){
                        layer.closeAll();
                        window.top.location.href = basePath + toLoginUrl;
                    }
                });

            }else {
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

$('#goback').on('click', function () {
    window.location.href = 'carCompany.html';
});
