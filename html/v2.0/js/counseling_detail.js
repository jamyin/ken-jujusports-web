$(document).ready(function(){
		var searchStr = location.search;
	    searchStr = searchStr.substr(1);//将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
	    var searchs = searchStr.split("&");//获得第一个参数和值
	    var address = searchs[0].split("=");
	    var id =address[1]; 
	    getByIdmacth(id);
	});

function getByIdmacth(id){
	jQuery.ajax({
		url:'/training/msgDetail.do',
		type: 'POST',
		dataType :'json',
		data : {id:id},
		success : function(data){
			var title = data.data.title;
			//alert("title=" + title);
			$("#title").html(title);
			$("#contentDetail").html("");
				var result = data.data;
//				console.log(result);
				var strText = "";
				strText += "<h1>" + result.title + "</h1>";
				strText += result.content;
			$("#contentDetail").html(strText);
		}
	});
}
