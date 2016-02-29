function alerts(content,title){
//		var content="原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密原始密";
//		var title="系统信息"
		if (title == undefined) {
			title="系统信息";
		}
		if (content == null) {
			alert("请传入参数~");
			return;
		}
		var _body = document.body;
	    var _a = document.createElement("div");
	    _a.setAttribute('class','alert_pop');
	    _a.setAttribute('id','alert_pop');
	    _a.innerHTML="<div class=alertwind id=alertwind style=margin-left:-253px;><span>"+title+"</span><ul class=layermaskinfolist> <li class=cont>"+content+"</li><li class=alertwindbtn onclick=alertwindbtn()>确认</li></ul></div>";
	    _body.appendChild(_a);
	    var width=-$("#alertwind").width()/2;
	    var height=-$("#alertwind").height()/2;
	    $("#alertwind").css("margin-left",width);
	    $("#alertwind").css("margin-top",height);	    
}
function alertwindbtn(){
	var _body = document.body;
	var my=document.getElementById("alert_pop");
	_body.removeChild(my);
//	if (my != null){
//		my.parentNode.removeChild(my);
//	}
//	 $('.alert_pop').addClass('none')
}
