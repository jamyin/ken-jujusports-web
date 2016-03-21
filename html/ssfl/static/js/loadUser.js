$(function() {
	$.ajax({
		url : '/login/load.htm',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.status == 200){
				if(data.data.mobile!=null && data.data.mobile!=""){
					$(".p_center").html(data.data.mobile+"  个人中心");	
				}else{
					$(".p_center").html(data.data.email+"  个人中心");
				}
				
			}else{
				layer.msg(data.message);
			}
		}
	});
});
