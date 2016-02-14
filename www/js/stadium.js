requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: '/js/juju/jquery-2.1.3.min',
		jquerys:'/js/module/ajaxfileupload',
		jqueryForm:'/ant/js/jquery.form',
		jqueryUpload:'/ant/js/jquery.upload',
    }
});

requirejs(['jquery'], function($) {
			/*
			 * 模拟运动类型复选框（动态从数据库获取选项内容）
			 */
			jQuery.ajax({
				url: '/sportType/list.do',  
                type: 'POST',  
                dataType: 'json',    
                success: function(data){
					//var jsonData=eval("("+data+")");
					var jsonData=data;
					//alert(jsonData);
					for(var i=0;i<jsonData.length;i++){
						 $("#stadiumType").append("<input type='checkbox' name='venueType' id='venueType' value=\'"+jsonData[i].id+"\'>"+jsonData[i].sportName+"</option>");
						
					}
                	//console.log("=stadiumType="+data);
				},error :function(){	
					alert('系统出错！');
				}
			});	
			/*
			 * 模拟附加服务复选框（动态从数据库获取选项内容）
			 */
			jQuery.ajax({
				url: '/serviceType/list.do',  
                type: 'POST',  
                dataType: 'json',    
                success: function(data){
					//var jsonData=eval("("+data+")");
					var jsonData=data;
					//alert(jsonData);
					for(var i=0;i<jsonData.length;i++){
						 $("#otherService").append("<input type='checkbox' name='otherServices' id='otherServices' value=\'"+jsonData[i].id+"\'>"+jsonData[i].serviceName+"</option>");
						
					}
                	//console.log("=stadiumType="+data);
				},error :function(){	
					alert('系统出错！');
				}
			});	


			/*
			* 全选/取消全选
			*/
            $("#checkall").click(function(){
			if(this.checked){
			$("input[name='venueType']").each(function(){this.checked=true;});
			}else{
			$("input[name='venueType']").each(function(){this.checked=false;});
			}
			});
			
			$("#checkAllService").click(function(){
			if(this.checked){
			$("input[name='otherServices']").each(function(){this.checked=true;});
			}else{
			$("input[name='otherServices']").each(function(){this.checked=false;});
			}
			});
							
			/*
			 * 模拟城市（动态从数据库获取选项内容）
			 */
			jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:1},
			success : function(data){
				//console.log("=province="+data);				
				//alert(data);
				$("#provinceid").html('');
				$("#provinceid").append("<option value=\'-1\'>请选择</option>");    
					var jsonData=data;//eval("("+data+")");
					 for(var i=0;i<jsonData.length;i++){
						 opt = "<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>";
						 $("#provinceid").append(opt);  
						 //console.log(opt);						 
				}
			}
			
		});			
                           
});



