function getRootPath() {   
	var pathName = window.location.pathname.substring(1);   
	var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));   
	//return "http://10.9.3.116/ec_html";
	//return "http://10.9.1.199:8080/ec_html";
    return window.location.protocol + '//' + window.location.host + '/'+ webName + '/';   
} 
	
	//采用正则表达式获取地址栏参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var params=decodeURI(window.location.search);
    var r = params.substr(1).match(reg);
    	if(r!=null)return  r[2]; return null;
}
//获取时间======================================================
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}