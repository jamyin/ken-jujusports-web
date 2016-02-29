
  Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        // month
        "d+": this.getDate(),
        // day
        "h+": this.getHours(),
        // hour
        "m+": this.getMinutes(),
        // minute
        "s+": this.getSeconds(),
        // second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // quarter
        "S": this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
 };

$.post("/training/getAvaCourses.do?ava=1", {}, function(data) {
	var str="";
	var coursesList=jQuery.parseJSON(data);
	for(var i=0;i<coursesList.length;i++){
		var courses=coursesList[i];
		var name=courses.name;//课程名称
		var courseId=courses.id;//课程ID
		var avgPrice=courses.avgPrice;//价格
		var courseTime=courses.courseTime;//课时
		var startTimeFmt=courses.startTimeFmt;//时间
		var startTime=courses.startTime;//开始时间
		var endTime=courses.endTime;//结束时间
		var startStr= new Date(startTime).format("MM");//开始月份
		var endStr= new Date(endTime).format("MM");//结束月份
		var description=courses.description;//课程简介
		var tagName=courses.tagName;//开班状态
		str+="<a href='/train/weixin/lesson_detail.html?courseId="+courseId+"'>"+
			"<li>"+
				"<h3>"+name+"</h3>"+"<p></p>"+
				//"<p>"+description+"</p>"+
				"<span><b class='price'>"+avgPrice+"</b>元/课时/人</span><span><b>"+courseTime+"</b>课时</span>"+
				"<span><b>"+startStr+"</b>月 - <b>"+endStr+"</b>月</span>"+
				"<i class='hot'>推荐</i><i class='next'></i>"+
			"</li>"+
			"</a>";
		
	}
	$(".lesson_choose ul").empty().append(str);
});