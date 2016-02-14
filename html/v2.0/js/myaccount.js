document.write("<script src='js/layer-v2.0/layer/layer.js'><\/script>");

$(function(){
	$.post("/training/getWXUserV02.do",{},function(data){
		if(data.status==500){
			layer.msg('正在加载微信第三方登录', {
				shade: [0.9, '#000'],
			    icon: 6,
			    time: 3000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
			    //do something
				location.href = "login.html";
			}); 
			return;
		}else{
			jQuery.ajax({
				url:'/training/getUserInfo.do',
				type: 'POST',
				dataType :'json',
				success : function(data){
					var jsondata = data.data;
					var userInfo = jsondata;//jQuery.parseJSON(data.data);
					var pname=userInfo.pname;
					var fmCreateTime=userInfo.fmCreateTime;
					var fmLastLoginTime=userInfo.fmLastLoginTime;
//					var userInfo = data.data;
//					var pname=userInfo.pname;
//					var fmCreateTime=userInfo.fmCreateTime;
//					var fmLastLoginTime=userInfo.fmLastLoginTime;
					if(userInfo.pic == null){
						$(".portrait > img").attr("src","img/icon_unport.png");
					}else{
						$(".portrait > img").attr("src",userInfo.pic);
					}
					$("#pname").html(pname);
					$("#fmCreateTime").html(fmCreateTime);
					$("#fmLastLoginTime").html(fmLastLoginTime);
				}
			});	
		}


	});
	
	$('.log_out').on('click',function(){
		$.post("/training/weixinLogout.do",{},function(data){
			if(data.status == 200){
				layer.msg("注销成功", {
					shade: [0.9, '#000'],
				    icon: 6,
				    time: 2000 //2秒关闭（如果不配置，默认是3秒）
				}, function(){
				    //do something
					location.href = "login.html";
				}); 
				return;
			}
		});
	});
	
	
	//从session中取微信用户数据
//	jQuery.ajax({
//		url:'/training/getWXUser.do',
//		type: 'POST',
//		dataType :'json',
//		data : null,
//		success : function(data){
//			var jsonData = data.data;
//			
//		}
//	}); 
});