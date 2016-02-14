//15分钟倒计时
var f = 1;
var m = 0;
function time_() {
	if (m == 0) {
		if (f != 0) {
			f = f - 1;
			m = 59;
			$("#date_tiem").html(
					(parseInt(f) < 10 ? "0" + f : f) + ":"
							+ (parseInt(m) < 10 ? "0" + m : m));
		} else {
			$("#date_tiem").html("订单超时");
			$("#query").attr("id","queryDsiable");
			clearInterval(timeid);
		}
	} else {
		m = m - 1;
		$("#date_tiem").html(
				(parseInt(f) < 10 ? "0" + f : f) + ":"
						+ (parseInt(m) < 10 ? "0" + m : m));
	}
}
//var timeid = setInterval("time_() ", 1000);

function li_click(t) {
	$(".type_list ul li").each(function() {
		$(this).css({
			"background-color" : "RGB(232,232,232)",
			"color" : ""
		});

	});
	$(t).css({
		"background-color" : "#fff",
		"color" : ""
	});
}

var index="";
function _open() {
	index = $.layer({
        type: 2,
        title: false, //不显示默认标题栏
        shade: [0.5, '#000'], //不显示遮罩
        shift: 'top', //从头动画弹出
        area: ['550px', '446px'],
        iframe: { src: '/app/login.html' }
    });
}
function close(){
	layer.close(index);
}

function timer(intDiff){
	    window.setInterval(function(){
	    var day=0,
	        hour=0,
	        minute=0,
	        second=0;//时间默认值    
	    if(intDiff > 0){
	        day = Math.floor(intDiff / (60 * 60 * 24));
	        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
	        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
	        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	    }else{
			$("#date_tiem").html("订单超时");
			return false;
		}
	    if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
		var innerHtml = minute + ":" + second ;
	    $('#date_tiem').html(innerHtml);
	    intDiff--;
	    }, 1000);
	} 


$(document).ready(function() {
	var seconds = $("#payMinutes").val();
	timer(seconds);
	 $("#query").click(function(){
		 	var jsonData = $("#alipayment").serialize();
		 	console.log();
		 	var isChecked = document.getElementById("ck1").checked;
		 	if(!isChecked){
		 		layer.tips('请勾选服务条款', '#ck1');
		 		return false;
		 	}
			$.ajax({
		        url: "/pay/index.do",
		        data: jsonData,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
		        	if(data=="0"){
		        		_open();
		        	}else if(data == "1"){
		        		$("#nodifyForm").submit();
		        	}else{
		        		$("#alipayForm").html(data);
		        	}
		        	
		        }
		    });
	 });
});
