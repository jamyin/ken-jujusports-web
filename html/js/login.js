	$(function(){
	    var _pageTag = getQueryStringByName('_pageTag');
	    //alert(_pageTag);
		$('#'+ _pageTag +'_cont').addClass('show');
		$('.tabbar li#'+ _pageTag).addClass('cur');	    
		
		//页面切换效果
		$('.tabbar li').on('click',function(){
			$(this).addClass('cur').siblings().removeClass('cur')
			$('#' + $(this).attr('id') + '_cont').addClass('show').siblings('div').removeClass('show')
		})
		
		$('.rem').on('click',function(){
			$(this).toggleClass('checked')
		})
		
		$('.submit_btn').hover(function(){
			$(this).addClass('hover')
		},function(){
			$(this).removeClass('hover')
		});
		
		//打开微信二维码
		$('.renren').on('click',function(){
			$(this).parent().find('p').toggleClass('show') //打开
			//$('.right_col p').removeClass('show') //关闭
		})
				

		
		//登录验证
		$('.login_btn').on('click',function(){
			//alert("denglu"+$(this).closeset('.contbox').att('id'));
        	if ($.trim($('#log_username').val()).length <= 0) {
            	alert_redtext('log_username','请输入用户名！');
            	return false;
        	}
        	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
        	if (!phone_reg.test($.trim($('#log_username').val()))) {
            	alert_redtext('log_username','用户名需为手机号，格式不正确！');
                return false;
         	}

        	if ($.trim($('#log_password').val()).length <= 0) {
            	alert_redtext('log_password','密码不能为空！');
            	return false;
        	}
			//alert('pass')
        	//登录验证通过
				var accountName = $("#log_username").val();
				var pwd = $("#log_password").val();
				//记住密码标记,1为选中，0为未选
				var repwdflag = 0;
				if($('#re_pw').is(':checked')==true){
					repwdflag = 1;
				}else{
					repwdflag = 0;
				}
				
				var phoneNum = "";
				var rember_pwd = "";
				if($.cookie("userInfo") != null){
					var userInfo = $.cookie("userInfo");
					var info = userInfo.split(',');
					phoneNum = info[0];
					rember_pwd = info[1];					
					//for(i in info){
					//}
				}
				if((phoneNum == accountName) && (rember_pwd == pwd) ){
					jQuery.ajax({
						url: '/umanages/loginV2RemPwd.do',  
			            type: 'POST',  
			            dataType: 'json',    
						data:{accountName:accountName,pwd:pwd,repwdflag:repwdflag},
			               error: erryFunction,  //错误执行方法
			               success: succFunction //成功执行方法    
						});
				}else{
					jQuery.ajax({
						url: '/umanages/loginV2.do',  
			            type: 'POST',  
			            dataType: 'json',    
						data:{accountName:accountName,pwd:pwd,repwdflag:repwdflag},
			               error: erryFunction,  //错误执行方法
			               success: succFunction //成功执行方法    
					});						
				}
				
				function succFunction(data){
					var status = data.status;
					var message =data.message;
					if(status == 500){
						alert_redtext('log_username',data.message);
				    }if(status == 200){
						//成功后页面跳转
				    	//alert(message);
				    	window.location.href = "/umanages/umanagesV2.do";
				    }
				}
				function erryFunction(){
					//alert('系统错误！');
					layer.msg("系统错误！", 1, 1);
				};
				
	    	
		 })

		//注册验证
		$('.reg_btn').on('click',function(){
        	if ($.trim($('#reg_username').val()).length <= 0) {
            	alert_redtext('reg_username','请输入用户名！');
            	return false;
        	}
        	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
        	if (!phone_reg.test($.trim($('#reg_username').val()))) {
            	alert_redtext('reg_username','用户名需为手机号，格式不正确！');
                return false;
         	}
			if ($.trim($('#reg_captcha').val()).length <= 0) {
            	alert_redtext('reg_captcha','验证码不能为空！');
            	return false;
        	}
        	if ($.trim($('#reg_password').val()).length <= 0) {
            	alert_redtext('reg_password','密码不能为空！');
            	return false;
        	}
        	var re = /^[a-zA-z].{5,17}$/;
    		if (!re.test($.trim($('#reg_password').val()))) {
    			//layer.tips('必须以字母开头的6-18位', '#password');
    			alert_redtext('reg_password','密码必须以字母开头且是6-18位！');
    			return false;
    		}
        	if ($.trim($('#reg_password_cf').val()).length <= 0) {
            	alert_redtext('reg_password_cf','再一次输入密码不能为空！');
            	return false;
        	}
			
        	if ($.trim($('#reg_password_cf').val()) != $.trim($('#reg_password').val())) {
            	alert_redtext('reg_password_cf','二次输入密码不相同！');
            	return false;
        	}
        	//注册验证通过
			var dataParams =  $("#user_reg").serialize();
        	$.ajax({
    			url:"/umanages/registerV2.do",//提交的网址
    			type: 'POST',  
    			dataType: 'json',  
    			data:dataParams,
    			success: function(data){
    				var jsonData = data.message;
    				if(jsonData == '用户名已存在！'){
    					alert_redtext('reg_username','用户名已存在！');
    				}if(jsonData == '未输入验证码或验证码错误！'){
    					alert_redtext('reg_captcha','未输入验证码或验证码错误！');
    				}if(jsonData == '恭喜您注册成功！'){
    					//alert(jsonData);
    					//window.location.href = '/app/user/userIndex.html';
    					window.location.href = '/login.html?_pageTag=login';
    				}
    			},error :function(){	
    				//alert('系统错误！');
    				layer.msg("系统错误！", 1, 1);
    			}
    		});
		 })
		 
		 //取消错误提示
		 $('.left_col input[type=text], .left_col input[type=password]').keyup(function(){
				$('#' + $(this).attr('id') + '_wrong').empty();
		 })
		//注册发送验证码到手机
		$("#captcha_btn").click(function(){
			var reg_username = $("#reg_username").val();
			var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
        	if (!phone_reg.test($.trim($('#reg_username').val()))) {
            	alert_redtext('reg_username','请输入正确的手机号！');
                return false;
         	}
			var picCaptcha = $(".picCaptcha").val();
			if ($(".picCaptcha")==undefined || ($.trim($('.picCaptcha').val()).length <= 0)) {
            	alert_redtext('picCaptcha','请输入图片验证码！');
            	return false;
        	}
		
			//检验图片验证码
			$.ajax({
				url:"/umanages/checkRandom.do",//提交的网址
				type: 'POST',  
				dataType: 'json',  
				data:{"picCaptcha":picCaptcha},//提交的数据
				success: function(data){
					//console.log(data.status);
					var status = data.status;
		        	if(status == 500){
						alert_redtext('picCaptcha','请输入正确的图片验证码！');
						return false;
					}
		        	var sendObj =$(".sent_c");
					time(sendObj);
					$('.tips_code').html("发送成功 " + $.trim($('#reg_username').val()) + "，如在90秒内未收到短信，请再次点击发送验证码。 ")
					$.ajax({
						url:"/SMS/regMobileVal.do",//提交的网址
						type: 'POST',  
						dataType: 'json',  
						data:{"mobilePhone":reg_username},//提交的数据
						success: function(data){
							//console.log(data.data);
							//alert('发送信息成功！');
						},error :function(){
							//alert('系统错误！');
							layer.msg("系统错误！", 1, 1);
						}
					});
					
				},error :function(){
					//alert('系统错误！');
					layer.msg("系统错误！", 1, 1);
				}
			});
		    });
		
/*		//验证码发送成功后执行
		$('.sent_c').on('click',function(){
			var reg_username = $.trim($('#reg_username').val());
			var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
        	if (!phone_reg.test($.trim($('#reg_username').val()))) {
            	alert_redtext('reg_username','请输入正确的手机号！');
                return false;
         	}
        	if (!phone_reg.test(reg_username)) {
                return false;
         	}
			time(this);
			$('.tips_code').html("发送成功 " + $.trim($('#reg_username').val()) + "，如在60秒内未收到短信，请再次点击发送验证码。 ")
		})*/
		
		//登录时检查用户cookie
			if($.cookie("userInfo") != null){
				var userInfo = $.cookie("userInfo");
				var info = userInfo.split(',');
				var phoneNum = "";
				var pwd = "";
				var maxAge = "";
				for(i in info){
					phoneNum = info[0];
					pwd = info[1];
					maxAge = info[2];
				}
				if(phoneNum != null && pwd != null){
					$("#log_username").val(phoneNum);
					$("#log_password").val(pwd);
				}
			}
		
	})
	
	//错误信息提示调用方法
	function alert_redtext(name,message){//name传入 input<id>, message传入错误提示
		$('#' + name + '_wrong').html(message);
	}
	
	//发送验证码按钮 倒数60秒方法
	var wait=90; 
	function time(sendObj) {
		//console.log("++sendObj"+sendObj);
		if (wait == 0) {
			$('.tips_code').empty()
			sendObj.attr("disabled",false);
			sendObj.val("获取验证码");
			//sendObj.removeAttribute("disabled");         
			//sendObj.value="获取验证码"; 
			wait = 90; 
		} else {
			sendObj.attr("disabled",true);
			sendObj.val("请等待"+wait+"秒");			
			//sendObj.setAttribute("disabled", true); 
			//sendObj.value="请等待"+wait+"秒"; 
			wait--; 
			setTimeout(function() { 
				time(sendObj) 
			}, 1000) 
		} 
	} 
	
	function refreshImage(){
		var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
		$("#check_Code").attr("src",imageUrl + '?' + Math.random());
	};
    




	
