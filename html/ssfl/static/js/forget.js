$(function() {
	//提交表单-按手机查找
	$("#reg-mobile").on('click', function(){
		//console.log(check_mobile());
		//debugger;
		var check_flag = check_mobile();
		if(check_flag == false){
			return false;
		}
		//console.log("access");
		var mobile = $.trim($("#mobile").val());
		var telcaptcha = $.trim($("#telcaptcha").val());
		var new_pwd = $.trim($("#new_pwd").val());
		$.ajax({
			url:"/user/mobliephone.htm",
			type:"post",
			dataType:"json",
			data:{validateCode:telcaptcha,mobilePhone:mobile,password:new_pwd},
			async: false,
			success:function(data){
				if(data.status == 200){
					layer.msg('成功找回密码,正在跳转至首页,请重新登录~', {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						window.location.href = "/index.htm";
					});
					return;
				}
				if(data.status == 500){
					layer.msg(data.message);
				}
			}
		});
	})
	
	//提交表单-按邮箱查找
	$("#reg-mail").on('click', function(){
		debugger;
		var check_flag = check_mail();
		if(check_flag == false){
			return false;
		}
		var mailcaptcha = $.trim($("#mailcaptcha").val());
		var mail = $.trim($("#mail").val());
		var new_pwd_m = $.trim($("#new_pwd_m").val());
		$.ajax({
			url:"/user/email.htm",
			type:"post",
			dataType:"json",
			data:{validateCode:mailcaptcha,email:mail,password:new_pwd_m},
			async: false,
			success:function(data){
				if(data.status == 200){
					layer.msg('成功找回密码,正在跳转至首页,请重新登录~', {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						window.location.href = "/index.htm";
					});
					return;
				}
				if(data.status == 500){
					layer.msg(data.message);
				}
			}
		});
	});

});

//图片验证码
var imgCodeResult = 0;
function refreshImage(){		
    var imageUrl = '/user/drawRandom.htm'; 
	$(".vcode").attr("src",imageUrl + '?' + Math.random());
};

function myFunction(){		
	/* var x=document.getElementById("picCaptcha");
	x.value=x.value.toUpperCase(); */
		var imgCode = $("#picCaptcha").val();
		$.ajax({
			url:"/user/authImageCode.htm",
			type:"post",
			dataType:"json",
			data:{imgCode:imgCode},
			async: false,
			success:function(data){
				if(data.status == 200){
					imgCodeResult=1;
				}
				if(data.status == 500){
					layer.msg(data.message);
				}
			}
		});
	}
//发送验证码按钮 倒数90秒方法
var waitemail=90,
	timeemail = false,
	ecountdown = false; 	
