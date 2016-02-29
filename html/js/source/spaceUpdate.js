requirejs.config({
    baseUrl: '../js',
    paths: {
         jquery: '/js/juju/jquery-2.1.3.min',
		 jquerys:'/js/module/ajaxfileupload'
    }
});

requirejs(['jquery'], function($) {
	$("#insert").click(function(){
			$("#insert").html("继续添加");
            var $div = $("<div>");
			var spaceName = $("#spaceName").val();
			var userImage = $("#hfThumbnail").val();
			var price = $("#price").val();
			var maxNum = $("#maxNum").val();
			var sportTypeSel=$("#sportTypeSel").find("option:selected").val();
			var sel_begin_week=$("#sel_begin_week").find("option:selected").val();
			var sel_begin_text=$("#sel_begin_week").find("option:selected").text();
			var sel_begin_h = $("#sel_begin_h").find("option:selected").val();
			var sel_and_week = $("#sel_and_week").find("option:selected").val();
			var sel_and_text=$("#sel_and_week").find("option:selected").text();
			var sel_and_h = $("#sel_and_h").find("option:selected").val();
			var footType = $("#foot_type").find("option:selected").val(); 
			
			
			if(spaceName==''||price==''||sportTypeSel==''){
				alert('场地名称或价格不能为空!');
				return false;
			}
			var ex = /^\d+$/;
			if(maxNum==''||isNaN(maxNum)){
				alert('最大人数为数字');
				return false;
			}
			if(!ex.test(maxNum)){
				alert('最大数必须为整数');
				return false;
			}
	
			if(price==''||isNaN(price)){
				alert('价格必须是数字');
				return false;
			}
			
			if (!ex.test(price)) {
				alert('价格必须为整数');
				return false;
			}
			if(price>10000){
				alert('场地价格不能大于10000元');
				return false;
			}
			if(parseInt(sel_begin_h)==parseInt(sel_and_h)){
				alert('开始时间不能等于结束时间');
				return false;
			}
			if (parseInt(sel_and_week)<parseInt(sel_begin_week)){
				alert('开始日期不能小于结束日期');
				return false;
			}
			if(parseInt(sel_and_h)<parseInt(sel_begin_h)){
				alert('开始时间不能小于结束时间');
				return false;
			}
					jQuery.ajax({
							url:'/space/findOpen.do',
							type:'POST',
							data :{startDate:sel_begin_week,endDate:sel_and_week,startTime:sel_begin_h,endTime:sel_and_h,spaceName:spaceName,price:price,sportType:sportTypeSel,userImage:userImage,maxNumber:maxNum,minNumber:footType,nameStatus:0},
							dataType:'json',
							success:function(data){
								var myObject =data.message;
								if(myObject==200){
									alert("添加成功");
									$div.html("<span id=\"begin_week\">"+sel_begin_text+"</span> 至<span id=\"and_week\">"+sel_and_text+"</span>&nbsp;<span id=\"begin_h\">"+sel_begin_h+"</span>:<span id=\"begin_m\">00</span>-<span id=\"and_h\">"+sel_and_h+"</span>:<span id=\"and_m\">00</span><br />");
									$(".open_date").append($div);
									$(".open_date").css("display", "block");
									
								}else if(myObject==402){
									
									alert("时间冲突");
									return false;
								}else if(myObject==401){
									alert("用户类型不是场馆用户");
									return false;
								}else if(myObject==404){
									alert("用户未登录");
									return false;
								}else if(myObject==407){
									alert('一天不能增加2个时间段');
									return false;
								}else if(myObject==408){
									alert('免费场地不能收费');
									return false;
								}
							}
						
						});

						
					
			
			
           
	});
});

