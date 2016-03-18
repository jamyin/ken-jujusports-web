$(function() {
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


	// 修改密码
	$("#change_pwd_btn").on('click', function() {
		if (null == $('#oldPwd').val() || '' == $('#oldPwd').val()) {
			alert('原密码不能为空!');
			return;
		}
		if (null == $('#newPwd').val() || '' == $('#newPwd').val()) {
			alert('新密码不能为空!');
			return;
		}
		if (null == $('#newPwd2').val() || '' == $('#newPwd2').val()) {
			alert('确认新密码不能为空!');
			return;
		}
		if ($('#newPwd').val() != $('#newPwd2').val()) {
			alert('确认密码不一致!');
			return;
		}
		if ($('#newPwd').val() == $('#oldPwd').val()) {
			alert('原密码未改变!');
			return;
		}
		var ajaxParams = $("#change_pwd_form").serialize();
		$.ajax({
			type : "POST",
			url : "/safe/changePwd.htm",
			data : ajaxParams,
			datatype : "json",// "xml", "html", "script", "json", "jsonp","text".
			beforeSend : function() {
			},
			success : function(data) {// 成功返回之后调用的函数
				var jsondata = null;// eval('(' + data + ')');
				if (data instanceof Object) {
					jsondata = data;
				} else {
					jsondata = eval('(' + data + ')');
				}
				if (jsondata.status == 200) {
					alert(jsondata.message);
					close($('#change_pwd_span'));
					$("#change_pwd_form")[0].reset();
				} else {
					alert(jsondata.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

			},
			error : function() {// 调用出错执行的函数

			}
		});
	});
	
	// 修改安全提醒
	$("#change_reminding_btn").on('click', function() {
		var ajaxParams = $("#change_reminding_form").serialize();
		$.ajax({
			type : "POST",
			url : "/safe/changeReminding.htm",
			data : ajaxParams,
			datatype : "json",// "xml", "html", "script", "json", "jsonp","text".
			beforeSend : function() {
			},
			success : function(data) {// 成功返回之后调用的函数
				var jsondata = null;// eval('(' + data + ')');
				if (data instanceof Object) {
					jsondata = data;
				} else {
					jsondata = eval('(' + data + ')');
				}
				if (jsondata.status == 200) {
					alert(jsondata.message);
					close($('#change_reminding_span'));
					$('#change_reminding_label').removeClass('safe-not');
					$('#change_reminding_label').html('已设置安全提醒');
				} else {
					alert(jsondata.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

			},
			error : function() {// 调用出错执行的函数

			}
		});
	});
	
	// 修改安全邮箱
	$("#change_email_btn").on('click', function() {
		var mail = $.trim($("#email").val());
		var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(mail.length <= 0){
			alert('邮箱地址为空');
		    return;
		}else if (!mail_reg.test(mail)) {
			alert('邮箱地址不正确');
		    return;
	    }
		
		var ajaxParams = $("#change_email_form").serialize();
		$.ajax({
			type : "POST",
			url : "/safe/changeEmail.htm",
			data : ajaxParams,
			datatype : "json",// "xml", "html", "script", "json", "jsonp","text".
			beforeSend : function() {
			},
			success : function(data) {// 成功返回之后调用的函数
				var jsondata = null;// eval('(' + data + ')');
				if (data instanceof Object) {
					jsondata = data;
				} else {
					jsondata = eval('(' + data + ')');
				}
				if (jsondata.status == 200) {
					alert(jsondata.message);
					$('#change_email_span').attr("data-fill","true");
					close($('#change_email_span'));
					$('#change_email_label').removeClass('safe-not');
					$('#change_email_label').html('已设置安全邮箱');
				} else {
					alert(jsondata.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

			},
			error : function() {// 调用出错执行的函数

			}
		});
	});
	
	// 修改证件信息
	$("#change_paper_btn").on('click', function() {
		if (null == $('#cname').val() || '' == $('#cname').val()) {
			alert('真实姓名不能为空!');
			return;
		}
		if (null == $('#detailedAddress').val() || '' == $('#detailedAddress').val()) {
			alert('详细地址不能为空!');
			return;
		}
		if (null == $('#postcode').val() || '' == $('#postcode').val()) {
			alert('邮政编号不能为空!');
			return;
		}
		var post_reg = /^[1-9][0-9]{5}$/;
	    if(!post_reg.test($('#postcode').val())){
	    	alert('邮政编号格式不正确!');
			return;  
	    }
	    if (null == $('#telephone').val() || '' == $('#telephone').val()) {
			alert('座机号码不能为空!');
			return;
		}
		var tel_reg = /^0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}$/;
		if(!tel_reg.test($('#telephone').val())){
			alert('座机号码格式不正确!');
			return;  
		}
		var ajaxParams = $("#change_paper_form").serialize();
		$.ajax({
			type : "POST",
			url : "/safe/changePaper.htm",
			data : ajaxParams,
			datatype : "json",// "xml", "html", "script", "json", "jsonp","text".
			beforeSend : function() {
			},
			success : function(data) {// 成功返回之后调用的函数
				var jsondata = null;// eval('(' + data + ')');
				if (data instanceof Object) {
					jsondata = data;
				} else {
					jsondata = eval('(' + data + ')');
				}
				if (jsondata.status == 200) {
					alert(jsondata.message);
					close($('#change_paper_span'));
					$('#change_paper_label').removeClass('safe-not');
					$('#change_paper_label').html('已填写证件信息');
				} else {
					alert(jsondata.message);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

			},
			error : function() {// 调用出错执行的函数

			}
		});
	});
});

function close(obj) {
	var _this = $(obj);
	if (_this.attr("data-show") === "false") {
		_this.attr("data-show", "true");
		if (_this.attr("data-fill") === "true") {
			_this.text("更换安全邮箱");
		} else {
			_this.text("设置");
		}
		_this.next().addClass("hide");
		_this.parent().addClass("bod");
	} else {
		_this.attr("data-show", "false");
		_this.text("收起");
		_this.next().removeClass("hide");
		_this.parent().removeClass("bod");
	}
}