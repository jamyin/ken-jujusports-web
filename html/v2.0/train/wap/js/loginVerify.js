$("input[name='name']").click(function (){
	verify();
});
function verify(){
	//用户名验证
	var userName=$("#username");
	if(!userName.val()||!$.trim(userName.val())){
		alert("用户名不能为空");
		return;
	}
	
	//密码验证
	var password=$("#password");
	if(!password.val()||!$.trim(password.val())){
		alert("密码不能为空");
		return;
	}
	if(password.val().length<6){
		alert("密码长度不能低于6位");
		return;
	}
	login();
}