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
	var str="<h2>定金已支付!</h2>"+
			"<ul>"+
			pname+
			mobile+
			cname+
			"</ul>"+
			"<p>请于"+openDateFmt+" "+openTime+"凭手机号到"+spaceName+"报道</p>"+
			"<span>请返回微信进行可查看更多内容</span>";
	$(".order_payback").html(str);
	
});





