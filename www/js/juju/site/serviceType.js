/*
 * 模拟附加服务复选框（动态从数据库获取选项内容）
 */
requirejs.config({
	baseUrl: '../js',
	paths:{
		jquery: '/js/juju/jquery-2.1.3.min'
	}
});
requirejs(['jquery'], function($) {
	jQuery.ajax({
		url: '/serviceType/list.do',  
		type: 'POST',  
		dataType: 'json',    
		success: function(data){
			//var jsonData = eval("("+data+")");
			var jsonData=data.data;
			//console.log("=serviceType="+data);
			for(var i=0;i<jsonData.length;i++){
				$("#otherService").append("<div style=' float:left; font-size:12px; width:68px;'><input type='checkbox' name='otherServices' onclick=\"setServiceSelectAll();\" id='otherServices' value=\'"+jsonData[i].id+"\'>"+jsonData[i].serviceName+"</option></div>");						
			}
			//console.log("=stadiumType="+data);
		},error :function(){	
			alert('系统出错！');
		}
	});
});	