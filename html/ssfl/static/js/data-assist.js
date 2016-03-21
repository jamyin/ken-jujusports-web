$(function() {

	fill();
});

function fill() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 8; i++) {
		li = $(".po-lid:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".ry").append(doms);
};