function sendMail(sendObj) {
	//邮箱
	var mail = $.trim($("#mail").val());
	var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
	if(mail.length <= 0){
		alert_redtext('mail','邮箱地址为空')
	    return false;
	}else if (!mail_reg.test(mail)) {
		alert_redtext('mail','邮箱地址不正确')
	    return false;
    }else{
    	alert_redtext('mail','')
    }
	if (timeemail == false) {
		$.ajax({
			url:"/user/email/send.htm",
			type:"post", 
			dataType:"json",
			data:{email:mail},
			async: false,
			success:function(data){		
				timeemail = true;
				if(data.status == -1){
					alert_redtext('mail','此邮箱未注册过请先注册！');
					timeemail = false;
					return false;
				}
				if(data.status == 200){
					layer.msg("邮件成功发出请留意您的邮箱，如一直没收到请留意查看是否在垃圾邮箱里~");		
					ecountdown = true;							
				}
				if(data.status == 500){
					layer.msg(data.message);
					timeemail = false;
					return;
				}
			}
		});			
	}	
	if (ecountdown) {
		if (waitemail == 0) {
			//sendObj.attr("disabled",false);
			//sendObj.val("获取验证码");
			sendObj.removeAttribute("disabled");         
			sendObj.value="获取验证码"; 
			waitemail = 90; 
			timeemail = false;
			ecountdown = false; 	
		} else {
			//sendObj.attr("disabled",true);
			//sendObj.val("请等待"+wait+"秒");			
			sendObj.setAttribute("disabled", true); 
			sendObj.value="请等待"+waitemail+"秒"; 
			waitemail--; 
			setTimeout(function() { 
				sendMail(sendObj) 
			}, 1000) 
		}
	}
} 
//发送验证码按钮 倒数90秒方法
var wait=90; 
timeB = false,
scountdown = false; 
function time(sendObj) {
	if (null == $("#picCaptcha").val() || '' == $("#picCaptcha").val()) {
		layer.msg("请输验证码");
		return;
	}
	if (imgCodeResult == 0) {
		layer.msg("请输入正确的验证码");
		return;
	}
	/* var telephone = $("#mobile").val();
	if (null == telephone || '' == telephone) {
		alert("请输入手机号码");
		return;
	} */
	var mobile = $.trim($("#mobile").val());
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
    	if (!phone_reg.test(mobile)) {
		alert_redtext('mobile','手机格式不正确')
        return false;
     }
    	var picCaptcha = $("#picCaptcha").val();
   	if (timeB == false) {
   		$.ajax({
			url:"/user/SMS/send.htm",
			type:"post", 
			dataType:"json",
			data:{mobilePhone:mobile,picCaptcha:picCaptcha},
			async: false,
			success:function(data){		
				timeB = true;
				if(data.status == -1){
					alert_redtext('mobile','此号码未注册过请先注册！');
					timeB = false;
					return false;
				}
				if(data.status == 200){
					layer.msg("短信成功发出请留意您的手机短信~");		
					scountdown = true;    					
				}
				if(data.status == 500){
					layer.msg(data.message);
					timeB = false;
					return;
				}
			}
		});	
		}	
   	if (scountdown) {
   		if (wait == 0) {
   			//sendObj.attr("disabled",false);
   			//sendObj.val("获取验证码");
   			sendObj.removeAttribute("disabled");         
   			sendObj.value="获取验证码"; 
   			wait = 90; 
   			timeB = false;
   			scountdown = false;
   		} else {
   			//sendObj.attr("disabled",true);
   			//sendObj.val("请等待"+wait+"秒");			
   			sendObj.setAttribute("disabled", true); 
   			sendObj.value="请等待"+wait+"秒"; 
   			wait--; 
   			setTimeout(function() { 
   				time(sendObj) 
   			}, 1000) 
   		}    		
   	}       	
} 
function sendMessage(sendObj) {
	//debugger;
	if (null == $("#picCaptcha").val() || '' == $("#picCaptcha").val()) {
		layer.msg("请输入验证码");
		return;
	}
	if (imgCodeResult == 0) {
		layer.msg("请输入正确的验证码");
		return;
	}
	var mobile = $.trim($("#mobile").val());
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
    	if (!phone_reg.test(mobile)) {
		alert_redtext('mobile','手机格式不正确')
        return false;
     }
    	var picCaptcha = $("#picCaptcha").val();
   	if (timeB == false) {
   		$.ajax({
			url:"/user/SMS/send.htm",
			type:"post", 
			dataType:"json",
			data:{mobilePhone:mobile,picCaptcha:picCaptcha},
			async: false,
			success:function(data){		
				timeB = true;
				if(data.status == -1){
					alert_redtext('mobile','此号码未注册过请先注册！');
					timeB = false;
					return false;
				}
				if(data.status == 200){
					layer.msg("短信成功发出,请留意您的手机短信");		
					scountdown = true;    					
				}
				if(data.status == 500){
					layer.msg(data.message);
					timeB = false;
					return;
				}
			}
		});	
		}	
   	if (scountdown) {
   		if (wait == 0) {
   			//sendObj.attr("disabled",false);
   			//sendObj.val("获取验证码");
   			sendObj.removeAttribute("disabled");         
   			sendObj.value="获取验证码"; 
   			wait = 90; 
   			timeB = false;
   			scountdown = false;
   		} else {
   			//sendObj.attr("disabled",true);
   			//sendObj.val("请等待"+wait+"秒");			
   			sendObj.setAttribute("disabled", true); 
   			sendObj.value="请等待"+wait+"秒"; 
   			wait--; 
   			setTimeout(function() { 
   				time(sendObj) 
   			}, 1000) 
   		}    		
   	}       	
} 

