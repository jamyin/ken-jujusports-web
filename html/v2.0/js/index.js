var courseId = "";
var addressId = "";

$(function(){
	jQuery.ajax({
		url:'/training/msgIndex.do',
		type: 'POST',
		dataType :'json',
		data : null,
		success : function(data){
			var jsonData = data.data;
			var t =[];
			if(jsonData!=null){
				for(var i =0;i<jsonData.length;i++){
					t[i] =  "<h3>"+jsonData[i].title+"</h3><p>"+jsonData[i].subtract+"</p><a class='more' href='counseling-detail.html?id="+jsonData[i].id+"'>阅读全文 >></a>";  //显示摘要
					var title = jsonData[i].title;
					switch (i) {
					case 0:
						$("#firstMicPic").attr('src', jsonData[0].microPic);
						$("#firstPic").attr('src', jsonData[0].microPic);
						break;
					case 1:
						$("#secondMicPic").attr('src',jsonData[1].microPic);
						$("#secondPic").attr('src', jsonData[1].microPic);
						break;
					case 2:
						$("#thirdMicPic").attr('src', jsonData[2].microPic);
						$("#thirdPic").attr('src', jsonData[2].microPic);
						break;
					}					
				}
			}
//			var t = ['<h3>1曾经，我们是只有比赛，只有获胜。</h3><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>如果说体育比赛是浓缩的人生，感悟高潮与低谷、顺境与挫折，短时间内体验一遍人生况味，那么足球就是人生最好的课堂。在这里不仅能强身健体，更能培养一个人的品格，培养他的进取精神，培养他面对再大的挫折也永不言败，面对在强大的对手也要奋勇向前，面对再弱小的对手也要去尊重…...</p><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>曾经，我们是只有比赛，只有获胜。</p>','<h3>2曾经，我们是只有比赛，只有获胜。</h3><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>如果说体育比赛是浓缩的人生，感悟高潮与低谷、顺境与挫折，短时间内体验一遍人生况味，那么足球就是人生最好的课堂。在这里不仅能强身健体，更能培养一个人的品格，培养他的进取精神，培养他面对再大的挫折也永不言败，面对在强大的对手也要奋勇向前，面对再弱小的对手也要去尊重…...</p><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>曾经，我们是只有比赛，只有获胜。</p>','<h3>3曾经，我们是只有比赛，只有获胜。</h3><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>如果说体育比赛是浓缩的人生，感悟高潮与低谷、顺境与挫折，短时间内体验一遍人生况味，那么足球就是人生最好的课堂。在这里不仅能强身健体，更能培养一个人的品格，培养他的进取精神，培养他面对再大的挫折也永不言败，面对在强大的对手也要奋勇向前，面对再弱小的对手也要去尊重…...</p><p>竞技场上，胜者欢呼雀跃、笑容灿烂；负者垂头丧气、神情落寞。比赛，是一场战争；比赛，又只是一场游戏。</p><p>曾经，我们是只有比赛，只有获胜。</p>']//轮播图右边内容
			var bullets = document.getElementById('position').getElementsByTagName('li');
			var banner = Swipe(document.getElementById('mySwipe'), {
				auto: false,
				continuous: true,
				disableScroll:false,
				callback: function(pos) {
					$('.news_txtcont').html(t[pos])
					var i = bullets.length;
					while (i--) {
						bullets[i].className = ' ';
					}
					bullets[pos].className = 'cur';

				}
			});

			$('.news_txtcont').html(t[0]);
			$('#position li').on('click',function(){
				banner.slide($(this).index())
			})
		}
	}); 
	jQuery.ajax({
		//url:'/training/getAvaCourses.do',
		url:'/trainInfo/college_lesson.do',
		type: 'POST',
		dataType :'json',
		//data : {ava:1,marked:1},
		data : {"currPage":1,"pageSize":2,"marked":1},
		success : function(data){
			var objHtml = "";
			$.each(data.data.results, function(index, item) {
				if(index == 0){   //取第一小节
				$("#trainPic").attr('src', item.micro_pic);   //图像显示
				objHtml+="<dt id=\"className\"></dt>";
				objHtml+="<dd id=\"school\" class=\"school\">" + item.place + "</dd>";
				objHtml+="<dd id=\"adress\" class=\"adress\">" + item.address + "</dd>";
				objHtml+="<dd id=\"class\" class=\"class\">"+item.course_time+"课时  "+item.price+"元/课时/人（送装备："+item.equip+"）</dd>";
				objHtml+="<dd id=\"time\" class=\"time\">上课时间：" + item.openDate +" - " + item.endDate+"</dd>";
				courseId = item.courseId;
				addressId = item.addressId;
				}
			});
			if(objHtml!=null && objHtml!=""){
				$("#hotTrain").html(objHtml);
			}else{
				$(".train").css("display","none");
			}
		}
	}); 
	
//从session中取微信用户数据
/*	jQuery.ajax({
		url:'/training/getWXUser.do',
		type: 'POST',
		dataType :'json',
		data : null,
		success : function(data){
			 openId = data.data;
			 //openId= "1cf6f298-9029-4574-946f-14db1b17b913";
			
		}
	}); */

	
	/* $("#findDetaile").attr("href","college_lesson_detail.html?courseId="+courseId +"&&addressId="+addressId); */
	
});
function getTrainById(){
		window.location.href="college_lesson_detail.html?courseId="+courseId +"&&addressId="+addressId; 
}
