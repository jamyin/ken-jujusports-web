$(function(){
	$.ajax({
		url:'/userMan/checkUser.htm',
		type:"POST",
		dataType:'json',
		success:function(data){
			if(data.status==200){
				if(data.data.userAccount!=null && data.data.userAccount!=""){
					var myteam = "";
					if(data.data.teamId!=null && data.data.teamId!=""){
						myteam = "<a href='/tc/index/"+data.data.teamId+".htm' style='color:#53bcff;cursor:pointer;'>我的球队</a>"
					}
					$("#loginStatus").html(myteam+"&nbsp;&nbsp;&nbsp;<a href='/userMan/userInfo.htm' class=\"logout\" style=''>"+data.data.userAccount+"</a> <label style='display:inline-block;float:right;'> , 欢迎您。<a class=\"logout\" href=\"/userMan/loginout.htm\">注销</a></label>");	
				}else{
					$("#loginStatus").html("<a href='/userMan/userInfo.htm'>聚运动用户</a> 欢迎您。<a class=\"logout\" href=\"/userMan/loginout.htm\">注销</a>");
				}
				
			}else{
				
			}
			
		}
	});
});