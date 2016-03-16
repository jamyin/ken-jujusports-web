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
			$(".js-login,.js-nake").removeAttr("readonly");
		} else {
			$(this).text("编辑");
			getShowValue();
			$(this).attr("data-status", "edit");
			$(".ucon").find("input").removeClass("edit");
			$(".uploadbt,.sex,.pro,.city").addClass("hide");
			$(".show-inf").removeClass("hide");
			$(".js-login,.js-nake").attr("readonly","readonly");
		}
	});
	
	$(".usafetipc").on("click","label",function(e){
	    $(this).siblings("label").removeClass("cur");
	    $(this).addClass("cur");
	});

	$(".usafert").on("click",function(e){
		var _this=$(this);
		if(_this.attr("data-show")==="false"){
			_this.attr("data-show","true");
			if(_this.attr("data-fill")==="true"){
				_this.text("更换安全邮箱");
			}else{
				_this.text("设置");
			}
			_this.next().addClass("hide");
			_this.parent().addClass("bod");
		}else{
			_this.attr("data-show","false");
			_this.text("收起");
			_this.next().removeClass("hide");
			_this.parent().removeClass("bod");
		}
	})
	

});
function getShowValue() {
	var sex = $('.ucon-form input[name="sex"]:checked');
	$(".js-sex").text(sex.next().text());
	$(".js-addr").text($(".pro :selected").text() + $(".city :selected").text());
};

