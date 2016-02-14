
	function loginout(){
		$.post("/umanages/loginout.do",{},function(data){
			location.href = data;
		});
	}
	

	
	if($(".login").length){
		$.post("/umanages/showlogin.do",{},function (data){
			var loginfo=data.data;
			var status=data.status;
			var node=$(".login");
			if(status==200){
				if(loginfo.type==1){
					node.html("<a href='/personal_center.html'>"+loginfo.nickName+"</a> | <a href='javascript:;' onclick='loginout()'>注销</a>");
				}else if(loginfo.type==2){
					node.html("<a href='/app/site/siteIndex.html'>"+loginfo.nickName+"</a> | <a href='javascript:;' onclick='loginout()'>注销</a>");
				}
				if($(".userImage").length){
					$(".userImage").attr("src",loginfo.userImage);
				}
				
				if($(".nickName").length){
					$(".nickName").html(loginfo.nickName);
				}
				
			}
			
		});
	}
	
	
	
	
//	if($(".userImage").length){
//	$.post("/umanages/showUserInfo.do",{},function (data){
//		var userinfo=data.data;
//		var status=data.status;
//		if(userinfo){
//			$(".userImage").attr("src",userinfo.userImage);
//		}
//		
//	});
//}
	
	
	
	
		
		
		 
		
		



    




	
