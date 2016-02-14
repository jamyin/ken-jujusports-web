function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

var orderno=getUrlParam("orderno");

function go_mycollege(){
	window.location.href="myaccount_mymes.html";
}

$(function(){
	jQuery.ajax({
		url:'/training/orderInfoPage.do',
		type: 'POST',
		dataType :'json',
		data : {orderno:orderno},
		success : function(data){
			var jsondata = data.data;
			
			if(jsondata != null){
				var open_date=jsondata.openDateFmt;
				var total_fee = jsondata.totoFee;
				
				var signup_tips = "请您于<i>"+open_date+"</i>凭手机号到现场报道并支付全额学费<i class=\"all-free\">"+total_fee+"</i>元";
				$(".signup-tips").html(signup_tips);
				var course_name = jsondata.courseName;
				var address = jsondata.district+"区 | "+jsondata.spaceName+" | "+jsondata.address;
				var time = jsondata.course_starttime+" ~ "+jsondata.course_endtime+" 每"+jsondata.day_of_week+""+jsondata.class_starttime+" ~ "+jsondata.class_endtime;
				var pname=jsondata.pname;	
				var mobile = jsondata.mobile;	
				var cname = jsondata.cname;
				var order_msg ="<h2>您的报名信息</h2><ul><li>课程：<label>"+course_name+"</label></li><li>场地："+"<label>"+address+"</label></li><li>时间：<label>"+time+"</label></li><li>姓名：<label>"+pname+"</label></li><li>手机：<label>"+mobile+"</label></li>"
				if(cname){
					order_msg = order_msg+"<li>孩子：<label>"+cname+"</label></li>"
				}
				order_msg = order_msg+"</ul>"
				$(".signup-info").html(order_msg);
			}
		}
	}); 
});