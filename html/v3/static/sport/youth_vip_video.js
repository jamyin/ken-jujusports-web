$(function(){
	//点击打开视频
	$(".younth_video").on("click", function() {
		var id= $(this).attr("obj-id");
		clickCount(id);
		$('<iframe width="600px" height="500px;" scrolling="yes" src="/online/toVideo.htm?id='+id+'"></iframe>').layerModel();	
	});
	
	//点击打开视频
	$(".play").on("click", function() {
		var id= $(this).attr("obj-id");
		clickCount(id);
		$('<iframe width="600px" height="500px;" scrolling="yes" src="/online/toVideo.htm?id='+id+'"></iframe>').layerModel();
	}) 	
});

//计数
function clickCount(oId){
	$.ajax({
		url:"/online/clickCount.htm",//提交的网址
		type: 'POST', 
		async:false,
		dataType: 'json',  
		data:{"oId":oId},//提交的数据
		success: function(data){
		},error :function(){
		}
	});	
}