document.write("<script src='js/layer-v2.0/layer/layer.js'><\/script>");

$(document).ready(function(){ 

	loadLeesonList();

});

var _classID;
function initPic(){
	var bullets = document.getElementById('position').getElementsByTagName('li');
	var banner = Swipe(document.getElementById('mySwipe'), {
		auto: false,
		continuous: true,
		disableScroll:false,
		callback: function(pos) {

			//$('.news_txtcont').html(t[pos])
			var i = bullets.length;
			while (i--) {
				bullets[i].className = ' ';
			}
			bullets[pos].className = 'cur';
		}
	});

	//$('.news_txtcont').html(t[0])
	$('#position li').on('click',function(){
		banner.slide($(this).index())
	})
	
	var _price;
	$('.time_list').on('click','.item',function(){
		if ($(this).hasClass("cur")){
			$(this).removeClass('cur');
			$('.price').text(init_price);
			_classID = '';
		}else{
			$(this).addClass('cur').siblings().removeClass('cur')
			_price = $(this).attr('pri')
			_classID = $(this).attr('cid')
			$('.price').text('￥' + _price)
		}
	})
}

var init_price = '';

function loadLeesonList(){
	var courseId = getUrlParam("courseId");
	var addressId = getUrlParam("addressId");
	$.post("/trainInfo/college_lesson_detail.do",{"courseId":courseId,"addressId":addressId},function(data){
		
		if(data.status != 200){
			//alert(data.message);
			layer.msg(data.message+"为您跳转对应界面", {
				shade: [0.9, '#000'],
			    icon: 6,
			    time: 2000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
			    //do something
				location.href = "college_lesson.html";
			});			
			return;
		}
		var name = data.data.name; // 课程名
		var courseDescription = data.data.courseDescription;// 课程描述
		var pic = data.data.pic;	// 图片
		var microPic = data.data.microPic;// 缩略图url
		init_price = data.data.price;	// 初始化价格
		var video = data.data.video;// 视频
		var courseTime = data.data.courseTime;// 课时
		var classes = data.data.classes;		// 时间段小节课程数据
		var equip = data.data.equip;			// 活动需要的装备
		
		$("#hrer_a").html(name);
		$(".college_lesson_detail_box h2").html(name);
		assemblyPic(pic);	// 图片组装
		$(".price").html(init_price);
		$(".people").html(courseTime);
		$(".equip").html(equip);
		$(".cont h2").html(courseDescription);
		assemblyClass(classes);	// 组装时间段
		initPic();	// 初始化图片
		
		var addressDescription = data.data.addressDescription;		// 场地描述
		
		$(".college_place_box").html(addressDescription);
		
		var _isopen = data.data.isOpened;
		
		if(_isopen==0){
			$('.buybtn').addClass('gray')
		}else if(_isopen==1){
			$('.buybtn').on('click',function(){
				if(typeof(_classID) == "undefined" || _classID == ''){
					alert("对不起,请先选择课程时间段");
					return false;
				}
				location.href = "college_lesson_fill_info.html?classId="+_classID;
			})		
		}
	});
};

// 组装时间段
function assemblyClass(classes){
	var class_html = "";
	$.each(classes, function(index, item) {
		class_html	+= "<span cid="+item.classId+" pri="+new Number(item.price).toFixed(2)+" class=\"item\" >"+item.week+" "+item.startTime+"-"+item.endTime+"</span>";
	});
	$(".time_list").html(class_html);
}

// 图片组装
function assemblyPic(pic){
	if (pic != null && pic != ''){
		var pics= new Array(); //定义一数组
		pics = pic.split(","); //字符分割
		var swipe_html = "";
		for (i=0;i<pics.length ;i++ ){
			swipe_html +="<div class='wrap'><img class=\"showing\" src="+pics[i]+"></div>";
		} 
		$(".swipe-wrap").html(swipe_html);
		
		assemblyMicPic(pics);
	}
}

// 缩略图组装
function assemblyMicPic(microPics){
	var mic_html = "";
	for (i=0;i<microPics.length ;i++ ){
		if (i == 0){
			mic_html +="<li class=\"cur\"><img class=\"showing\" src="+microPics[i]+"></li>";
		}else if(i == length-1){
			mic_html += "<li id=\"noma\"><img class=\"showing\" src="+microPics[i]+"></li>";
		}else{
			mic_html += "<li><img class=\"showing\" src="+microPics[i]+"></li>";
		}
	} 
	$("#position").html(mic_html);
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}