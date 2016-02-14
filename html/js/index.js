$(function () {
	loadIndex();//首页数据加载
});

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
        	$('.hot').empty();
        	var data = data.data;
            //推荐场馆
        	var recommend_data = [];
        	if(data.recommend_venues!=null){
                for (var i = 0; i < data.recommend_venues.length; i++) {
                	if(i<5){
                    	if (i == 0) {
                    		recommend_data.push("<a href='/venues/"+data.recommend_venues[i].accountId+".do'><span class='cur'>"+data.recommend_venues[i].title+"</span></a>");
                    	}else{
                    		recommend_data.push("<a href='/venues/"+data.recommend_venues[i].accountId+".do'><span>"+data.recommend_venues[i].title+"</span></a>");
                    	}            		
                	}
                }        		
        	};
            $('.hot').append(recommend_data.join(''));

            //免费场馆
            var carousel = "";
            $(".venue").empty();
            if(data.carousel!=null){
                for (var i = 0; i < data.carousel.length; i++) {
                	if(i<3){
                		carousel +="<li>";
                		carousel +="<a href='/venues/"+data.carousel[i].accountId+".do'>";
                		if(data.carousel[i].image==null || data.carousel[i].image==""){
                			carousel +="<img src='img/venue1.jpg' border='0' alt=''>";	
                		}else{
                			carousel +="<img src='"+data.carousel[i].image+"' border='0' alt='' style='width:280px;height:384px;'>";
                		}
                		
                		carousel +="<div class='mask show'>";
                		carousel +="<div class='title'>"+data.carousel[i].title+"</div>";
                		carousel +="<div class='cont'>";
                		carousel +="<div class='iconbox'>";
                		carousel +="<img src='img/icon_badminton.png' border='0' alt=''>";
                		carousel +="<img src='img/icon_football.png' border='0' alt=''>";
                		carousel +="<img src='img/icon_basketball.png' border='0' alt=''>";
                		carousel +="</div>";
                		carousel +="<span>"+data.carousel[i].description+"</span>";
                		carousel +="</div>";
                		carousel +="</div>";
                		carousel +="<p><span>"+data.carousel[i].title+"</span>";
                		carousel +="<img src='img/icon_badminton_hl.png' border='0' alt=''>";
                		carousel +="<img src='img/icon_football_hl.png' border='0' alt=''>";
                		carousel +="<img src='img/icon_basketball_hl.png' border='0' alt=''>";
                		carousel +="</p>";
                		carousel +="</a>";
                		carousel +="</li>";
                	}
                }            	
            }
            $(".venue").html(carousel);
                       
    		//赛事推荐
    		$(".event").empty();
    		var eventHtml = "";
            if(data.recommend_raceInfo!=null){
                for (var i = 0; i < data.recommend_raceInfo.length; i++) {
                	if(i<2){
                		eventHtml +="<li>";
                		eventHtml +="<a data-id="+data.recommend_raceInfo[i].raceId+" href='/match_detail.html?id="+data.recommend_raceInfo[i].raceId+"' ><img src='"+data.recommend_raceInfo[i].image+"' border='0' style='width:870px;height:260px;' alt=''></a>";
                		eventHtml +="<div class='mask show'>";
                		eventHtml +="<div class='cont'>";
                		eventHtml +="<img src='img/event_logo.png' border='0' alt=''>";
                		eventHtml +="<span>"+data.recommend_raceInfo[i].title+"</span>";
                		eventHtml +="</div>";
                		eventHtml +="</div>";
                		eventHtml +="<p>"+data.recommend_raceInfo[i].title+"</p>";
                		eventHtml +="</li>";
                	}
                }            	
            }
            $(".event").html(eventHtml);
            
    		$(".event li, .venue li").hover(function(){
    			$(this).find('.mask').removeClass('show')
    			$(this).find('p').addClass('show')
    		},function(){
    			$(this).find('.mask').addClass('show')
    			$(this).find('p').removeClass('show')
    		});            
        },
        error: function () {
            //console.log('the server is error!')
        }
    });
}

function jumpInfos(_this){
	var raceId = $(_this).attr("data-id");
	// 创建Form  
    var form = $('<form></form>');  
    // 设置属性  
    form.attr('action','/race/poly_event.do');  
    form.attr('method', 'post');  
    // form的target属性决定form在哪个页面提交  
    // _self -> 当前页面 _blank -> 新页面  
    //form.attr('target', '_self');  
    // 创建Input  
    var my_input = $('<input type="hidden" name="raceId" id="raceId"/>');  
    my_input.attr('value', raceId);  
    // 附加到Form  
    form.append(my_input);  
    // 提交表单  
    form.submit();  
    // 注意return false取消链接的默认动作  	
	//console.log("raceId"+raceId);
	//$("#raceId").val(raceId);
	//$("#_event_form").submit();
};
// 搜索场馆模块
function toVenue(){
	//获取场馆类型
	var venueType =document.getElementsByName("areaId");
	//获取运动类型
	var sprotType = document.getElementsByName("sportTypeId");
	
	var sprotTypeId = -1;
	var venueTypeId = -1;
	for (var i = 0; i < sprotType.length; i++) {
		if(sprotType[i].checked){
			sprotTypeId = sprotType[i].value;
			} 
	}
	
	for (var i = 0; i < venueType.length; i++) {
		if(venueType[i].checked){
			venueTypeId = venueType[i].value;
			}
	}
	location.href="venue.html?sportTypeByName="+sprotTypeId+"&districtSelVal="+venueTypeId;
}
	
