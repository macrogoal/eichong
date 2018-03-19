var index=layer.load(1);
var electricPileId = getUrlParam('electricPileId');
//获取电桩主页的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['电桩主页'];
$(function () {
    ctrlMenu(menuId);
    //拿到electricPileId，查看单个电桩详情
    setTimeout("getElectricDetail()", 100);
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
            layer.closeAll();
            var data = req.dataObject;
            if(data==null){
                return;
            }
            if (data.length == 0) {
                return;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var contents = data[i].contents;
                    if (contents.indexOf('编辑') > -1) {
                        $('#editBtn').show();
                    }
                    if (contents.indexOf('电桩基础属性') > -1) {
                        $('#electricPileBaseParm').show();
                    }
                    if (contents.indexOf('电桩地域属性') > -1) {
                        $('#electricPileAreaBlock').show();
                    }
                    if (contents.indexOf('电桩运营属性') > -1) {
                        $('#electricYUBlock').show();
                    }
                }
            }


        }
    });
}


function getElectricDetail() {
    $.ajax({
        type: "post",
        url: basePath + getElectricDetailUrl,
        async: true,
        data: {
            electricPileId: electricPileId
        },
        success: function (data) {
            $('#code').html(data.code);
            $('#chChargingMethod').html(data.chChargingMethod);
            $('#chPower').html(data.chPower);
            $('#ownerShip').html(data.company);
            $('#productModel').html(data.productModel);
            $('#company').html(data.company);
            $('#province').html(data.province);
            $('#area').html(data.area);
            $('#longitude').html(data.longitude);
            $('#muzzleNumber').html(data.muzzleNumber);
            $('#simName').html(data.simName);
            $('#maxVoltage').html(data.maxVoltage);
            //创建时间
            var gmtCreate = data.gmtCreate.time;
            var dateTime = new Date(gmtCreate).format("yyyy-MM-dd")
            $('#gmtCreate').html(dateTime);

            $('#num').html(data.num);
            $('#chStatus').html(data.chStatus);
            $('#type').html(data.type);
            $('#pileMaker').html(data.pileMaker);
            //$('#rateInformationId').html(data.rateInformationId);
            window.localStorage.setItem('rateInformationId',data.rateInformationId);
            toRateList();
            $('#city').html(data.city);
            $('#address').html(data.address);
            $('#latitude').html(data.latitude);
            $('#interfaceStandard').html(data.interfaceStandard);
            $('#simMac').html(data.simMac);
            $('#maxElectricity').html(data.maxElectricity);
            $('#remark').html(data.remark);

        }
    });

}
//点击编辑按钮，获取单个电桩详情electricPileId
$('body').on('click', '#editBtn', function () {
    window.location.href = 'electricPile_edit.html?electricPileId=' + electricPileId;
})
//返回电桩列表页面
$('body').on('click', '#toPileList', function () {
    window.history.back();
})
//点击费率跳转到费率列表
function toRateList(){
    //费率值
    newTab(".toScanFinRelaBtn", "费率列表");
    var rateInformationId=window.localStorage.getItem('rateInformationId');
    var rateInformationIdTag='<a class="toScanFinRelaBtn" onclick="return false;"  href="'+basePath+'/static/html/config/rateInfo.html?rateInformationId='+rateInformationId+'">'+rateInformationId+'</a>';
    $('#rateInformationId').html(rateInformationIdTag);
}