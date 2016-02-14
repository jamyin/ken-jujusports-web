requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});
requirejs(['jquery'],function($) {
		jQuery.ajax({
			url:'/race/findDetail.do',
			type:'POST',
			dataType :'json',
			success : function(data){
				var jsonData=data.data;
				console.log(jsonData);
				$("#raceDetail").html('');
				var a='';
				a+="<div><img src=\""+jsonData.raceInfoDto.pic+"\"/></div></br><div><p>"+jsonData.raceInfoDto.title+"</br>主办方:"+jsonData.raceInfoDto.organizers+"            赛事类型:"+jsonData.raceInfoDto.sportName+"</br>赛事介绍:"+jsonData.raceInfoDto.context+"</p></div>";
				var teamList = jsonData.raceTeamListDto;
				for(var i=0;i<teamList.length;i++){
					a+="<div>"+teamList[i].teamName+"      "+teamList[i].raceScore+"</div>"
				}
				$("#raceDetail").html(a);
			}
		});
});



