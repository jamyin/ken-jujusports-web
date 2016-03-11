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


//	$(".item").on("click", function() {
//		$(this).parent().find(".item").removeClass("cur");
//		$(this).addClass("cur");
//	});

	$(".sex").on("click", function() {
		var ckd = $(this).attr("for");
		if ($("#" + ckd).prop("checked")) {
			//do nothing
		} else {
			$(".female").toggleClass("check");
			$(".male").toggleClass("check");
		}
	});

	$(".basic-edit").on("click", function() {
		if ($(this).attr("data-status") === "edit") {
			$(this).text("保存");
			$(this).attr("data-status", "save");
			$(".ucon").find("input").addClass("edit");
			$(".uploadbt,.sex,.pro,.city").removeClass("hide");
			$(".show-inf").addClass("hide");
		} else {
			$(this).text("编辑");
			getShowValue();
			$(this).attr("data-status", "edit");
			$(".ucon").find("input").removeClass("edit");
			$(".uploadbt,.sex,.pro,.city").addClass("hide");
			$(".show-inf").removeClass("hide");
		}
	});

});

function getShowValue() {
	var sex = $('.ucon-form input[name="sex"]:checked');
	$(".js-sex").text(sex.next().text());
	$(".js-addr").text($(".pro :selected").text() + $(".city :selected").text());
};