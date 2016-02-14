$(function(){
	//点击打开视频
	$(".younth_video").on("click", function() {
		var id= $(this).attr("obj-id");
		$('<iframe width="600px" height="500px;" scrolling="yes" src="/video/toVideo.htm?id='+id+'"></iframe>').layerModel();	
	});
	
	//点击打开视频
	$(".play").on("click", function() {
		var id= $(this).attr("obj-id");
		$('<iframe width="600px" height="500px;" scrolling="yes" src="/video/toVideo.htm?id='+id+'"></iframe>').layerModel();
	}) 	
	
});

