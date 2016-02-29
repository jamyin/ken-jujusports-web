$(function(){
	// 获取url中的参数
	// name=需要获取的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); // 匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; // 返回参数值
	}

	var id=getUrlParam("orderId");
	var classId=getUrlParam("classId");
	var orderId=getUrlParam("orderId");
	$(".bt").click(function(){
		var birthday=$("#select_date").val();
		var school=$("#school").val();
		$.post("/training/locale/toPay.do?id="+id+"&birthday="+birthday+"&school="+school,{},function(data){
			if(data.status!=200){
				alert(data.message);
				location.href = "/train/wap/home.html";
				return;
			}
			location.href = "/train/wap/pay_complate_recard.html?classId="+classId;
		});
	});
	
	
	
	
	$.post("/training/orderInfoById.do",{"orderId":orderId},function(data){
		//alert(orderno);
		if(data.status!=200){
			alert(data.message);
			return;
		}
		var pname=data.data.pname;//父母姓名
		var mobile=data.data.mobile;//手机号码
		var cname=data.data.cname;//孩子姓名
		if(!cname){
			cname="";
		}
		var isneedCname=data.data.isneedCname;//是否需要孩子报名
		if(isneedCname){
			
		}else{
			
		}
		$(".chilren_name").html(pname);
		$("#pay").html(getUrlParam("totoFee"));
	});
	
	
	
	
	
	
	
	
	
	

/*  var d = new Date().getFullYear();

  for (var y = (d - 16); y < d; y++) {
    $(".select_group .year").append("<option>" + y + "</option>");
  }

  for (var m = 1; m < 13; m++) {
    $(".select_group .month").append("<option>" + m + "</option>");
  }

  for (var d = 1; d < 32; d++) {
    $(".select_group .day").append("<option>" + d + "</option>");
  }*/
	  var d = new Date().getFullYear();

	  for (var y = (d - 16); y < d; y++) {
	    $(".select_group .year").append("<option>" + y + "</option>");
	  }

	  for (var m = 1; m < 13; m++) {
	    $(".select_group .month").append("<option>" + m + "</option>");
	  }

	  for (var d = 1; d < 32; d++) {
	    $(".select_group .day").append("<option>" + d + "</option>");
	  }

	  $(":input").focus(function(){
	    $(".bt").fadeOut(100);
	    $(this).blur(function(){
	      $(".bt").fadeIn(100);
	    });
	  });

});
