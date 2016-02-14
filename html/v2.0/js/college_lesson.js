$(document).ready(function(){ 

	loadLeesonList();

});

function loadLeesonList(){
	$.post("/trainInfo/college_lesson.do",{"currPage":1,"pageSize":50,"marked":-1},function(data){
		var objHtml = "";
		$.each(data.data.results, function(index, item) {
			objHtml+="<li>";
			objHtml+="<img src='"+item.micro_pic+"' border='0'>";
			objHtml+="<div class='sale'><span>"+item.tag_name+"</span></div>";
			objHtml+="<h1>"+item.name+"</h1>";
			objHtml+="<div class='desc'>";
			objHtml+="<h2>"+item.place+"<a href='college_lesson_detail.html?courseId="+item.courseId+"&addressId="+item.addressId+"'>查看详情 >></a></h2>";
			objHtml+="<p class='loc'>"+item.address+"</p>";
			objHtml+="<p class='les'><span>"+item.course_time+"</span> 课时    <span>"+item.price+"</span> 元/课时/人（送装备："+item.equip+"）</p>";
			objHtml+="<p class='tim'>上课时间："+item.openDate+" - "+item.endDate+"</p>";
			objHtml+="</div>";
			objHtml+="</li>";	
		});
		$(".leesonId").html(objHtml);		
	});
};