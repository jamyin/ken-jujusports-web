$(".list").html("");
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
	
	var classId=getUrlParam("classId");
	var userList="";
	$.post("/training/locale/toRoll.do?classId="+classId,{},function(data){
		if(data.status!=200){
			alert(data.message);
			return;
		}
		
		var con="";
		userList=data.data;
		if(!userList){
			alert("暂无点名");
			location.href = "/train/wap/home.html";
		}
		for(var i=0;i<userList.length;i++){
			var user=userList[i];
			var id=user.id;//主键自增ID
			var name=user.name;//姓名
			var orderId=user.orderId;//用户、课程关系表(订单表)订单表id
			var userId=user.userId;//用户id
			var openId=user.openId;//第三方平台id
			var courseId=user.courseId;//课程ID
			var classId=user.classId;//课程(小节)ID
			var type=user.type;//1表示请假；2表示旷课；3到了
			if(!id){
				con+="<li class='clearfix' id='null' userId='"+userId+"'>"+
				       "<span id='name'>"+name+"</span>"+
				       "<span id='here'>到</span>"+
				       "<span id='leave'>请假</span>"+
				       "<span id='absent'>旷课</span>"+
				     "</li>";
			}else{
				if(!type){
					con+="<li class='clearfix' id='"+id+"' userId='"+userId+"'>"+
					       "<span id='name'>"+name+"</span>"+
					       "<span id='here'>到</span>"+
					       "<span id='leave'>请假</span>"+
					       "<span id='absent'>旷课</span>"+
					     "</li>";
				}else{
					var active="";
					if(type==1){
						  active="<span id='here'>到</span>"+
							        "<span id='leave' class='active'>请假</span>"+
							        "<span id='absent'>旷课</span>";
					}else if(type==2){
						  active="<span id='here'>到</span>"+
							        "<span id='leave'>请假</span>"+
							        "<span id='absent' class='active'>旷课</span>";
					}else if(type==3){
						  active="<span id='here' class='active'>到</span>"+
							        "<span id='leave'>请假</span>"+
							        "<span id='absent'>旷课</span>";
					}else{
						  active="<span id='here'>到</span>"+
							        "<span id='leave'>请假</span>"+
							        "<span id='absent'>旷课</span>";
					}
					con+="<li class='clearfix' id='"+id+"' userId='"+userId+"'>"+
					       "<span id='name'>"+name+"</span>"+
					        active+
					     "</li>";
				}
			}
			$(".list").html(con);
			$("#here,#leave,#absent").click(function() {
				$(this).toggleClass("active");
				$(this).siblings().removeClass("active");
			});
		}
	});
	$(".bt").click(function(){
		var json="[";
		var nodeList=$(".list>.clearfix");
		nodeList.each(function(){
			var id=$(this).attr("id");
			var userId=$(this).attr("userId");

			for(var i=0;i<userList.length;i++){
				var user=userList[i];
				if(userId==user.userId){
					var name=user.name;//姓名
					var orderId=user.orderId;//用户、课程关系表(订单表)订单表id
					var openId=user.openId;//第三方平台id
					var courseId=user.courseId;//课程ID
					var classId=user.classId;//课程(小节)ID
					var type=user.type;//1表示请假；2表示旷课；3到了
					if(id=="null"){
						var active=$(this).find("span.active");
						type=$(active).attr("id");
						
						if(type=="here"){
							type=3;
						}else if(type=="leave"){
							type=1;
						}else if(type=="absent"){
							type=2;
						}else{
							type=null;
						}
						json+="{'name':'"+name+"','openId':'"+openId+"','orderId':'"+orderId+"','userId':'"+userId+"','courseId':'"+courseId+"','classId':'"+classId+"','type':'"+type+"'},"
						break;
					}else{
						var active=$(this).find("span.active");
						type=$(active).attr("id");
						
						if(type=="here"){
							type=3;
						}else if(type=="leave"){
							type=1;
						}else if(type=="absent"){
							type=2;
						}else{
							type=null;
						}
						json+="{'id':'"+id+"','openId':'"+openId+"','name':'"+name+"','orderId':'"+orderId+"','userId':'"+userId+"','courseId':'"+courseId+"','classId':'"+classId+"','type':'"+type+"'},"
						break;
					}
				}
			}
			
		});
		json+="]";
		$.post("/training/locale/roll.do?",{"json":json},function(data){
			if(data.status!=200){
				alert(data.message);
				return;
			}
			alert("点名成功 ");
			location.href = "/train/wap/home.html";
		});
	});
	
	

});
