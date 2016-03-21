$(function() {
	$(".nav-cho").on("click", "a", function(e) {
		var _this = $(this);
		_this.parents(".nav-cho").find("a").removeClass("cur");
		_this.addClass("cur");
		$(".js-nav-cur").text(_this.text());
		queryMatchs(_this.text(),1);
	});
	setList();

	// 初始化比赛记录
	queryMatchs(1,1);
});

// ajax 查询当前场次下比赛记录
function queryMatchs(currRound, currPage){
	$.ajax({
		type : "POST",
		url : "/round/queryMatchs.htm",
		data:{currRound:currRound,currPage:currPage},
		datatype : "json",// "xml", "html", "script", "json", "jsonp","text".
		beforeSend : function() {
		},
		success : function(data) {// 成功返回之后调用的函数
			var jsondata = null;// eval('(' + data + ')');
			if (data instanceof Object) {
				jsondata = data;
			} else {
				jsondata = eval('(' + data + ')');
			}
			if (jsondata.status == 200) {
				initMatchs();	// 初始化
				if (null == jsondata.data || jsondata.data == 'undefined'){
					return;
				}
				var currRound = jsondata.data.currRound;	// 当前轮
				var up = jsondata.data.up;					// 上一轮
				var down = jsondata.data.down;				// 下一轮
				upAndDown(up, down ,currRound);

				var matchs = jsondata.data.matchs;			// 比赛记录数据

				if (null == matchs || matchs == 'undefined' || null == matchs.results || matchs.results == 'undefined'){
					return;
				}
				//解析数组
				$.each(matchs.results, function(i, item) {
					$(".nav-ring-dt ul").append(getMatch(item.homeTeamName, item.homeTeamIcon, (new Date(item.matchTime)).format("yyyy-MM-dd hh:mm"),
					item.homeScore+':'+item.visitingScore, '#', item.visitingTeamIcon, item.visitingTeamName));
				});
				pageUrl(matchs.currPage, matchs.totalPage);
			} else {
				alert(jsondata.message);
			}
		},
		complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

		},
		error : function() {// 调用出错执行的函数

		}
	});
}

// 分页跳转
function gotoPage(currPage){
	queryMatchs($('.nav-ring-sw i').html(),currPage);
}

// 初始化
function initMatchs(){
	// 初始化上下轮数据
	$('.lt').hide();
	$('.rt').hide();
	$('.nav-ring-sw i').html('');

	$(".nav-ring-dt ul").html('');	// 比赛记录数据初始化
	$('.pagenav').html('');		// 分页初始化
}

// date-格式如:2016-3-16 16:10, url-比赛数据详情跳转路径,
function getMatch(leftName, leftIcon, date, result, url, rightIcon, rightName){
	var html = '<li><div class=\"team-A team\"><span class=\"team-nm\">'+leftName+'</span>';
	html += '<img class=\"team-lg\" src=\"'+leftIcon+'\" /></div>';
	html += '<div class="team-result team">';
	html += '<div class=\"time\">'+date+'</div>';
	html += '<div class=\"result\">'+result+'</div>';
	html += '<div class=\"detail\"><a class=\"detail-a\" href=\"'+url+'\">数据>></a></div></div>';
	html += '<div class=\"team-B team\"><img class=\"team-lg\" src=\"'+rightIcon+'\" />';
	html += '<span class=\"team-nm\">'+rightName+'</span></div></li>';

	return html;
}

// 生成分页
function pageUrl(currPage, totalPage){
	var html ='';
	if (currPage > 1){
		html += '<a href=\"javascript:gotoPage('+(currPage-1)+');\"><</a>';
	}
	for (var i = 1; i <= totalPage; i++){

		if (currPage == i){
			html += '<a class=\"cur\" href=\"javascript:;\">'+i+'</a>';
		}else{
			html += '<a href=\"javascript:gotoPage('+i+')\">'+i+'</a>';
		}
	}
	if (currPage < totalPage){
		html += '<a href=\"javascript:gotoPage('+(currPage+1)+');\">></a>';
	}
	$('.pagenav').html(html);
}

// 生成上一轮,下一轮
function upAndDown(up, down, currRound){
	if (null != up || up != undefined){
		$('.lt').show().css("display","inline-block");
		$('.lt').attr('href', 'javascript:queryMatchs('+up+',1)');
	}
	if (null != down || down != undefined){
		$('.rt').show().css("display","inline-block	");
		$('.rt').attr('href', 'javascript:queryMatchs('+down+',1)');
	}
	if (null != currRound || currRound != undefined){
		$('.nav-ring-sw i').html(currRound);
	}
}

/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
	/*
	 * eg:format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
		// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
			- RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
				? o[k]
				: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

/*function fill() {
	var doms = document.createDocumentFragment(),li;
	for (var i = 0; i < 3; i++) {
		li = $(".nav-ring-dt li:last");
		doms.appendChild(li[0].cloneNode(true));
	}
	$(".nav-ring-dt ul").append(doms);
};*/

function setList(){
	$('.integr ul li:last').css('border','0')
	$('.integr ul li:first').addClass('cl')
	for(var i=0;i<3;i++){
		$('.integr ul').find('li').eq(i).find('.date').addClass('hl')
	}
}