//验证表单
function check_mobile(){
		//debugger;
		var flag = true;
		//手机
		var mobile = $.trim($("#mobile").val());
		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
		if (mobile.length <= 0) {
			alert_redtext('mobile','手机号为空')
			flag = false;
	     }else if(!phone_reg.test(mobile)) {
			alert_redtext('mobile','手机格式不正确')
			flag = false;
         }else{
        	 alert_redtext('mobile','')
         }
		
		//新密码
    	var new_pwd = $.trim($("#new_pwd").val());
    	if (new_pwd.length <= 0) {
			alert_redtext('new_pwd','新密码为空')
			flag = false;
	    }else if(new_pwd.length < 6 || new_pwd.length > 16) {
			alert_redtext('new_pwd','新密码应为6-16位，英文、数字或常用符号')
			flag = false;
    	}else{
       	 alert_redtext('new_pwd','')
        }
		//确认新密码
    	var confirm_pwd = $.trim($("#confirm_pwd").val());
    	//console.log("new_pwd = "+ new_pwd + "confirm_pwd = "+ confirm_pwd);
    	if(confirm_pwd.length <= 0) {
			alert_redtext('confirm_pwd','确认密码为空')
			flag = false;
	    }else if(confirm_pwd.length < 6 || confirm_pwd.length > 16) {
			alert_redtext('confirm_pwd','确认密码应为6-16位，英文、数字或常用符号')
			flag = false;
    	}else if(new_pwd != confirm_pwd) {
			alert_redtext('confirm_pwd','新密码和确认新密码不一致')
			flag = false;
		}else{
       	 alert_redtext('confirm_pwd','')
        }
		 //图片验证码
        var picCaptcha = $.trim($("#picCaptcha").val());
        if(picCaptcha.length <= 0) {
			alert_redtext('picCaptcha','图片验证码为空')
			flag = false;
	    }else if (picCaptcha.length <= 0 || imgCodeResult == 0) {
			alert_redtext('picCaptcha','图片验证码不正确')
			flag = false;
    	}else{
       	 alert_redtext('picCaptcha','')
        }
		 //手机验证码
    	var telcaptcha = $.trim($("#telcaptcha").val());
    	if(telcaptcha.length <= 0) {
			alert_redtext('telcaptcha','短信验证码为空')
			flag = false;
	    }else if(telcaptcha.length <= 0) {
			alert_redtext('telcaptcha','短信验证码不正确')
			flag = false;
    	}else{
       	 alert_redtext('telcaptcha','')
        }
    	return flag;
	}
		//邮箱
function check_mail(){
		var mail_flag = true;
		var mail = $.trim($("#mail").val());
		var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
		if(mail.length <= 0){
			alert_redtext('mail','邮箱地址为空')
			mail_flag = false;
		}else if(!mail_reg.test(mail)) {
			alert_redtext('mail','邮箱地址不正确')
			mail_flag = false;
        }else{
       	 alert_redtext('mail','')
        }
		
		//邮箱验证码
    	var mailcaptcha = $.trim($("#mailcaptcha").val());
		if (mailcaptcha.length <= 0) {
		 	alert_redtext('mailcaptcha','邮箱验证码为空')
		 	mail_flag = false;
    	}else{
       	 	alert_redtext('mailcaptcha','')
        } 
		
		//新密码
		var new_pwd_m = $.trim($("#new_pwd_m").val());
		if(new_pwd_m.length <= 0){
			alert_redtext('new_pwd_m','新密码为空')
			mail_flag = false;
		}else if(new_pwd_m.length < 6 || new_pwd_m.length > 16) {
			alert_redtext('new_pwd_m','新密码应为6-16位，英文、数字或常用符号')
			mail_flag = false;
		}else{
       	 	alert_redtext('new_pwd_m','')
        } 
		
		//确认新密码
		var confirm_pwd_m = $.trim($("#confirm_pwd_m").val());
		if(confirm_pwd_m.length <= 0){
			alert_redtext('confirm_pwd_m','确认密码为空')
			mail_flag = false;
		}else if(confirm_pwd_m.length < 6 || confirm_pwd_m.length > 16) {
			alert_redtext('confirm_pwd_m','确认密码应为6-16位，英文、数字或常用符号')
			return false;
		}
		else if(confirm_pwd_m != new_pwd_m) {
			alert_redtext('confirm_pwd_m','新密码和确认新密码不一致')
			return false;
		}else{
       	 	alert_redtext('confirm_pwd_m','')
        }
	}

//验证表单错误提示
function alert_redtext(d,t){
	$('#' +d).siblings('span').html(t).addClass('red')
}
