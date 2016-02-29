/// <reference path="jquery-2.1.3.min.js" /> 
$(function () {
	loadIndex();//首页数据加载
    
	fnImg();//图片轮换
    
    showImg();
    
    //加载体育赛事信息
    loadEventList();
    
    //加载体育类型数据
    loadSportTypeList();
	
    //加载城市信息
    loadCityList();

    //加载查询事件
    loadSearchBtn();
    
    //首页新闻加载
    loadIndexNews();
});

function loadIndexNews(){
	jQuery.ajax({
		url:'/api/home/newsList.do',
		type: 'POST',
		data : {pageSize:10},
		dataType :'json',
		success : function(data){
			var jsonData = data.data;
			$("#newsInfoId").empty();
			var objHtml = "";
			$.each(data.data.results, function(index, item) {
				if(index < 3){
					 objHtml+="";
					 objHtml+="<div class='qb'>";
					 objHtml+="<div style='height:26px;  overflow:hidden;'>";
					 objHtml+="<p style='float:left'><img src=/images/hot_news.png /></p>";
					 objHtml+="<p class='qb_data'>"+item['showTime']+"</p>";
					 objHtml+="</div>";
					 objHtml+="<div class='qb_text'><a href='#' onclick=eventInfo('"+item['id']+"')>";
					 objHtml+=""+item['title']+"";
					 objHtml+="</a></div>";
	                 objHtml+="</div>";					
				}
			});
			$("#newsInfoId").after(objHtml);
		}
	});
};

function eventInfo(infoId){
	$("#infoId").val(infoId);
	$("#_eventInfoForm").submit();
}

function loadSearchBtn(){
	$("#spaceSearchBtn").click(function(){
		var Txt = $("#spaceSearchTxt").val();
		if(Txt==null){
			layer.msg('信息不能为空!', 1, 1);//alert('信息不能为空!');
		}else{
		jQuery.ajax({
			url:'/stadium/findStadByName.do',
			type:'POST',
			dataType :'json',
			data :{nickName:Txt},
			success : function(data){
				if(data==200){
					location.href="/app/space.html";	
				}
				else{
					layer.msg('查询场馆失败', 1, 1);//alert('信息不能为空!');alert("查询场馆失败")
				}
			}
		});
		}
	});
	
	$("#query").click(function(){
		var spaceTxt=$("#spaceSel").find("option:selected").val();	
		location.href="/stadium/"+spaceTxt+".do";
	});			
}

function loadCityList(){
  var countryId = $("#countryId").val();
	jQuery.ajax({
		url:'/address/list.do',
		type: 'POST',
		dataType :'json',
		data : {level:3,parentId:countryId},
		success : function(data){
			var d="<ul><li onclick=\"sel('sel_text1', this, 'ul2', 'sel_img2_1', '/images/hui2.png', 'sel_img2_2','-1','')\" onmouseover=\"this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">选择地区</li>";
				var jsonData = data.data;//eval("("+data+")");
				 for(var i=0;i<jsonData.length;i++){
					 d+="<li onclick=\"sel('sel_text1', this, 'ul2', 'sel_img2_1', '/images/hui2.png', 'sel_img2_2','"+jsonData[i].id+"','"+jsonData[i].name+"')\" onmouseover=\"this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">"+jsonData[i].name+"</li>";
					 //$("#districtSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
			}
			d+="</ul>";
			$("#ul2").html(d);
		}
	});
}

function loadSportTypeList(){
  jQuery.ajax({
		url: '/sportType/list.do',  
    type: 'POST',  
    dataType: 'json',    
    success: function(data){
			$("#ul1").html('');
			var c = "<ul><li onclick=\"sel('sel_text', this, 'ul1', 'sel_img1_1', '/images/hui1.png', 'sel_img1_2','-1','')\" onmouseover=\"    this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">选择体育项目</li>";

			var jsonData=data.data;//eval("("+data+")");
			 for(var i=0;i<jsonData.length;i++){
				c+="<li onclick=\"sel('sel_text', this, 'ul1', 'sel_img1_1', '/images/hui1.png', 'sel_img1_2','"+jsonData[i].id+"','')\" onmouseover=\"    this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">"+jsonData[i].sportName+"</li>";
				// $("#sportEventSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].sportName+"</option>");
			}
			c+="</ul>";
			$("#ul1").html(c);    
		},error :function(){
			//alert('error');
		} 
	});
}

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

function jumpInfos(_this){
	var raceId = $(_this).attr("data-id");
	$("#raceId").val(raceId);
	$("#_event_form").submit();
};

/**
 * 首页数据加载
 */
