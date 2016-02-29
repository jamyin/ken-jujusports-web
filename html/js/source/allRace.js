requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});
requirejs(['jquery'],function($) {
		jQuery.ajax({
			url:'/race/findAll.do',
			type:'POST',
			dataType :'json',
			success : function(data){
				var jsonData=data.data;
				console.log(jsonData);
				$("#allRace").html('');
				var a='';
				for(var i =0;i<jsonData.length;i++){
					a+="<a href=\"/race/jumpInfos.do?id="+jsonData[i].id+"\"><img src=\""+jsonData[i].pic+"\"/></a></br>"
				}
				$("#allRace").html(a);
			}
		});
});



