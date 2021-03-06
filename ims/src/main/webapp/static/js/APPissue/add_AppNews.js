//标题内容提示
$('#newsInfoName').on('blur',function(){
    $('#newsInfoNameTip').html('');
    var newsInfoName = $(this).val();
    if(!newsInfoName){
        $('#newsInfoNameTip').html('请输入标题，最多64个字');
        $('#newsInfoName').val('');
    }else if(newsInfoName.length>64){
        $('#newsInfoNameTip').html('标题长度有误，请重新输入标题，最多64个字');
        $('#newsInfoName').val('');
    }
})
//链接
$('#newsInfoUrl').on('blur',function(){
    $('#newsInfoUrlTip').html('');
    var newsInfoUrl = $(this).val();
    var reg=/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;

    if(!newsInfoUrl){
        $('#newsInfoUrlTip').html('请输入链接');
        $('#newsInfoUrl').val('');
    }else if(!reg.test(newsInfoUrl)){
        $('#newsInfoUrlTip').html('链接有误，请重新输入正确的链接');
        $('#newsInfoUrl').val('');
    }
})
$('#newsInfoUrl').on('focus',function(){
    layer.tips('能识别带有http、https的网址', '#newsInfoUrl', {
        tips: 4
    });
})

//提交
$('#saveBtn').click(function () {
    $('#fileNameTip').html('');
    $('#newsInfoNameTip').html('');
    $('#newsInfoUrlTip').html('');
    var fileName = $('#file').val();
    var newsInfoName = $('#newsInfoName').val();
    var newsInfoUrl = $('#newsInfoUrl').val();
    if(!fileName){
        $('#fileNameTip').html('请选择需要上传的文件！');
        return false;
    }
    if(!newsInfoName){
        $('#newsInfoNameTip').html('请输入标题，最多64个字');
        $('#newsInfoName').focus();
        return false;
    }
    if(!newsInfoUrl){
        $('#newsInfoUrlTip').html('请输入链接');
        $('#newsInfoUrl').focus();
        return false;
    }
    toSaveNewsInfo()
})

function toSaveNewsInfo(){
    var formData = new FormData();
    var newsInfoNameValue=$('#newsInfoName').val();
    var newsInfoUrlValue=$('#newsInfoUrl').val();

    formData.append('newsInfoName',newsInfoNameValue);
    formData.append('newsInfoUrl',newsInfoUrlValue);
    formData.append("file", $('#file')[0].files[0]);
    var index =layer.load(1);
    $.ajax({
        url: basePath + addNewsInfoUrl,
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata){
            if(returndata.success==true){
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '180px'],//宽高
                    content: "保存成功！",
                    btn: ["确定"],
                    yes:function(index,layero){
                        window.location.href='AppNewsList.html';
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href='AppNewsList.html';
                    }
                });
            }else{
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '180px'],//宽高
                    content: returndata.msg,
                    time:2000,
                    btn: ["确定"]
                });
            }

        }
    });
}

$('#file').change(function(){
    $('#fileListUl').html($(this).val());
})

//返回
$('#goCancel').on('click', function () {
    window.location.href = 'AppNewsList.html';
})