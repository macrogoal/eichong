var userId = getUrlParam('userId');
var cpyType = getUrlParam('cpyType');
//获取用户主页的menuId
var getMenuMap = window.localStorage.getItem('menuMap');
var getCurruntMap = JSON.parse(getMenuMap);
var homeMenuId = getCurruntMap['用户主页'];
//设置等级时候使用 传cpyId
var user_cpyId = getUrlParam('cpyId');
var index = layer.load(1);
$(function () {
    ctrlMenuBtn(homeMenuId);
    setTimeout("loadUserIndex()", 100);
    setTimeout('loadFaValue()', 200);
    setTimeout('loadCardInfo()', 300);
    setTimeout('getFinAccountUser()', 500);
    //setTimeout('getFinAccountRelation4User()', 400);//资金账户关系不要
    setTimeout('getUserAccount()', 600);
    setTimeout('toGetOrderDetail()', 700);
    setTimeout('loadTagMoule()', 800);
    setTimeout('baseBtnSkan()', 900);
    setTimeout('toBlackWhiteList()', 650);
    setTimeout('getVinInfoByUser()', 1000);
})

//控制用户主页按钮权限
function ctrlMenuBtn(homeMenuId) {
    $.ajax({
        type: "post",
        url: basePath + getSelfButtonTreeUrl,
        async: true,
        data: {
            menuId: homeMenuId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                if (data == null) {
                    return;
                }
                if (data.length == 0) {
                    return;
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var contents = data[i].contents;
                        if (contents.indexOf('概览') > -1) {
                            $('#ctrUserBaseInfo').show();
                        }
                        if (contents.indexOf('充电卡') > -1) {
                            $('#cardBlock').show();
                        }
                        if (contents.indexOf('基本资料') > -1) {
                            $('#detailUserBlock').show();
                        }
                        if (contents.indexOf('优惠券') > -1) {
                            $('#couponBlock').show();
                        }
                        if (contents.indexOf('用户账单') > -1) {
                            $('#userAccountBlock').show();
                        }
                        if (contents.indexOf('资金账户') > -1) {
                            $('#zijinBlock').show();
                        }
                        if (contents.indexOf('订单信息') > -1) {
                            $('#dingdanBlock').show();
                        }
                        if (contents.indexOf('账务关系') > -1) {
                            $('#finRelationBlock').show();
                        }
                        if (contents.indexOf('标签') > -1) {
                            $('#tagBlock').show();
                        }
                        if (contents.indexOf('安全管理') > -1) {
                            $('#safetyBlock').show();
                        }
                        if (contents.indexOf('车辆信息') > -1) {
                            $('#carInfo').show();
                        }
                    }
                }
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
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '系统出错',
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
            }
        }
    });
}


//用户基础数据填充
function loadUserIndex() {
    $.ajax({
        type: "post",
        url: basePath + userIndexUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            var userAccount = data.userAccount;
            var accountId = data.accountId;
            window.localStorage.setItem('accountId_finAccount', accountId);
            window.localStorage.setItem('userAccount_finAccount', userAccount);
            var userBalance = data.userBalance;
            var cpyName = data.cpyName;
            var provinceCode = data.provinceCode;
            var cityCode = data.cityCode;
            window.localStorage.setItem('provinceCode', provinceCode);
            window.localStorage.setItem('cityCode', cityCode);
            var userStatus = data.userStatus;
            var levelName = data.levelName;
            var userStatusText = '';
            if (userStatus == 1) {
                userStatusText = '正常';
            } else if (userStatus == 2) {
                userStatusText = '冻结';
                $('#statusDisableBtn').show();
            } else if (userStatus == 3) {
                userStatusText = '删除';
            }

            $('#userAccount').html(userAccount);
            $('#userBalance').html(userBalance);
            $('#cpyName').html(cpyName);
            $('#userStatus').html(userStatusText);
            $('#levelName').html(levelName);

            var userHeadImgUrl = data.userHeadImgUrl;
            if (userHeadImgUrl == 'aa') {
                $('#runInputPhotoImges').attr('src', '../../img/head.png');
            } else {
                $('#runInputPhotoImges').attr('src', userHeadImgUrl);
            }

//			基本名称块
            var userName = data.userName;
            $('#userName').html(userName);
            var userRealName = data.userRealName;
            $('#userRealName').html(userRealName);
            var userSex = data.userSex;
            var userSexText = '';
            if (userSex == 0) {
                userSexText = '未知';
            } else if (userSex == 1) {
                userSexText = '男';
            } else {
                userSexText = '女';
            }
            $('#userCpySex').html(userSexText);
            var userPhone = data.userPhone;
            $('#userPhone').html(userPhone);
            var userIdCard = data.userIdCard;
            $('#userIdCard').html(userIdCard);
            var userAddress = data.userAddress;
            $('#userAddress').html(userAddress);
            var userCar = data.userCar;
            $('#userCar').html(userCar);
            $('#editUserCar').html(userCar);
            //车牌号
            var normPlateNum = data.normPlateNum;
            $('#plateNum').html(normPlateNum);
            var registeredTime = data.registeredTime;
            if (registeredTime == null) {
                registeredTime = '';
            } else {
                registeredTime = new Date(registeredTime.time).format("yyyy-MM-dd");
            }
            $('#registeredTime').html(registeredTime);
            $('#registerTime').html(registeredTime);
        }
    });
}
//解禁按钮的操作
$('#statusDisableBtn').on("click", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '160px'],//宽高
        content: '解禁后用户状态恢复正常',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toUnfreezeUser();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
})

