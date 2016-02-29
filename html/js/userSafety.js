$
		.post(
				"/umanages/showUserInfo.do",
				{},
				function(data) {
					var userinfo = data.data;
					if (data.status == 500) {
						alert(data.message);
					}
					// 手机绑定
					if ($.trim(userinfo.mobileNo).length > 0) {
						var phone = userinfo.mobileNo;
						var phoneStatus = $("#phoneStatus");
						var phoneStatusCon = "<div class='icon thi'><div class='thi'></div></div><span class='up'>绑定手机 </span><span class='down'>您验证的手机："
								+ phone
								+ "</span><span onclick='openelephone()' class='securityedit' >修改手机</span>";
						phoneStatus.html(phoneStatusCon);

						var phoneShow = $("#phoneShow");
						var phoneShowCon = "<span>修改手机</span>"
								+ "<div class='closebut' id='closebut'></div>"
								+ "<ul class='layermaskinfolist'>"
								+ "<li class='lilfirsttext'>已绑定的手机："+phone+"<p>点击获取后，默认手机上将收到一条验证短信！</p>"
								+ "<div class='picdiv'>"
								+ "<p class='lfontsize'>图片验证码：</p><input type='text' class='piccode picCaptcha' placeholder='请输入验证码' name='piccode' id='piccode' />"
								+ "<img id='check_Code' onclick='refreshImage()'  src='/umanages/drawRandom.do'   style='vertical-align: middle; float:left; margin:10px 0 0 17px;height: 32px; width: 110px; cursor: pointer;' /><input type='button' id='getEditVerifyPhone' class='getcode' value='获取验证码'></div></li>"
								+ "<li class='lilfirsttext' style='font-size:12px;'>若该手机无法接收验证短信，请拔打客服电话 021-663-028-28。点击获取后，默认手机上将收到一条验证短信！ </li>"
								+ "<li>动态验证码：<input type='text' placeholder='请输入动态验证码' name='verifyPhone' id='verifyPhone' /></li>"
								+ "<li>新的号码：&nbsp;&nbsp;&nbsp;<input type='text' placeholder='请输入新的号码' name='phone' id='phone' /></li>"
								+ "<li>新号验证：&nbsp;&nbsp;&nbsp;<input type='text' placeholder='请输入新号验证' name='renewphone' id='renewphone' /></li>"
								+ "<span class='perwrong' id='code_per_wrong'></span>"
								+ "<li class='editbtn' id='phoneEditSubmit'>确认提交</li>"
								+ "</ul>";
						phoneShow.html(phoneShowCon);
					} else {
						// var phone=userinfo.mobileNo;
						var phoneStatus = $("#phoneStatus");
						var phoneStatusCon = "<div class='icon thi'><div class='thi'></div></div><span class='up'>绑定手机 </span><span class='down'>还未绑定手机,请绑定您的手机</span><span onclick='openelephone()' class='securityedit' >绑定手机</span>";
						phoneStatus.html(phoneStatusCon);

						var phoneShow = $("#phoneShow");
						var phoneShowCon = "<span>绑定手机</span>"
								+ "<div class='closebut' id='closebut'></div>"
								+ "<ul class='layermaskinfolist'>"
								+ "<li class='lilfirsttext'>请在下方输入您需要绑定的手机号码<p>点击获取后，默认手机上将收到一条验证短信！</p>"
								+ "<div class='picdiv'>"
								+ "<p class='lfontsize'>图片验证码：</p><input type='text' class='piccode picCaptcha' placeholder='请输入验证码' name='piccode' id='piccode' />"
								+ "<img id='check_Code' onclick='refreshImage()' src='/umanages/drawRandom.do'   style='vertical-align: middle; float:left; margin:10px 0 0 17px;height: 32px; width: 110px; cursor: pointer;'  /><input type='button' id='getVerifyPhone' class='getcode' value='获取验证码'></div></li>"	
								+ "<li>动态验证码：<input type='text' placeholder='请输入动态验证码' name='verifyPhone' id='verifyPhone' /></li>"
								+ "<li class='lilfirsttext' style='font-size:12px;'>若该手机无法接收验证短信，请拔打客服电话 021-663-028-28。点击获取后，默认手机上将收到一条验证短信！ </li>"
								+ "<li>手机号码：&nbsp;&nbsp;&nbsp;<input type='text' placeholder='请输入手机号码' name='phone' id='phone' /></li>"
								+ "<span class='perwrong' id='code_per_wrong'></span>"
								+ "<li class='editbtn' id='phoneSubmit'>确认提交</li>"
								+ "</ul>";
						phoneShow.html(phoneShowCon);
					}
					$('#getVerifyPhone').on('click', function() {
						alert_redtext('code', '');
						phoneOut();
					});
					$('#getEditVerifyPhone').on('click', function() {
						alert_redtext('code', '');
						phoneEditOut();

					});
					$('#phoneSubmit').on('click', function() {
						alert_redtext('', '');
						phoneSub();
					});
					$('#phoneEditSubmit').on('click', function() {
						alert_redtext('', '');
						phoneEditSub();
					});

					// 邮箱绑定
					if ($.trim(userinfo.email).length > 0) {
						var email = userinfo.email;
						if(!email){email =""}
						var emailStatus = $("#emailStatus");
						var emailStatusCon = "<div class='icon sed'><div class='sed'></div></div><span class='up'>绑定邮箱</span><span class='down'>您绑定的邮箱："+ email+ " </span><span onclick='openemail()' class='securityedit'>修改邮箱</span>";
						emailStatus.html(emailStatusCon);

						var emailShow = $("#emailShow");
						var emailShowCon = "<span>修改邮箱</span>"
								+ "<div class='closebut' id='closebut'></div>"
								+ "<ul class='layermaskinfolist'>"
								+ "<li class='lilfirsttext'>当前登录邮箱："
								+ email
								+ "</li>"
								+ "<li>设置邮箱：<input type='text' placeholder='请输入设置邮箱' name='email' id='email' /></li>"
								+ "<li>确认邮箱：<input type='text' placeholder='请输入确认邮箱' name='newEmail' id='newEmail' /></li>"
								+ "<span class='perwrong' id='email_per_wrong'></span>"
								+ "<li class='editbtn' id='emailSubmit'>确认提交</li>"
								+ "</ul>";
						emailShow.html(emailShowCon);
					} else {
						// var email=userinfo.mobileNo;
						var emailStatus = $("#emailStatus");
						var emailStatusCon = "<div class='icon sed'><div class='sed'></div></div><span class='up'>绑定邮箱</span><span class='down'>你还未绑定邮箱，请设置您的邮箱 </span><span onclick='openemail()' class='securityedit'>设置邮箱</span>";
						emailStatus.html(emailStatusCon);

						var emailShow = $("#emailShow");
						var emailShowCon = "<span>设置邮箱</span>"
								+ "<div class='closebut' id='closebut'></div>"
								+ "<ul class='layermaskinfolist'>"
								+ "<li class='lilfirsttext'>请输入你需要设置的邮箱地址</li>"
								+ "<li>设置邮箱：<input type='text' placeholder='请输入设置邮箱' name='email' id='email' /></li>"
								+ "<li>确认邮箱：<input type='text' placeholder='请输入确认邮箱' name='newEmail' id='newEmail' /></li>"
								+ "<span class='perwrong' id='email_per_wrong'></span>"
								+ "<li class='editbtn' id='emailSubmit'>确认提交</li>"
								+ "</ul>";
						emailShow.html(emailShowCon);
					}

					$('#emailSubmit').on('click', function() {
						emailSub();
					});

					$('.closebut').on('click', function() {
						$('.layermask').addClass('none');
					});

					// 密码修改
					if (userinfo.isThirdUser) {
						$("#layermaskpassword").remove();
						$("#passwordStatus").remove();
					} else {
						$('#editbtnpassword').on('click', function() {
							passwordEditSub();
						});
					}

				});

