$.post("/umanages/showUserAccount.do", {}, function(data) {
	
	
	var userAccount = data.data;
	
	var status=data.status;
	if(status==500){
		$(".thirdparty").html("");
		alert(data.message);
		return;
	}
	
	//验证微信绑定
	if($.trim(userAccount.weixin).length > 0){
		$("#weixinN").addClass("none");
		$("#weixinY").removeClass("none");
	}else{
		$("#weixinY").addClass("none");
		$("#weixinN").removeClass("none");
	}
	
	
	//验证QQ绑定
	if($.trim(userAccount.qq).length > 0){
		$("#qqN").addClass("none");
		$("#qqY").removeClass("none");
	}else{
		$("#qqY").addClass("none");
		$("#qqN").removeClass("none");
	}
	
	
	
	//验证新浪微博绑定
	if($.trim(userAccount.sina).length > 0){
		$("#sinaN").addClass("none");
		$("#sinaY").removeClass("none");
	}else{
		$("#sinaY").addClass("none");
		$("#sinaN").removeClass("none");
	}
	
	
//	//验证微信绑定
//	if($.trim(userAccount.weixin).length > 0){
//		con+="<li class='thpbindsuc'><img src='img/wechatlogo.png' border='0' alt=''><span class='one'>已绑定微信</span></li>";
//	}else{
//		con+="<li class='wx unthirdparty'><img src='img/wechatlogo.png' border='0' alt=''><span class='up'>绑定微信</span><span class='down'>绑定后在微信中访问聚运动的任何连接将免于繁琐的登录输入，并自动找到你的账号</span></li>";
//	}
//	
//	
//	//验证QQ绑定
//	if($.trim(userAccount.qq).length > 0){
//		con+="<li class='thpbindsuc none'><img src='img/qqlogo.png' border='0' alt=''><span class='one'>&nbsp;已绑定QQ</span></li>";
//	}else{
//		con+="<li class='unthirdparty'><img src='img/qqlogo.png' border='0' alt=''><span class='up'>绑定QQ</span><span class='down'>绑定后可以使用QQ快捷登录</span><a class='tencent' id='qqLoginBtn' href='javascript:void(0);'>QQ登录</a></li>";
//	}
//	
//	
//	
//	//验证新浪微博绑定
//	if($.trim(userAccount.sina).length > 0){
//		con+="<li class='thpbindsuc'><img src='img/weibologo.png' border='0' alt=''><span class='one'>已绑定微博</span></li>";
//	}else{
//		con+="<li class='unthirdparty'><img src='img/weibologo.png' border='0' alt=''><span class='up'>绑定微博</span><span class='down'>绑定后在电脑上还是手机上都可以使用新浪微博账号授权登录 </span><a class='sina' id='wb_connect_btn' href='javascript:void(0);'>新浪登录</a></li>";
//	}
//	node.html(con);
});