$(function() {
	$(".show-eye").on("click", function() {
		$(this).parent().find("input").toggleClass("hide");
	});
	//手机注册密码
	$(".js-pwdh").on("change", function() {
		$(".js-pwd").val($(".js-pwdh").val());
	});
	$(".js-pwd").on("change", function() {
		$(".js-pwdh").val($(".js-pwd").val());
	});
	//邮箱注册密码
	$(".js-pwdh-e").on("change", function() {
		$(".js-pwd-e").val($(".js-pwdh-e").val());
	});
	$(".js-pwd-e").on("change", function() {
		$(".js-pwdh-e").val($(".js-pwd-e").val());
	});
	$(".getcode").on("click", function(e) {
		$(this).addClass("ckd");
	});
	$(".reg-con").on("click", ".hd", function(e) {
		$(this).parent().find(".hd").toggleClass("cur");
		if ($(".js-mobile").hasClass("cur")) {
			$(".reg-con-cen.mobile").removeClass("hide");
			$(".reg-con-cen.email").addClass("hide");
		} else {
			$(".reg-con-cen.mobile").addClass("hide");
			$(".reg-con-cen.email").removeClass("hide");
		}
	});
})