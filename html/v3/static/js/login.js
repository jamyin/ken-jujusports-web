$(function(){
	
	//头部调用登录框事件
	$('.login_btn').on('click',function(){
		open_login();
	})
	$('a.wechat_login, a.wechat').on('click',function(){
		open_login('wechat');
	})
	//登录框关闭事件
	$('.close').on('click',function(){
		$(this).closest('.login_popup').removeClass('open')
	})
	//记住密码事件
	/*$('.remember').on('click',function(){
		$(this).toggleClass('cur')
	})*/
	
	$(document).keydown(function(event){
		if(event.keyCode == 13){ //绑定回车
			$(".login_submit").click();
		}
	}); 
	//登录提交事件
	$('.login_submit').on('click',function(){
		if(!check_login()){
			return false;
		}
		//登录验证通过
		var accountName = $("#login_username").val();
		var pwd = $("#login_password").val();
		//记住密码标记,1为选中，0为未选
		var repwdflag = 0;
		if($('#re_pw').is(':checked')==true){
			repwdflag = 1;
		}else{
			repwdflag = 0;
		}
		
		var userAccount = "";
		var rember_pwd = "";
		if($.cookie("userInfo") != null){
			var userInfo = $.cookie("userInfo");
			var info = userInfo.split(',');
			userAccount = info[0];
			rember_pwd = info[1];					
		}
		if((userAccount == accountName) && (rember_pwd == pwd) ){
			jQuery.ajax({
				url: '/userMan/loginRemPwd.htm',  
	            type: 'POST',  
	            dataType: 'json',    
				data:{userAccount:accountName,password:pwd,repwdflag:repwdflag},
	               error: erryFunction,  //错误执行方法
	               success: succFunction //成功执行方法    
				});
		}else{
			jQuery.ajax({
				url: '/userMan/login.htm',  
	            type: 'POST',  
	            dataType: 'json',    
				data:{userAccount:accountName,password:pwd,repwdflag:repwdflag},
	               error: erryFunction,  //错误执行方法
	               success: succFunction //成功执行方法    
			});						
		}
		
		function succFunction(data){
			var status = data.status;
			var message =data.message;
			if(status == 500){
				layer.msg(data.message);
		    }if(status == 200){
				layer.msg(data.message, {
					shade: [0.9, '#000'],
				    icon: 1,
				    time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function(){
					window.location.reload();
				});
				//location.href = "/v2.0/login.html";
				//return;		    	
				//成功后页面跳转
/*		    	$("#loginStatus").html("<a href='/userMan/userInfo.htm'>"+data.data+"</a>  欢迎您。")
		    	layer.msg(data.message);
		    	close_login('login');
		    	window.location.reload();*/
		    	//window.location.href = "/umanages/umanagesV2.do";
				
		    }
		}
		function erryFunction(){
			//alert('系统错误！');
			layer.msg("系统错误！", 1, 1);
		};
	})
	//取消错误提示
	$('.login_popup input[type=text], .login_popup input[type=password]').keyup(function(){
		$(this).removeClass('wrong')
	})
	
	//登录时检查用户cookie
	if($.cookie("userInfo") != null){
		var userInfo = $.cookie("userInfo");
		var info = userInfo.split(',');
		var userAccount = "";
		var pwd = "";
		var maxAge = "";
		for(i in info){
			userAccount = info[0];
			pwd = info[1];
			maxAge = info[2];
		}
		if(userAccount != null && pwd != null){
			$("#login_username").val(userAccount);
			$("#login_password").val(pwd);
		}
	}

	
	// 微信扫码登陆start 
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	var obj = new WxLogin({
		id:"login_container", 
		appid: "wx3b1d31427f9d2518", 
		scope: "snsapi_login", 
		redirect_uri: "http://www.jujusports.cn/third/weixinLogin.htm",
	});
	/*	var code = getUrlParam('code');
	if(code){
		var add="http://www.jujusports.cn/weixin/getUnionID.do?code="+code;
		$.ajax({
		type: "GET",
		async: false,
		url: add,
		dataType:"json",
		success: function(data){
			if(data.data!=null){
				//alert(data.data);
				$.post("/third/weixinLogin.do",{"openId":data.data},function(logInfo){
					//alert(logInfo);
					//location.href = "myaccount.html";
					layer.msg("登录成功，跳转到用户中心");
					return;
				});
			}else{
				//location.href = "login.html";
				layer.msg("登录失败，请重新登录");
			}
			
		},
		error: function(){ 
			alert("失败");
		}
	});
	}*/
	//微信扫码登陆end


	
	
})
	
	//刷新验证码
	function freshImage(){
		var imageUrl = '/userMan/drawRandom.htm'; //你的生成图片的页面
		$("#check_Code").attr("src",imageUrl + '?' + Math.random());
	};
	
	function close_login(n){
		$('.login_popup').removeClass('open')
	}
	
	//登陆框打开事件
	function open_login(n){
		$('.login_popup').addClass('open')
		if(n=='wechat'){
			$('.wclogin_box').css('display','block').siblings('ul').css('display','none')
			$('.bottom_bar').css('display','none')
		}else{
			$('.wclogin_box').css('display','none').siblings('ul').css('display','block')	
			$('.bottom_bar').css('display','block')
		}

	}
	//验证登录表单
	function check_login(){
		var flag = true;
		//username
	    var LoginUsername = $.trim($("#login_username").val());
		if (LoginUsername.length <= 0) {
			alert_login('login_username')
	        flag = false;
		}
		var phone_reg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;  
		var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
    	if (!phone_reg.test($.trim($('#login_username').val())) && !mail_reg.test($.trim($('#login_username').val()))) {
    		alert_login('login_username')
	        flag = false;
     	}
		//密码
	    var LoginPassWord = $.trim($("#login_password").val());
		if (LoginPassWord.length < 6 || LoginPassWord.length > 32) {
			alert_login('login_password')
			flag = false;
	    }
		//图片验证码
/*	    var picCaptcha = $.trim($("#login_picCaptcha").val());
		if (picCaptcha.length <= 0) {
			alert_login('login_picCaptcha')
			flag = false;
	    }*/
		
		//检验图片验证码
/*		$.ajax({
			url:"/userMan/checkRandom.htm",//提交的网址
			type: 'POST', 
			async:false,
			dataType: 'json',  
			data:{"picCaptcha":picCaptcha},//提交的数据
			success: function(data){
				//console.log(data.status);
				var status = data.status;
	        	if(status == 500){
	        		alert_login('login_picCaptcha');
					flag =  false;
				}else{
					//验证码正确。没有叉号
				}
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});*/
		return flag;
	}
		
	function alert_login(n){
		$('#' + n).addClass('wrong')
	}	