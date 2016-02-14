$(document).ready(function() {

	//loadEventList();
	
	ajaxRaceInfos();
	
	loadTeamList();
	
	//评论发布操作
	loadfabuEvent();
});

/**
 * 加载赛事对应的队伍信息
 */
function loadTeamList(){
	var raceId = $("#raceId").val();
	var postUrl = "/race/loadRaceScore.do";
	var dataParam = {raceId:raceId};
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : dataParam,
        dataType: 'json',
        success: function (data) {
        	  var jsonData = data.data;
	          var teamScoreListObj = $(".teamScoreList");
	          teamScoreListObj.empty();
	          var objHtml = "";
	          $.each(jsonData, function(key, value) {
		  		objHtml+="<table class='content_info_tab'>";
		  		objHtml+="<tr style='background-color:rgb(201,201,201);'>";
		  		objHtml+="<td>"+key+"</td>";
		  		objHtml+="<td>场次</td>";
		  		objHtml+="<td>积分</td>";
		  		objHtml+="<td>净胜球</td>";
		  		objHtml+="<td>丢球</td>";
		  		objHtml+="</tr>";
		  		$.each(value, function(index, item) {
			  		objHtml+="<tr>";
			  		objHtml+="<td>"+item['teamName']+"</td>";
			  		objHtml+="<td>"+item['won']+"</td>";
			  		objHtml+="<td>"+item['points']+"</td>";
			  		objHtml+="<td>"+item['goalsDifference']+"</td>";
			  		objHtml+="<td>"+item['goalsAgainst']+"</td>";
			  		objHtml+="</tr>";
		  		});
		  		objHtml+="</table>";
			  });
			  
			  teamScoreListObj.append(objHtml);
	     }
    });
}

/*
 *	加载赛事列表
 */
function loadEventList(){
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
	          var eventListObj = $("#eventListId");
	          eventListObj.empty();
			  $.each(data.data, function(index, item) {
			  		var objHtml = "";
			  		if(index==0){
			  			$("#container_block_l").html("<img src=/"+item['pic']+" style='width:716px; height:426px;'>");
			  		}
			  		objHtml+="<li data-id="+item['id']+" data-pic=/"+item['pic']+" onclick='jumpInfos(this)' onmouseover='li_seover(this)'; onmouseout='li_out(this)'>";
			  		objHtml+="<div>"+item['title']+"</div>";
			  		objHtml+="</li>";
			  		eventListObj.append(objHtml);
			  });
	     }
    });
};
/**
 * ajax 方式 加载 赛事信息
 */
function ajaxRaceInfos(){
	var postUrl = "/race/ajaxJumpInfos.do";
	var raceId = $("#raceId").val();
	var dataParam = {raceId:raceId};
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : dataParam,
        dataType: 'json',
        success: function (data) {
        	var jsonData = data.data;
        	  $(".even_info").html(jsonData.raceInfoDto.context);
        	  //console.log("--"+jsonData.raceInfoDto.context);
	     }
    });
}

function jumpInfos(_this){
	var raceId = $(_this).attr("data-id");
	$("#raceId").val(raceId);
	
	ajaxRaceInfos();
	
	loadTeamList();
};

function loadfabuEvent(){
	$("#pfBut").click(function(){
		var raceId = $("#raceId").val();
		var pf = $("#starScore").val();
		var pfText= $("#pfText").val();
		if(pf==''){
			pf=5;
		}
		if(pfText.length>140){
				layer.msg("字数不能超过140字", 1, 1);
				return false;
		}else if(pfText==''){
			layer.msg("评论不能为空", 1, 1);
				return false;
		}else{
			jQuery.ajax({
				url: '/api/message/insert.do',  
	            type: 'POST',
	            dataType: 'json', 
				data:{msgToId:raceId,msgContent:pfText,msgScore:pf,msgResource:1},
	            success: function(data){
                	if(data.status==500){
                		layer.msg(data.message, 1, 1);
                	}else{
                		var dataObj = data.data;
						var pfAllObj = $("#pfBut");
						var pfList = "";
						pfList+="<div style='width: 100%; margin-top: 5px; height: 100%; min-height: 50px; overflow: hidden; border-top: 1px solid #808080; padding: 5px 0 10px 0;'>";
						pfList+="<div style='float: left;'><img onerror=this.src='/images/default.png' src='"+dataObj['userImg']+"' width='43px' height='43px'></div>";
						pfList+="<div div style=\"width:880px; margin-left:8px; float:left; word-wrap: break-word; word-break: normal;  word-break:break-all;\">";
						pfList+="<span style='color: rgb(207, 0, 57);padding-left:10px;'>"+dataObj['userAccount']+"</span>&nbsp;&nbsp;&nbsp;<span>"+dataObj['msgContent']+"</span>";
						pfList+="<p><span style='font-size: 12px; color: #cecaca;padding-left:10px;'>"+dataObj['showMsgTime']+"";
						if(dataObj['msgResource']==1){
							pfList+="来自web客户端</span>";
						} else if(dataObj['msgResource']==2){
							pfList+="来自手机客户端</span>";
						}
						pfList+="</p>";
						//pfList+="<div style='float: right;'><img src='/images/xing"+dataObj['msgScore']+".png'></div>";
						pfList+="<p></p>";
						pfList+="</div>";
						pfList+="</div>";			
						pfAllObj.after(pfList);
						$("#pfText").val('');
						$("#totalLists").html(parseInt($("#totalLists").html())+1);
						layer.msg("评论发布成功", 1, 1);
                	}
				}
				});	
		}
	});	
};

