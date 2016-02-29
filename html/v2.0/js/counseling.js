$(document).ready(function(){
//	$("#pageSize").val(1);
	$("#currPage").val(1);
	matchContext();
	});

function matchContext(){
//	var pageSize = $("#pageSize").val();
	var currPage = $("#currPage").val();
	var pageSize = $("#pageSize").val();
	//alert("currPage="+currPage);
	//新闻资讯列表显示
    $.ajax({
		url:'/training/msgPage.do',
		type: 'POST',
		dataType :'json',
		//data : {openId:"oSpKwv8Rvr4yIvO-P23xcgNxq3MU"},
		data : {page:currPage,pageSize:pageSize},     //page 当前页码
		success : function(data){
			//console.log(data);
			//$("#context_all").html("");
			var jsondata = data.data;
			var status = data.status;
			var total = jsondata.total;     
			var message = data.message;
			var currPage = jsondata.currPage;
			var pageSize = jsondata.pageSize;
			var result = jsondata.results;
//			alert("total="+total);
//			alert("status="+status);
//			alert("message="+message);
//			alert("currPage="+currPage);
//			alert("pageSize="+pageSize);
			var strText = "";
			for(var i = 0;i<result.length;i++){
				//alert(result[i].pic);
				strText+= "<li class=\"cont\"><div id=\"content\" class=\"content\">";
				/*//默认图片
	        	if(result[i].pic != null && result[i].pic != ""&&result[i].pic != undefined){
	        		strText += "<img src=\""+result[i].pic+"\" border=\"0\" alt=\"\">";
	        	}else{
	        		strText +="<img src=\"img/match_pic.jpg\" border=\"0\" alt=\"\">"; 
	        	}*/
				strText += "<img src=\""+result[i].microPic+"\" border=\"0\" alt=\"\">";
	        		strText += "<h2>"+result[i].title+"</h2>";
	        		strText += "<p>"+result[i].subtract+"</p>";
	        		strText += "<a href=\"counseling-detail.html?id="+result[i].id+ "\">阅读全文>></a></div></li>";
			}
			//最后一条不显示更多
			var currPage =	$("#currPage").val();
			//var lisum = $("#context_all li").length();
			if(total % 10 != 0){
				total++;
			}
	        	if(parseInt(total/10) > currPage){
	        		//alert("parseInt(total/2)="+parseInt(total/2)+";currPage="+currPage);
	        		$('.load_more').addClass('show')
	        	}else{
	        		$('.load_more').addClass('show');	
	        		$('.load_more').html('没有更多内容了...');
	        	}
	        	$("#context_all").append(strText);
			}
	}); 
};

//增加每页显示条数
function getPageSizeNum(){
	var currPage = $("#currPage").val();
	var currPage = (parseInt(currPage)+1);
	$("#currPage").val(currPage);
	matchContext();
}