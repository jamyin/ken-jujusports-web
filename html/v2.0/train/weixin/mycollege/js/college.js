//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
var openId=getUrlParam("openId");

$.post("/training/mineCollege.do",{"openId":openId},function(data){
	if(data.status!=200){
		alert(data.message);
		return;
	}
	
	var myOrderList=data.data;
	if(!myOrderList||myOrderList.length==0){
		alert("未查询到数据");
		return;
	}
	var str="";
	for(var i=0;i<myOrderList.length;i++){
		var myOrder=myOrderList[i];
		var courseName=myOrder.courseName;//课程名称
		var usedTime=myOrder.usedTime;//已参加课时
		var leftTime=myOrder.leftTime;//未参加课时
		var leaveTime=myOrder.leaveTime;//请假课时
		var truantTime=myOrder.truantTime;//旷课课时
		
		str+="<li class='college'>"+
				"<h2 class='title'>"+courseName+"</h2>"+
				"<div class='past cen'><span class='status item-1-1'>已参加</span><span class='past-no course-no'><i>"+usedTime+"</i>课时</span></div>"+
				"<div class='lost cen'><span class='status item-2-1'>未参加</span><span class='lost-no course-no'><i>"+leftTime+"</i>课时</span></div>"+
				"<p class='totle'><span>请假<i>"+leaveTime+"</i>课时</span><span>旷课<i>"+truantTime+"</i>课时</span></p>"+
			"</li>";
	}
	
	$("#myOrderList").html(str);
});