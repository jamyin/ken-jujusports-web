requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});
requirejs(['jquery'],function($) {
		
			jQuery.ajax({
			url:'/order/items/list.do',
			type:'POST',
			dataType :'json',
			data :{currPage:1,pageSize:5},
			success : function(data){
				$("#appointDiv").html('');
				var jsonData=data.results;
				var a='';
				a+="<div>";
				for(var i =0;i<jsonData.length;i++){
					a+=""+jsonData[i].date+"  "+jsonData[i].orderTime+":00-"+jsonData[i].endTime+":00  "+jsonData[i].spaceName+"   "+jsonData[i].ownerName+"   "+jsonData[i].telephone+"</br>";
				}
				a+="</div>"
				$("#appointDiv").html(a);
			}
		});		
});

requirejs(['jquery'],function($) {
	$("#moreOrder").click(function(){
		location.href="/app/appointPage.html";
		
	});
});


