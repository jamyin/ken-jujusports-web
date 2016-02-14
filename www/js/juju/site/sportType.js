/*
 * 注册页面使用的。样式和sportType.js不一样
 * 模拟运动类型复选框（动态从数据库获取选项内容）
 */
requirejs.config({
	baseUrl: '../js',
	paths:{
		jquery: '/js/juju/jquery-2.1.3.min'
	}
});
requirejs(['jquery'], function($) {
	jQuery.ajax({
		url: '/sportType/list.do',  
		type: 'POST',  
		dataType: 'json',    
		success: function(data){
			//var jsonData=eval("("+data+")");
			var jsonData=data.data;
			//alert(jsonData);
			for(var i=0;i<jsonData.length;i++){
				//alert(jsonData[i].sportName);
				$("#venueTypes").append("<div style=' float:left; font-size:12px; width:68px;'><input class='venueType' type='checkbox' name='venueType' onclick=\"setSelectAll();\" id='venueType"+ i +"' value=\'"+jsonData[i].id+"\'><label style='color:rgb(255, 255, 255);' for='venueType"+ i +"'>"+jsonData[i].sportName+"</label></option>");				
			}
			//console.log("=stadiumType="+data);
		},error :function(){	
			alert('系统出错！');
		}
	});	
});	