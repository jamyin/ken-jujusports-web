// venue场馆
$(function(){
	//浮动层
	var a = $('.float_ad');
	var b = a.offset().top;
	$(window).scroll(function() {
		var c = $(window).scrollTop();
		if(c >= b){
			a.css('top', c - b)
		}else{
			a.css('top', 0)
		}
	});
	
	//过滤动画、切换效果
	$('.typelist li').on('click', function(){
		$('.typelist li').removeClass('cur');
		$(this).addClass('cur')
	})
	
	$('.arealist li').on('click', function(){
		$('.arealist li').removeClass('cur');
		$(this).addClass('cur')
	})
	
	$('.venue_box .list_box .head_row .select_box h2').on('click', function(){
		$(this).siblings('ul').toggleClass('show')
	})
	
	$(".venue_box .list_box .head_row .select_box ul li").hover(function(){
			$(this).addClass('cur').siblings('li').removeClass('cur')
		},function(){
	});
	
	$(".venue_box .list_box .head_row .select_box ul li").on('click', function(){
			$(this).addClass('cur').siblings('li').removeClass('cur')
			$('.venue_box .list_box .head_row .select_box h2').html($(this).text())
			$(this).parent('ul').toggleClass('show')
	});
	
	//评分显示
	var m = $('.score_box')
	m.each(function() {
		var m_count = Math.floor($(this).find('span.score').text())
		for(i=0;i<m_count;i++){
			$(this).siblings('ul.star_box').append('<li id="all"></li>')
		}
    });
	
})

$(document).keydown(function(event){
			if(event.keyCode == 13){ //绑定回车
				$("#searchbtn").click();
			}
		});

//选中类型
function checkTag(_type,_area){
	$('.typelist li').each(function(){ 
		var this_type = $(this).attr('tag');
		//alert(this_type +"=="+ _type);
		if( this_type == _type){
			$('.typelist li').removeClass('cur');
			$(this).addClass('cur')
		}
	 }); 
	$('.arealist li').each(function(){ 
		var this_area = $(this).attr('tag');
		if( this_area == _area){
			$('.arealist li').removeClass('cur');
			$(this).addClass('cur')
		}
	 }); 
};
//根据积分进行排序
function getAllVenuesByZhiNeng(){
	$('#userScore').val(0); //启动排序
	getAllVenues();
	//$('#userScore').val(0);	关闭排序
}
//根据积分进行排序
function getAllVenuesByUserScore(){
	$('#userScore').val(1); //启动排序
	getAllVenues();
	//$('#userScore').val(0);	关闭排序
}
//点击更多获取多条数据
function getVenueList(){
	var pageSize = $("#pageSize").val();
	var pageSize = (parseInt(pageSize)+4);
	$("#pageSize").val(pageSize);
	getAllVenues();
}
//判断当前页面是否大于 4条值
function checkPageSize(){
	var pageSize = $("#pageSize").val();
	if( parseInt(pageSize)>4){
		$("#pageSize").val(4);
	}
	var searchName = $("#searchbar").val();
	if(searchName!=null){
		$("#searchbar").val("");
	}
}
//根据名字模糊查询
function getVenueByName(searchbar){
	$("#pageSize").val(4);
	getAllVenues();
}

//点击获取运动类型
function sprotType(obj,id){  // 运动类型id
	checkPageSize();
	$(obj).addClass('cur').siblings().removeClass('cur');
	//document.getElementById("sportTypeByName").value = id;  //运动类型name
	$("#sportTypeByName").val(id);
	//$("#sportId").val($(obj).attr('id')) ;
	getAllVenues();
	
}
//点击获取区域类型
function venueName(obj,id){   //  id 区域id
	checkPageSize();
	$(obj).addClass('cur').siblings().removeClass('cur');
	//document.getElementById("districtSelVal").value = obj.innerHTML;   //获取name
	$("#districtSelVal").val(id);
	getAllVenues();
}

function banDing(){
	$('.typelist li').on('click', function(){
		$('.typelist li').removeClass('cur');
		$(this).addClass('cur')
	})
	
	$('.arealist li').on('click', function(){
		$('.arealist li').removeClass('cur');
		$(this).addClass('cur')
	})
}