requirejs(['jquery'], function($) {
	 // var sportTypeSel = $("#sportTypeSel").find("option:selected").val();
	 $("#sportTypeSel").change(function(){
		 var sportTypeSel = $("#sportTypeSel").find("option:selected").val();
		 if(sportTypeSel==1){
			 $("#foot_type").attr("disabled",false);
			 $("#maxNum").attr("disabled","disabled");
			  $("#maxNum").val('');
		 }else{
			 $("#maxNum").attr("disabled",false);
			 $("#foot_type").find("option[value=-1]").attr("selected",true);  
			 $("#foot_type").attr("disabled","disabled");
		 }
		 
	 });
});
requirejs(['jquery'],function($) {
	$("#saveBtn").click(function(){
		var index = parent.layer.getFrameIndex(window.name); 
			var spaceName = $("#spaceName").val();
			var userImage = $("#hfThumbnail").val();
			//var price = $("#price").val();
			var spaceId=$("#spaceId").val();
			var sportTypeSel=$("#sportTypeSel").find("option:selected").val();
			var resourceSpaceName=$("#resourceSpaceName").val();
			var maxNum = $("#maxNum").val();
			var footType = $("#foot_type").find("option:selected").val();
			if(''==spaceName||'' ==sportTypeSel||''==userImage){
				alert('场地名称或价格或图片不能为空!');
				return false;
			} 
			var ex = /^\d+$/;
			if(maxNum==''||isNaN(maxNum)){
			$("#maxNum").val('0');
			maxNum=0;
			}
			if(!ex.test(maxNum)){
				layer.msg('最大人数必须是整数',1,1);
				return false;
			}
			if(sportTypeSel==1){
			$("#maxNum").val('0');
			maxNum=0;
			}else if(sportTypeSel!=1&&footType!=-1){
				 $("#foot_type").find("option[value=-1]").attr("selected",true); 
				 footType='-1';
			}
			if(sportTypeSel=='1'&&footType=='-1'){
			alert('足球类型不能为空!');
			return false;
		}
						jQuery.ajax({
							url:'/space/updateSpaceMaster.do',
							type:'POST',
							data :{spaceName:spaceName,sportId:sportTypeSel,images:userImage,id:spaceId,resourceInfos:resourceSpaceName,maxNumber:maxNum,minNumber:footType},
							dataType:'json',
							success:function(data){
								var jsonData=data.message;
								if(jsonData==405){
									alert('名称不能重复');
									return false;
								}else{
								alert('主体信息修改成功');
								
								  top.site_ifr.contentWindow.findAll(); 
								parent.layer.close(index);
								
							}
						}
				});
				
		
	});
});

/*requirejs(['jquery','jquerys'],function($) {
	$('#upload').click(function() { 
		var imageName=$("#file").val();
		if(!/\.(gif|jpg|jpeg|bmp|png)$/.test(imageName)){
					alert("图片类型必须是.gif,jpeg,jpg,bmp,png中的一种");
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
					var msg = message.split(' ');
					var info = msg[0];
					var imgurl = msg[msg.length - 1];
					var filePath="/"+imgurl;
					$("#img").attr("src",filePath);
					if(message == '405' || message == '406'){
						alert('上传失败！');
					}
					if(info == '200'){
						$("#userImage").val(imgurl);
						$("#img").attr("src",imgurl);
					}
					},
						error:function(data, status){
						alert('上传异常！');
					}
	});	
	});
});*/