function loadIndex(){
    $.ajax({
        url: "/api/home/index.do",
        data: {t: new Date().getTime()},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	var data = data.data;
            //推荐场馆
        	var recommend_data = [];
        	var recommend_List_data = [];
        	if(data.recommend_venues!=null){
                for (var i = 0; i < data.recommend_venues.length; i++) {
                	if(i<5){
                    	if (i == 0) {
                    		recommend_data.push("<a href='/stadium/"+data.recommend_venues[i].accountId+".do'>");
                    		if(data.recommend_venues[i].image!=null && data.recommend_venues[i].image!=""){
                    			recommend_data.push("<img src='"+data.recommend_venues[i].image+"' style='width:380px;height:280px;'/>");
                    		}else{
                    			recommend_data.push("<img src='/images/venueImg.png' style='width:380px;height:280px;'/>");
                    		}
                    		recommend_data.push("</a>");
                    	}else{
                    		recommend_List_data.push("<div class='img_block_img'>");
                    		if(data.recommend_venues[i].image!=null && data.recommend_venues[i].image!=""){
                    			recommend_List_data.push("<a href='/stadium/"+data.recommend_venues[i].accountId+".do'><img src='"+data.recommend_venues[i].image+"' style='width:225px;height:136px;'/></a>");
                    		}else{
                    			recommend_List_data.push("<img src='/images/venueImg.png' style='width:225px;height:136px;'/>");
                    		}                		
                    		recommend_List_data.push("</div>");
                    	}            		
                	}
                }        		
        	}
            $('#recommend_venues_big').append(recommend_data.join(''));
            $('#recommend_venues_list').append(recommend_List_data.join(''));


            //图片轮换 轮播图展示
            loadRevealTrans(data);
            
            //免费场馆
            var free_venues = "";
            if(data.free_venues!=null){
                for (var i = 0; i < data.free_venues.length; i++) {
                	if(i<6){
                		free_venues +="<li data-value="+data.free_venues[i].accountId+" onmouseover=\"$$.Fn_rightli_click('cg', this);\" onclick=\"$$.Fn_Event_click(\'cg\', this);\">";
                		free_venues +=((i+1)+" . "+data.free_venues[i].title);
                		free_venues +=("<div class='centre1_rigth_li'>");
                		free_venues +=("<div class='centre1_rigth_img'>");
                		free_venues +=("<img onerror=this.src='/images/venueImg.png' src='"+data.free_venues[i].image+"' style='width:50px;height:50px;'/>");
                		free_venues +=("</div>");
                		free_venues +=("<div class='centre1_rigth_font'>");
                		//free_venues +=("<p class='dp'>点评:xdddddddddddddddddddddddddddddddddddddddddddddddddxxxx</p>");
                		//free_venues +=("<p class='dp'>标签:xxxxx</p>");
                		free_venues +=("<p>");
                		free_venues +=("<img src='/images/start4.png' />");
                		free_venues +=("</p>");
                		free_venues +=("</div>");
                		free_venues +=("<div style='clear:both;'></div>");
                		free_venues +=("</div>");
                		free_venues +=("</li>");
                	}
                }            	
            }
            $("#cg").html(free_venues);
            
            //热门场馆
            var hot_venues = "";
            if(data.hot_venues!=null){
                for (var i = 0; i < data.hot_venues.length; i++) {
                	if(i<6){
                		hot_venues +="<li data-value="+data.hot_venues[i].accountId+" onmouseover=\"$$.Fn_rightli_click('cg1', this);\" onclick=\"$$.Fn_Event_click(\'cg1\', this);\">";
                		hot_venues +=((i+1)+" . "+data.hot_venues[i].title);
                		hot_venues +=("<div class='centre1_rigth_li'>");
                		hot_venues +=("<div class='centre1_rigth_img'>");
                		hot_venues +=("<img onerror=this.src='/images/venueImg.png' src='"+data.hot_venues[i].image+"' style='width:50px;height:50px;'/>");
                		hot_venues +=("</div>");
                		hot_venues +=("<div class='centre1_rigth_font'>");
                		//hot_venues +=("<p class='dp'>点评:xdddddddddddddddddddddddddddddddddddddddddddddddddxxxx</p>");
                		//hot_venues +=("<p class='dp'>标签:xxxxx</p>");
                		hot_venues +=("<p>");
                		hot_venues +=("<img src='/images/start4.png' />");
                		hot_venues +=("</p>");
                		hot_venues +=("</div>");
                		hot_venues +=("<div style='clear:both;'></div>");
                		hot_venues +=("</div>");
                		hot_venues +=("</li>");
                	}
                }            	
            }
            $("#cg1").html(hot_venues);
            
            //战队情报
            /*
        	var team_data = [];
        	var team_List_data = [];
            for (var i = 0; i < data.list_team.length; i++) {
            	if (i == 0) {
            		team_data.push("<div style='width:280px; height:260px; position:relative;' onmousemove='$$.img_over(this)' onmouseout='$$.img_out(this)'>");
            		team_data.push("<a href='/stadium/"+data.recommend_venues[i].accountId+".do'><img src='"+data.list_team[i].image+"' width='280' height='260' /></a>");
            		team_data.push("<div class=bg_max_test>"+data.list_team[i].title+"<br/></div>");
            		team_data.push("</div>");
            	}else{
            		team_List_data.push("<li>");
            		team_List_data.push("<div style='width:170px; height:125px; position:relative;' onmousemove='$$.img_over(this)' onmouseout='$$.img_out(this)'>");
            		team_List_data.push("<a href='/stadium/"+data.recommend_venues[i].accountId+".do'><img src='"+data.list_team[i].image+"' width='170' height='125' /></a>");
            		team_List_data.push("<div class='bg_min_test'>"+data.list_team[i].title+"<br /></div>");
            		team_List_data.push("</div>");
            		team_List_data.push("</li>");
            	}
            }
            $('#team_big').append(team_data.join(''));
            $('#team_list').append(team_List_data.join(''));
            */            
        },
        error: function () {
            //console.log('the server is error!')
        }
    });
}