//获取所有的地区信息
function getAllAddress(){
	jQuery.ajax({
		url:'/address/list.do',
		type: 'POST',
		dataType :'json',
		async:false,
		data : {level:3,parentId:310100},
		success : function(data){
			$("#districtSel").html('');
			//$("#districtSel").append("<li tag='-1' onclick='venueName(this,null)' class=\"cur\">全部</li>");    
				var jsonData =data.data;
				 for(var i=0;i<jsonData.length;i++){
					 $("#districtSel").append("<li tag='"+jsonData[i].id+"' onclick='venueName(this,"+jsonData[i].id+")'>"+jsonData[i].name+"</li>");    
			}
		}
	});
	banDing();
}
//获取所有的运动类型信息
function getAllSportType(){
	jQuery.ajax({
		url:'/sportType/findAll.do',
		type: 'POST',
		dataType :'json',
		async:false,
		//data : {level:3,parentId:310100},
		success : function(data){
			$("#districtSelSport").html('');
			//$("#districtSelSport").append("<li tag=\"-1\" onclick='sprotType(this,null)' class=\"cur\">全部</li>");    
				var jsonData =data.data;
				 for(var i=0;i<jsonData.length;i++){
					 $("#districtSelSport").append(
							 "<li tag='"+jsonData[i].id+"' id ='" + jsonData[i].id + "' onclick='sprotType(this,"+jsonData[i].id+")'>"+jsonData[i].sportName+"</li>");    
			}
		}
	});
	banDing();
}

