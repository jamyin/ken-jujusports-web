var check_userRepeat = function(){
	var userAccount = $("#userAccount").val();
	$.ajax({
		async: false,  //async异步 false
		type:"Post",   //提交数据的类型 POST GET
		url:"/umanages/checkrepeat.do",//提交的网址
		data:{"userAccount":userAccount},//提交的数据
		datatype: "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
		success:function(data){//成功返回之后调用的函数
			//var jsondata = eval("(" + data + ")").message;
			//alert("jsondata="+jsondata);
			var jsondata = data.data;
			if(jsondata == 'nopass'){
				/*layer.tips('用户名已被注册，请换个用户名重新注册！', this, {
					style: ['background-color:#78BA32; color:#fff', '#78BA32'],
					maxWidth:185,
					offset : ['220px' , '50%'],   //控制层坐标。’220px’：纵坐标，’50%’：横坐标。 需要注意的是，像素必须带px单位，百分比不需要。
					time: 3,
					closeBtn:[0, true]
					});*/
				//$("#account_info").text('用户名已存在！');
				layer.tips('邮箱/手机已被注册！', '#userAccount');				
				//$("#userAccount").focus();

			}else{
				/*layer.tips('用户名可以使用！', this, {
					style: ['background-color:#78BA32; color:#fff', '#78BA32'],
					maxWidth:185,
					time: 3,
					closeBtn:[0, true]
					});*/
				layer.tips('邮箱/手机可以使用！', '#userAccount');	
			}
		}
	}); 
	var email_reg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;  
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	//alert(!email_reg.test(userAccount));alert(!phone_reg.test(userAccount));
	if (!email_reg.test(userAccount) && !phone_reg.test(userAccount)) {
		layer.tips('邮箱/手机格式错误！', '#userAccount');
	}
	/* 
	   alert(userAccount.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) );
	   if(!userAccount.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) || !userAccount.match(/^(((13[0-9]{1})|159|153)+\d{8})$/)){
		layer.tips('邮箱/手机格式错误！', '#userAccount'); 
		$("#userAccount").focus(); 
	 } */

}
$(function(){
	$("body").keydown(function (event) {
			var event = event || window.event; //兼容火狐
			if (event.keyCode == "13") {//keyCode=13是回车键
				if($("#user_regdiv").is(":visible")){
					$('#user_sub').click();
				}if($("#venues_regdiv").is(":visible")){
					$('#venues_sub').click();	
				}
			}
	});	
	$("#user_sub").click(function(){	
		var dataParams =  $("#user_reg").serialize();
		var userAccount = $("#userAccount").val() ;
		var password = $("#password").val() ;
		var password1 = $("#password1").val() ;
		var email_reg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;  
		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;			
		//var phone_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;			
		if (!email_reg.test(userAccount) && !phone_reg.test(userAccount)) {
			layer.tips('邮箱/手机格式错误！', '#userAccount');
			//$("#userAccount").focus(); 	
			return false;
		}

		var re = /^[a-zA-z].{5,15}$/;
		if (!re.test(password)) {
			layer.tips('必须以字母开头的6-16位', '#password');
			return false;
		}

		if ($("#password").val() != $("#password1").val()) {
			layer.tips('两次密码输入不一致', '#password1');	
			return false;
		}

		var agree=$('#agree'); 
		for(var i=0; i<agree.length; i++){
			if(!agree[0].checked){
				//alert(agree[0].checked);
				layer.tips('请先阅读并同意我们的服务协议！', '#agree');
				return false;
			}
		}

		$.ajax({
			url:"/umanages/register.do",//提交的网址
			type: 'POST',  
			dataType: 'json',  
			//data:{"userAccount":userAccount,"password":password},//提交的数据		
			data:dataParams,
			success: function(data){
				//console.log(data.data);
				var jsonData = data.message;
				if(jsonData == '验证码输入错误！'){
					layer.tips(jsonData, '#change1');
				}else{
					layer.tips(jsonData, '#user_sub');}
				if(jsonData == '恭喜您注册成功！'){
					window.location.href = '/app/user/userIndex.html';}
			},error :function(){	
				layer.tips('注册失败！', '#user_sub');
			}
		});

	});
	//window.location.href('/app/user/userindex.html');
});

function check_RNPW() {
	if ($("#password").val() != $("#password1").val()) {
		layer.tips('两次输入密码不一致', '#password1');	
		//$("#password1").focus(); 		
		return false;
	}
}

function checkPwd() {
	var re = /^[a-zA-z].{5,15}$/;
	var str = $("#password").val();
	if (!re.test(str)) {
		/*  layer.tips('必须以字母开头的6-16位', '#password', {
                  tips: [2, '#fff'],
                    time: 2,
                }); */
		//$("#password").focus();
		layer.tips('必须以字母开头的6-16位', '#password');
		//$("#password").focus(); 
		return false;
	}
	// return re.test(str);

}

function refreshImage(){
	var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
	$("#check_Code").attr("src",imageUrl + '?' + Math.random());
};



