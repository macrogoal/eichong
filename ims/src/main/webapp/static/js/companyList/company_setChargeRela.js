var cpyId = getUrlParam('cpyId');
//点击取消返回公司主页
$('#goCancel').on('click', function () {
    window.location.href = 'company_home.html?cpyId=' + cpyId;
})
//ztree电桩数据,需要修改参数powerstationId////？？？？？？？？？？？？
var setting = {
    check: {
        enable: true,
        chkboxType: {"Y": "ps", "N": "ps"}
    },
    data: {
        simpleData: {
            enable: true
        },
        key: {
            checked: "isSelected",
            children: "list",
            name: "name"
        }
    }
};
$(document).ready(function () {
    //获取公司名称和默认选择的充电点、充电桩数量
    var setChargeInfo = window.localStorage;
    var companyName = setChargeInfo.getItem("remCompanyName");
    $('#companyNameInfo').html(companyName);
    var siteNumber = setChargeInfo.getItem("remSiteNumber");
    $('#siteNum').html(siteNumber);
    var pileNumber = setChargeInfo.getItem("remPileNumber");
    $('#pileNum').html(pileNumber);
    var zNodes = "";
    getZNodes();
    function getZNodes() {
        var index = layer.load(1);
        $.ajax({
            type: "post",
            url: basePath + getStationAndPileUrl,
            async: true,
            data: {
                cpyId: cpyId
            },
            success: function (req) {
                if (req.success == true) {
                    layer.close(index);
                    zNodes = req.dataObject;
                    var city = zNodes.list;
                    for (var i = 0; i < city.length; i++) {
                        var powerstation = zNodes.list[i].list;
                        var citySelect = zNodes.list[i].isSelected;
                        for (var m = 0; m < powerstation.length; m++) {
                            var pilelist = powerstation[m].list;
                            for (var n = 0; n < pilelist.length; n++) {
                                if (pilelist[n].isSelected == true) {
                                    powerstation[m].isSelected = true;
                                }
                            }
                        }
                    }
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                } else if (req.status == 9001) {
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
                        area: ['310px', '160px'],//宽高
                        content: req.msg,
                        time: 3000,
                        btn: ["确定"]
                    });
                }
            }
        });
    };
//点击统计充电点、充电桩数量
    $("body").off("click", ".chk").on("click", ".chk", function () {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes(true);
        var objArrPiles = [];
        var objArrP = [];
        var objBrrSites = [];
        var objBrrS = [];
        for (var i = 0; i < nodes.length; i++) {
            var powerStationId = nodes[i].powerStationId;
            var siteNumber = nodes[i].powerstationId;
            var electricPileCode = nodes[i].code;
            var electricPileId = nodes[i].id;
            var pileInfo = {
                powerStationId: powerStationId,
                siteNumber: siteNumber,
                electricPileCode: electricPileCode,
                electricPileId: electricPileId
            }
            objArrPiles.push(pileInfo);
            objBrrSites.push(pileInfo);
        }
        for (var i = 0; i < objArrPiles.length; i++) {
            if (objArrPiles[i].powerStationId) {
                objArrP.push(objArrPiles[i]);
            }
        }
        for (var j = 0; j < objBrrSites.length; j++) {
            if (objBrrSites[j].siteNumber) {
                objBrrS.push(objBrrSites[i]);
            }
        }
        $('#pileNum').html(objArrP.length);
        $('#siteNum').html(objBrrS.length);
    })
//点击保存上传数据
    $('#saveBtn').click(function () {
        layer.closeAll();
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '180px'],//宽高
            content: $(".setChargeLayer"),
            btn: ["确定"],
            yes: function (index, layero) {
                layer.closeAll();
                setCharge();
            },
            cancel: function (index, layero) {
                layer.closeAll();
                setCharge();
            }
        });
    })
    function setCharge() {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes(true);
        var objArrPiles = [];
        var objArrP = [];
        for (var i = 0; i < nodes.length; i++) {
            var powerStationId = nodes[i].powerStationId;
            var electricPileCode = nodes[i].code;
            var electricPileId = nodes[i].id;
            var pileInfo = {
                powerStationId: powerStationId,
                electricPileCode: electricPileCode,
                electricPileId: electricPileId
            }
            objArrPiles.push(pileInfo);
        }
        for (var i = 0; i < objArrPiles.length; i++) {
            if (objArrPiles[i].powerStationId) {
                objArrP.push(objArrPiles[i]);
            }
        }
        //去掉电桩为空，不能提交的限制
       /* if (objArrP.length == 0) {
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 2,
                area: ['310px', '180px'],//宽高
                content: "您选择的充电桩为空，请重新选择充电桩",
                btn: ["确定"]
            });
        } else {

        }*/
        var param = {
            cpyId: cpyId,
            relaList: objArrP
        };
        var index = layer.load(1);
        $.ajax({
            type: "post",
            url: basePath + companyChargeRelaUrl,
            async: true,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(param),
            success: function (req) {
                if (req.success == true) {
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '180px'],//宽高
                        content: "保存成功",
                        btn: ["确定"],
                        yes: function (index, layero) {
                            window.location.href = 'company_home.html?cpyId=' + cpyId;
                        },
                        cancel: function (index, layero) {
                            layer.closeAll();
                            window.location.href = 'company_home.html?cpyId=' + cpyId;
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
                        content: req.msg,
                        time: 2000,
                        btn: ["确定"]
                    });
                }

            }
        });
    }

});
