$(function() {
	//导航标记
	nav_mark('competition');
	if (parseInt($(".introduce-wrapper").css("height")) >= 150) {
		$(".introduce-more").css({
			"display": "inline-block"
		});
		$(".introduce-wrapper").addClass("close");
	}
	//球
	if ($(".ball").length > 0) {
		var _offsetX = $('.wrapper').offset().left + 1036;
		var _offsetY = 220;
		var _offsetY_b = $(".introduce").offset().top;
		var $ball = $(".ball");
		$ball.css({
			"left": $('.wrapper').offset().left + 1036 + "px",
			"display": "block"
		});
		$(window).scroll(function() {
			var _wscrollTop = $(window).scrollTop()
			if (_wscrollTop > _offsetY) {
				$ball.css({
					'top': _wscrollTop + 40 + 'px'
				})
			} else if (_wscrollTop <= _offsetY) {
				$ball.css({
					'top': _offsetY + 'px'
				})
			}
		});
		$(window).on("resize", function() {
			var left = $('.wrapper').offset().left;
			if (left <= 172.5) {
				$ball.hide();
			} else {
				$ball.show();
			}
			$ball.css({
				"left": left + 1036 + "px"
			});
		});
	}



	$(".introduce-more").on("click", function(e) {
		e.preventDefault();
		if ($(".introduce-wrapper").hasClass("close")) {
			$(this).html("收起 ∧");
		} else {
			$(this).html("展开 ∨");
		}
		$(".introduce-wrapper").toggleClass("close");
	});
	//图集
	$(".monents-pics").on("click", function() {
		if ($(".team-pics").hasClass("hide")) {
			$(".team-pics").toggleClass("hide");
			$(".team-video").toggleClass("hide");
		}
		$(".monents-videos").removeClass("monents-cur");
		$(this).addClass("monents-cur");
	});
	//视频
	$(".monents-videos").on("click", function() {
		if ($(".team-video").hasClass("hide")) {
			$(".team-pics").toggleClass("hide");
			$(".team-video").toggleClass("hide");
		}
		$(".monents-pics").removeClass("monents-cur");
		$(this).addClass("monents-cur");
	});

	//球队详情切换选项卡
	$(".youth-banner-li").on("click", function() {
		var to = $(this).attr("to");
		if (to != undefined) {
			window.open(to, "_self");
		}
	});
	//向左滚动
	$(".star-right").on("click", function() {
		moveLeft(".star-teams-move", 165, 5);
	});
	//向右滚动
	$(".star-left").on("click", function() {
		moveRight(".star-teams-move", 165);
	});
})

function moveLeft(selector, distance, mvno) {
	var moved = parseInt($(selector).attr("move"), 10);
	var left = -moved * distance;
	var num = $(selector + " img").length;
	var len = (num - mvno) * distance;
	if (left > -len) {
		left = left - distance;
		$(selector).css({
			"left": left + "px"
		}).attr("move", moved + 1);
		return moved + 1;
	}
	return moved;
};

function moveRight(selector, distance) {
	var moved = parseInt($(selector).attr("move"), 10);
	var left = -moved * distance;
	if (left < 0) {
		left = left + distance
		$(selector).css({
			"left": left + "px"
		}).attr("move", moved - 1 < 1 ? 0 : moved - 1);
		return moved - 1;
	}
	return moved;
};