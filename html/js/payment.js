$(function() {
	// 选择支付方式切换效果
	$('.paymod_box li').on('click', function() {
		$(this).addClass('cur').siblings('li').removeClass('cur')
	})
	// 同意协议
	var a_tag = $('.argeement_box .checkbox').attr('tag')
	$('.argeement_box').on('click', function() {
		if (a_tag == 0) {
			$(this).find('.checkbox').addClass('cur')
			$('p.check_wrong').empty()
			a_tag = 1
		} else {
			$(this).find('.checkbox').removeClass('cur')
			a_tag = 0

		}
	})
	// 提交验证事件
	$('.pay_submit').on('click', function() {// 付费提交事件
		if (a_tag == 0) {
			$('.check_wrong').html('提交前请先同意我们服务条款')
		}
	})

	$('.free_submit').on('click', function() {// 免费提交事件

	})

	// 计时器
	// timer(intDiff);
	var intDiff = parseInt($("#payMinutes").val());// 15分钟
	timer(intDiff);

	$("#paydo").click(function() {
		if (a_tag == 0) {
			return;
		}
		var jsonData = $("#alipayment").serialize();
		$.ajax({
			url : "/pay/index.do",
			data : jsonData,
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				if (data == "0") {
					_open();
				} else if (data == "1") {
					$("#nodifyForm").submit();
				} else {
					$("#alipayForm").html(data);
				}

			}
		});
	});
//	$("#freedo").click(function() {
//		if (a_tag == 0) {
//			return;
//		}
//		var jsonData = $("#alipayment").serialize();
//		alert($("#out_trade_no").val());
//		alert("确认支付页面未完成跳转");
//	});

});

// var intDiff = parseInt(60*15);//15分钟
function timer(intDiff) {
	window.setInterval(function() {
		var day = 0, hour = 0, minute = 0, second = 0;// 时间默认值
		if (intDiff > 0) {
			day = Math.floor(intDiff / (60 * 60 * 24));
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60)
					- (hour * 60 * 60) - (minute * 60);
		}
		if (minute <= 9)
			minute = '0' + minute;
		if (second <= 9)
			second = '0' + second;
		$('#time').html(minute + ':' + second);
		intDiff--;
		// 倒计时完成后
		if (intDiff == 0) {
			$(".pay_submit").html("订单失效无法支付");
			$(".pay_submit").css("background","#9B8E8D");
			$(".pay_submit").attr("id","");
			$(".pay_submit").attr("class","");
		}
	}, 1000)
}