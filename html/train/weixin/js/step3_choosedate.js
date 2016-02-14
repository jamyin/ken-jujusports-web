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

function last(){
	
	location.href = "/train/weixin/step2_chooseplace.html?courseId="+courseId;
}

function next(){
	var node=$("i[class='select cur']");
	if(node.length==0){
		alert("请选择");
		return;
	}
	var id=$(node).attr("id");
	location.href = "/train/weixin/step4_submitinfo.html?id="+id+"&courseId="+courseId+"&addressId="+addressId;
}

$.post("/training/getClassByCAId.do",{"courseId":courseId,"addressId":addressId},function(data){
	var timeList=jQuery.parseJSON(data);
	var str="";
	for(var i=0;i<timeList.length;i++){
		var time=timeList[i];
		var id=time.id;
		var openDateFmt=time.openDateFmt;//日期
		var dayOfWeek=time.dayOfWeek;//星期
		var startTime=time.startTime;//开始时间
		var endTime=time.endTime;//结束时间
		var maxStudent=time.maxStudent;//最大剩余人数
		var actualStudent=time.actualStudent;//已报名人数
		var student=maxStudent-actualStudent;//剩余报名人数
		var price=time.price;//价格
		str+="<li><h3>"+openDateFmt+"<br>"+dayOfWeek+"（"+startTime+" - "+endTime+"）</h3><p>剩余 <span>"+student+"</span> 个名额</p><span>"+price+" 元</span><i class='select' id="+id+"></i></li>";
	}
	$(".date_choose ul").empty().append(str);
});