//解锁按钮的点击操作
$('#nuChainBtn').on("click", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '160px'],//宽高
        content: '解除后，用户可以使用密码登录',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            unBind();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
})

//去解锁用户
function unBind(){
    $.ajax({
        type: "post",
        url: basePath + unbindAdminUrl,
        async: true,
        data: {
            userAccount:$('#userAccount').html()
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
                    content: '解锁成功',
                    time: 2000,
                    btn: ["确定"]
                });
            } else if (data.success == false) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    })
}

//黑白名单跳转
function toBlackWhiteList() {
    var getUserAccount = window.localStorage;
    var userAccount = getUserAccount.getItem("userAccount_finAccount");
    var setBlackWhite = '<a class="heibai" onclick="return false" href="' + basePath + '/static/html/blackWhiteList/blackWhite_list.html?userAccount=' + userAccount + '"><span class="openDisable">设置</span></a>';
    $('#setTd').append(setBlackWhite);
    newTab(".heibai", '黑白名单列表');
}
//去解禁用户
function toUnfreezeUser() {
    $.ajax({
        type: "post",
        url: basePath + unfreezeUserUrl,
        async: true,
        data: {
            userIds: userId
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
                    content: '解禁成功',
                    time: 2000,
                    btn: ["确定"]
                });
                $('#userStatus').html('正常');
                $('#statusDisableBtn').hide();

            } else if (data.success == false) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    });
}
//去加载优惠券的值
function loadFaValue() {
    $.ajax({
        type: "post",
        url: basePath + getCouponInfoByUserIdUrl,
        async: true,
        data: {
            cpUserid: userId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                var totalDiscountAmount = data.totalDiscountAmount;
                var availableCoupon = data.availableCoupon;
                $('#totalDiscountAmount').html(totalDiscountAmount);
                $('#availableCoupon').html(availableCoupon);
            }
        }
    });
}
//设置用户等级
$('#setLevelBtn_user').on('click', function () {
    toLoadLevelList();
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["设置用户等级", "font-size:12px;text-align:center"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '180px'],//宽高
        content: $('#setLevelBlock'),
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            $('#setLevelBlock').hide();
            layer.closeAll();
            toSetLevel();
        },

        btn2: function (index, layero) {
            $('#setLevelBlock').hide();
            layer.closeAll();
        }
    });
})
function toLoadLevelList() {
    $.ajax({
        type: "post",
        url: basePath + getLevelList,
        async: true,
        data: {
            cpyId: user_cpyId
        },
        success: function (data) {
            var levelHtml = ' <option value="">请选择</option>';
            var data = data.dataObject;
            for (var i = 0; i < data.length; i++) {
                levelHtml += '<option value="' + data[i].levelId + '">' + data[i].levelName + '</option>';
            }
            $('#setUserLevel_user').html(levelHtml);
        }

    })
}
//修改保存等级设置
function toSetLevel() {
    var levelId = $('#setUserLevel_user').val();
    if (levelId == "") {
        layer.closeAll();
        return;
    }
    $.ajax({
        type: "post",
        url: basePath + modifyUserLevelUrl,
        async: true,
        data: {
            levelId: levelId,
            userId: userId,
            cpyType: cpyType
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
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
                loadUserIndex();
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }

    })
}
//设置用户等级结束
//安全密码设置
$('#setLoginPassWord').on('click', function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["重置登陆密码", "font-size:12px;text-align:center"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '200px'],//宽高
        content: '重置之后，登录密码为123456',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSetLoginPassword();
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
})
function toSetLoginPassword() {
    $.ajax({
        type: "post",
        url: basePath + resetLoginPasswordUrl,
        async: true,
        data: {
            userIds: userId
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
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    });
}
//设置支付密码
$('#setPayPassword').on('click', function () {
    layer.closeAll();
    var accountId = window.localStorage.getItem('accountId_finAccount');
    layer.open({
        type: 1,
        offset: '100px',
        title: ["重置支付密码", "font-size:12px;text-align:center"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '200px'],//宽高
        content: '重置之后，支付密码为123456',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toSetPayPassword(accountId);
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
});
function toSetPayPassword(accountId) {
    $.ajax({
        type: "post",
        url: basePath + user_resetPayPasswordUrl,
        async: true,
        data: {
            accountId: accountId
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
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    });
}
//去加载卡的信息===============

function loadCardInfo() {
    $.ajax({
        type: "post",
        url: basePath + getUserCardInfoUrl,
        data: {
            ucUserId: userId
        },
        async: true,
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                var userCardLi = '';
                var ucStatus = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ucStatus == 0) {
                        ucStatus = '正常';
                    }
                    if (data[i].ucStatus == 1) {
                        ucStatus = '已挂失';
                    }
                    if (data[i].ucStatus == 2) {
                        ucStatus = '已冻结';
                    }
                    userCardLi += '<li>'
                        + '<span><a class="cardHome" onclick="return false;" data-index="1" href="' + basePath + '/static/html/cardList/card_home.html?ucId=' + data[i].ucId + '&ucUserId=' + data[i].ucUserId + '">' + data[i].ucExternalCardNumber + '</a></span>'
                        + '<span>'
                        + '<span>' + ucStatus + '</span>'
                        + '<span class="leftBorder cardFrozen" data-ucId="' + data[i].ucId + '">冻结</span>'
                        + '<span class="leftBorder relieveCardFrozen" data-ucId="' + data[i].ucId + '">解冻</span>'
                        + '<span class="leftBorder cardLoss" data-ucId="' + data[i].ucId + '">挂失</span>'
                        + '<span class="leftBorder relieveCardLoss" data-ucId="' + data[i].ucId + '">解挂</span>'
                        + '<span class="leftBorder cardCancel" data-ucId="' + data[i].ucId + '">注销</span>'
                        + '</span>'
                        + '</li>';
                }
                $('.userCardList').html(userCardLi);
            }

        }
    })
}
//点击卡信息，进入卡主页
newTab('.cardHome', '卡主页');
//去冻结