// ///////////////////////////////////密码修改/////////////////////////////////////////////
function passwordEditSub() {
	var oldpassword = $("#oldpassword").val();
	var newpassword = $("#newpassword").val();
	var renewpassword = $("#renewpassword").val();

	if ($.trim($('#oldpassword').val()).length <= 0) {
		alert_redtext('password', '* 请输入原始密码！');
		return false;
	}
	if ($.trim($('#oldpassword').val()).length < 6) {
		alert_redtext('password', '* 密码最少需要6位！');
		return false;
	}
	if ($.trim($('#newpassword').val()).length <= 0) {
		alert_redtext('password', '* 请输入设置密码！');
		return false;
	}
	if ($.trim($('#newpassword').val()).length < 6) {
		alert_redtext('password', '* 设置密码最少需要6位！');
		return false;
	}
	if ($.trim($('#renewpassword').val()).length <= 0) {
		alert_redtext('password', '* 请输入确认密码！');
		return false;
	}

	if (newpassword != renewpassword) {
		alert_redtext('password', '* 两次输入的密码不一致！');
		return false;
	}

	$.post("/umanages/modifyPwd.do", {
		"oldpassword" : oldpassword,
		"newpassword" : newpassword
	}, function(data) {
		var status = data.status;
		var message = data.message;
		if (status == 500) {
			if (message == "用户未登陆或登陆失效！") {
				alert_redtext('password', '* 用户未登陆或登陆失效！');
				return false;
			}
			if (message == "原密码输入错误") {
				alert_redtext('password', '* 原密码输入错误');
				return false;
			}
			if (message == "原密码和新密码一致！") {
				alert_redtext('password', '* 原密码和新密码一致！');
				return false;
			}
			if (message == "修改密码失败！") {
				alert_redtext('password', '* 修改密码失败！');
				return false;
			}
		}
		if (status == 200) {
			location.href = "/personal_security.html";
		}
		$("#oldpassword").val("");
		 $("#newpassword").val("");
		 $("#renewpassword").val("");
	});

}

