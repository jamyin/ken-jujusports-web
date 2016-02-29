/* 
 * 显示场馆详细时用的，与sportType.js样式不一样
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
				//var i = jsonData.length;
				//alert(jsonData[i].sportName);
				/*$("#venueType").append("<input type='checkbox' name='venueType' id='venueType' value=\'"+jsonData[i].id+"\'>"+jsonData[i].sportName+"</option>");
				 if(jsonData.length == 9){ $("#venueType").append("<br/>");}*/
				$("#venueTypes").append("<div style=' float:left; font-size:12px; width:68px;'><input type='checkbox' name='venueType' id='venueType'  onclick=\"setSelectAll();\" value=\'"+jsonData[i].id+"\'><label for='ck2'>"+jsonData[i].sportName+"</label></option></div>");
				//if(i % 5 == 0){
				//	$("#venueType").append("<br/>");
				//}
			}
			//console.log("=stadiumType="+data);
		},error :function(){	
			alert('系统出错！');
		}
	});	
});	