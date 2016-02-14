$(function(){
	// 获取url中的参数
	// name=需要获取的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); // 匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; // 返回参数值
	}
	
	
	var classId=getUrlParam("classId");
	
	$(".bt1").click(function(){
		location.href = "/train/wap/check_order.html?classId="+classId;
	});
	
	$(".bt2").click(function(){
		location.href = "/train/wap/start_here.html?classId="+classId;
	});
	
	
	var orderId=getUrlParam("orderId");
	$.post("/training/orderInfoById.do",{"orderId":orderId},function(data){
		
		if(data.status!=200){
			alert(data.message);
			return;
		}
		var order=data.data;
		var pname=order.pname;//父母姓名
		var mobile=order.mobile;//手机号码
		var cname=order.cname;//孩子姓名
		if(!cname){
			cname="";
		}
		var isneedCname=order.isneedCname;//是否需要孩子报名
		if(isneedCname){
			
		}else{
			
		}
		$(".chilren_name").html(pname);
		$("#pay").html(getUrlParam("totoFee"));
	});

});
