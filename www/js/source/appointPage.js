requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});
requirejs(['jquery'],function($) {
			$("#appointDiv").html('');
			$("#curr").val('');
			$("#total").val('');
			$("#pageSize").val('');			
			jQuery.ajax({
			url:'/order/items/list.do',
			type:'POST',
			dataType :'json',
			data :{currPage:1,pageSize:5},
			success : function(data){
				$("#curr").val(data.currPage);
				$("#total").val(data.total);
				$("#pageSize").val(data.pageSize)
				console.log(data);
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
	$("#nextPage").click(function(){
		var curr = parseInt($("#curr").val())+1;
		var total=$("#total").val();
		var pageSize=$("#pageSize").val();
		var totalSize= parseInt(total/pageSize)+1;
		if(curr>totalSize){
			curr=totalSize;
		}
		jQuery.ajax({
			url:'/order/items/list.do',
			type:'POST',
			dataType :'json',
			data :{currPage:curr,pageSize:pageSize},
			success:function(data){
				$("#appointDiv").html('');
				$("#curr").val('');
				$("#total").val('');
				$("#pageSize").val('');	
				$("#curr").val(data.currPage);
				$("#total").val(data.total);
				$("#pageSize").val(data.pageSize)
				console.log(data);
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
});

requirejs(['jquery'],function($) {
	$("#onPage").click(function(){
		var curr = parseInt($("#curr").val())-1;
		var total=$("#total").val();
		var pageSize=$("#pageSize").val();
		if(curr<=0){
			curr=1;
		}
		jQuery.ajax({
			url:'/order/items/list.do',
			type:'POST',
			dataType :'json',
			data :{currPage:curr,pageSize:pageSize},
			success:function(data){
				$("#appointDiv").html('');
				$("#curr").val('');
				$("#total").val('');
				$("#pageSize").val('');	
				$("#curr").val(data.currPage);
				$("#total").val(data.total);
				$("#pageSize").val(data.pageSize)
				console.log(data);
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
});	


