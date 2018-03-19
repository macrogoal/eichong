var concentratorId = getUrlParam('concentratorId');
//获取集中器主页的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var menuId = getCurruntMap['集中器主页'];
$(function () {
    ctrlMenu(menuId);
    setTimeout("getConcentratorInfo()", 100);
    //加载对应的集中器下面的电桩
    setTimeout("getBindElectricPileInfo()", 200);
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
                    if (contents.indexOf('编辑') > -1) {
                        $('#editBtn').show();
                    }
                }
            }


        }
    });
}
function getConcentratorInfo() {
    $.ajax({
        type: "post",
        url: basePath + getConcentratorInfoByIdUrl,
        async: true,
        data: {
            concentratorId: concentratorId
        },
        success: function (req) {
            console.log(req)
            var data = req.dataObject;
            var concentratorName = data.concentratorName;//集中器名称
            var state = data.state;//集中器状态(0：离线,1：上线 2：无效)
            $('#concentratorName').html(concentratorName);
            $('#state').html(state);

        }
    });
}
//点击编辑
$('#editBtn').on('click', function () {
    window.location.href = 'concentrator_edit.html?concentratorId=' + concentratorId;
})
//点击返回
$('#toPileList').on('click', function () {
    window.history.back();
})
//加载绑定电桩列表
function getBindElectricPileInfo() {
    var index = layer.load(1);
    $.ajax({
        type: "post",
        url: basePath + getAllElectricPileListUrl,
        async: true,
        data: {
            concentratorId: concentratorId
        },
        success: function (req) {
            if (req.success == true) {
                layer.close(index);
                var data = req.dataObject;
                var listTr = "";
                for (var i = 0; i < data.length; i++) {
                    var xuhaoNum = i + 1;
                    listTr += '<tr>'
                    + '<td class="concentratorList_concentratorId">' + xuhaoNum
                    + '</td><td class="concentratorList_code">' + data[i].code
                    + '</td><td class="concentratorList_num">' + data[i].num
                    + '</td><td class="concentratorList_chChargingMethod">' + data[i].chChargingMethod
                    + '</td><td class="concentratorList_chPower">' + data[i].chPower
                    + '</td><td class="concentratorList_type">' + data[i].type
                    + '</td></tr>';
                }
                $("#myTbogy").html(listTr);
            }else if(req.status == 9001) {
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

            }
        }
    });
}