function findMore(){
	var currPage =parseInt($("#currPage").val())+1;
	var pageSize = parseInt($("#pageSize").val());
	var ownerAccountId = $("#raceId").val();
	jQuery.ajax({
	url: '/api/message/findMessByOwner.do',  
        type: 'POST',
        dataType: 'json', 
		data:{msgToId:ownerAccountId,pageSize:pageSize,currPage:currPage},
        success: function(data){
				var myObject = data.data;
				console.log(myObject);
				var Obj = myObject.results;
				var a='';
				for(var i =0;i<Obj.length;i++){ 
					a+="<div style=\"width:100%; margin-top:5px;   height:100%; min-height:50px; overflow:hidden; border-top:1px solid #808080; padding:5px 0 10px 0 ; \" >";
				var b = '';
					if(Obj[i].msgResource==1){
						b="来自web客户端"
					} else if(Obj[i].msgResource==2){
						b="来自手机客户端"
					}
					//a+="<div style=\" float:left;\"><img onerror=this.src='/images/default.png' src=\""+Obj[i].userImg+"\" width=\"43px\" height=\"43px\" /></div> <div style=\"width:888px; float:left;\"> <span style=\"color:rgb(207,0,57);padding-left:10px;\">"+Obj[i].userAccount+"</span>";
					//a+="&nbsp;&nbsp;&nbsp;<span>"+Obj[i].msgContent+"</span><p> <span style=\"font-size:12px; color:#cecaca;padding-left:10px;\">"+Obj[i].showMsgTime+" "+b+"</span></p></div></div>";
					//<div style='float:right;'><img src=\"/images/xing"+Obj[i].msgScore+".png\"/></div>
					a+="<div style=\" float:left;\"><img onerror=this.src='/images/default.png' src=\""+Obj[i].userImg+"\" width=\"43px\" height=\"43px\" /></div>";
							a+="<div style=\"width:880px; margin-left:8px; float:left; word-wrap: break-word; word-break: normal;  word-break:break-all;\"><span style=\"color:rgb(207,0,57);\">"+Obj[i].userAccount+"</span>&nbsp;&nbsp;&nbsp;&nbsp;";
							//a+="<span>"+Obj[i].msgContent+"</span><p> <span style=\"font-size:12px; color:#cecaca;padding-left:10px;\">"+Obj[i].showMsgTime+" "+b+"</span><div style='float:right;'><img src=\"/images/xing"+Obj[i].msgScore+".png\"/></div></p></div></div>";
							a+=""+Obj[i].msgContent+"  <p> <span style=\"font-size:12px; color:#cecaca;padding-left:10px;\">"+Obj[i].showMsgTime+" "+b+"</span></p></div></div>";

				}
				$("#pfAll").append(a);
				var totals = myObject.total;
				var currPages = myObject.currPage;
				var tempCurr =0;
						if(totals%10==0){
						 tempCurr = parseInt(totals/10);
						}else{
						tempCurr = parseInt(totals/10+1);
						}
				if(tempCurr>currPages){
				var b="<a href=\"javascript:void(0)\" onClick=\"findMore()\">共有<span id='totalLists'>"+myObject.total+"</span>条,点击加载更多</a>";
				$("#jiazai").html('');
				$("#jiazai").html(b);
				}else{
					$("#jiazai").html('');
				}
				$("#currPage").val(myObject.currPage);
	    }
	});
};