requirejs(['jquery'], function($) {
	$("#provinceid").change(function(){
		//var disTxt=$("#districtSel").find("option:selected").val();
		//var cityTxt=$("#citySel").find("option:selected").val();
		//var sportTxt=$("#sportEventSel").find("option:selected").val();
		var provinceid=$("#provinceid").find("option:selected").val();	
		//alert(provinceid);		
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:provinceid},
			//data :{cityid:cityTxt,countryid:disTxt,venueType:sportTxt},
			success : function(data){
				$("#cityid").html('');
				$("#cityid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
				$("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});
});

requirejs(['jquery'], function($) {
	$("#cityid").change(function(){
		//var disTxt=$("#districtSel").find("option:selected").val();
		//var cityTxt=$("#citySel").find("option:selected").val();
		//var sportTxt=$("#sportEventSel").find("option:selected").val();
		var cityid=$("#cityid").find("option:selected").val();			
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:cityid},
			success : function(data){
				$("#countryid").html('');
				$("#countryid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
				 $("#countryid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});
});

/*
 * 回显场馆信息
 */
requirejs(['jquery'], function($) {
			/**jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:1},
				success : function(data){
					alert('希望你出来！'+data);
					var jsonData = eval("("+data+")");
					$("#provinceid").html('');
					$("#provinceid").append("<option value=\'-1\'>请选择</option>");    					
						 for(var i=0;i<jsonData.length;i++){
						   $("#provinceid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
				}
				 
			});		

			jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:2,parentId:provinceid},
				//data :{cityId:cityTxt,countryId:disTxt,venueType:sportTxt},
				success : function(data){
					alert('希望你也要出来！');
					$("#cityid").html('');
					$("#cityid").append("<option value=\'-1\'>请选择</option>");  
					var jsonData = eval("("+data+")");
					for(var i=0;i<jsonData.length;i++){
					 $("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
				}
			});	
			var cityid=$("#cityid").find("option:selected").val();		
			alert(cityid);			
			jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:3,parentId:cityid},
				success : function(data){
					alert('希望你更要出来！');
					$("#countryid").html('');
					$("#countryid").append("<option value=\'-1\'>请选择</option>");  
					var jsonData = eval("("+data+")");
					for(var i=0;i<jsonData.length;i++){
					 $("#countryid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
				}
			});	*/	
			
			/*jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:2,parentId:provinceid},
				success : function(data){
					var jsonData = eval("("+data+")");
					if(jsonData.size()==0){
						$("#countryid").append("<option value=\'-1\'>请选择</option>");  
					}else{					
					 $("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
				}
			});	*/
			
	
			jQuery.ajax({
						url: '/stadium/showVenuesInfo.do',
						type: 'POST',  
						dataType: 'json',    	
						error: errFun,  //错误执行方法
						success: succFun //成功执行方法    				
						});
						function succFun(data){
						var jsonData = eval("("+data+")");
						//console.log('=showVenuesInfo='+jsonData.otherServices);
						//console.log('=showVenuesInfo='+jsonData.password);
						//console.log('=showVenuesInfo='+jsonData.password1);
						//console.log('=showVenuesInfo='+jsonData.venueType);
						//console.log('=showVenuesInfo='+jsonData.userAccountId);
						console.log('=showVenuesInfo='+jsonData.venueImg);
						
						$("#nickName").val(jsonData.nickName);
						$("#provinceid").val(jsonData.provinceid);
						var provinceid = jsonData.provinceid;

						//$("#cityid").val(jsonData.cityid);
						//$("#countryid").val(jsonData.countryid);
						$("#address").val(jsonData.address);
						$("#password").val(jsonData.password);
						$("#password1").val(jsonData.password1);
						$("#contacts").val(jsonData.contacts);
						$("#mobileNo").val(jsonData.mobileNo);
						$("#descs").val(jsonData.descs);
					//	$("#chargeType").attr(jsonData.chargeType);
					//	$("#stadiumType").attr(jsonData.venueType);
					//	$("#otherService").attr(jsonData.otherServices);
						$("#userImageS").attr('src','http://localhost/'+jsonData.venueImg);
						console.log('=venueType='+jsonData.venueType);		 	 //=venueType=1,10,11,12,13,14,15,16,2,3,4,5,6,7,8,9
						console.log('=otherServices='+jsonData.otherServices);  	 //=otherServices=1,2,3		
						console.log('=chargeType='+jsonData.chargeType); 
						
						var chargeType = jsonData.chargeType;
						$("input[type=radio][name=chargeType]").each(function() {
						if ($(this).val() == chargeType) {
						$(this).attr("checked", "checked");
						} 
						});
						
						var venueType = jsonData.venueType;
						var Str1 = venueType.split(",");
						//alert('Str1.length='+Str1.length);
						//if(Str1.length==16){全选。。}   length不确定暂时不做
						for(var i=0;i<Str1.length;i++){
							 $("[name = venueType]:checkbox").each(function () {
								if($(this).val()==Str1[i]){
									$(this).attr("checked","checked");
								}
								
							});
						}
						
						var otherServices = jsonData.otherServices;
						var Str2 = otherServices.split(",");
						for(var i=0;i<Str2.length;i++){
							 $("[name = otherServices]:checkbox").each(function () {
								if($(this).val()==Str2[i]){
									$(this).attr("checked","checked");
								}
								
							});
						}
						}
						function errFun(){
						alert("系统错误！");
						}	

});
/*
 * 图片上传
 */
requirejs(['jquery','jqueryForm','jqueryUpload'], function($) {
	        $(".upload").upload({
            uploadData: { id: "12233" },
            successFn: "success",
            deleteData: { id: function () { return "asdfasdf" } }
			});
			
			/**$('#upload').click(function() { 
				//判断图片类型
				var imageName=$("#file").val();
				//var file=$("#file").val();
				//alert(imageName);
				if(!/\.(gif|jpg|jpeg|bmp)$/.test(imageName)){
					alert("图片类型必须是.gif,jpeg,jpg,bmp中的一种");
					return false;
				}
			$.ajax({
		        url: '/umanages/loadInfo.do',
		        type: 'POST',
		        async:false,
		        dataType: 'json',
		        success: function (data) {
		        	var jsonData = eval("("+data+")");
					alert("哈哈哈奤");
					//console.log('图片信息'+jsonData);
					//$("#userImageS").attr("src",jsonData.userImages);
		        	/*$("#id").val(jsonData.id);
		        	$("#realName").val(jsonData.realName);
		        	$("#address").val(jsonData.address);
		        	$("#mobileNo").val(jsonData.mobileNo);
		        	$("#age").val(jsonData.age);
		        	$("#email").val(jsonData.email);
		        	$("#job").val(jsonData.job);
		        	$("#userImageS").attr("src",jsonData.userImage);
		        	$("#hfThumbnail").val(jsonData.userImage);
		        }
				}); 
				
			});	*/
});
/**
requirejs(['jquery','jquerys'], function($) {
			$('#upload').click(function() { 
				//判断图片类型
				var imageName=$("#file").val();
				//var file=$("#file").val();
				//alert(imageName);
				if(!/\.(gif|jpg|jpeg|bmp)$/.test(imageName)){
					alert("图片类型必须是.gif,jpeg,jpg,bmp中的一种");
					return false;
				}
				$.ajaxFileUpload({
					type : "post",
					url : '/api/upload.do', //用于文件上传的服务器端请求地址
					secureuri : false,//一般设置为false
					fileElementId : 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
					dataType : 'json',//返回值类型 一般设置为json
					success:function(data, status){//成功返回之后调用的函数
					var message = data.message;
					//alert(message);
					var msg = message.split(' ');
					var info = msg[0];
					var imgurl = msg[msg.length - 1];
					imgurl = 'http://localhost' + imgurl;
					$("#img").attr("src",imgurl);
					if(message == '405' || message == '406'){
					alert('上传失败！');}
					if(info == '200'){
					$("#userImage").val(imgurl);
					//alert(imgurl);
					$("#img").attr("src",imgurl);
					alert('上传成功！');
					}
					},
					error:function(data, status){
					alert('上传异常！');
					console.log(data);
					}
				});
			});	
});
*/