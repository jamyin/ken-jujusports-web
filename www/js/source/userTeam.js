requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});

requirejs(['jquery'],function($) {
	$("#saveTeamBtn").click(function(){
		
	});
	
//    $.ajax({
//        url: '/sportType/findAll.do',
//        type: 'POST',
//        dataType: 'json',
//        success: function (data) {
//			 $("#sportTypeSel").html('');
//			var myObject = eval('(' + data + ')');
//            for (var i = 0; i < myObject.length; i++) {
//				 $("#sportTypeSel").append("<option value=\'"+myObject[i].id+"\'>"+myObject[i].sportName+"</option>");
//            }			
//        }
//    });
});
