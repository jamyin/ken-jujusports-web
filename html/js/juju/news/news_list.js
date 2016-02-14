$(document).ready(function() {
	//加载新闻
    loadIndexNews();
    
	setOptions();

});

function loadIndexNews(){
	jQuery.ajax({
		url:'/api/home/newsList.do',
		type: 'POST',
		data : {pageSize:10},
		dataType :'json',
		success : function(data){
			var jsonData = data.data;
			$("#newsList").empty();
			var objHtml = "";
			$.each(data.data.results, function(index, item) {
                 objHtml+="<div class='news' onclick='load('news_info.html')' onmousemove=' ove(this)' onmouseout='out(this)' style='text-decoration: none; color: rgb(51, 51, 51);'>";
                 objHtml+="<p style='margin-left:10px;'>";
                 objHtml+="<img src='images/hyq.png' width='6' height='6'><span style='margin-left: 5px; color: rgb(51, 51, 51);'><a href='#' onclick=eventInfo('"+item['id']+"')>"+item['title']+"</a></span>";
                 objHtml+="<span style='font-size: 12px; float: right; color: rgb(51, 51, 51);'>"+item['showTime']+"</span>";
                 objHtml+="</p>";
                 objHtml+="</div>";                 
			});
			$("#newsList").html(objHtml);
		}
	});
};

function ove(t) {
    $(t).css({ "text-decoration": "underline", "color": "rgb(207,0,57)" });
    $("p span", t).css({ "color": "rgb(207,0,57)" });
};

function out(t) {
    $(t).css({ "text-decoration": "none", "color": "#333" });
    $("p span", t).css({ "color": "#333" });
};

function doLinkTo(page_Number){
	$("#currPage").val((page_Number+1));
	queryby();
};

function eventInfo(infoId){
	$("#infoId").val(infoId);
	$("#_eventInfoForm").submit();
}