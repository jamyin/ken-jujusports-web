//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

var orderno=getUrlParam("orderno");
var WIDout_trade_no=orderno;//商户订单号
var WIDsubject="";//订单名称
var WIDtotal_fee="";//付款金额
$.post("/training/orderInfo.do",{"orderno":orderno},function(data){
	
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
		pname="<li>家长："+pname+"</li>";
		mobile="<li>手机："+mobile+"</li>";
		cname="<li>孩子："+cname+"</li>";
	}else{
		pname="<li>姓名："+pname+"</li>";
		mobile="<li>手机："+mobile+"</li>";
		cname="";
	}
	var openDateFmt=order.openDateFmt;//报道日期
	var openTime=order.openTime;//报道时间
	var spaceName=order.spaceName;//报道学校
	WIDsubject=spaceName;
	var deposit=order.deposit;//定金
	if(!deposit){
		deposit=0;
	}
	WIDtotal_fee=deposit;
	var discount=order.discount;//折扣
	var notice=order.notice;//信息提示
	if(!notice){
		notice="";
	}
	var str="<h2>报名成功,感谢您的支持</h2>"+
			"<ul>"+
			pname+
			mobile+
			cname+
			"</ul>"+
			"<p>请于"+openDateFmt+" "+openTime+"凭手机号到"+spaceName+"报道</p>"+
			"<div class='other_info'>"+
				"<h3>友情提示</h3>"+
				"<p>支付 <span>"+deposit+"</span> 元定金<br>可获得 <span>"+discount+"</span> 折优惠</p>"+
				"<span>"+notice+"</span>"+
			"</div>";
	$(".order_confirm").html(str);
	
});
function pay(){
	if(WIDtotal_fee==0){
		$.post("/pay/payNull.do",{"orderno":WIDout_trade_no},function(data){
			if(data.status!=200){
				alert("支付失败");
				return;
			}
			location.href = "/train/weixin/step6_orderpayback.html?orderno="+WIDout_trade_no;
			
		});
	}else{
		$.post("/pay/in.do",{"WIDout_trade_no":WIDout_trade_no,"WIDsubject":WIDsubject,"WIDtotal_fee":WIDtotal_fee},function(data){
			$("#pay").html(data);
			return;
		});
	}
		
}




