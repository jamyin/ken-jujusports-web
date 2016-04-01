$(function() {

	/*fill();
	fill2();
	fill3();*/
	
	$(".team-tab").on("click","span",function(e){
		var flag = $(this).attr("data-name");
	    $(this).parent().find("span").removeClass("cur");
	    $(this).addClass("cur");
//	    debugger;
	    $(".team-detail").find("ul").addClass("hide");
			$("."+flag).removeClass("hide");
	});
});

/*function fill() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 14; i++) {
		li = $(".C:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".count ul").append(doms);
};
function fill2() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 14; i++) {
		li = $(".team-ul-A .team-li:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".team-ul-A").append(doms);
};
function fill3() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 14; i++) {
		li = $(".team-ul-B .team-li:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".team-ul-B").append(doms);
};*/