// ///////////////////////////////////邮箱安全/////////////////////////////////////////////
function emailSub() {

	var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if ($.trim($('#email').val()).length <= 0) {
		alert_redtext('email', '* 请输入邮箱地址！');
		return false;
	}
	if ($.trim($('#email').val()).length > 0
			&& !szReg.test($.trim($('#email').val()))) {
		alert_redtext('email', '* 请输入正确的邮箱地址！');
		return false;
	}
	var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if ($.trim($('#email').val()).length > 0
			&& !szReg.test($.trim($('#email').val()))) {
		alert_redtext('email', '* 请输入正确的邮箱地址！');
		return false;
	}

	if ($('#email').val() != $('#newEmail').val()) {
		alert_redtext('email', '* 两次输入的邮箱地址不同！');
		return false;
	}

	if ($.trim($('#email').val()).length > 50) {
		alert_redtext('email', '* 邮箱长度不能大于50位！');
		return false;
	}

	$.post("/email/editmail.do", {
		"email" : $.trim($('#email').val())
	}, function(data) {
		var status = data.status;
		var message = data.message;
		if (status == 500) {
			if (message == "用户未登录") {
				alert_redtext('email', '* 用户未登陆！');
				return false;
			}
			if (message == "邮箱为空") {
				alert_redtext('email', '* 邮箱为空！');
				return false;
			}
			if (message == "邮箱修改失败！") {
				alert_redtext('email', '* 邮箱修改失败！');
				return false;
			}
		}

		if (status == 200) {
			location.href = "/personal_security.html";
		}

	});

}

// 验证码发送成功后执行
// $('.getcode').on('click',function(){
// time(this)
// })

// ///////////////////////////////////手机安全/////////////////////////////////////////////

var wait = 90;
function time(o) {
	if (wait == 0) {
		// 修改属性
		o.setAttribute("style", "background:#1996D7;");
//		o.empty();
		$('#getVerifyPhone').empty();
		$('#getEditVerifyPhone').empty();
		o.removeAttribute("disabled");
		o.value = "获取验证码";
		wait = 90;
	} else {
		// 修改属性
		o.setAttribute("style", "background:#a1a1a1;");
		o.setAttribute("disabled", true);
		o.value = "请等待" + wait + "秒";
		wait--;
		setTimeout(function() {
			time(o)
		}, 1000)
	}
}

