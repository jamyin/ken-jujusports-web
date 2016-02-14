

$(document).ready(function(){
	$("#pageSize").val("6");
	matchContext();
	});

function matchContext(){
	var pageSize = $("#pageSize").val();
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
       // async:false,  
        data : {pageSize:pageSize},
        dataType: 'json',
        success: function (data) {
        	$("#context_match").html("");
	        var result = data.data.results;
	        var pageMaxCount =data.data.total ;
	        var strText ="";
	        for(var i = 0;i<result.length;i++){
	        	strText +="<li>";
	        	//默认图片
	        	if(result[i].pic != null && result[i].pic != ""&&result[i].pic != undefined){
	        		strText += "<img src=\""+result[i].pic+"\" border=\"0\" alt=\"\">";
	        	}else{
	        		strText +="<img src=\"img/match_pic.jpg\" border=\"0\" alt=\"\">"; 
	        	}
	        	strText += "<div class=\"cout\">";
	        	strText += "<h2 class=\"title\">"+result[i].title+"</h2>";
	        	strText += "<span class=\"time\">" +result[i].showTime+"</span>";
	        	
	        	var context =result[i].context;
	        	if(result[i].brieflys!=null &&result[i].brieflys!=""){
	        		strText += "<div class=\"text\">"+result[i].brieflys+"</div>";
	        	}else{
	        		strText += "<div class=\"text\">"+context+"</div>";
	        	}
	        	
	        	strText += "<div class=\"panel_box\"><a class=\"readmore\" href=\"match_detail.html?id="+result[i].id+"\" >阅读全文>></a><a class=\"wx_code\" href=\"###\">在手机上阅读</a></div>";
	        	strText += "</div>";
	        	strText +="<div class=\"wx_codebox\">" +
		        			"<div class=\"arrow\"></div><div class=\"img_box\">" 
	        	
	        	strText +=  "<img src=\"/api/home/getCodeImage.do?id="+result[i].id+"\" border=\"0\" alt=\"\">" ;
	        	strText +=	"</div>" +
	        			"</div></li>"
	        }
	        var count =	$("#pageSize").val();
	        //最后一条不显示更多
	        if(pageMaxCount < count ){
	        	
	        	
	        }else{
	        	strText += "<a class=\"more\" href=\"###\" onclick=\"getPageSizeNum();\">查看更多赛事资讯</a>";
	        }
	        	strText += "<div class=\"footer\"><div class=\"nav\"><a href=\"/app/news/index.html?index=lxwm\" target=\"_\">关于我们</a>" +
	        			"<a href=\"/app/news/index.html?index=lxwm\" target=\"_\">加入我们</a><a href=\"/app/news/index.html?index=cjwt\" target=\"_\">常见问题</a>" +
	        			"<a href=\"/app/news/index.html?index=wzdt\" target=\"_\"> 网站地图</a></div><div class=\"code\"><img src=\"img/code.jpg\" border=\"0\" alt=\"关注聚运动微信\">" +
	        			"<span class＝\"wx\">关注我们的微信公众号</span></div><div class=\"copyright\">CopyRight 2015 上海聚运动文化传播有限公司 All Rigths Reserved 沪ICP备15015551号-1</div></div>"
	        $("#context_match").html(strText);
	        //加载完成标签后  为标签注册方法
	       /* $('.wx_code').on('click',function(){
				$(this).closest('li').find('.wx_codebox').toggleClass('show')
			});*/
	        //ie7 hack z-index
        	$('.match_box ul li').each(function() {
        		var z_index = 100 - $(this).index()
                $(this).css('z-index',z_index)
            });
        	//二维码切换
        	$('.wx_code').on('click',function(){
    			$('.wx_codebox').removeClass('show')
    			$(this).closest('li').find('.wx_codebox').toggleClass('show')
    		})

	     }
    });
}

//增加每页显示条数
function getPageSizeNum(){
	var pageSize = $("#pageSize").val();
	var pageSize = (parseInt(pageSize)+4);
	$("#pageSize").val(pageSize);
	matchContext();
}