requirejs(['jquery'],function($) {
$.ajax({
        url: '/sportType/findByStad.do',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
			$("#sportTypeSel").html('');
			var myObject =data.data;
            for (var i = 0; i < myObject.length; i++) {
				 $("#sportTypeSel").append("<option value=\'"+myObject[i].id+"\'>"+myObject[i].sportName+"</option>");
            }			
        }
    });
	
    $.ajax({
        url: '/space/findUpdateInfo.do',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
			var jsonData=data;
			//console.log(data);
			if(jsonData.message==401){
				alert("用户未登录");
				return false;
			}else if(jsonData.message==402){
				alert("非法查询");
				return false;
			}else{
				//console.log(jsonData.data.spaceDto);
					  $("#sportTypeSel option").each(function(){  
							if($(this).val()==jsonData.data.spaceDto.sportId){  
								$(this).attr("selected",true);  
							}  
						});
						//判断是否为足球
					if(jsonData.data.spaceDto.sportId==1){
						 $("#foot_type").attr("disabled",false);
						 $("#maxNum").attr("disabled","disabled");
						 $("#maxNum").val('');
						
					}else{
						$("#maxNum").attr("disabled",false);
			 $("#foot_type").find("option[value=-1]").attr("selected",true);  
			 $("#foot_type").attr("disabled","disabled");
						
					}
					$("#spaceName").val(jsonData.data.spaceDto.spaceName);
					$("#spaceId").val(jsonData.data.spaceDto.id);
					//$("#img").attr("src",jsonData.data.spaceDto.images);
				//	$("#userImage").val(jsonData.data.spaceDto.images);	
					$("#userImageS").attr("src",jsonData.data.spaceDto.images);
					$("#hfThumbnail").val(jsonData.data.spaceDto.images);						
					//$("#price").val(jsonData.data.spaceDto.price);
					$("#resourceSpaceName").val(jsonData.data.spaceDto.spaceName);
					$("#maxNum").val(jsonData.data.spaceDto.maxNumber);
					 $("#foot_type").find("option[value="+jsonData.data.spaceDto.minNumber+"]").attr("selected",true); 
					var openList = jsonData.data.spaceOpenList;
					//console.log(openList);
					
					$("#openTime").html('');
					for(var i=0;i<openList.length;i++){
						var a='';
						a+="<tr>";
						a+="<td></td>"
						a+="<td>";
						a+="<input type=\"hidden\" id=\"resourceInfos"+i+"\" value=\""+jsonData.data.spaceDto.id+";"+openList[i].openWeek+";"+openList[i].endOpenWeek+";"+openList[i].startHour+";"+openList[i].endHour+";"+openList[i].price+"\"/>";
						a+="<select id=\"startDate"+i+"\" ><option value=\"1\">周一</option><option value=\"2\">周二</option><option value=\"3\">周三</option><option value=\"4\">周四</option><option value=\"5\">周五</option><option value=\"6\">周六</option><option value=\"7\">周日</option></select>";
						a+="<select id=\"startTime"+i+"\" ><option value=\"0\">00</option><option value=\"1\">01</option><option value=\"2\">02</option><option value=\"3\">03</option><option value=\"4\">04</option><option value=\"5\">05</option><option value=\"6\">06</option><option value=\"7\">07</option><option value=\"8\">08</option><option value=\"9\">09</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option><option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option><option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">23</option></select>";
						a+="<select id=\"endDate"+i+"\" ><option value=\"1\">周一</option><option value=\"2\">周二</option><option value=\"3\">周三</option><option value=\"4\">周四</option><option value=\"5\">周五</option><option value=\"6\">周六</option><option value=\"7\">周日</option></select>";
						a+="<select id=\"endTime"+i+"\" ><option value=\"0\">00</option><option value=\"1\">01</option><option value=\"2\">02</option><option value=\"3\">03</option><option value=\"4\">04</option><option value=\"5\">05</option><option value=\"6\">06</option><option value=\"7\">07</option><option value=\"8\">08</option><option value=\"9\">09</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option><option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option><option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">23</option></select>";
						a+="<input type=\"text\" id=\"price"+i+"\" value=\""+openList[i].price+"\" style=\"width:50px;\"/>元/小时";
						a+="<input type=\"button\" id=\""+i+"\" value=\"修改\" onclick=\"change("+i+");\"/>";
						a+="</td>";
						a+="</tr>";
						$("#openTime").append(a);
						//console.log("================"+a);
						$("#startDate"+i+" option").each(function(){  
							if($(this).val()==openList[i].openWeek){  
								$(this).attr("selected",true);  
							}  
						});	
						$("#startTime"+i+" option").each(function(){  
							if($(this).val()==openList[i].startHour){  
								$(this).attr("selected",true);  
							}  
						});
						$("#endDate"+i+" option").each(function(){  
							if($(this).val()==openList[i].endOpenWeek){  
								$(this).attr("selected",true);  
							}  
						});
						$("#endTime"+i+" option").each(function(){  
							if($(this).val()==openList[i].endHour){  
								$(this).attr("selected",true);  
							}  
						});
					}
			}	
					
			}
        
    });
	

	
});

