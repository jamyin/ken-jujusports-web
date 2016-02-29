$(function(){
	$.ajax({
		url:'/do/loadUser.htm',
		type:"POST",
		dataType:'json',
		success:function(data){
			if(data.status==200){
				var objjson = data.data;
			    $("a.welcome").html("您好");
			    $(".login").hide().next().hide();
			    var info = "<a class='login login_user' href='/member/index.htm' phone='" + objjson.mobile + "'>" + objjson.mobile + "</a>&nbsp;";
//			    if (objjson.roleid > 0) {
//			        info += "<a><img src='http://" + document.domain.replace("www", "img") + "/version63/common/vip.png'/></a>"
//			    }
			    info += "<a href='/logOut.htm'>退出</a>";
			    $(".com_top_l").append(info);
			    if ($('.gj_item1a').length > 0) {
			        window.location.reload()
			    }
			}else{
				
			}
			
		}
	});
});