function phoneOut() {
	var phone = $("#phone").val();
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	if ($.trim(phone).length < 1 || $.trim(phone).length > 0
			&& !phone_reg.test(phone)) {
		alert_redtext('code', '* 未输入手机号或格式不正确！');
		return false;
	}
	if (phone) {
		var picCaptcha = $(".picCaptcha").val();//获取图片验证码
		$.post("/umanages/checkRandom.do",{"picCaptcha":picCaptcha},function(d){
			if(d.status==500){
				alert_redtext('code',d.message);
				return;
			}else{
				$.post("/SMS/send.do", {
					"mobilePhone" : phone
				}, function(data) {
					var status = data.status;
					if (status == 500) {
						alert(data.message);
					}
					if (status == 200) {
						alert_redtext('code', '验证码发送成功');
						var target = document.getElementById("getVerifyPhone");
						time(target);
					}
				});
			}
		});
		
	}
}

function phoneEditOut() {
	
	var picCaptcha = $(".picCaptcha").val();//获取图片验证码
	$.post("/umanages/checkRandom.do",{"picCaptcha":picCaptcha},function(d){
		if(d.status==500){
			alert_redtext('code',d.message);
			return;
		}else{
			$.post("/SMS/send.do", {
				"editPhone" : "editPhone"
			}, function(data) {
				var status = data.status;
				if (status == 500) {
					alert(data.message);
					return;
	
				}
				if (status == 200) {
					alert_redtext('code', '验证码发送成功');
					var target = document.getElementById("getEditVerifyPhone");
					time(target);
					// time($("#getEditVerifyPhone"));
				}
			});
		}
		
	});
}

function phoneSub() {
	var phone = $("#phone").val();
	var verifyPhone = $("#verifyPhone").val();

	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	if ($.trim(phone).length < 1 || $.trim(phone).length > 0
			&& !phone_reg.test(phone)) {
		alert_redtext('code', '* 用户名需为手机号，格式不正确！');
		return false;
	}

	if ($.trim(verifyPhone).length < 1) {
		alert_redtext('code', '* 验证码不能为空！');
		return false;
	}

	if (!phone) {
	} else {
		$.post("/SMS/validate.do", {
			"validateCode" : verifyPhone,
			"mobilePhone" : phone
		}, function(data) {
			var status = data.status;
			if (status == 200) {
				alert_redtext('code', '手机验证成功');
				location.href = "/personal_security.html";
			} else {
				var message = data.message;
				alert_redtext('code', '* ' + message);
				/*
				 * if(message=="验证码为空！"){ alert_redtext('code','* 验证码为空'); }else
				 * if(message=="手机为空！"){ alert_redtext('code','* 手机为空！'); }else
				 * if(message=="验证码失效！"){ alert_redtext('code','* 验证码失效！');
				 * }else if(message=="验证码错误！"){ alert_redtext('code','*
				 * 验证码错误！'); 
				 * }
				 */
			}
		});

	}
}

function phoneEditSub() {
	var phone = $("#phone").val();
	var renewphone = $("#renewphone").val();
	var verifyPhone = $("#verifyPhone").val();
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;

	if ($.trim(phone).length < 1 || $.trim(phone).length > 0
			&& !phone_reg.test(phone)) {
		alert_redtext('code', '* 用户名需为手机号，格式不正确！');
		return false;
	}
	if (phone != renewphone) {
		alert_redtext('code', '* 两次输入的手机号不一致！');
		return false;
	}
	if ($.trim(verifyPhone).length < 1) {
		alert_redtext('code', '* 验证码不能为空！');
		return false;
	}

	if (!phone) {
	} else {
		$.post("/SMS/validate.do", {
			"validateCode" : verifyPhone,
			"mobilePhone" : phone
		}, function(data) {
			var status = data.status;
			if (status == 200) {
				location.href = "/personal_security.html";
			} else {
				var message = data.message;
				alert_redtext('code', '* ' + message);
				/*
				 * if(message=="验证码为空！"){ alert_redtext('code','* 验证码为空'); }else
				 * if(message=="手机为空！"){ alert_redtext('code','* 手机为空！'); }else
				 * if(message=="验证码失效！"){ alert_redtext('code','* 验证码失效！');
				 * }else if(message=="验证码错误！"){ alert_redtext('code','*
				 * 验证码错误！'); }
				 */
			}
		});

	}
}

//获取图片验证码
function refreshImage(){
	var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
	$("#check_Code").attr("src",imageUrl + '?' + Math.random());
};