$('body').off('click', '.cardFrozen').on('click', '.cardFrozen', function () {
    toShowComfirm(this, cardFrozenUrl);
})
//去解冻
$('body').off('click', '.relieveCardFrozen').on('click', '.relieveCardFrozen', function () {
    toShowComfirm(this, relieveCardFrozenUrl);
})
//去挂失
$('body').off('click', '.cardLoss').on('click', '.cardLoss', function () {
    toShowComfirm(this, cardLossUrl);
})
//去解挂
$('body').off('click', '.relieveCardLoss').on('click', '.relieveCardLoss', function () {
    toShowComfirm(this, relieveCardLossUrl);
})
//去注销
$('body').off('click', '.cardCancel').on('click', '.cardCancel', function () {
    toShowComfirm(this, cardCancelUrl);
})
function toShowComfirm(obj, carStatusUrl) {
    var ucId = $(obj).attr('data-ucId');
    var spanText = $(obj).text();
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["卡" + spanText, "font-size:12px;text-align:center"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '160px'],//宽高
        content: '确定进行卡' + spanText + '吗？',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toChangeStatus(ucId, carStatusUrl, spanText);
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
}
function toChangeStatus(ucId, carStatusUrl, spanText) {
    $.ajax({
        type: "post",
        url: basePath + carStatusUrl,
        data: {
            ucUserId: userId,
            ucId: ucId
        },
        async: true,
        success: function (data) {
            if (data.success == true) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: [spanText, "font-size:12px;text-align:center"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: spanText + '成功',
                    time: 2000,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                    }
                });
                loadCardInfo();

            } else if (data.success == false) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    })
}
//新绑卡
$('#bindCard').on("click", function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["新绑卡", "font-size:12px;text-align:center;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '210px'],//宽高
        content: $('.newBindCard'),
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            $('.newBindCard').hide();
            toBindCard();
        },
        btn2: function (index, layero) {
            layer.closeAll();
            $('.newBindCard').hide();
        }
    });
})
function toBindCard() {
    $.ajax({
        type: "post",
        url: basePath + userBindCardUrl,
        async: true,
        data: {
            userId: userId,
            ucExternalCardNumber: $('input[name=ucExternalCardNumber]').val()
        },
        success: function (data) {
            if (data.success == true) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ['提示', "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '新绑卡成功',
                    time: 2000,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                    }
                });
                loadCardInfo();
                getVinInfoByUser();
                $('input[name=ucExternalCardNumber]').val('');
            } else if (data.success == false) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
                $('input[name=ucExternalCardNumber]').val('');
            }
        }
    });
}
//基本资料编辑模块
function removeBindEvent() {
    $('.sexBlock').unbind();
    $('.provinceBlock').unbind();
    $('.cityBlock').unbind();
    $('.setUserLevelBlock').unbind();
    selectModel();
}
removeBindEvent();
$('.sexUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})
$('#toEditInfo').on("click", function () {
    toLoadDetailText();
    $('#editUserBaseBlock').show();
    $('#detailUserBlock').hide();
})
$('#saveUserBtn').on('click', function () {
    if (testPhoneNumber() && testIdCard()) {
        toModifyUser();
    }
})
//手机号和身份证件号码校验
function testPhoneNumber() {
    var userPhone = $('#editUserPhone');
    var userPhoneValue = $('#editUserPhone').val();
    var rePhone = /^1[3|4|5|7|8|9]{1}[0-9]{9}$/;//手机号验证
    if (!userPhoneValue) {
        userPhone.attr("placeholder", "请输入手机号码");
        $('.userPhoneTest').val('');
        return true;
    }
    if (!rePhone.test(userPhoneValue)) {
        userPhone.attr("placeholder", "您的手机号码格式不对,请重新填写");
        $('.userPhoneTest').val('');
        userPhone.focus();
        return false;
    }
    else if (userPhoneValue.length > 15) {
        userPhone.attr("placeholder", "手机号码不能超过15位");
        $('.userPhoneTest').val('');
        userPhone.focus();
        return false;
    }
    return true;
}
//身份证号码验证
function testIdCard() {
    var userIdcard = $('.userIdcardTest');
    var userIdcardValue = $('.userIdcardTest').val();
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;

    if (!userIdcardValue) {
        userIdcard.attr("placeholder", "请输入身份证号码");
        $('.userIdcardTest').val('');
        return true;
    }
    if (!reg.test(userIdcardValue)) {
        userIdcard.attr("placeholder", "请输入正确格式的身份证号码");
        $('.userIdcardTest').val('');
        userIdcard.focus();
        return false;
    }
    //车牌号验证
    //var plateNum = $('.plateNum');
    //var plateNumValue = $('.plateNum').val();
    //var regCar = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    //if(!regCar.test(plateNumValue)){
    //    plateNum.attr("placeholder", "请输入正确格式的车牌号");
    //    plateNum.focus();
    //    return false;
    //}

    return true;
}
//检验昵称和真实姓名
function testUserName() {
    var userName = $('input[name=userName]').val();
    var userRealName = $('input[name=userRealName]').val();
    if (userName.length > 10) {
        $('input[name=userName]').val('').focus().attr("placeholder", "昵称过长,请重新输入");
        return false;
    }
    if (userRealName.length > 10) {
        $('input[name=userRealName]').val('').focus().attr("placeholder", "姓名过长,请重新输入");
        return false;
    }
    return true;
}
function toModifyUser() {
    if (testUserName()) {
        $.ajax({
            type: "post",
            url: basePath + modifyUserUrl,
            async: true,
            data: {
                userId: userId,
                cpyType: cpyType,
                userName: $('.userName').val(),
                userRealName: $('.userRealName').val(),
                userSex: $('#userSexSelect').attr('data-value'),
                userPhone: $('#editUserPhone').val(),
                userIdcard: $('.userIdcardTest').val(),
                provinceCode: $('#provinceTitle').attr('data-value'),
                cityCode: $('#cityCodeTitle').attr('data-value'),
                normPlateNum:$('.plateNum').val()
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
                        content: data.msg,
                        time: 2000,
                        btn: ["确定"]
                    });
                    loadUserIndex();
                    $('#editUserBaseBlock').hide();
                    $('#detailUserBlock').show();

                } else {
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: data.msg,
                        time: 2000,
                        btn: ["确定"]
                    });
                    $('#editUserBaseBlock').hide();
                    $('#detailUserBlock').show();
                }
            }
        });
    }

}


