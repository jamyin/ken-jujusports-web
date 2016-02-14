function checkSubmitEmail() {
	if ($("#email").val() == "") {
		layer.tips('邮箱不能为空!', '#email');
		$("#email").focus();
		return false;
	}
	if (!$("#email")
			.val()
			.match(
					/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		layer.tips('邮箱格式不正确!', '#email');
		$("#email").focus();
		return false;
	}
	return true;
};

function validatemobile() {
	var mobile = $("#mobileNo").val();
	if (mobile.length == 0) {
		layer.tips('请输入手机号码', '#mobileNo');//alert('请输入手机号码！');
		return false;
	}
	if (mobile.length != 11) {
		layer.tips('请输入有效的手机号码', '#mobileNo');
		//alert('请输入有效的手机号码！');
		//document.form1.mobile.focus();
		return false;
	}

	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (!myreg.test(mobile)) {
		layer.tips('请输入有效的手机号码', '#mobileNo');
		//alert('请输入有效的手机号码！');
		//document.form1.mobile.focus();
		return false;
	}
	return true;
};

function checkAge(){
	var txtAge = $("#txtAge").val();
	var regAge = /^\d{1,2}$/;
	if(regAge.exec(txtAge)==null){
		layer.tips('年龄格式输入不正确', '#txtAge');
		return false;
	}else{
		return true;
	}
}