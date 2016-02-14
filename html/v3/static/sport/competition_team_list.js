var num_everyPage = 5;
var currPage = 1;
var gameId = $("#gameId").val();
var name = $(".team-search-text").val();
var teamType= '';

$(function(){
	ajax();
	
	// 球队类型选择
	$(".js-team-type").on("click", function() {
		$(".js-team-type").removeClass("cur");
		$(this).addClass("cur");
		teamType = $(this).attr('team_type_id');
		ajax();
	});
	
	// 按球队名称搜索
	$(".team-search-bt").on("click", function() {
		name = $(".team-search-text").val();
		if (name == ''){
			layer.msg('请输入搜索球队名称');
			return;
		}
		ajax();
	});
})

function ajax(){
	initTeamList();
	jQuery.ajax({
		url : '/team/queryTeam.htm',
		type : 'POST',
		dataType : 'json',
		data : {
			page : currPage,
			limit : num_everyPage,
			gameId : gameId,
			teamType : teamType,
			name : name
		},
		success : function(data) {
			var numTotal = data.total;
			var currPage = data.currPage;

			var jsondata = data.results;
			if (jsondata != null) {
				var html = "";
				for (var i = 0; i < jsondata.length; i++) {
					var logo = jsondata[i].logo;
					var name = jsondata[i].name;
					var id = jsondata[i].id;
					var gameStr = jsondata[i].gameStr;
					var distruct = jsondata[i].distructStr; // 地区
					var set_up_time = jsondata[i].setUpTimeStr; // 成立时间
					var team_type = jsondata[i].teamTypeStr; // 球队类型

					html += '<li class=\"team-li\">';
					html += '<img class="team-ico" src=\"' + logo + '\" />';
					html += '<div class=\"team-info\">';
					html += '<p class=\"team-info-1\"><span class=\"team-name\">'
							+ '<a href="/tc/index/'+id+'.htm">'+name+'</a>'
							+ '</span><span class=\"team-type\">'
							+ gameStr + '</span></p>';
					html += '<p class=\"team-info-2\"><span class=\"team-type1\">类型：<i>'
							+ team_type
							+ '</i></span>';
					if (distruct != null && distruct != ''){
						html += '<span class=\"team-area\">地区：<i>' + distruct + '</i></span>';
					}
					html += '</p>';
					html += '<span class=\"create-date\"><i>' + set_up_time
							+ '</i>创建</span>';
					html += '</div></li>';
				}
				$(".team-ul").html(html);

				var pageNum = (numTotal % num_everyPage) == 0 ? (numTotal / num_everyPage)
						: parseInt(numTotal / num_everyPage + 1);
				var page_content = '';
				if (currPage != 1) {
					page_content += '<a class=\"team-prev\" href=\"javascript:findData('+(currPage-1)+')\">上一页</a>';
				} else {
					page_content += '<a class=\"team-prev\">上一页</a>';
				}
				if (currPage != pageNum) {
					page_content += ' <a class=\"team-next\" href=\"javascript:findData('+(currPage+1)+')\">下一页</a>';
				} else {
					page_content += ' <a class=\"team-next\">下一页</a>';
				}
				page_content += '<span class=\"team-page-info\"><i>'
						+ currPage + '</i>/<i>' + pageNum + '</i></span>'
				$(".team-page").html(page_content);
			}
		}
	});
}

function initTeamList(){
	//var html = '<li class=\"team-li\"><div class="team-info"><p class=\"team-info-2\"><span class=\"team-name\">查询中,请稍等...</span></p></div></li>';
	$(".team-ul").html('');
}

// 球队分页查询
function findData(currentPage){
	currPage = currentPage;
	ajax();
}