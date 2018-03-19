/**
 * Created by Administrator on 2017/11/3 0003.
 */
$(function() {
    integralActivityListSearch();
});

//日期选择
laydate.render({
    elem: '#datePicker',
    range: true,
    theme: '#ff7d00'
    /* ,min: -90,
     max:0//0 代表今天 -1代表昨天，-2代表前天，以此类推*/
});

//返回按钮
$('body').off('click', '#toPowerStationList').on('click', '#toPowerStationList', function() {
    window.history.back();
});

//input分值取整提醒
$(document).on({
    keyup: function() {
        if (this.value.length == 1) {
            this.value = this.value.replace(/[^1-9]/g, '')
        } else {
            this.value = this.value.replace(/\D/g, '')
        }
    },
    afterpaste: function() {
        if (this.value.length == 1) {
            this.value = this.value.replace(/[^1-9]/g, '0')
        } else {
            this.value = this.value.replace(/\D/g, '')
        }
    },
    blur: function() {
        if (this.value < 100) {
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 1,
                area: ['310px', '160px'],
                //宽高
                content: '<100可能导致损失，请慎重填写。',
                time: 0,
                btn: ["确定"],
                btn1: function(index, layero) {
                    layer.close(index);
                },
                cancel: function(index, layero) {
                    layer.close(index);
                }
            });
        } else if (this.value > 500) {
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 1,
                area: ['310px', '160px'],
                //宽高
                content: '>500可能过高，会降低用户体验，请慎重填写。',
                time: 0,
                btn: ["确定"],
                btn1: function(index, layero) {
                    layer.close(index);
                },
                cancel: function(index, layero) {
                    layer.close(index);
                }
            });
        }
    }
}, '.NeedExchange');

//停止兑换按钮

function stopExchange(obj) {
    var index = obj.parentNode.parentNode.rowIndex - 1;
    var day = $('#datePicker').val();
    var cpId = parseInt($('#myTbogy tr:eq(' + index + ')').attr('data-cp')),
        integralValue = parseInt($('#myTbogy tr:eq(' + index + ') td:eq(3)').text()),
        map = {
            couponVarietyId: cpId,
            integralValue: integralValue
        };
    var data = {
        'pkId': 6,
        'integralRulesId': $('#myTbogy tr:eq(' + index + ')').attr('data-value'),
        'activityStatus': 1,
        'direction': 1,
        'map': map,
        'strStartDate': slice_date(day)[0],
        'strEndDate': slice_date(day)[1],
        'contents': $('#myTbogy tr:eq(' + index + ')').attr('data-content')
    };
    $.ajax({
        url: basePath + modifyIntegralActivityUrl,
        type: "post",
        dataType: 'json',
        data: data,
        success: function(data) {
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 1,
                area: ['310px', '160px'],
                //宽高
                content: data.msg,
                time: 0,
                btn: ["确定"],
                btn1: function(indexs, layero) {
                    layer.closeAll();
                    window.history.back();
                },
                cancel: function(indexs, layero) {
                    layer.closeAll();
                    window.history.back();
                }
            });
        }
    });
};

//设置比例表格的数据

function integralActivityListSearch() {
    var itRulesId = getUrlParam('integralRulesId');
    $('#integralActivityExchangeForm').append('<input type="text" name="integralRulesId" value="' + itRulesId + '" hidden="hidden">');
    initTable("integralActivityExchangeForm", "", getIntegralActivityAndRulesListUrl, intergralActivityExchange);
}

function intergralActivityExchange(req) {
    var data = req.dataObject;
    var listTr = "";
    var state = '',
        startDay = new Date(data[0].startDate.time).format("yyyy-MM-dd"),
        endDay = new Date(data[0].endDate.time).format("yyyy-MM-dd");

    $('#datePicker').val(startDay + ' - ' + endDay);
    //状态
    if (data[0].activityStatus == 0) {
        state = '开启'
    } else if (data[0].activityStatus == 1) {
        state = '关闭'
    }
    if (data[0].activityStatus == 0) {
        listTr += '<tr data-value="' + data[0].integralRulesId + '" data-param = "' + data[0].pkId + '" data-cp = "' + data[0].couponVarietyId + '" data-content="' + data[0].contents + '"><td>' + data[0].contents + '</td><td>' + state + '</td><td>' + startDay + ' - ' + endDay + '</td><td>' + data[0].integralValue + '</td><td><a style="padding: 10px;" onclick="IntegralEditing(this);">积分编辑</a><a onclick="stopExchange(this);">停止兑换</a></td></tr>';
    } else if (data[0].activityStatus == 1) {
        listTr += '<tr data-value="' + data[0].integralRulesId + '" data-param = "' + data[0].pkId + '" data-cp = "' + data[0].couponVarietyId + '" data-content="' + data[0].contents + '"><td>' + data[0].contents + '</td><td>' + state + '</td><td>' + startDay + ' - ' + endDay + '</td><td>' + data[0].integralValue + '</td><td><a onclick="restartExchange(this);">开始兑换</a></td></tr>';
    }

    $("#myTbogy").html(listTr);
}

function getValue(obj) {
    var value = getUrlParam(obj)
    return value;
}

