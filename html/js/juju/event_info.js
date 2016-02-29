$(document).ready(function() {
	ajaxRaceInfos();
});


/**
 * ajax 方式 加载 赛事信息
 */
function ajaxRaceInfos(){
	var postUrl = "/race/ajaxJumpInfos.do";
	var infoId = $("#infoId").val();
	var dataParam = {raceId:infoId};
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : dataParam,
        dataType: 'json',
        success: function (data) {
        	var jsonData = data.data;
        		$(".c_title").html(jsonData.raceInfoDto.title);
        		$(".c_context").html(jsonData.raceInfoDto.context);
	     }
    });
}