$(function() {
/*	$("#upload").on('click', function(){
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
	});*/
	
	//省市县级联查询  --查询市
	$("#province").change(function(){ 
		var level = 2;
		var parentId = 	$("#province").val();
		//console.log("parentId="+parentId);
		var choose = "<option value=''>请选择</option>";
		$("#area").html(choose);
		$("#location").html(choose);
		$.ajax({
			url:'/address/findAddress.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:{level:level,parentId,parentId},
			success:function(data){
				//console.log(data.data);
				var innerHtml  = choose;
				for(var i=0;i < data.data.length;i++){
					innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
				}
				$("#area").html(innerHtml);
			}
		})
	});
	
	//省市县级联查询  --查询地区
	$("#area").change(function(){ 
		var level = 3;
		var parentId = 	$("#area").val();
		//console.log("parentId="+parentId);
		var choose = "<option value=''>请选择</option>";
		$("#location").html(choose);
		$.ajax({
			url:'/address/findAddress.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:{level:level,parentId,parentId},
			success:function(data){
				var innerHtml  = choose;
				for(var i=0;i < data.data.length;i++){
					innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
				}
				$("#location").html(innerHtml);
			}
		})
	});
});
