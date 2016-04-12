$(function() {

	//fill();
	setList();
});

function fill() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 5; i++) {
		li = $(".trail-con li:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".trail-con ul").append(doms);
}

function setList(){
	$('.integr ul li:last').css('border','0');
	$('.integr ul li:first').addClass('cl');
	for(var i=0;i<3;i++){
		$('.integr ul').find('li').eq(i).find('.date').addClass('hl');
	}
}
