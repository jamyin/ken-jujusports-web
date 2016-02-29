$(".school").html("");
$("#userName").html("");
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
	$.post("/training/locale/info.do", {}, function(data) {
		if(data.status!=200){
			location.href = "/train/wap/login.html";
			return;
		}
		$("#userName").html("<p>你好  "+data.data.name+"</p>");
		spaces();
	});
	function spaces(){
		$.post("/training/locale/index.do", {}, function(data) {
			
			if (data.status != 200) {
				alert(data.message);
				return;
			}
			
			var con = "";
			var spaceList = data.data;
			if(spaceList){
				for (var i = 0; i < spaceList.length; i++) {
					var space = spaceList[i];
					var place = space.place;
		
					con += "<li>" + place + "<img src='images/arrow_grey_down.png' />"
							+ "</li><ul>";
					var courses = space.courses;
					for (var p = 0; p < courses.length; p++) {
						var course = courses[p];
						var week = course.week;
						var startTime = course.startTime;
						var endTime = course.endTime;
						var classId=course.classId;
						con += "<li classId='"+classId+"'>" + week + "  " + startTime + "-" + endTime
								+ "</li>";
					}
					con += "</ul>";
				}
			}else{
				alert("未查询到数据");
			}
			
			$(".school").html(con);
			
			
			
			
			$(".list .school>li").click(function() {
				$(this).next().slideToggle();
				$(this).children("img").toggleClass("rotate");
				$(this).siblings().find("img").removeClass("rotate");
				$(this).next().siblings("ul").slideUp();
				$(this).next().siblings("ul").find(".order_menu").slideUp();
			});
	
			var container = "<li class='order_menu'><span class='viewSignUp'>查看报名</span><span class='startSignUp'>开始点名</span></li>";
			$(".list>.school>ul li").after(container)
			$(".list .school>ul>li").click(function() {
				$(this).next("li.order_menu").slideToggle();
				$(this).next("li.order_menu").siblings(".order_menu").slideUp();
			});
			
			
			
			
			function viewSignUp(node){
				var classId=node.parent().prev().attr("classId");
				location.href = "/train/wap/check_order.html?classId="+classId;
			}
			function startSignUp(node){
				var classId=node.parent().prev().attr("classId");
				location.href = "/train/wap/start_here.html?classId="+classId;
			}
			
			$(".viewSignUp").click(function (){
				viewSignUp($(this));
			});
			$(".startSignUp").click(function (){
				startSignUp($(this));
			});
			
			
			$(".cancel").click(function (){
				$.post("/training/loginout.do", {}, function(data) {
					if(data.status!=200){
						alert(data.message);
						return;
					}
					location.href = "/train/wap/login.html";
				});
			});
			
		});
	}
	
	

	

});
