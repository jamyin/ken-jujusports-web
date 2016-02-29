requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: '/js/juju/jquery-2.1.3.min'
    }
});


requirejs(['jquery'], function($) {
		  /*jQuery.ajax({
				url: '/sportType/list.do',  
                type: 'POST',  
                dataType: 'json',    
                success: function(data){
					$("#sportTypeSel").html('');
					$("#sportTypeSel").append("<option value=\'-1\'>请选择</option>");    
					var jsonData=data;//eval("("+data+")");
					 for(var i=0;i<jsonData.length;i++){
						 $("#sportTypeSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].sportName+"</option>");
					}
				},error :function(){
					alert('error');
				} 
			});*/
			
			jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:3,parentId:310100},
				success : function(data){
					$("#districtSel").html('');
					$("#districtSel").append("<option value=\'-1\'>请选择</option>");    
						var jsonData =data;
						console.log(jsonData);
						 for(var i=0;i<jsonData.length;i++){
							 $("#districtSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
				}
				
			});
	
		jQuery.ajax({
			url: '/serviceType/list.do',  
			type: 'POST',  
			dataType: 'json',    
			success: function(data){
					$("#serviceSel").html('');
					$("#serviceSel").append("<option value=\'-1\'>请选择</option>");    
					var jsonData=data;//eval("("+data+")");
					console.log(jsonData);
					 for(var i=0;i<jsonData.length;i++){
						 $("#serviceSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].serviceName+"</option>");
					}
				},error :function(){
					alert('error');
				} 
	});	
	Img();
                           
});

requirejs(['jquery'], function($) {
	$("#districtSel").change(function(){
		Img();
	});
});	
requirejs(['jquery'], function($) {
	$("#serviceSel").change(function(){
		Img();
	});
});	