function loadRevealTrans(data){
	 var rvt = new RevealTrans("idPicShow");
     //添加变换对象
	 if(data.carousel!=null){
	     for (var i = 0; i < data.carousel.length; i++) {
	    	if(data.carousel[i].image!=null && data.carousel[i].image!=""){
	    		rvt.Add(""+data.carousel[i].image+"", ""+data.carousel[i].title+"");
	    	}else{
	    		rvt.Add("/images/loadIndex.png", ""+data.carousel[i].title+"");
	    	}
	      }		 
	 }

	 /*   rvt.Add('/images/big_ph.png', '图片变换效果');
     rvt.Add('/images/0.jpg', '图片滑动展示效果');
     rvt.Add('/images/1.jpg', '图片切换展示效果');
     rvt.Add('/images/2.jpg', '图片切换展示效果');*/
     var oList = _$("idPicList"), oText = _$("idPicText"), arrImg = [];
     //设置图片列表
     Each(rvt.List, function (list, i) {
         //图片式
         var img = document.createElement("img");
         img.src = list["img"]; img.alt = list["text"];
         arrImg[i] = img;
         oList.appendChild(img);
         //按钮式
         var li = document.createElement("li");
         //事件设置
         img.onmouseover = li.onmouseover = function () { rvt.Auto = false; rvt.Index = i; rvt.Start(); };
         img.onmouseout = li.onmouseout = function () { rvt.Auto = true; rvt.Start(); };
     });
     //设置图片列表样式 文本显示区域
     rvt.onShow = function () {
         var i = this.Index, list = this.List[i];
         //图片式
         Each(arrImg, function (o) { o.className = ""; }); arrImg[i].className = "on";
     }
     rvt.Start();
};

/**
图片轮换  加载事件
*/
//图片编号
var id = 0;
function fnImg() {
    //获得图片对象
    var img = $("#imgs");
    var id = $(img).attr("index"); 
    //设置图片路径
    $(img).attr("src", "images/" + id + ".jpg");
    if (id == 4) {
        id = 0;
    } else {
        id++;
    }
    $(img).attr("index", id);

}
//定时器
var d = setInterval("fnImg()", 2000);

/**
鼠标点击  图片轮换
*/
function fnImgClick(position) { 
    //获得图片对象
    var img = $("#imgs");
    var id = $(img).attr("index"); 
    //设置图片路径
    $(img).attr("src", "images/" + id + ".jpg");
    if (position == "left") {
        if (id == "4") {
            id = 0;
        } else {
            id++;
        }
    } else {
        if (id == "0") {
            id = 4;
        } else {
            id--;
        }
    }
    $(img).attr("index", id);  
}

function showImg() {
    setTimeout( function () {
        $("#centre_rigth_img1").show(2000)
    },1000);
    setTimeout(function () {
        $("#centre_rigth_img2").fadeToggle(2000)
    } ,3000);
    setTimeout(function () {
        $("#centre_rigth_img3").fadeIn(5000)
    },4000);
    setTimeout(function () {
        $("#centre_rigth_img4").slideDown(2000)
    },6500); 
    setTimeout(function () {
        $("#centre_rigth_img5").show(3000)
    } , 8000);
}