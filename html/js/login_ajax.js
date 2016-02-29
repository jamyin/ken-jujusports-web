
//登录验证
		$('.login_btn').on('click',function(){
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
			var accountName = $("#log_username").val();
			var pwd = $("#log_password").val();
			//记住密码标记,1为选中，0为未选
			var repwdflag = 0;
			if($('#re_pw').is(':checked')==true){
				repwdflag = 1;
			}else{
				repwdflag = 0;
			}
		    jQuery.ajax({
			url: '/umanages/loginV2.do',  
            type: 'POST',  
            dataType: 'json',    
			data:{accountName:accountName,pwd:pwd,repwdflag:repwdflag},
               error: erryFunction,  //错误执行方法
               success: succFunction //成功执行方法    
			});	
		    function succFunction(data){
				var status = data.status;
				var message =data.message;
				
				if(status == 500){
					alert_redtext('log_username',data.message);
			    }if(status == 200){
			    	//alert("登录成功");
			    	$.post("/umanages/showlogin.do",{},function (data){
			    		var userAccount=data.data;
			    		if(userAccount.type==1){
			    			$(".login").html("<a href='/personal_center.html'>"+userAccount.nickName+"</a>| <a href='javascript:;' onclick='loginout()'>注销</a>");
			    		}else{
			    			$(".login").html("<a href='/app/site/siteIndex.html'>"+userAccount.nickName+"</a>| <a href='javascript:;' onclick='loginout()'>注销</a>");
			    		}
			    		$('.login_pop').removeClass('poping');
			    		
			    	});
			    	//window.location.href = "/umanages/umanagesV2.do";
			    }
			}
			function erryFunction(){
				alert('系统错误！');
			};
		 })
		
		 //取消错误提示
		 $('.left_col input[type=text], .left_col input[type=password]').keyup(function(){
				$('#' + $(this).attr('id') + '_wrong').empty();
		 })		
	
	//错误信息提示调用方法
	function alert_redtext(name,message){//name传入 input<id>, message传入错误提示
		$('#' + name + '_wrong').html(message);
	}
