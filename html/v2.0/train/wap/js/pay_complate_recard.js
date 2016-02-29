$(function() {
	// 获取url中的参数
	// name=需要获取的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); // 匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; // 返回参数值
	}
	
	var info=getUrlParam("info");
	var classId=getUrlParam("classId");
	$(".pay_info").html(info);
	
	$(".bt1").click(function(){
		location.href = "/train/wap/check_order.html?classId="+classId;
	});
	
	$(".bt2").click(function(){
		location.href = "/train/wap/start_here.html?classId="+classId;
	});
	
	
	

});