$(function(){
	$(".online_click").on("click", function() {
		var id= $(this).attr("obj-id");
		clickCount(id);	
	});
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