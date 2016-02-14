var currPage = 1;
var num_everyPage = 6;
var videoType = $("#videoType").val();

$(function(){
	ajax();
})

function ajax(){
	initTeamList();
	jQuery.ajax({
		url : '/video/search.htm',
		type : 'POST',
		dataType : 'json',
		async:false,
		data : {
			page : currPage,
			limit : num_everyPage,
			videoType : videoType
		},
		success : function(data) {
			var numTotal = data.total;
			var currPage = data.currPage;
			var totalPage = data.totalPage;

			var jsondata = data.results;
			if (jsondata != null) {
				var html = "";
				for (var i = 0; i < jsondata.length; i++) {
					var id = jsondata[i].id;
					var videoThumb = jsondata[i].videoThumb == null? '' : jsondata[i].videoThumb;
					var videoName = jsondata[i].videoName == null? '' : jsondata[i].videoName;
					var publishPeople = jsondata[i].publishPeople == null? '' : jsondata[i].publishPeople;
				
					html += '<li class=\"youth-video-li\"><i class=\"play\" obj-id=\"'+id+'\"></i>';
					html += '<img src=\"'+videoThumb+'\" class=\"younth_video\" obj-id=\"'+id+'\"/>';
					html += '<div class=\"youth-video-info\">';
					html += '<p class=\"video-tip\">'+videoName+'</p>';	
					html += '<div class=\"pics-share\" style=\"float:rigth;\">';		
					html += '<div class=\"jiathis_style_24x24\" style=\"margin: 7px 0 0 40px; width: 60%; height: 24px;\">'		
					html +=	'<a class=\"jiathis_button_weixin\"></a>';
					html +=	'<a class=\"jiathis_button_qzone\"></a>';				
					html +=	'<a class=\"jiathis_button_tsina\"></a>';					
					html +=	'<a class=\"jiathis_button_tqq\"></a>';			
					html +=	'</div></div></div></li>';
				}
				$(".youth-video-ul").html(html);

				page(currPage, totalPage);
				
				loadShare();
			}
		}
	});
}

function loadShare(){
	var fileref1 = document.createElement('script');
    fileref1.setAttribute("type","text/javascript");
    fileref1.setAttribute("src","http://v3.jiathis.com/code/jia.js");
    document.getElementsByTagName("body")[0].appendChild(fileref1);
    var fileref2 = document.createElement('script');
    fileref2.setAttribute("type","text/javascript");
    fileref2.setAttribute("src","/static/js/youth_video.js");
    document.getElementsByTagName("body")[0].appendChild(fileref2);
}

var show_num = 7;
function page(currPage, totalPage){
	var page_content = '';
	if (currPage > 1){
		page_content += '<a href=\"javascript:findData(1)\">首页</a>';
	}else{
		page_content += '<a href=\"javascript:;\">首页</a>';
	}
	if (currPage - 1 > 0){
		page_content += '<a href=\"javascript:findData('+(currPage - 1)+')\">上一页</a>';
	}else{
		page_content += '<a href=\"javascript:;\">上一页</a>'
	}
	if (totalPage <= show_num){
		for (var i = 1; i <= totalPage; i++){
			if (i == currPage){
				page_content += '<a class=\"cur\" href=\"javascript:;\">'+i+'</a>';
			}else{
				page_content += '<a href=\"javascript:findData('+i+');\">'+i+'</a>';
			}
		}
	}else{
		if (currPage <= ((show_num +1)/2)){
			if (currPage > 1){
				for (var i = 1; i <= (currPage-1); i++){
					page_content += '<a href=\"javascript:findData('+i+')\">'+i+'</a>';
				}
			}
			page_content += '<a class=\"cur\" href=\"javascript:;\">'+currPage+'</a>';
			for (var i = 1; i <= (show_num - currPage); i++){
				page_content += '<a href=\"javascript:findData('+(currPage + i)+')\">'+(currPage + i)+'</a>';
			}
		}else{
			if ((totalPage - currPage) < ((show_num - 1)/2)){
				for (var i=(totalPage - show_num + 1); i <= totalPage; i++){
					if (currPage == i){
						page_content += '<a class=\"cur\" href=\"javascript:;\">'+i+'</a>';
					}else{
						page_content += '<a href=\"javascript:findData('+i+');\">'+i+'</a>';
					}
				}
			}else{
				for (var i = ((show_num - 1)/2); i > 0; i--){
					page_content += '<a href=\"javascript:findData('+(currPage-i)+')\">'+(currPage-i)+'</a>';
				}
				page_content += '<a class=\"cur\" href=\"javascript:;\">'+currPage+'</a>';
				for (var i = 1; i <= ((show_num - 1)/2); i++){
					page_content += '<a href=\"javascript:findData('+(currPage+i)+')\">'+(currPage+i)+'</a>';
				}
			}
		}
	}
	if ((currPage+1) <= totalPage){
		page_content += '<a href=\"javascript:findData('+(currPage+1)+')\">下一页</a>';
	}else{
		page_content += '<a href=\"javascript:;\">下一页</a>';
	}
	if (currPage < totalPage){
		page_content += '<a href=\"javascript:findData('+totalPage+')\">末页</a>';
	}else{
		page_content += '<a href=\"javascript:;\">末页</a>'
	}
	$(".pagenav").html(page_content);
}

function initTeamList(){
	$(".youth-video-ul").html('');
	$(".pagenav").html('');
}

// 视频分页查询
function findData(currentPage){
	currPage = currentPage;
	ajax();
}