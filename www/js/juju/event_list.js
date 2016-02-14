$(document).ready(function() {
	//加载数据列表
	loadEventList();
	//加载图片缩略图
	loadRaceList();
	//赛事列表
	loadRaceTitle();
	//近期赛事
	loadRaceNear();
});

function loadEventList(){
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : {pageSize:9},
        dataType: 'json',
        success: function (data) {
	          var eventListObj = $("#eventListId");
	          eventListObj.empty();
			  $.each(data.data.results, function(index, item) {
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

function loadRaceList(){
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : {pageSize:8},
        dataType: 'json',
        success: function (data) {
	          var middleList = $("#middle_list");
	          middleList.empty();
			  $.each(data.data.results, function(index, item) {
			  		var objHtml = "";
			  		if(index==0){
			  			$(".centre1_block_l_maximg").html("<img data-id="+item['id']+" class='cls_hand' onclick='jumpInfos(this);' src=/"+item['pic']+" style='width:380px; height:280px;'>");
			  		}
			  		if(index==1 || index ==2){
			  			objHtml+="<div class='img_block_img'>";
			  			objHtml+="<img data-id="+item['id']+" onclick='jumpInfos(this);' class='cls_hand' src=/"+item['pic']+" style='width:225px;height:136px;' />";
			  			objHtml+="</div>";
			  			middleList.append(objHtml);
			  		}
			  		if(index==3){
			  			$(".img_block_img1").html("<img data-id="+item['id']+" class='cls_hand' onclick='jumpInfos(this);' src=/"+item['pic']+" style='width:225px; height:280px;'>");
			  		}			  		
			  });
	     }
    });
};

function loadRaceTitle(){
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : {pageSize:8},
        dataType: 'json',
        success: function (data) {
	          var cgObj = $("#cg");
	          cgObj.empty();
			  $.each(data.data.results, function(index, item) {
			  		var objHtml = "";
			  		objHtml+="<li data-id="+item['id']+" onclick='jumpInfos(this)' >";
			  		objHtml+=""+(index+1)+"."+item['title']+"";
			  		objHtml+="</li>";
			  		cgObj.append(objHtml);
			  });
	     }
    });
};

function RaceObj(id,oId,oTitle){
	this.id = id;
    this.oId=oId;
    this.oTitle=oTitle;
}

function loadRaceNear(){
	var postUrl = "/api/home/eventList.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        data : {pageSize:8},
        dataType: 'json',
        success: function (data) {
	          var cg1Obj = $("#cg1");
	          cg1Obj.empty();
	          //var arrDemo = new Array();
	          var objectList = new Array();
			  $.each(data.data.results, function(index, item) {
			  		var objHtml = "";
			  		objHtml+="<li data-id="+item['id']+" onclick='jumpInfos(this)' >";
			  		objHtml+=""+(index+1)+"."+item['title']+"";
			  		objHtml+="</li>";
			  		objectList.push(new RaceObj(index,item['id'],item['title']));
			  		//arrDemo[index] = item['title'];
			  		//arrRaceIds[index] = item['id'];
			  		//cg1Obj.append(objHtml);
			  });
			  objectList.sort(function(a,b){
		            return b.id-a.id;
			  });
			  for(var i=0;i<objectList.length;i++){
		  		var objHtml = "";
		  		objHtml+="<li data-id="+objectList[i].oId+" onclick='jumpInfos(this)' >";
		  		objHtml+=""+(i+1)+"."+objectList[i].oTitle+"";
		  		objHtml+="</li>";
		  		cg1Obj.append(objHtml);				  
			  }
	     }
    });
};

function jumpInfos(_this){
	var raceId = $(_this).attr("data-id");
	//console.log("raceId"+raceId);
	$("#raceId").val(raceId);
	$("#_event_form").submit();
};
