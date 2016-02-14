//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

var courseId=getUrlParam("courseId");
var addressId=getUrlParam("addressId");
var id=getUrlParam("id");

$.post("/training/getCourseById.do",{"courseId":courseId},function(data){
	if(!data){
		alert("未查询到课程信息");
		return;
	}
	var courses=jQuery.parseJSON(data);
	var title=courses.name;//标题
	var description=courses.description;//课程介绍
	var isneedCname=courses.isneedCname;//是否需要孩子报名
	if(isneedCname){
		$(".ch_name").css("display","block");
	}
});

function last(){
	location.href = "/train/weixin/step3_choosedate.html?courseId="+courseId+"&addressId="+addressId;
}

function next(){
	if(checkInfo()){
		
	}else{
		alert("请完善数据");
		return;
	}
	var classid=id;//课程的id
	//alert("课程的id:"+classid);
	var parentname=$("#pa_name").val();//父母姓名
	//alert("父母姓名:"+parentname);
	var childname=$("#ch_name").val();//孩子姓名
	if(!childname){
		childname="";
	}
	//alert("孩子姓名:"+childname);
	var mobile=$("#cellphone").val();//手机号码
	//alert("手机号码:"+mobile);
	//alert("openid:"+openId);
	var orderno="";//订单Id
	
	$.post("/training/applycourse.do",{"classid":classid,"parentname":parentname,"childname":childname,"mobile":mobile,"openid":openId},function(data){
		if(data.status!=200){
			alert(data.message);
			return;
		}
		orderno=data.data;
		//alert("订单Id:"+orderno);
		location.href = "/train/weixin/step5_orderconfirm.html?orderno="+orderno;
	});
}