$('.provinceUl').on("click", "li", function () {
    var provinceCodeId = $(this).attr('data-option');
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
    $('#cityCodeTitle').html('请选择');
    $('.cityUl').html('');
    $('input[name=cityCode]').val('');
    toLoadCity(provinceCodeId, '', '#cityCodeTitle', '.cityUl', 'removeBindEvent');
})
$('.cityUl').on("click", "li", function () {
    $(this).parent().siblings('div.model-select-text').text($(this).text())
        .attr('data-value', $(this).attr('data-option'));
})

//点击编辑的时候加载默认的信息
function toLoadDetailText() {
    var userName = $('#userName').html();
    $('.userName').val(userName);
    var userRealName = $('#userRealName').html();
    $('.userRealName').val(userRealName);
    //车牌号
    var plateNum = $('#plateNum').html();
    $('.plateNum').val(plateNum);


    var userSex = $('#userCpySex').html();
    if (userSex == '男') {
        $('#userSexSelect').attr('data-value', 1);
        $('#userSexSelect').html('男');
    }
    if (userSex == '女') {
        $('#userSexSelect').attr('data-value', 2);
        $('#userSexSelect').html('女');
    }
    if (userSex == '' || userSex == '未知') {
        $('#userSexSelect').attr('data-value', 0);
        $('#userSexSelect').html('未知');
    }

    var userPhone = $('#userPhone').html();
    $('.userPhoneTest').val(userPhone);
    var userIdCard = $('#userIdCard').html();
    $('.userIdcardTest').val(userIdCard);
    //去加载省市
    var provinceCode = window.localStorage.getItem('provinceCode');
    var cityCode = window.localStorage.getItem('cityCode');
    //console.log(provinceCode + "::" + cityCode)
    if (provinceCode == null) {
        provinceCode = '';
    }
    if (cityCode == null) {
        cityCode = '';
    }
    $('#provinceTitle').attr('data-value', provinceCode);
    $('#cityCodeTitle').attr('data-value', cityCode);
    //去加载城市的省
    toLoadProvince(provinceCode, '#provinceTitle', '.provinceUl', 'removeBindEvent');
    toLoadCity(provinceCode, cityCode, '#cityCodeTitle', '.cityUl', 'removeBindEvent');
}
//资金账户模块开始
function getFinAccountUser() {
    $.ajax({
        type: "post",
        url: basePath + getFinAccountUserUrl,
        async: true,
        data: {
            userId: userId,
            cpyType: cpyType
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                for (var i = 0; i < data.length; i++) {
                    var accountNO = data[0].accountNO;
                    var accountBalance = data[0].accountBalance;
                    var tradeType = data[0].tradeType;
                    var accountStatus = data[0].accountStatus;
                    var accountWarn = data[0].accountWarn;
                    var accountPresent = data[0].accountPresent;
                    var accountId = data[0].accountId;
                    var payRule = data[0].payRule;
                    var accountAll = (parseFloat(accountPresent) + parseFloat(accountBalance)).toFixed(2);
                }
                //$('#accountNO').html(accountNO);
                window.localStorage.setItem('userhome_accountNO', accountNO);
                $('#accountBalance').html(accountBalance);
                $('#refundMoney').html(accountBalance);
                $('#accountWarn').html(accountWarn);
                $('#accountPresent').html(accountPresent);
                $('#accountAll').html(accountAll);
                $('input[name=accountId]').val(accountId);

                var tradeTypeHtml = '';
                if (tradeType == 1) {
                    tradeTypeHtml = '信用账户';//后付费
                    $('#accountBalanceLi').hide();
                    $('#accountPresentLi').hide();
                    $('#accountRefundBtn').hide();
                }
                if (tradeType == 2) {
                    tradeTypeHtml = '储蓄账户';//预付费
                    $('#accountBalanceLi').show();
                    $('#accountPresentLi').show();
                    if (payRule == 2) {
                        $('#accountRefundBtn').show();
                    } else {
                        $('#accountRefundBtn').hide();
                    }
                }
                $('#tradeType').html(tradeTypeHtml);
                var accountStatusHtml = '';
                if (accountStatus == 1) {
                    accountStatusHtml = '正常';
                }
                if (accountStatus == 2) {
                    accountStatusHtml = '冻结';
                }
                if (accountStatus == 3) {
                    accountStatusHtml = '删除';
                }
                $('#accountStatus').html(accountStatusHtml);
            }
        }
    });
}

