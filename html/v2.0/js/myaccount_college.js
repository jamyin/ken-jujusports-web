var num_everyPage=5;
$(function(){
	var openId = "";
	var currPage = getUrlParam("currPage");
	//我的学院
	jQuery.ajax({
		url:'/training/mineCollegePage.do',
		type: 'POST',
		dataType :'json',
		data : {currPage:currPage,pageSize:num_everyPage,openId:openId},
		success : function(data){
			//console.log(data);
//			if(data.status!=200){
//				alert(data.message);
//				location.href = "/v2.0/login.html";
//				return;
//			}
			var numTotal = data.data.total;
			var currPage = data.data.currPage;
			
			var jsondata = data.data.results;
			if(jsondata != null){
				var html = "";
				for(var i =0;i<jsondata.length;i++){
					var courseName = jsondata[i].courseName;
					var description = jsondata[i].description;
					var usedTime = jsondata[i].usedTime;
					var leftTime = jsondata[i].leftTime;
					var leaveTime = jsondata[i].leaveTime;
					var truantTime = jsondata[i].truantTime;
					var courseId = jsondata[i].courseId;
					var addressId = jsondata[i].addressId;
					html = html + "<li><span class=\"name\">"+courseName+"</span><span class=\"finish\">"+usedTime+"</span><span class=\"unfinish\">"+ leftTime +"</span><span class=\"leave\">"+leaveTime+"</span><span class=\"cutclass\">"+ truantTime +"</span><span class=\"other\"><a href=\"college_lesson_detail.html?courseId="+courseId+"&addressId="+addressId+"\">续订</a></span></li>";
				}
				$("#class_list").html(html);
				
				var pageNum = (numTotal % num_everyPage) == 0 ? (numTotal / num_everyPage) : parseInt(numTotal / num_everyPage + 1);
				var page_content="<span>"+currPage+"/"+pageNum+"</span>";
				if(currPage !=1){
					page_content = page_content+"<a href=\"javascript:findData("+(currPage-1)+")\">上一页</a>";
				}else{
					page_content = page_content+"上一页";
				}
				if(currPage !=pageNum){
					page_content = page_content+"<a href=\"javascript:findData("+(currPage+1)+")\">下一页</a>";
				}else{
					page_content = page_content+"下一页";
				}
				$(".picker").html(page_content);
			}
		}
	}); 
});
function findData(currentPage){
	location.href = "myaccount_college.html?currPage="+currentPage;
}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}
