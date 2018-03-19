var pkBannerId =getUrlParam('pkBannerId');
setTimeout('getAppBannerInfo()',200);
function getAppBannerInfo() {
    var timestamp = Date.parse(new Date());
    $.ajax({
        type: "post",
        url: basePath + getBannerByIdUrl,
        async: true,
        data: {
            pkBannerId: pkBannerId,
            _:timestamp
        },
        success: function (req) {
            var data = req.dataObject;
            toLoadProvince(data.bannerProvinceCode, '#bannerProvinceCode', '.provinceUl', 'toUnbindEvent');
            toLoadCity(data.bannerProvinceCode, data.bannerCityCode, '#bannerCityCode', '.cityUl', 'toUnbindEvent');
            $('#fileListUl').html(data.buttonPicFileId);
            $('#bannerUrl').val(data.bannerUrl);
            $('#bannerProvinceCode').attr('data-value',data.bannerProvinceCode);
            $('#bannerProvinceCode').html(data.bannerProvinceCode);
            $('#bannerCityCode').attr('data-value',data.bannerCityCode);
            $('#bannerCityCode').html(data.bannerCityCode);
            $('#actBegindate_f1').val(data.bannerBeginTime);
            $('#actEnddate_f1').val(data.bannerEndTime);
            $('#bannerDesc').val(data.bannerDesc);
            $('.pic').attr('src',data.bannerPicUrl);
        }
    });
}

toUnbindEvent();
function toUnbindEvent() {
    $('.provinceBlock').unbind();
    $('.cityBlock').unbind();
    selectModel();
}
//省市选择
setTimeout("toLoadProvince('','#bannerProvinceCode','.provinceUl','toUnbindEvent')", 250);
$('.provinceUl').on("click", "li", function () {
    $('#bannerCityCode').attr('data-value', '');
    $('#bannerCityCode').html('请选择');
    $('input[name=bannerCityCode]').val('');
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    var flag = $(this).attr('data-option');
    if (flag == "") {
        $('#bannerProvinceCode').html('请选择');
        $('#bannerProvinceCode').attr('data-value', '');
        $('#bannerCityCode').html('请选择');
        $('#bannerCityCode').attr('data-value', '');
        $('.cityUl').html('');
        $('input[name=bannerCityCode]').val('');
    } else {
        toLoadCity(provinceCodeId, '', '#bannerCityCode', '.cityUl', 'toUnbindEvent');
    }
})
$('.cityUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
});

//链接
$('#bannerUrl').on('blur',function(){
    $('#bannerUrlTip').html('');
    var bannerUrl = $(this).val();
    var reg=/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;

    if(!bannerUrl){
        $('#bannerUrlTip').html('请输入链接');
        $('#bannerUrl').val('');
    }else if(!reg.test(bannerUrl)){
        $('#bannerUrlTip').html('链接有误，请重新输入正确的链接');
        $('#bannerUrl').val('');
    }
})
$('#bannerUrl').on('focus',function(){
    layer.tips('能识别带有http、https的网址', '#bannerUrl', {
        tips: 4
    });
});
//返回
$('#goCancel').on('click', function () {
    window.location.href = "AppBannerList.html";
});

//保存
function saveInfo(){
    $('#fileNameTip').html('');
    $('#bannerUrlTip').html('');
    $('#cityTip').html('');
    $('#actBegindatesTip').html('');
    $('#actEnddatesTip').html('');
    $('#messageInfoContentTip').html('');
    var bannerUrlValue = $('#bannerUrl').val();
    var cityValue = $('#bannerCityCode').attr('data-value');
    var bannerBeginTimeValue = $('input[name=bannerBeginTime]').val();
    var bannerEndTimeValue = $('input[name=bannerEndTime]').val();
    var bannerDescHtml = $('#bannerDesc').val();

    if(!bannerUrlValue){
        $('#bannerUrlTip').html('请输入Url');
        return false;
    }
    if(!cityValue){
        $('#cityTip').html('请选择城市！');
        return false;
    }
    if(!bannerBeginTimeValue){
        $('#actBegindatesTip').html('请选择开始时间');
        return false;
    }
    if(!bannerEndTimeValue){
        $('#actEnddatesTip').html('请选择结束时间');
        return false;
    }
    if(!bannerDescHtml){
        $('#bannerDescTip').html('请填写备注');
        return false;
    }
    toSetForm()
}
//需要上传参数的名字？？
function toSetForm(){
    var formData = new FormData();
    var fileName = $('#file').val();
    var bannerUrlValue = $('#bannerUrl').val();
    var provinceValue = $('#bannerProvinceCode').attr('data-value');
    var cityValue = $('#bannerCityCode').attr('data-value');
    var bannerBeginTimeValue = $('input[name=bannerBeginTime]').val();
    var bannerEndTimeValue = $('input[name=bannerEndTime]').val();
    var bannerDescHtml = $('#bannerDesc').val();

    formData.append('bannerUrl',bannerUrlValue);
    formData.append('bannerProvinceCode',provinceValue);
    formData.append('bannerCityCode',cityValue);
    formData.append('bannerBeginTime',bannerBeginTimeValue);
    formData.append('bannerEndTime',bannerEndTimeValue);
    formData.append('bannerDesc',bannerDescHtml);
    formData.append('pkBannerId',pkBannerId);
    if(!fileName){
        formData.append("file", '');
    }else{
        formData.append("file", $('#file')[0].files[0]);
    }
    commonLoad(formData);
}
function commonLoad(formData){
    $.ajax({
        url: basePath + editBannerUrl,
        type: 'POST',
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
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
                        window.location.href='AppBannerList.html';
                    },
                    cancel: function (index, layero) {
                        layer.closeAll();
                        window.location.href='AppBannerList.html';
                    }
                });
            }else if (returndata.status == 9001) {
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