//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg); // 匹配目标参数
   if (r != null)
    return unescape(r[2]);
   return null; // 返回参数值
}

var WIDout_trade_no=getUrlParam("order_no");// 商户订单号
$.post("/training/orderInfoPage.do",{"orderno":WIDout_trade_no},function(data){
	if(data.status!=200){
		alert("订单获取失败");
		return;
	}
	var WIDsubject=data.data.courseName;// 订单名称
	var WIDtotal_fee=data.data.deposit;// 定金
	var WIDbody=data.data.courseName;// 订单描述
	var WIDshow_url="http://www,jujusports.cn";//商品展示地址
	$.post("/webpay/in.do",{"WIDout_trade_no":WIDout_trade_no,"WIDsubject":WIDsubject,"WIDtotal_fee":WIDtotal_fee,"WIDbody":WIDbody,"WIDshow_url":WIDshow_url},function(data){
		//alert(data);
		$("#pay").html(data);
		return;
	});
});
