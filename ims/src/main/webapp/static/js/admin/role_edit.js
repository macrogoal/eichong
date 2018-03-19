var roleId = getUrlParam('roleId');
toLoadRoleInfoById();
function toLoadRoleInfoById() {
    $.ajax({
        type: "post",
        url: basePath + getRoleByIdUrl,
        async: true,
        data: {
            roleId: roleId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                var roleName = data.roleName;
                $('#roleName').val(roleName);

            }
        }
    });
}
var setting = {
    check: {
        enable: true,
        chkboxType: {"Y": "ps", "N": "s"}
    },
    data: {
        simpleData: {
            enable: true
        },
        key: {
            checked: "isSelected",
            children: "menuList",
            name: "contents"

        }
    }
};

$(document).ready(function () {
    var zNodes = "";
    getZNodes();
    function getZNodes() {
        $.ajax({
            type: "post",
            url: basePath + getMeunTreeUrl,
            data: {
                roleId: roleId
            },
            async: true,
            success: function (req) {
                if (req.success == true) {
                    zNodes = req.dataObject;
                    isSelected = zNodes.isSelected;
                    if (isSelected == '1') {
                        zNodes.isSelected = true;
                    }
                    var a = zNodes.menuList;
                    for (var i = 0; i < a.length; i++) {
                        isSelected = a[i].isSelected;
                        if (isSelected == '1') {
                            a[i].isSelected = true;
                        }
                        var b = a[i].menuList;
                        for (var z = 0; z < b.length; z++) {
                            isSelected = b[z].isSelected;
                            if (isSelected == '1') {
                                b[z].isSelected = true;
                            }
                            var c = b[z].menuList;
                            for (var m = 0; m < c.length; m++) {
                                isSelected = c[m].isSelected;
                                if (isSelected == '1') {
                                    c[m].isSelected = true;
                                }
                            }
                        }
                    }
                    zNodes.open = true;
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                }
            }
        });
    }

    $('#submit').click(function () {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getCheckedNodes(true);
        var menuIds = "";
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].menuId != '') {
                menuIds += nodes[i].menuId + ",";
            }
        }
        menuIds = menuIds.substring(0, menuIds.length - 1);
        //console.log(menuIds)
        modifyRole(menuIds);
    });

    //角色编辑
    function modifyRole(menuIds) {
        var roleNameValue = $('input[name=roleName]').val();
        if (roleNameValue == "") {
            $('input[name=roleName]').focus();
            $('input[name=roleName]').attr('placeholder', '请填写角色名称');
            return;
        }
        $.ajax({
            type: "post",
            url: basePath + modifyRoleUrl,
            async: true,
            data: {
                roleId: roleId,
                roleName: roleNameValue,
                menuIds: menuIds
            },
            success: function (req) {
                if (req.success == true) {
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: req.msg,
                        btn: ["确定"],
                        yes: function (index, layero) {
                            layer.closeAll();
                            window.location.href = 'role_list.html';
                        },
                        cancel: function (index, layero) {
                            layer.closeAll();
                            window.location.href = 'role_list.html';
                        }
                    });
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

                } else {
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:center"],
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
    }
});
$('#goback').click(function () {
    window.location.href = 'role_list.html';
});


