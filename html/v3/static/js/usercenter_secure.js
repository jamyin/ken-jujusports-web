  
  	//刷新验证码
    function mailrefreshImage(){
    	var imageUrl = '/userMan/drawRandom.htm'; //你的生成图片的页面
    	$(".v_img").attr("src",imageUrl + '?' + Math.random());
    };
   
  	//省份 的区域加载 
	function doDistrict(){
		var id = $("#dic option:selected").val();			
		var oSel = document.getElementById('area');
		var oOp = oSel.children;        //获取select列表的所有子元素。
		for(var i=0,len = oOp.length;i<len;i++)   
		{
			oSel.removeChild(oOp[0]);  
		}
		$.ajax({
			url:'/team/byCreateriaAddress.htm',
			data:{id:id},
			dataType: 'json',
			async:false,
			type:'post',
			success:function (data){
				var result = data.data;
				var area = document.getElementById("area");
				//请空下拉框的值 
				area.value ="";
				for (var i = 0; i < result.length; i++) {
					option =new Option(result[i].name,result[i].id);
					area.options.add(option);
				}					
				console.log("are--赋值完毕 ");
			}
		})
	}
    
    $(function(){
    	 //保存邮箱 
        $('#emailSub').on("click",function(){
        	var randomCar = $('#randomCar').val();
        	var email = $('#email').val();
        	var emailNew = $('#emailNew').val();
        	var id = $('#ficId').val();
        	if(randomCar.length <=0){
        		layer.msg("验证码不能为空~~");
    			return;
        	}
        	if(emailNew!=null&&emailNew!=""){
	        	if(emailNew.length <= 0){
	        		layer.msg("邮箱不能为空~~");
	    			return;
	        	}
	        	var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
	    		if (!mail_reg.test(emailNew)) {
	    			layer.msg("邮箱格式不正确~~");
	    			return;
	    		}
        	}
        	if(email!=null&&email!=""){
	        	if(email.length <= 0){
	        		layer.msg("邮箱不能为空~~");
	    			return;
	        	}
	        	var mail_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; 
	    		if (!mail_reg.test(email)) {
	    			layer.msg("邮箱格式不正确~~");
	    			return;
	    		}
        	}
        	$.ajax({
        		url:'/userMan/doNotification.htm',
        		dataType:'json',
        		async:false,
        		data:{email:email,randomCar:randomCar,id:id,emailNew:emailNew},
        		type:'post',
        		success:function(data){
        			if(data.success==false){
       					layer.msg(data.msg);
       					return;
        			}
        			layer.msg(data.msg, {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						location.reload();
					});
        		}
        	})
        })
    	
    	//消息提醒 
    	$('#notification').on("click",function(){
    		var upPasswordStat = $(':radio[name=upPasswordStat]:checked').val();
    		var loginStat = $(':radio[name=loginStat]:checked').val();
    		var nonlocalLoginStat = $(':radio[name=nonlocalLoginStat]:checked').val();
    		var id = $('#ficId').val();
    		$.ajax({
    			url:'/userMan/doNotification.htm',
    			dataType:'json',
    			data:{upPasswordStat:upPasswordStat,loginStat:loginStat,nonlocalLoginStat:nonlocalLoginStat,id:id},
    			type:'post',
    			success:function(data){
    				if(data.success=false){
    					layer.msg(data.msg);
    					return;
    				}
    				layer.msg(data.msg, {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						location.reload();
					});
    			}
    		})
    	})
    	//修改密码 
    	$('#changePw').on("click",function(){
    		var oldPassword = $('#oldPassword').val();
        	var twoNewPassword = $('#twoNewPassword').val();
        	var newPassword = $('#newPassword ').val();
        	if(oldPassword.length<=0){
        		layer.msg("原密码不能为空~~");
        		return;
        	}
        	if(twoNewPassword.length<6 ||twoNewPassword.length>12){
        		layer.msg("新密码为6-12位字符~~")
        		return;
        	}
        	/*if(newPassword.length<6 ||newPassword.length >12 ){
        		layer.msg("新密码为6-12位字符~~")
        		return;
        	}*/
        	if(twoNewPassword != newPassword){
        		layer.msg("两次输入密码不一致");
        		return;
        	}
        	$.ajax({
        		url:'/userMan/changePw.htm',
        		dataType:"json",
        		type:"post",
        		data:{oldPassword:oldPassword,newPassword:newPassword},
        		success:function(data){
					if(data.success == false){
						layer.msg(data.msg);
						return;
					}
					layer.msg(data.msg, {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						location.reload();
					});
        		}
        	})
    	})
    	//保存 
    	$('#idInfoSub').on("click",function(){
    		var cname = $('[name=cname]').val();
    		var postcode = $('[name=postcode]').val();
    		var mobile = $('[name=mobile]').val();
    		var qPhone =$('#qPhone').val();
    		var dPhone =$('#dPhone').val();
    		var fPhone =$('#fPhone').val();
    		var province =$('#dic option:selected').val();
    		var location =$('#area option:selected').val();
    		$('[name=telephone]').val(qPhone+"-"+dPhone+"-"+fPhone);
    		var telephone = $('[name=telephone]').val();
    		if(cname.length <= 0 ){
    			layer.msg("名称不能为空~~");
    			return;
    		}
    		if(postcode.length != 6 ){
    			layer.msg("邮编格式不正确~~");
    			return;
    		}
    		if(mobile.length <= 0){
    			layer.msg("手机不能为空~~");
    			return;
    		}
    		var phone_reg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
        	if (!phone_reg.test(mobile)) {
        		layer.msg("手机格式不正确~~");
                return false;
         	}
         	// 分机号码可为null
    		/*if(qPhone.length <= 0||dPhone.length <=0 ||fPhone.length <= 0 ){
    			layer.msg("座机电话不完整~~");
    			return;
    		}*/
    		$.ajax({
    			url:'/userMan/papersInfo.htm',
    			data:{telephone:telephone,cname:cname,postcode:postcode,mobile:mobile,province:province,location:location},
    			dataType:'json',
    			type:'post',
    			success:function(data){
    				if(data.success == false){
    					layer.msg(data.msg);
    					return;
    				}
    				layer.msg(data.msg, {
						shade: [0.9, '#000'],
					    icon: 6,
					    time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
						location.reload();
					});
    			}
    		})
    	})
    })