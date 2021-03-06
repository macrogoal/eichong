var pileMakerId = getUrlParam('pileMakerId');

setTimeout("loadPileMaker()", 100);
function loadPileMaker() {
    $.ajax({
        type: "post",
        url: basePath + getPileMakerUrl,
        async: true,
        data: {
            pileMakerId: pileMakerId
        },
        success: function (data) {
            $("#makerName").val(data.dataObject.makerName);
            $('#makerRemark').val(data.dataObject.makerRemark);
            $('#pileMakerId').val(data.dataObject.id);
        }
    });
}

//修改电桩制造商校验
$('body').off('blur', '#makerName').on('blur', '#makerName', function () {
    checkMakerName($('#makerName').val());
});

$('body').off('blur', '#makerRemark').on('blur', '#makerRemark', function () {
    checkMakerRemark($('#makerRemark').val());
});

function checkMakerName(makerName) {
    if (!makerName) {
        $('#makerNameTip').html('电桩制造商不能为空');
        return false;
    }

    $('#makerNameTip').html('');
    return true;
}

function checkMakerRemark(makerRemark) {
    if (!makerRemark) {
        $('#makerRemarkTip').html('制造商标识不能为空');
        return false;
    }

    $('#makerRemarkTip').html('');
    return true;
}

//将数据提交到后台处理
function modifyPileMaker() {
    var makerName = $('#makerName').val();
    var makerRemark = $('#makerRemark').val();
    var pileMakerId = $('#pileMakerId').val();
    if (!checkMakerName(makerName) || !checkMakerRemark(makerRemark)) {
        return;
    }

    var obj = {
        id: pileMakerId,
        makerName: makerName,
        makerRemark: makerRemark
    };
    $.ajax({
        type: "post",
        url: basePath + modifyPileMakerUrl,
        async: true,
        data: obj,
        success: function (data) {
            if (data.success == true) {
                window.location.href = 'pileMaker.html';
            }else if(data.status == 9001) {
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

$('#goback').on('click', function () {
    window.location.href = 'pileMaker.html';
});
