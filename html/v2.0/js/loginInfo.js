document.write("<script src='js/layer-v2.0/layer/layer.js'><\/script>");

$.post("/training/getWXUser.do",{},function(data){
	if(!data){
		layer.msg('正在加载微信第三方登录', {
			shade: [0.9, '#000'],
		    icon: 6,
		    time: 3000 //2秒关闭（如果不配置，默认是3秒）
		}, function(){
		    //do something
			location.href = "login.html";
		});
		//location.href = "/v2.0/login.html";
		return;
	}
});