$(function() {
	$(".nav-cho").on("click", "a", function(e) {
		var _this = $(this);
		_this.parents(".nav-cho").find("a").removeClass("cur");
		_this.addClass("cur");
		$(".js-nav-cur").text(_this.text());
	});
	fill();
	setList();
});

function fill() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 3; i++) {
		li = $(".nav-ring-dt li:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".nav-ring-dt ul").append(doms);
};

function setList(){
	$('.integr ul li:last').css('border','0')
	$('.integr ul li:first').addClass('cl')
	for(var i=0;i<3;i++){
		$('.integr ul').find('li').eq(i).find('.date').addClass('hl')
	}
}