//开始兑换按钮
function restartExchange(obj){
    var index = obj.parentNode.parentNode.rowIndex - 1;
    var day = $('#myTbogy tr:eq('+index+') td:eq(2)').text();
    var cpId = parseInt($('#myTbogy tr:eq('+index+')').attr('data-cp')),
        integralValue = parseInt($('#myTbogy tr:eq('+index+') td:eq(3)').text()),
        map = {couponVarietyId: cpId,integralValue:integralValue};
    var data = {
        'pkId' : 6,
        'integralRulesId' : $('#myTbogy tr:eq('+index+')').attr('data-value'),
        'activityStatus' : 0,
        'direction' : 1,
        'map' : map,
        'strStartDate' : slice_date(day)[0],
        'strEndDate' : slice_date(day)[1],
        'contents' : $('#myTbogy tr:eq('+index+')').attr('data-content')
    };
    $.ajax({
        url: basePath + modifyIntegralActivityUrl,
        type: "post",
        dataType: 'json',
        data: data,
        success: function (data) {
            layer.open({
                type: 1,
                offset: '100px',
                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                shadeClose: false,
                closeBtn: 1,
                area: ['310px', '160px'],
                //宽高
                content: data.msg,
                time: 0,
                btn: ["确定"],
                btn1: function(indexs, layero) {
                    layer.closeAll();
                    window.history.back();
                },
                cancel: function(indexs, layero) {
                    layer.closeAll();
                }
            });
        }
    });
}

//编辑按钮
function IntegralEditing(r) {
    //判断选择时间是否为空
    if ($('#datePicker').val() == '') {
        layer.open({
            type: 1,
            offset: '100px',
            title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
            shadeClose: false,
            closeBtn: 1,
            area: ['310px', '160px'],
            //宽高
            content: '活动时间不可为空',
            time: 0,
            btn: ["确定"],
            btn1: function(index, layero) {
                layer.closeAll();
            },
            cancel: function(index, layero) {
                layer.closeAll();
            }
        });
        return false;
    }
    var index = r.parentNode.parentNode.rowIndex - 1;

    //原积分赋值
    $('.NeedExchange').val($('#myTbogy tr:eq(' + index + ') td:eq(3)').text());

    layer.open({
        type: 1,
        title: ["编辑积分", "font-size:12px;text-align:left;padding-left:20px;"],
        btn: ["确定"],
        shadeClose: true,
        closeBtn: 1,
        //点击遮罩关闭层
        area: ['200px', '200px'],
        content: $("#caution_case"),
        yes: function() {
            var day = $('#datePicker').val();
            var cpId = parseInt($('#myTbogy tr:eq(' + index + ')').attr('data-cp'));
            var integralValue = parseInt($('.NeedExchange').val());
            var map = {
                couponVarietyId: cpId,
                integralValue: integralValue
            };
            var data = {
                'pkId': 6,
                'integralRulesId': $('#myTbogy tr:eq(' + index + ')').attr('data-value'),
                'activityStatus': 0,
                'direction': 1,
                'map': map,
                'strStartDate': slice_date(day)[0],
                'strEndDate': slice_date(day)[1]
            };
                $.ajax({
                    url: basePath + modifyIntegralActivityUrl,
                    type: "post",
                    dataType: 'json',
                    data: data,
                    success: function(data) {
                        if (data.status == 1000) {
                            layer.open({
                                type: 1,
                                offset: '100px',
                                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                                shadeClose: false,
                                closeBtn: 1,
                                area: ['310px', '160px'],
                                //宽高
                                content: data.msg,
                                time: 0,
                                btn: ["确定"],
                                btn1: function(indexs, layero) {
                                    layer.closeAll();
                                    window.history.back();
                                    $('#myTbogy tr:eq(' + index + ') td:eq(2)').html($('#datePicker').val());
                                    $('#myTbogy tr:eq(' + index + ') td:eq(1)').html('开启');
                                    $('#myTbogy tr:eq(' + index + ') td:eq(3)').html(integralValue);
                                    if ($('#myTbogy tr:eq(' + index + ') td:eq(4) a').length > 1) {
                                        return true;
                                    } else {
                                        $('#myTbogy tr:eq(' + index + ') td:eq(4)').append('<a href="#">停止兑换</a>');
                                    }

                                },
                                cancel: function(index, layero) {
                                    layer.closeAll();
                                }
                            });
                        } else if (data.status == 2001) {
                            layer.open({
                                type: 1,
                                offset: '100px',
                                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                                shadeClose: false,
                                closeBtn: 1,
                                area: ['310px', '160px'],
                                //宽高
                                content: data.msg,
                                time: 0,
                                btn: ["确定"],
                                btn1: function(indexs, layero) {
                                    layer.closeAll();
                                },
                                cancel: function(index, layero) {
                                    layer.closeAll();
                                }
                            });
                            return false;
                        } else if (data.status == 9001) {
                            layer.closeAll();
                            layer.open({
                                type: 1,
                                offset: '100px',
                                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                                shadeClose: false,
                                closeBtn: 1,
                                area: ['310px', '160px'],
                                //宽高
                                content: '会话超时，请重新登陆！',
                                btn: ["确定"],
                                yes: function(index, layero) {
                                    layer.closeAll();
                                    window.top.location.href = basePath + toLoginUrl;
                                },
                                cancel: function(index, layero) {
                                    layer.closeAll();
                                    window.top.location.href = basePath + toLoginUrl;
                                }
                            })
                        } else {
                            layer.closeAll();
                            layer.open({
                                type: 1,
                                offset: '100px',
                                title: ["提示", "font-size:12px;text-align:left;padding-left:20px;"],
                                shadeClose: false,
                                closeBtn: 1,
                                area: ['310px', '160px'],
                                //宽高
                                content: '系统出错',
                                btn: ["确定"],
                                yes: function(index, layero) {
                                    layer.closeAll();
                                    window.top.location.href = basePath + toLoginUrl;
                                },
                                cancel: function(index, layero) {
                                    layer.closeAll();
                                    window.top.location.href = basePath + toLoginUrl;
                                }
                            });
                        }
                    }
                });
                layer.closeAll();
        },
        cancel: function() {
            layer.closeAll();
        }
    });
}