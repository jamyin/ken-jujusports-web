//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
var openId="";
$.post("/training/getWXUser.do",{},function(data){
	if(data){
		var user=jQuery.parseJSON(data);
		openId=user.openId;
	}else{
		openId=getUrlParam("openId");
		$.post("/training/weixinLogin.do", {"openId":openId}, function(data) {});
	}

});