//获取所有场馆信息
function getAllVenues(){
	var searchName = $("#searchbar").val();
//	searchName=searchName.trim();
	searchName=searchName.replace(/[ ]/g,""); 
	var pageSize =$("#pageSize").val();
	var currPage = $("#currPage").val();
	var sportTypeSel =$("#sportTypeByName").val();
	var districtSel = $("#districtSelVal").val();
	var userScore   = $("#userScore").val();
	/*var serviceSel = $("#sel_div2Sel").val();
	var chargeSel = $("#sel_div3Sel").val();
	var tuanduiSel=$("#sel_div5Sel").val();*/ 
	var citySel='310100';
	jQuery.ajax({
		url: '/stadium/findChooseByAdd.do',  
		type: 'POST',  
		dataType: 'json', 
		async:false,
		data:{venueType:sportTypeSel,countryid:districtSel,cityid:citySel,pageSize:pageSize,currPage:currPage,nickName:searchName,userScore:userScore},
		 success: function(data){
			 var jsonDatas = data.data;//eval("("+data+")");
			 $("#pageCount").html('');
			 $("#pageCount").html("总共 <span>"+jsonDatas.total+"</span>家场所");
			 var strText = "";
			 if(jsonDatas.total>0){
				 
				 var jsonData = jsonDatas.results;
				 var sportId = $("#sportTypeByName").val();
				 for(var i =0;i<jsonData.length;i++){
					 strText += "<div class=\"list_item\">";
					 if(jsonData[i].venueImg!=null&&jsonData[i].venusImg!=''){
						 strText += "<a class=\"more\" href=\"/venues/"+jsonData[i].userAccountId +".do?sportId="+sportId+"\"><img class=\"preview\" src=\""+jsonData[i].venueImg+"\" border=\"0\"></a>";
					 }else{
						 strText += "<a class=\"more\" href=\"/venues/"+jsonData[i].userAccountId +".do?sportId="+sportId+"\"><img class=\"preview\" src=\"img/preview.jpg\" border=\"0\"></a>";
					 }
					 strText += "<div class=\"rig_box\">";
					 //strText += "<a class=\"more\" href=\"/venues/"+jsonData[i].userAccountId +".do?sportId="+sportId+"\"><h2 class=\"title\">"+jsonData[i].nickName+"</h2></a>";
					 strText += "<h2 style=\"cursor:pointer;\" class=\"title\" onclick='window.location.href=\"/venues/"+jsonData[i].userAccountId +".do?sportId="+sportId+"\"'>"+jsonData[i].nickName+"</h2>";
					 strText += "<ul class=\"icon_box\">"
					 var serList = jsonData[i].sportTypeList;
						$.each(serList, function(i,item){
							if(item.id == 1){
								strText+="<li id=\"football\">"+item.sportName+"</li>";
							}else if(item.id == 2){
								strText+="<li id=\"basketball\">"+item.sportName+"</li>";
							}else if(item.id == 3){
								strText+="<li id=\"badminton\">"+item.sportName+"</li>";
							}else if(item.id == 8){
								strText+="<li id=\"running\">"+item.sportName+"</li>";
							}
						}); 
					strText += "</ul>";	
					strText += "<span class=\"address\">地址："+jsonData[i].address+"</span>";	
					strText += "<div class=\"mask\">" +
							"<ul class=\"device\">";
					var serviceList = jsonData[i].serviceTypeList;
					if(serviceList != null){
						 for(var j =0;j<serviceList.length;j++){
							 if(serviceList[j] != null){
								 if(serviceList[j].id == 1){
									 strText += "<li id=\"wifi\">"+serviceList[j].serviceName+"</li>";	   //添加id 
								 }else if(serviceList[j].id == 3){
									 strText += "<li id=\"shop\">"+serviceList[j].serviceName+"</li>";	   //添加id
								 }else if(serviceList[j].id == 2){
									 strText += "<li id=\"park\">"+serviceList[j].serviceName+"</li>";	   //添加id
								 }
								}
						 }
					}
				strText += "</ul></div>";
				var numXing = jsonData[i].userScore;
				if(jsonData[i].userScore == null){
					jsonData[i].userScore = 0;
				}
				strText += " <p class=\"score_box\">综合评价：<span class=\"score\">"+jsonData[i].userScore+".</span> <span class=\"zero\">0</span></p>";
				
				strText += "<ul class=\"star_box\">" 
					for(var z =0;z<numXing;z++){
						strText += "<li id=\"all\"></li>";
					 }
				strText +=	"</ul>" +
				
						//"<p class=\"discount\">最低￥"+jsonData[i].maxNum+"元</p>" +
						//"<a class=\"more\" href=\"venue_detail.html?id="+jsonData[i].id+"\">查 看</a>" +
						  "<a class=\"more\" href=\"/venues/"+jsonData[i].userAccountId +".do?sportId="+sportId+"\">查 看</a>" +
						"</div>" +
						"</div>";
				 }
			 }
			 //总数据是否大于显示数据
			 var pageSize =$("#pageSize").val();
			 if(jsonDatas.total<=pageSize){
			 }else{
				 strText +="<a href=\"###\" class=\"loadmore_row\" onclick=\"getVenueList();\">加载更多</a>";
			 }
			 $("#countText").html("");
			 $("#countText").html(strText);
		 }
	});
}

//初始化值
$(document).ready(function(){
	var stat= $("#stat").val();
	var searchStr = location.search;
	var sportId="";
	var disType="";
	if(searchStr.length>0){
		searchStr = searchStr.substr(1);
	    var searchs = searchStr.split("&");//获得第一个参数和值
	    sportId = searchs[0].split("=");
	    disType = searchs[1].split("=");
	}
    
	$("#pageSize").val(4);
	if(sportId.length!=0){
		if(sportId[1]== -1 && stat!=500){
			$("#sportTypeByName").val("");
			$("#stat").val("500");
		}else if(stat!=500){
			$("#sportTypeByName").val(sportId[1]);
			$("#stat").val("500");
		}else{
			$("#stat").val("500");
		}
	}
	if(disType.length!=0){
		if(disType[1]== -1 && stat!=500){
			$("#districtSelVal").val("");
			$("#stat").val("500");
		}else if(stat!=500){
			$("#districtSelVal").val(disType[1]);
			$("#stat").val("500");
		}else{
			$("#stat").val("500");
		}
	}
	
	$("#searchbar").val("");
	$("#userScore").val(0)
	getAllAddress();
	getAllSportType();
	getAllVenues();    // 生成列表 
	if(stat==500){
		checkTag($("#sportTypeByName").val(),$("#districtSelVal").val()); //绑定选中值
	}else{
		checkTag(sportId[1],disType[1]); //绑定选中值
	}
	
	});
