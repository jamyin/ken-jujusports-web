		window.onload = function() {
		    init();  //初始化
		    
		    doDistrict();
		} 

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
		
		//手机注册刷新验证码
		function phonerefreshImage(){
			var imageUrl = '/userMan/drawRandom.htm'; //生成图片的页面
			$("#pic").attr("src",imageUrl + '?' + Math.random());
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
				type:'post',
				success:function (data){
					console.log(data);
					var result = data.data;
					var area = document.getElementById("area");
					//请空下拉框的值 
					area.value ="";
					for (var i = 0; i < result.length; i++) {
						option =new Option(result[i].name,result[i].id);
						area.options.add(option);
					}					
					//console.log("are--赋值完毕 ");
				}
			})
		}
		
		$("#sub").on('click',function(){
			//球队名称
			var name =$.trim($('[name=name]').val());
			if(name.length <= 0){
				layer.msg('球队名称不能为空~~');
				return ;
			}
			if(name.length > 18 || name.length <3){
				layer.msg('球队名称为3-18的字符~~');
				return ;
			}
			//联系方式
			var contact =$.trim($('[name=contact]').val());
			var phone_reg = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
			if(contact.length <= 0){
				layer.msg('联系方式为手机号,不能为空~~')
				return ;
			}
			if (!phone_reg.test(contact)) {
				layer.msg('手机格式不正确')
				return ;
			}
			/*var setUpTimeStr =$.trim($('[name=setUpTimeStr]').val());
			if(setUpTimeStr.length <= 0){
				layer.msg('请输入创建时间~~')
				return ;
			}*/
			//图片验证码  
			var picStr =$.trim($('[name=picStr]').val());
			if(picStr.length <= 0){
				layer.msg('验证码不能为空~~')
				return ;
			}
			var sta ="";
			//图片验证码 
			$.ajax({
				url:"/userMan/checkRandom.htm",//提交的网址
				type: 'POST', 
				async:false,
				dataType: 'json',  
				data:{"picCaptcha":picStr},//提交的数据
				success: function(data){
		        	if(data.status == 500){
		        		sta = "return";
						layer.msg(data.message);
						return;
					}
				},error :function(){
					//layer.msg('系统错误！');
					layer.msg("系统错误！", 1, 1);
				}
			});
			if(sta == "return"){
				return ;
			}
			var imgShow = $('#imgShow').attr("src");
			$('#logo').val(imgShow);
			var members= $('[name=members]').val();
			var reg = /^\+?[1-9]\d*$/;
			if(members==null || members == ""){
			}else{
				if(!reg.test(members)){
					layer.msg("完善球员人数信息,最少一人,成员只能是整数~~");
					return;
				}
			}
			var teamSub= $('#formSub').serialize();
			$.ajax({
				url:'/team/saveTeam.htm',
				dataType:'json',
				data:teamSub,//提交的数据
				type:'post',
				success:function(data){
					if(data.success == true){
						layer.msg("球队创建成功", {
							shade: [0.9, '#000'],
						    icon: 6,
						    time: 2000 //2秒关闭（如果不配置，默认是3秒）
						}, function(){
							window.location.href = '/userMan/myteam.htm';//
						});
					}
					if(data.success == false){
						layer.msg(data.msg);	
					}
				}
			})
		})