$(function() {
	$(".show-eye").on("click", function() {
		$(this).parent().find("input").toggleClass("hide");
	});
	// 手机注册密码
	$(".js-pwdh").on("change", function() {
		$(".js-pwd").val($(".js-pwdh").val());
	});
	$(".js-pwd").on("change", function() {
		$(".js-pwdh").val($(".js-pwd").val());
	});
	// 邮箱注册密码
	$(".js-pwdh-e").on("change", function() {
		$(".js-pwd-e").val($(".js-pwdh-e").val());
	});
	$(".js-pwd-e").on("change", function() {
		$(".js-pwdh-e").val($(".js-pwd-e").val());
	});
// $(".getcode").on("click", function(e) {
// $(this).addClass("ckd");
// });
	$(".reg-con").on("click", ".hd", function(e) {
		$(this).parent().find(".hd").toggleClass("cur");
		if ($(".js-mobile").hasClass("cur")) {
			$(".reg-con-cen.mobile").removeClass("hide");
			$(".reg-con-cen.email").addClass("hide");
		} else {
			$(".reg-con-cen.mobile").addClass("hide");
			$(".reg-con-cen.email").removeClass("hide");
		}
	});


// $(".item").on("click", function() {
// $(this).parent().find(".item").removeClass("cur");
// $(this).addClass("cur");
// });

	$(".sex").on("click", function() {
		var ckd = $(this).attr("for");
		if ($("#" + ckd).prop("checked")) {
			// do nothing
		} else {
			$(".female").toggleClass("check");
			$(".male").toggleClass("check");
		}
	});

	$(".basic-edit").on("click", function() {
		if ($(this).attr("data-status") === "edit") {
			$(this).text("保存");
			$(this).attr("data-status", "save");
			$(".ucon").find("input").addClass("edit");
			$(".uploadbt,.sex,.pro,.city").removeClass("hide");
			$(".show-inf").addClass("hide");
			$(".js-login,.js-nake").removeAttr("readonly");
		} else {
			$(this).text("编辑");
			getShowValue();
			$(this).attr("data-status", "edit");
			$(".ucon").find("input").removeClass("edit");
			$(".uploadbt,.sex,.pro,.city").addClass("hide");
			$(".show-inf").removeClass("hide");
			$(".js-login,.js-nake").attr("readonly","readonly");
			
			var pic = $("input[name='pic']").val();
			var ajaxParams = $("#userInfo").serialize();
			$.ajax({
				url:'/user/edit.htm',
				type: 'POST',  
				dataType: 'json',
				async:false,
				data:ajaxParams,
				success:function(data){
					//console.log(data);
					if(data.status == 200){
						$(".uimg").attr("src", pic);
						//layer.msg("修改用户信息成功");
						layer.msg("修改用户信息成功", {
							shade: [0.9, '#000'],
						    icon: 6,
						    time: 2000 //2秒关闭（如果不配置，默认是3秒）
						}, function(){
							location.reload();
						}); 
					}else{
						layer.msg("修改用户信息失败");
					}
				}
			})
		}
	});
	
	$(".usafetipc").on("click","label",function(e){
		    $(this).siblings("label").removeClass("cur");
		    $(this).addClass("cur");
		});
	
		$(".usafert").on("click",function(e){
			var _this=$(this);
			if(_this.attr("data-show")==="false"){
				_this.attr("data-show","true");
				if(_this.attr("data-fill")==="true"){
					_this.text("更换安全邮箱");
				}else{
					_this.text("设置");
				}
				_this.next().addClass("hide");
				_this.parent().addClass("bod");
			}else{
				_this.attr("data-show","false");
				_this.text("收起");
				_this.next().removeClass("hide");
				_this.parent().removeClass("bod");
			}
		});
	
	// 注册发送验证码到手机
	$("#getCaptcha").click(function(){
		var mobile = $.trim($("#mobile").val());
		if (mobile.length == 0) {
			alert_redtext('mobile','请输入手机号')
			return false;
		}
		var phone_reg  = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g ;  
    	if (!phone_reg.test($.trim($('#mobile').val()))) {
        	alert_redtext('mobile','手机号码格式不正确');
            return false;
     	}
    	// 图片验证码
		var phonePicCaptcha = $.trim($("#phonePicCaptcha").val());
		if (phonePicCaptcha.length != 4) {
			alert_redtext('phonePicCaptcha','请输入正确位数的验证码')
			return false;
		}
    	/*
		 * var captcha = $("#phone_picCaptcha").val(); if(captcha == null ||
		 * captcha ==""){ alert_redtext('phone_picCaptcha','请先输入验证码'); return
		 * false; }
		 */
		// 校验手机验证码
    	var a = this;
		$.ajax({
			url:"/SMS/regMobileVal.htm",// 提交的网址
			type: 'POST',  
			dataType: 'json',  
			data:{"mobilePhone":mobile,"picCaptcha":phonePicCaptcha},// 提交的数据
			success: function(data){
				if(data.status==500){
					layer.msg(data.message);
				}else{
					layer.msg("发送短信成功，如90秒内未收到短信，请点击获取验证码");
					$('.getcode').addClass("ckd");
					regtime(a);
				}
				// console.log(data.data);
				// alert('发送信息成功！');
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});	
	  });
	// 邮箱提交
	$("#emailSub").on('click', function(){
		// 身份类型
		var emailUserType = $.trim($("#email_user_type").val());
		if (emailUserType.length == 0) {
			alert_redtext('email_user_type','请选择您的身份')
			return false;
		}
		// 邮箱
		var email = $.trim($("#email").val());
		if (email.length == 0) {
			alert_redtext('email','请输入手机号')
			return false;
		}
		// 邮箱验证
		var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
		if (!mail_reg.test($.trim($('#email').val()))) {
        	alert_redtext('email','邮箱格式不正确');
            return false;
     	} 
		// 密码
		var emailPassword = $.trim($("#email_password").val());
		if (emailPassword.length < 6 || emailPassword.length > 16) {
			alert_redtext('phone_password','密码应为6-16位，英文、数字或常用符号')
			return false;
		}
		// 图片验证码
		var picCaptcha = $.trim($("#picCaptcha").val());
		if (picCaptcha.length != 4) {
			alert_redtext('picCaptcha','请输入正确位数的验证码')
			return false;
		}
		// 条款
		if (!$('#email_agreement').prop("checked")) {
			alert_redtextemail('请同意相关服务协议')
			return false;
		}
		$.ajax({
			url:"/user/register.htm",// 提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{utype:emailUserType,email:email,password:emailPassword,picCaptcha:picCaptcha},// 提交的数据
			success: function(data){
				// console.log(data.data);
				var status = data.status;
				var message = data.message;
				if(status==500){
					layer.msg(message);
				}else{
					layer.msg('注册成功,正在跳转至用户中心', {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 // 2秒关闭（如果不配置，默认是3秒）
					}, function(){
//						location.reload();   
						window.location.href = "/user/toPerson.htm";
						// window.location.href = "/index.htm";
					});
				}
				
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
	})
	
	// 手机提交
	$("#mobileSub").on('click', function(){		
		var mobileUserType = $.trim($("#mobile_user_type").val());
		if (mobileUserType.length == 0) {
			alert_redtext('mobile_user_type','请选择您的身份')
			return false;
		}
		var mobile = $.trim($("#mobile").val());
		if (mobile.length == 0) {
			alert_redtext('mobile','请输入手机号')
			return false;
		}
		var phone_reg  = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g ;  
    	if (!phone_reg.test($.trim($('#mobile').val()))) {
        	alert_redtext('mobile','手机号码格式不正确');
            return false;
     	}
    	// 密码
		var phonePassword = $.trim($("#phone_password").val());
		if (phonePassword.length < 6 || phonePassword.length > 16) {
			alert_redtext('phone_password','密码应为6-16位，英文、数字或常用符号')
			return false;
		}
		// 图片验证码
		var phonePicCaptcha = $.trim($("#phonePicCaptcha").val());
		if (phonePicCaptcha.length != 4) {
			alert_redtext('phonePicCaptcha','请输入正确位数的验证码')
			return false;
		}
		// 手机验证码
		var randomPic = $.trim($("#randomPic").val());
		if (randomPic.length <= 0) {
			alert_redtext('randomPic','手机验证码为空')
			return false;
		}
		// 条款
		if (!$('#agreement').prop("checked")) {
			alert_redtextdiv('请同意相关服务协议')
			return false;
		}
		$.ajax({
			url:"/user/register.htm",// 提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{utype:mobileUserType,mobile:mobile,password:phonePassword,randomPic:randomPic,picCaptcha:phonePicCaptcha},// 提交的数据
			success: function(data){
				// console.log(data.data);
				var status = data.status;
				var message = data.message;
				if(status==500){
					layer.msg(message);
				}else{
					layer.msg('注册成功,正在跳转至用户中心', {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 // 2秒关闭（如果不配置，默认是3秒）
					}, function(){
//						location.reload();
						window.location.href = "/user/toPerson.htm";
// window.location.href = "/index.htm";
					});
				}
				
/*
 * if(message=='用户名已存在！'){ //alert_redtext('reg_username',message);
 * layer.msg("邮箱/手机已被注册！"); }else if(message=='未输入验证码或验证码错误！'){
 * //alert_redtext('reg_captcha',message); layer.msg("未输入验证码或验证码错误！"); }else
 * if(message=='恭喜您注册成功！'){ //layer.msg("恭喜您注册成功！"); //window.location.href =
 * '/userMan/userInfo.htm'; layer.msg('注册成功,正在跳转至首页', { shade: [0.9, '#000'],
 * icon: 6, time: 2000 //2秒关闭（如果不配置，默认是3秒） }, function(){ window.location.href =
 * "/userMan/userInfo.htm"; }); }else{ layer.msg(message); }
 */
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
	})
	
	

});
function getShowValue() {
	var sex = $('.ucon-form input[name="gender"]:checked');
	$(".js-sex").text(sex.next().text());
	$(".js-addr").text($(".pro :selected").text() +"  "+ $(".city:first :selected").text()+"  "+$(".city:last :selected").text());
};

// 图片验证码
var imgCodeResult = 0;
function refreshImage(){		
    var imageUrl = '/user/drawRandom.htm'; 
	$(".vcode").attr("src",imageUrl + '?' + Math.random());
};

// 验证表单错误提示
function alert_redtext(d,t){
	$('#' +d).focus().siblings('span').html(t).addClass('red')
}

function alert_redtextdiv(t){
	$('#agreementspan').html(t).addClass('red')
}

function alert_redtextemail(t){
	$('#agreementemailspan').html(t).addClass('red')
}

// 发送验证码按钮 倒数90秒方法
var wait=90; 
function regtime(sendObj) {
	if (wait == 0) {
		// sendObj.attr("disabled",false);
		// sendObj.val("获取验证码");
		sendObj.removeAttribute("disabled");    
		$('.getcode').removeClass("ckd");
		sendObj.value="获取验证码"; 
		wait = 90; 
	} else {
		// sendObj.attr("disabled",true);
		// sendObj.val("请等待"+wait+"秒");
		sendObj.setAttribute("disabled", true); 
		sendObj.value="请等待"+wait+"秒"; 
		wait--; 
		setTimeout(function() { 
			regtime(sendObj) 
		}, 1000) 
	} 
} 