//主页各个查看按钮的操作
function baseBtnSkan() {
    //资金账户
    newTab(".toScanBtn", "资金账户列表");
    var accountId = window.localStorage.getItem('accountId_finAccount');
    var aTag = '<a class="toScanBtn baseInfoBtn" onclick="return false;"  href="' + basePath + '/static/html/finAccount/finAccount_list.html?accountId=' + accountId + '">查看</a>';
    $('#finAccountSkanBtn').html(aTag);

    //订单详情
    newTab(".toScanOrderBtn", "订单列表");
    var userAccount = window.localStorage.getItem('userAccount_finAccount');
    var orderScanTag = '<a class="toScanOrderBtn baseInfoBtn" onclick="return false;"  href="' + basePath + '/static/html/order/order_list.html?userAccount=' + userAccount + '">查看</a>';
    $('#orderSkanBtn').html(orderScanTag);

    //账务关系
    newTab(".toScanFinRelaBtn", "账务关系列表");
    var finRelaScanTag = '<a class="toScanFinRelaBtn baseInfoBtn" onclick="return false;"  href="' + basePath + '/static/html/finAccountRelation/finAccountRelation_list.html?userAccount=' + userAccount + '">查看</a>';
    $('#finRelaSkanBtn').html(finRelaScanTag);

    //优惠券
    newTab(".toScanfavBtn", "优惠券列表");
    var favScanTag = '<a class="toScanfavBtn" onclick="return false;"  href="' + basePath + '/static/html/fav/couponDetail_list.html?userAccount=' + userAccount + '">查看</a>';
    $('#toScanfavBtn').html(favScanTag);

    //账务关系到消费记录列表
    newTab(".toPurchaseHistoryBtn", "消费记录列表");
    var accountNO = window.localStorage.getItem('userhome_accountNO');
    var purchaseHistoryTag = '<a class="toPurchaseHistoryBtn baseInfoBtn" onclick="return false;"  href="' + basePath + '/static/html/purchaseHistory/purchaseHistory_list.html?accountNO=' + accountNO + '">' + accountNO + '</a>';
    $('#accountNO').html(purchaseHistoryTag);
    layer.closeAll();
}
//资金关系
function getFinAccountRelation4User() {
    $.ajax({
        type: "post",
        url: basePath + getFinAccountRelation4UserUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                for (var i = 0; i < data.length; i++) {
                    var accountNumber = data[0].accountNO;
                    var billAccountName = data[0].billAccountName;
                }
                $('#accountNumber').html(accountNumber);
                $('#billAccountName').html(billAccountName);
            }
        }
    });
}
//用户账单
function getUserAccount() {
    $.ajax({
        type: "post",
        url: basePath + getUserAccountUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                var chongzhi = data.chongzhi;
                var dongjie = data.dongjie;
                var xiaofei = data.xiaofei;
                var youhui = data.youhui;
                var yue = data.yue;
                $('#chongzhi').html(chongzhi);
                $('#dongjie').html(dongjie);
                $('#xiaofei').html(xiaofei);
                $('#youhui').html(youhui);
                $('#yue').html(yue);
            }
        }
    });
}
//去获取用户的订单详情
function toGetOrderDetail() {
    $.ajax({
        type: "post",
        url: basePath + getHomeUserOrderUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            //alert(JSON.stringify(data));
            if (data.success == true) {
                var data = data.dataObject;
                for (var key in data) {
                    if (key == 1) {
                        $('#chargeAll').html(data[key]);
                    }

                    if (key == 3) {
                        $('#orderAll').html(data[key]);
                    }
                    if (key == 4) {
                        $('#orderToday').html(data[key]);
                    }
                }
            }
        }
    });
}
//标签模块
$('body').off('click', '#addTagBtn').on('click', '#addTagBtn', function () {
    loadUserTag();
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["新增用户标签", "font-size:12px;text-align:center"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '200px'],//宽高
        content: $('.addTagPop'),
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            $('.addTagPop').hide();
            toAddUserTag();
        },
        cancel: function (index, layero) {
            $('.addTagPop').hide();
            layer.closeAll();
        }
    });

})
function loadUserTag() {
    $.ajax({
        type: "post",
        url: basePath + getAllTagUrl,
        async: true,
        success: function (data) {
            var tagHtml = ' <option value="">请选择</option>';
            var data = data.dataObject;
            for (var i = 0; i < data.length; i++) {
                tagHtml += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            }
            $('#addUserTag_user').html(tagHtml);
        }

    })
}
function toAddUserTag() {
    var tagId = $('#addUserTag_user').val();
    $.ajax({
        type: "post",
        url: basePath + addUserTagUrl,
        async: true,
        data: {
            userId: userId,
            tagId: tagId
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
                    content: data.msg,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        loadTagMoule();
                    }
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }

    })
}
//获取用户主页的标签
function loadTagMoule() {
    $.ajax({
        type: "post",
        url: basePath + getUserTagListUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            var data = data.dataObject;
            if (data.length == 0) {
                $('#addTagList').html('');
                return;
            } else {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<li><span>' + data[i].tagName + '</span><span class="deleteLink cursor" data-id="' + data[i].id + '">删除</span></li>';
                }
                $('#addTagList').html(html);
            }

        }

    })
}
//删除当前标签
$('body').off('click', '.deleteLink').on('click', '.deleteLink', function () {
    var tagId = $(this).attr('data-id');
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["确认", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '140px'],//宽高
        content: '确定删除吗？',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toDelUserTag(tagId);
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });

})
function toDelUserTag(tagId) {
    $.ajax({
        type: "post",
        url: basePath + delUserTagUrl,
        async: true,
        data: {
            userTagIds: tagId
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
                    content: '删除成功',
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                        loadTagMoule();
                    }
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }

    })

}
//编辑头像
layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例
    var index = layer.load(1);
    var uploadInst = upload.render({
        elem: '#test1' //绑定元素
        , url: basePath + modifyUserHeadImgUrl //上传接口
        , data: {
            userId: userId
        },
        accept: 'images'
        , exts: 'jpg|png|gif|bmp|jpeg'
        , done: function (res) {
            if (res.success == true) {
                layer.close(index);
                layer.closeAll();
                var userHeadImgUrl = res.dataObject;
                userHeadImgUrl = userHeadImgUrl.split('-')[1];
                $('#runInputPhotoImges').attr('src', userHeadImgUrl);
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: '编辑成功',
                    time: 2000,
                    btn: ["确定"]
                });
            } else {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: res.msg,
                    time: 2000
                });
            }

        }
        , error: function () {
            //请求异常回调
        }
    });
});
//资金账户退款
$('body').off('click', '#toRefund').on('click', '#toRefund', function () {
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["退款", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '260px'],//宽高
        content: $('.accountRefundBlock'),
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            toRefundMoney();
        },
        cancel: function (index, layero) {
            layer.closeAll();
            $('input[name=accountId]').val('');
        }
    });
})
//发起退款
function toRefundMoney() {
    if (testAccountBalance()) {
        var accountId = $('input[name=accountId]').val();
        var accountBalance = $('input[name=refundBlance]').val();
        $.ajax({
            type: "post",
            url: basePath + accountRefundUrl,
            async: true,
            data: {
                accountId: accountId,
                accountBalance: accountBalance,
                userId: userId
            },
            success: function (data) {
                layer.closeAll();
                if (data.success == true) {
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '160px'],//宽高
                        content: data.msg,
                        btn: ["确定"],
                        yes: function (index, layero) {
                            layer.closeAll();
                            getFinAccountUser();
                            loadUserIndex();
                            getUserAccount();
                            $('input[name=accountId]').val('');
                        }
                    });
                } else {
                    layer.closeAll();
                    layer.open({
                        type: 1,
                        offset: '100px',
                        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                        shadeClose: false,
                        closeBtn: 1,
                        area: ['310px', '200px'],//宽高
                        content: data.msg,
                        time: 2000,
                        btn: ["确定"]
                    });
                }
            }

        })
    }

}
//校验退款余额
function testAccountBalance() {
    var refundBlance = $('input[name=refundBlance]').val();
    var reg = /^\d+(\.\d{1,2})?$/;//正整数
    var refundMoney = $('#refundMoney').html();//充值余额
    if (!refundBlance) {
        $('#refundTip').html('请输入退款金额');
        return false;
    } else {
        if (!reg.test(refundBlance)) {
            $('#refundTip').html('退款金额不能为负数,小数点后最多两位');
            return false;
        } else if (parseFloat(refundBlance) > parseFloat(refundMoney)) {
            $('#refundTip').html('退款金额不能大于充值余额');
            return false;
        } else if (parseFloat(refundBlance) == 0) {
            $('#refundTip').html('请重新输入退款金额');
            return false;
        } else {
            $('#refundTip').html('');
            return true;
        }

    }
}
//一进来展示默认的vin列表
function getVinInfoByUser() {
    $.ajax({
        type: "post",
        url: basePath + getVinInfoByUserUrl,
        async: true,
        data: {
            userId: userId
        },
        success: function (data) {
            if (data.success == true) {
                var data = data.dataObject;
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var cvLicenseNumberHtml=data[i].cvLicenseNumber;
                    html += '<li><span>'
                        + data[i].cvVinCode + '</span><span>'
                        + cvLicenseNumberHtml + '</span><span class="orange unBindVIN" data-pkId="' + data[i].pkId + '">解绑</span></li>'
                }
                $('.userVinCodeList').html(html);

            }
        }
    });
}
//vin码绑定
$('#bindVinCode').on("click", function () {
    vinListSearch();
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["新绑VIN", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['860px', '400px'],//宽高
        content: $('.bindVinBlock'),
        cancel: function (index, layero) {
            layer.closeAll();
            $('.bindVinBlock').hide();
        }
    });
})
//点击确定绑定
$('body').off('click','.sureBtn').on('click','.sureBtn',function(){
    layer.closeAll();
    $('.bindVinBlock').hide();
    toBindVINcode();
})
//加载对应渠道的vin码
function vinListSearch() {
    getHideInput();
    initTable("carVinListForm", "carVinListPage", getCarVinRelaUrl, carVinListCallback);
}
function getHideInput() {
    var cvVinCodeValue = $('input[name=cvVinCode]').val();
    $('input[name=cpyId]').val(user_cpyId);//加载相同渠道的vin码
    if (cvVinCodeValue == "") {
        $('input[name=cvVinCode]').val('');
    } else {
        $('input[name=cvVinCode]').val(cvVinCodeValue);
    }
}
function carVinListCallback(req) {
    var data = req.dataObject;
    var pageNum = req.pager.pageNo;
    var listTr = "";
    for (var i = 0; i < data.length; i++) {
        listTr += '<tr><td><input type="checkbox" name="ids" class="selectedBox" value="' + data[i].pkId + '"/></td>'
            + '<td class="vinList_cvVinCode">' + data[i].cvVinCode
            + '</td><td class="vinList_cpyName">' + data[i].cpyName
            + '</td><td class="vinList_cvLicenseNumber">' + data[i].cvLicenseNumber
            + '</td></tr>';
    }
    $("#bindVinCodeTbody").html(listTr);
}
//vin码全选和选择操作
$("body").on('click', ".selAllVinCode", function () {
    $(".selectedBox").prop("checked", $(this).is(':checked'));
})
//确定绑定vin码
function toBindVINcode(){
    var vinIds = '';
    $('input[name=ids]').each(function () {
        var flag = $(this).prop('checked');
        if (flag == true) {
            vinIds += $(this).attr('value') + ',';
        }
    });
    vinIds = vinIds.substring(0, vinIds.length - 1);
    if (!vinIds) {
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
            url: basePath + bindVinCodeForUserUrl,
            async: true,
            data: {
                userId: userId,
                vinIds:vinIds
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
                        content: data.msg,
                        btn: ["确定"],
                        yes: function (index, layero) {
                            layer.closeAll();
                            getVinInfoByUser();
                        },
                        cancel: function (index, layero) {
                            layer.closeAll();
                            getVinInfoByUser();
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
//单独解绑vin
$('body').off('click','.unBindVIN').on('click','.unBindVIN',function(){
    toUnbindComfirm(this, unBindUserVinRelaByIdUrl);
})
function toUnbindComfirm(obj,unBindUserVinRelaByIdUrl){
    var pkId = $(obj).attr('data-pkId');
    layer.closeAll();
    layer.open({
        type: 1,
        offset: '100px',
        title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
        shadeClose: false,
        closeBtn: 1,
        area: ['310px', '160px'],//宽高
        content: '确定解绑该VIN码吗？',
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            layer.closeAll();
            toUnbindVINcode(pkId, unBindUserVinRelaByIdUrl);
        },
        cancel: function (index, layero) {
            layer.closeAll();
        }
    });
}
function  toUnbindVINcode(pkId, unBindUserVinRelaByIdUrl){
    $.ajax({
        type: "post",
        url: basePath + unBindUserVinRelaByIdUrl,
        data: {
            pkId: pkId
        },
        async: true,
        success: function (data) {
            if (data.success == true) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["解绑VIN", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"],
                    yes: function (index, layero) {
                        layer.closeAll();
                    }
                });
                getVinInfoByUser();

            } else if (data.success == false) {
                layer.closeAll();
                layer.open({
                    type: 1,
                    offset: '100px',
                    title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                    shadeClose: false,
                    closeBtn: 1,
                    area: ['310px', '160px'],//宽高
                    content: data.msg,
                    time: 2000,
                    btn: ["确定"]
                });
            }
        }
    })
}
