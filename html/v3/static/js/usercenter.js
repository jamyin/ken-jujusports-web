$(function(){	
	//保存
	$('.save_info').on('click', function(){
		if(!check_form()){
			return false;
		}
		var img = $('#imgShow').attr("src");
		$('[name=microPic]').val(img);
		var dataParams =$("#subFrom").serialize();
		//修改用户信息 
		$.ajax({
			url:'/userMan/editUser.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:dataParams,
			success:function(data){
				if(data.success == false){
					layer.msg(data.msg)
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
	
});
//初始化
	function init() {
	    //初始化图片上传
	    var btnImg = document.getElementById("team-flag");
	    var img = document.getElementById("imgShow");
	    var hidImgName = document.getElementById("hidImgName");
	 //   document.getElementById("btnDeleteImg").onclick = function() { DelImg(img, hidImgName); };
	    g_AjxUploadImg(btnImg, img, hidImgName);
	}
	var g_AjxTempDir = "/file/temp/";  
	//图片上传
	function g_AjxUploadImg(btn, img, hidPut) {
	    var button = btn, interval;
	    new AjaxUpload(button, {
	        action: '/file/upload.htm',
	        data: {},
	        name: 'myfile',
	        onSubmit: function(file, ext) {
	            if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF)$/.test(ext))) {
	                layer.msg("您上传的图片格式不对，请重新选择！");
	                return false;
	            }
	        },
	        onComplete: function(file, response) {
	            var reg = /<[^>]*>/g;
	        	var result =response;
	        	var data = JSON.parse(result.replace(reg,""))
	        	var imgurl =data.filePath;
	            flagValue = response;
	            if (flagValue == "1") {
	                layer.msg("您上传的图片格式不对，请重新选择！");
	            }
	            else if (flagValue == "2") {
	                layer.msg("您上传的图片大于200K，请重新选择！");
	            }
	            else if (flagValue == "3") {
	                layer.msg("图片上传失败！");
	            }
	            else {
	                hidPut.value = imgurl;
	                $("#hidImgName").val(imgurl);
	                //img.src = g_AjxTempDir + data.data;
	                img.src =  imgurl;
	            }
	        }
	    });
	}
	function doDistrict(){
		var id = $("#dic option:selected").val();			
		var oSel = document.getElementById('area');
		var oOp = oSel.children;       
		for(var i=0,len = oOp.length;i<len;i++)   
		{
			oSel.removeChild(oOp[0]);  
		}
		$.ajax({
			url:'/team/byCreateriaAddress.htm',
			data:{id:id},
			async:false,
			dataType: 'json',
			type:'post',
			success:function (data){
				console.log(data);
				var result = data.data;
				var area = document.getElementById("area");
				area.value ="";
				for (var i = 0; i < result.length; i++) {
					option =new Option(result[i].name,result[i].id);
					area.options.add(option);
				}					
			}
		})
	}
		$('.save_address').on('click',function(){
			var locationDetails = $.trim($('[name=locationDetails]').val());
			if (locationDetails.length <= 0) {
				layer.msg("收货地址不能为空~~");
				return ;
			}
			var realName = $.trim($("#real_name").val());
			if (realName.length <= 0) {
				layer.msg("收货人姓名不能为空~~");
				return ;
			}
			var idType = $.trim($('[name=idType]').val());
			var idNumber = $.trim($("#id_number").val());
			var id_type = '';
			switch (Number(idType)){
				case 1: id_type ='身份证'; break;
				case 2: id_type ='护照'; break;
				case 3: id_type ='学生证'; break;
				case 4: id_type ='教练证'; break;
			}
			if (idNumber.length <= 0) {
				layer.msg( id_type + '不能为空~~');
				return ;
			}else{
				if (idType == 1){
					var reg  = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
					if(!reg.test(idNumber)){  
						layer.msg("身份证格式不合法~~");
					    return;  
					} 
				}
			}
			var shippingForm = $('#shipingFrom').serialize();
			$.ajax({
				url:'/userMan/addOrUpShipping.htm',
				type:'post',
				dataType:'json',
				async:false,
				data:shippingForm,
				success:function(data){
					if(data.success == false){
						layer.msg(data.msg)
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
		
			//验证表单
	function check_form(){
				var flag = true;
				//登陆名
	        	var LoginName = $.trim($("#login_name").val());
				if (LoginName.length <= 0) {
				alert_redtext('login_name','登录名不能为空')
	            	flag =  false;
	        	}
				if (LoginName.length > 10) {
					alert_redtext('login_name','登录名不能超过10个字符')
					flag =  false;
		        }
				//昵称
				var nick_name = $.trim($("#nick_name").val());
				if (nick_name.length > 10) {
					alert_redtext('nick_name','昵称不能超过10个字符')
					flag =  false;
		        }
				//密码
	        	/*var PassWord = $.trim($("#password").val());
				if (PassWord.length < 6 || PassWord.length > 16) {
				alert_redtext('password','密码应为6-16位，英文、数字或常用符号')
					flag =  false;
	        	}*/
				return flag;
	}
		