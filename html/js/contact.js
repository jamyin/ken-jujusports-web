$(function() {
	
	//添加联系人验证
	$('.submit').on('click', function() {
//			alert_pop('open')

		if ($.trim($('#username').val()).length <= 0) {
			layer.msg("请输入用户名！");
//			alert("请输入用户名！");
			return false;
		}
		if ($.trim($('#username').val()).length <= 1||$.trim($('#username').val()).length >= 21) {
			var show_username = /^[\u4E00-\u9FA5]{1,}$/;
			if ($.trim($('#username').val()).length >= 21&& show_username.test($.trim($('#username').val()))) {
				layer.msg("姓名格式不正确，所输入的文字显示不全！");
				return false;
			}
			layer.msg("请输入有效字符(长度为2~20个字符)！");
			//alert("姓名为2~20个字符，可以由数字、汉字、'_'组合，但不能包含特殊符号跟空格！");
			return false;
		}
		var username_test =/^[0-9A-Za-z_.\u4E00-\u9FA5]{2,20}$/;
		if (!username_test.test($.trim($('#username').val()))) {
			layer.msg("姓名格式不正确(不能包含空格和特殊符号)！");
			//alert("姓名为2~20个字符，可以由数字、汉字、'_'组合，但不能包含特殊符号跟空格！");
			return false;
		}
		if ($.trim($('#cellphone').val()).length <= 0) {
			layer.msg("请输入手机号！");
//			alert("请输入手机号！");
			return false;
		} 
		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
		if (!phone_reg.test($.trim($('#cellphone').val()))) {
			layer.msg("输入手机格式不正确！");
//        	alert('输入手机格式不正确！');
            return false;
     	}
		if ($.trim($('#mail').val()).length <= 0) {
			layer.msg("请输入邮箱！");
//			alert("请输入邮箱！");
			return false;
		}
		var szReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    	if ($.trim($('#mail').val()).length >= 24||!szReg.test($.trim($('#mail').val()))) {
    		layer.msg("邮箱长度输入有误或输入邮箱格式不正确！");
//        	alert('邮箱长度输入有误或输入邮箱格式不正确！');
        	return false;
    	}
		if ($.trim($('#qq').val()).length <= 0) {
			layer.msg("请输入QQ号！");
//			alert("请输入QQ号！");
			return false;
		}
		var reg=/^\d{5,10}$/;
    	if (!reg.test($.trim($('#qq').val()))) {
    		layer.msg("QQ长度为5~10个字符且为数字！");
//    		alert('QQ号错误，请确认后重新输入（长度为10且为数字）！');
    		return false;
		}
    	
	//add by soso 
		
    	//添加联系人验证通过
    	var dataParams = $("#contact_us").serialize();
		$.ajax({
			url:"/contact/contactUs.do",//提交的网址
			type: 'POST',  
			dataType: 'json',  
			data:dataParams,
			error: erryFunction,  //错误执行方法
            success: succFunction //成功执行方法
		})
		
		function succFunction(data){
			var status = data.status;
			var message =data.message;
			if(message == '手机号已存在！'){
				layer.msg('手机号已存在！');
			}
			if(message == '添加失败！'){
				layer.msg('添加失败！');
			}
			if(message == '恭喜您添加成功！'){
				alert_pop('open');
				$('#joinus_form input[type=text]').val('');
			}
//			if(status == 500){
//				alert(data.message);
//				alert_pop('close');
//		    }if(status == 200){
//				//成功后页面跳转
//		    	alert_pop('open');
//		    	window.location.href = "/index.html#slide-5";
//		    	$('#joinus_form input[type=text]').val('');
//		    }
		}
		function erryFunction(){
			layer.msg("系统错误！", 1, 1);
		};
	})
	
	$('.okbtn').on('click', function() {
		alert_pop('close');
	})


})

function alert_pop(e){
	var d = $('.mask_box');
	if(e=="open"){
		d.addClass('show');
	}else if(e=="close"){
		d.removeClass('show');
	}
}