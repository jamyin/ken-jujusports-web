function login(){
	var account=$("#username").val();
	var password=$("#password").val();
	$.post("/training/login.do",{"account":account,"password":password},function(data){
		var status=data.status;
		if(status!=200){
			alert(data.message);
			return;
		}
		location.href = "/train/wap/home.html?userName="+data.data;
	});
}