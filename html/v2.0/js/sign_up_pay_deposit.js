//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg); //匹配目标参数
   if (r != null)
    return unescape(r[2]);
   return null; //返回参数值
}

var type=1;//1,支付宝支付,2,微信支付
function payType(num){
	type=num;
}
 
var order_no=getUrlParam("order_no")//商户订单号
function pay(){
	$.post("/training/orderInfoPage.do",{"orderno":order_no},function(data){
		if(data.status!=200){
			alert("订单获取失败");
			return;
		}
		var WIDtotal_fee=data.data.deposit;// 定金
		//定金为0时执行的方法
		if(!WIDtotal_fee){
			$.post("/webpay/payNull.do",{"orderno":order_no},function(data){
				if(data.status!=200){
					alert("支付失败!");
					return;
				}
				location.href = "sign_up_pay_success.html?order_no="+order_no;
			});
			return;
		}
		
		if(type==1){
			location.href = "zhifubaoPay.html?order_no="+order_no;
		}else if(type==2){
			location.href = "weixinPay.html?order_no="+order_no;
		}
	});
	
	
}


