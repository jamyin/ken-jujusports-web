document.write("<script src='js/layer-v2.0/layer/layer.js'><\/script>");
var num_everyPage=5;
$(function(){
	jQuery.ajax({
		url:'/training/getcourseMessages.do',
		type: 'POST',
		dataType :'json',
		data : {currPage:1,pageSize:num_everyPage},
		success : function(data){
			if(data.status !=200){
//				alert(data.message);
				return false;
			}else{
				 buildList(data);
			}
		}
	}); 
});

 function findData(currentPage){
	 jQuery.ajax({
			url:'/training/getcourseMessages.do',
			type: 'POST',
			dataType :'json',
			data : {currPage:currentPage,pageSize:num_everyPage},
			success : function(data){
				if(data.status !=200){
					alert(data.message);
					return false;
				}else{
					 buildList(data);
					
				}
			}
		}); 
	 
 }
 
 function  buildList(data){
		var jsondata = data.data.results;
		var numTotal = data.data.total;
		var PageSize = data.data.pageSize;
		var currPage = data.data.currPage;
		if(jsondata && jsondata.length>0){
			var li_content="";
			for(var i =0;i<jsondata.length;i++){
				var courseName = jsondata[i].course_name;
				var deposit_ispayed = jsondata[i].deposit_ispayed;
				var is_payed = jsondata[i].is_payed;
				var apply_time = jsondata[i].apply_time;
				var order_no = jsondata[i].order_no;
				var open_status = jsondata[i].open_status;
				var status= "已报名";
				if(deposit_ispayed ==1 && is_payed == 0){
					status= "已支付定金";
				}
				if(is_payed == 1 && open_status == 1){
					status="正式上课";
				}
				if(open_status==500){
					status = jsondata[i].description;				
				}
				var htmlDoc = $.parseHTML( status );
				li_content = li_content+"<li><p class='title'>"+courseName+"</p><span onclick=showMsg('"+$(htmlDoc).text().replace(/\s/g,"")+"') class='status'>"+status+"</span><span class='time'>"+ apply_time +"</span>";
				if(deposit_ispayed==0){
					li_content =li_content+ "<a class=\"pay\" href=\"sign_up_pay_deposit.html?order_no="+order_no+"\">立即支付</a>";
				}
				li_content =li_content+"</li>";
			}
			 $(".mes_list").html(li_content);
			 
			var pageNum = (numTotal % num_everyPage) == 0 ? (numTotal / num_everyPage) : parseInt(numTotal / num_everyPage + 1);
			var page_content="<span>"+currPage+"/"+pageNum+"</span>";
			if(currPage !=1){
				page_content = page_content+"<a style='cursor:hand;' href=\"javascript:findData("+(currPage-1)+")\">上一页</a>";
			}else{
				page_content = page_content+"上一页";
			}
			if(currPage !=pageNum){
				page_content = page_content+"<a style='cursor:hand;' href=\"javascript:findData("+(currPage+1)+")\">下一页</a>";
			}else{
				page_content = page_content+"下一页";
			}
			if(numTotal>0){
				$(".picker").html(page_content)
			}
		}
		autoHeight()//放到ajax请求后执行
	 
 }
 
 function showMsg(info){
	 var index = layer.open({
	    content: info
	});
 }
 
 
 function autoHeight(){
	var h = $('.right_box').height()
	$('.myaccount_box').height(h)
}