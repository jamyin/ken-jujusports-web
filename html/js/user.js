	function showUserInfo(data){
		var status=data.status;
		if(status==500){
			alert(data.message);
			location.href = "/login.html?_pageTag=login";
		}
		
		var userinfo=data.data;
		$(".nickname").html(userinfo.nickName);
		$("#nickname").val(userinfo.nickName);
		$(".name").html(userinfo.realName);
		$("#name").val(userinfo.realName);
		$("#hfThumbnail").val(userinfo.userImage);
		$(".userImage").attr("src",userinfo.userImage);
		if(userinfo.gender){
			$(".sex").html("男");
			$("#man").attr("checked",'checked');
		}else{
			$(".sex").html("女");
			$("#woman").attr("checked",'checked');
		}
		
		$(".email").html(userinfo.email);
		$("#email").val(userinfo.email);
		
		$(".telephone").html(userinfo.mobileNo);
		$("#telephone").val(userinfo.mobileNo);
	}
	
	function erryFunction(data){
		alert("请求失败,请重新刷新页面");
	}
	
	$.ajax({
		url: '/umanages/showUserInfo.do',  
        type: 'POST',  
        dataType: 'json',
		success: showUserInfo,//成功执行方法    
		error: erryFunction//错误执行方法
	});	
	
	function formSubmit(){
		var url=$(".form").serialize();
		$.post("/umanages/addOrUpdateUserInfo.do?"+url,{},function(data){
			location.href = "/personal_center.html";
		});
		
		
	}
		
		
		 
		
		



    




	
