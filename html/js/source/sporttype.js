requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: '/js/juju/jquery-2.1.3.min',
		jquerys:'/js/module/ajaxfileupload'
    }
});

requirejs(['jquery'],function($) {
	var a="<option value=\'-1\'>请选择</option>";
    $.ajax({
        url: '/sportType/findByStad.do',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
			var myObject =data.data;
            for (var i = 0; i < myObject.length; i++) {
				 a+="<option value=\'"+myObject[i].id+"\'>"+myObject[i].sportName+"</option>";
            }
			$("#sportTypeSel").html(a);
        }
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
	
requirejs(['jquery'], function($) {
		$("#saveBut").click(function(){
		var sportTypeSel=$("#sportTypeSel").find("option:selected").val();
		var spaceName = $("#spaceName").val();
		var userImage = $("#hfThumbnail").val();
		var price = $("#price").val();
		var maxNum = $("#maxNum").val();
		var sportTypeSel = $("#sportTypeSel").find("option:selected").val();
		var footType = $("#foot_type").find("option:selected").val();
		if(spaceName==''||price==''||sportTypeSel==''){
				alert('场地名称或价格不能为空!');
				return false;
			}
		if($(".open_date").children().length==0){
			alert('场地时间不能为空');
			return false;
			
		}
		if(maxNum==''||isNaN(maxNum)){
			$("#maxNum").val('0');
			maxNum=0;
		}
	
		if(sportTypeSel=='1'&&footType=='-1'){
			alert('足球类型不能为空!');
			return false;
		}
				/*jQuery.ajax({
							url:'/space/insertSave.do',
							type:'POST',
							data :{spaceName:spaceName,sportType:sportTypeSel,userImage:userImage,maxNumber:maxNum,minNumber:footType},
							dataType:'json',
							async:false,
							success:function(data){
								var myObject = data.message;
								if(myObject==200){
									alert("保存成功！");
									
								}
							}
				});*/
				alert("保存成功!");
				var index = parent.layer.getFrameIndex(window.name);  
				//alert("vvv32"+window.top.site_ifr.contentWindow);
				//for(x in window.top.site_ifr) {
				//	alert(x);
				//}
				var obj = window.top.site_ifr.contentWindow || window.top.site_ifr;
				obj.findAll();
				parent.layer.close(index);
			
		
		});
		
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
			var addition = $("#additions").val();
			var adds = 1;
			if(addition=='1'){
				adds=0;
			}

			if(spaceName==''||price==''||sportTypeSel==''){
				alert('场地名称或价格不能为空!');
				return false;
			}
			var ex = /^\d+$/;
			if(maxNum==''||isNaN(maxNum)){
				$("#maxNum").val('0');
				maxNum=0;
			}
			if(!ex.test(maxNum)){
				alert('最大人数必须为整数');
				return false;
			}
	
			if(price==''||isNaN(price)){
				alert('价格必须是数字');
				return false;
			}
			if(price>10000){
				alert('场地价格不能大于10000元');
				return false;
			}

			if (!ex.test(price)) {
				alert('价格必须为整数');
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
			if(sportTypeSel=='1'&&footType=='-1'){
			alert('足球类型不能为空!');
			return false;
		}
					jQuery.ajax({
							url:'/space/findOpen.do',
							type:'POST',
							data :{startDate:sel_begin_week,endDate:sel_and_week,startTime:sel_begin_h,endTime:sel_and_h,spaceName:spaceName,price:price,sportType:sportTypeSel,userImage:userImage,maxNumber:maxNum,minNumber:footType,nameStatus:adds},
							dataType:'json',
							success:function(data){
								var myObject =data.message;
								if(myObject==200){
									alert("添加成功");
									$("#additions").val('1');
									$div.html("<span id=\"begin_week\">"+sel_begin_text+"</span> 至<span id=\"and_week\">"+sel_and_text+"</span>&nbsp;<span id=\"begin_h\">"+sel_begin_h+"</span>:<span id=\"begin_m\">00</span>-<span id=\"and_h\">"+sel_and_h+"</span>:<span id=\"and_m\">00</span><br />");
									$(".open_date").append($div);
									$(".open_date").css("display", "block");
									
								}else if(myObject==402){
									alert("时间冲突");
									return false;
								}else if(myObject==401){
									alert("用户类型不是场馆用户");
									return false;
								}else if(myObject==403){
									alert("价格或最大人数不能小于0");
									return false;
								}else if(myObject==404){
									alert('用户未登录');
									return false;
								}else if(myObject==407){
									alert('一天不能增加2个时间段');
									return false;
								}else if(myObject==405){
									alert('场地名称不相同');
									return false;
								}else if(myObject==408){
									alert('免费场地不能收费');
									return false;
								}
							}
						
						});

						
					
			
			
           
	});
});	


