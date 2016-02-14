





//获取url中的参数
//name=需要获取的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

var courseId=getUrlParam("courseId");

function sub(){
	var node=$("i[class='select cur']");
	if(node.length==0){
		alert("请选择");
		return;
	}
	var addressId=$(node).attr("addressId");
	location.href = "/train/weixin/step3_choosedate.html?courseId="+courseId+"&addressId="+addressId;
}

function last(){
	location.href = "/train/weixin/lesson_detail.html?courseId="+courseId;
}

function getSpace(districtId){
	if(districtId=="no"){
		districtId=null;
	}
	if(districtId!=null){
		$.post("/training/getClassByCD.do",{"courseId":courseId,"districtId":districtId},function(data){
			var courseList=jQuery.parseJSON(data);
			var str="";
			for(var i=0;i<courseList.length;i++){
				var course=courseList[i];
				var place=course.place;//名称
				var addressValue=course.addressValue;//地址
				var price=course.price;//价格
				var maxStudent=course.maxStudent;
				var actualStudent=course.actualStudent;
				var num=maxStudent-actualStudent;//剩余名额
				var id=course.id;//场地Id
				var addressId=course.addressId;//地址Id
				str+='<li><h3>'+place+'</h3><p>剩余 <span>'+num+'</span> 个名额</p><span>'
				+addressValue+'</span><i class="select" addressId='+addressId+'></i></li>';
			}
			$(".cont").empty().append(str);
			
			
			$('.cont li').on('click',function(){
				$(this).addClass('cur').siblings('li').removeClass('cur')
				$(this).find('i').addClass('cur').parent('li').siblings().find('i').removeClass('cur')
			})
			
		});
	}else{
		$.post("/training/getClassByCD.do",{"courseId":courseId,"districtId":""},function(data){
			var courseList=jQuery.parseJSON(data);
			var str="";
			for(var i=0;i<courseList.length;i++){
				var course=courseList[i];
				var place=course.place;//名称
				var addressValue=course.addressValue;//地址
				var price=course.price;//价格
				var maxStudent=course.maxStudent;
				var actualStudent=course.actualStudent;
				var num=maxStudent-actualStudent;//剩余名额
				var id=course.id;//场地Id
				var addressId=course.addressId;//地址Id
				str+='<li><h3>'+place+'</h3><p>剩余 <span>'+num+'</span> 个名额</p><span>'
				+addressValue+'</span><i class="select" addressId='+addressId+'></i></li>';
			}
			$(".cont").empty().append(str);
			
			
			$('.cont li').on('click',function(){
				$(this).addClass('cur').siblings('li').removeClass('cur')
				$(this).find('i').addClass('cur').parent('li').siblings().find('i').removeClass('cur')
			})
			
		});
	}
	
}

//获取区域信息
$.post("/training/getCoursePlace.do",{},function(data){
	
	var areaList=jQuery.parseJSON(data);
	var areaCon="<li class='cur' onclick='getSpace(\"no\")'>所有</li>";
	for(var i=0;i<areaList.length;i++){
		var area=areaList[i];
		var districtId=area.id;
		var name=area.name;
		areaCon+="<li onclick='getSpace(\""+districtId+"\")'>"+name+"</li>";
	}
	$(".tab").html(areaCon);
	$('.tab li').on('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	})
	
	
});
getSpace("no");