	$(function(){
		$(".permit_upload").upload({
            uploadData: { id: "0125" },
            successFn: "success",
            deleteData: { id: function () { 
            	//console.log('yin');
            	return "yin"; } }
        });
		
		$(".licence_upload").uploadEx({
            uploadData: { id: "0125" },
            successFn: "success",
            deleteData: { id: function () { 
            	return "yin"; } }
        });
		$("#reg_permit").change(function(){
			var pic_url = 'http://pic1.ooopic.com/uploadfilepic/sheji/2009-08-09/OOOPIC_SHIJUNHONG_20090809ad6104071d324dda.jpg';
			var box_flag = $(this).attr('id');
			//$("#query").click();
			$("#permit_query").click();
			/*$.ajax({
				url:"/stadium/uploadOperateLicense.do",//提交的网址
				type: 'POST',  
				dataType: 'json',  
				data:{"mobilePhone":reg_username},//提交的数据
				success: function(data){
					//console.log(data.data);
					//alert('发送信息成功！');
				},error :function(){
					alert('系统错误！');
				}
			});*/
			//$("#"+ box_flag +"_preview img").attr("src",pic_url);
		})		
		
		$("#reg_licence").change(function(){
			var box_flag = $(this).attr('id');
			$("#licence_query").click();
		})		
		
		//页面切换效果		
		$('.next_btn, .reg_btn').on('click',function(){
			var step_flag = $(this).closest('.contbox').attr('id')
			step_flag = parseInt(step_flag.substr(step_flag.length-1,1))
			step_confirm(step_flag)
		})
		
		 //取消错误提示
		 $('.step_box li input[type=text], .step_box li input[type=password]').keyup(function(){
				$('#' + $(this).attr('id') + '_wrong').empty();
		 })
		
		//第一、二步验证
		function step_confirm(flag){
			if(flag == 1){//第一步验证
				if ($.trim($('#reg_username').val()).length <= 0) {
					alert_redtext('reg_username','请输用户名！');
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
				var check_captcha = /^\d{4}$/;
				if (!check_captcha.test($.trim($('#reg_captcha').val()))) {
					alert_redtext('reg_captcha','验证码必须为4位数字！');
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
				
				var reg_username = $("#reg_username").val();
				var reg_captcha = $("#reg_captcha").val();
				$.ajax({
					url:"/stadium/checkRandomPic.do",//提交的网址
					type: 'POST',  
					dataType: 'json', 
					async: false,
					data:{"userAccount":reg_username,"randomPic":reg_captcha},//提交的数据
					success: function(data){
						//console.log(data.data);
						var status = data.status;
						var message = data.message;
						if(message=='用户名已存在！'){
							alert_redtext('reg_username',message);
						}else if(message=='未输入验证码或验证码错误！'){
							alert_redtext('reg_captcha',message);
						}else{
							$('#reg_v_step' + (flag + 1)).addClass('show').siblings('.contbox').removeClass('show')//切换画面
						}
					},error :function(){
						//alert('系统错误！');
						layer.msg("系统错误！", 1, 1);
					}
				});
				
				
			}else if(flag == 2){//第二步验证
				if ($.trim($('#reg_vname').val()).length <= 0) {
					alert_redtext('reg_vname','请输入场馆名称！');
					return false;
				}
				if ($.trim($('#reg_vname').val()).length > 60) {
					alert_redtext('reg_vname','场馆名称不得大于60个字！');
					return false;
				}
				if ($.trim($('#reg_vaddress').val()).length <= 0) {
					alert_redtext('reg_vaddress','请输入场馆地址！');
					return false;
				}
				if ($.trim($('#reg_vaddress').val()).length > 100) {
					alert_redtext('reg_vaddress','场馆地址不得大于100个字！');
					return false;
				}
				if ($.trim($('#reg_vcontacts').val()).length <= 0) {
					alert_redtext('reg_vcontacts','请输入联系人姓名！');
					return false;
				}
				if ($.trim($('#reg_vcontacts').val()).length > 30) {
					alert_redtext('reg_vcontacts','联系人姓名不得超过30个字！');
					return false;
				}
				if ($.trim($('#reg_vtelphone').val()).length <= 0) {
					alert_redtext('reg_vtelphone','请输入联系电话！');
					return false;
				}
				var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
				var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
				if (!phone_reg.test($.trim($('#reg_vtelphone').val())) && !tel_reg.test($.trim($('#reg_vtelphone').val()))) {
					alert_redtext('reg_vtelphone','联系电话为手机号或座机，区号，分机用中划线隔开，');//例：021-88888888-123！
					return false;
				}
				
				$('#reg_v_step' + (flag + 1)).addClass('show').siblings('.contbox').removeClass('show')//切换画面
			}else if(flag == 3){//第三步验证提交
				if ($.trim($('#reg_vmanger').val()).length <= 0) {
					alert_redtext('reg_vmanger','请输入场馆负责人姓名！');
					return false;
				}
				if ($.trim($('#reg_vmanger').val()).length > 30) {
					alert_redtext('reg_vmanger','场馆负责人姓名不得超过30个字！');
					return false;
				}
				if ($.trim($('#reg_vidcard').val()).length <= 0) {
					alert_redtext('reg_vidcard','请输入身份证号码！');
					return false;
				}
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if (!regIdCard.test($.trim($('#reg_vidcard').val()))) {
					alert_redtext('reg_vidcard','身份证格式不正确！');
					return false;
				}
				
		     	//场馆注册验证通过
				var dataParams =  $("#venue_reg").serialize();
	        	$.ajax({
	    			url:"/stadium/registerSiteV2.do",//提交的网址
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
	    					//window.location.href = '/app/user/userIndex.html';
	    					//alert("恭喜您注册场馆成功！");
	    					window.location.href = '/login.html?_pageTag=login';
	    				}
	    			},error :function(){	
	    				//alert('系统错误！');
	    				layer.msg("系统错误！", 1, 1);
	    			}
	    		});
			}
		}
		 
		 
/*		//验证码发送成功后执行
		$('.sent_c').on('click',function(){
			if ($.trim($('#reg_username').val()).length <= 0) {
					alert_redtext('reg_username','请输用户名！');
					return false;
			}
			var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
			if (!phone_reg.test($.trim($('#reg_username').val()))) {
					alert_redtext('reg_username','用户名需为手机号，格式不正确！');
					return false;
			}
			time(this)
			$('.tips_code').html("发送成功 " + $.trim($('#reg_username').val()) + "，如在60秒内未收到短信，请再次点击发送验证码。 ")
		})*/
		
		 //取消错误提示
		 $('.left_col input[type=text], .left_col input[type=password]').keyup(function(){
				$('#' + $(this).attr('id') + '_wrong').empty();
		 })
		 
		 //注册场馆发送验证码到手机
		 $("#captcha_btn").click(function(){
				var reg_username = $("#reg_username").val();
				var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	        	if (!phone_reg.test($.trim($('#reg_username').val()))) {
	            	alert_redtext('reg_username','请输入正确的手机号！');
	                return false;
	         	}
	        	var venuesPicCaptcha = $(".venuesPicCaptcha").val();
				if ($(".venuesPicCaptcha")==undefined || ($.trim($('.venuesPicCaptcha').val()).length <= 0)) {
	            	alert_redtext('venuesPicCaptcha','请输入图片验证码！');
	            	return false;
	        	}
				//检验图片验证码
				$.ajax({
					url:"/umanages/checkRandom.do",//提交的网址
					type: 'POST',  
					dataType: 'json',  
					data:{"picCaptcha":venuesPicCaptcha},//提交的数据
					success: function(data){
						//console.log(data.status);
						var status = data.status;
			        	if(status == 500){
							alert_redtext('venuesPicCaptcha','请输入正确的图片验证码！');
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

		
	});

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
/*	function time(o) { 
		if (wait == 0) {
			$('.tips_code').empty()
			o.removeAttribute("disabled");           
			o.value="获取验证码"; 
			wait = 60; 
		} else {
			o.setAttribute("disabled", true); 
			o.value="请等待"+wait+"秒"; 
			wait--; 
			setTimeout(function() { 
				time(o) 
			}, 1000) 
		} 
	}*/
	
	function refreshImage(){
		var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
		$("#check_Code").attr("src",imageUrl + '?' + Math.random());
	};
    