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
		url:'/race/ajaxJumpInfosV2.do',
		type: 'POST',
		dataType :'json',
		data : {raceId:id},
		success : function(data){
			$("#match_detail").html("");
				var result = data.data;
				var strText = "";
				strText +="<h2 class=\"title\">"+result.title+"</h2>";
				strText +="<span class=\"time\">"+result.publishTime+"</span>";
				strText +="<div class=\"textbox\">"+result.context+"</div>";
				
				strText += "<div class=\"footer\"><div class=\"nav\"><a href=\"/app/news/index.html?index=lxwm\" target=\"_\">关于我们</a>" +
    			"<a href=\"/app/news/index.html?index=lxwm\" target=\"_\">加入我们</a><a href=\"/app/news/index.html?index=cjwt\"  target=\"_\">常见问题</a>" +
    			"<a href=\"/app/news/index.html?index=wzdt\"  target=\"_\"> 网站地图</a></div><div class=\"code\"><img src=\"img/code.jpg\" border=\"0\" alt=\"关注聚运动微信\">" +
    			"<span class＝\"wx\">关注我们的微信公众号</span></div><div class=\"copyright\">CopyRight 2015 上海聚运动文化传播有限公司 All Rigths Reserved 沪ICP备15015551号-1</div></div>"

			$("#match_detail").html(strText);
		}
	});
}
