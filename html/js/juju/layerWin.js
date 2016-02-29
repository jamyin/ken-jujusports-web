function addCorps() {
	layer.open({
		type : 2,
		title : false,
		closeBtn : true,
		area : [ '450px', '400px' ],
		shadeClose : true,
		content : 'add_corps.html',
		end: function(){
			//window.location.reload(); ie no
			var user_ifr = $("#user_ifr");
			user_ifr.attr("src","my_corps.html");
			//user_ifr.window.location.reload(); 
			//user_ifr.reload(); 
			//window.paent.reload();
			//layer.load();
		}    
	});		
//	$.layer({
//	type: 2,
//	title: '创建战队',
//	maxmin: true,
//	shadeClose: true, //开启点击遮罩关闭层
//	area: ['450px', '400px'],
//	iframe: { src: 'add_corps.html' },
//	end: function(){
//	//alert("-------------");
//	//window.location.reload();
//	}        
//	});
};

function modifyDo(teamId){
	//var dataParam = {id:teamId};
	$.layer({
		type: 2,
		title: '修改战队',
		maxmin: true,
		shadeClose: true, //开启点击遮罩关闭层
		area: ['450px', '400px'],
		iframe: { src: '/user/team/modify.do?teamId='+teamId },
		end: function(){
			//window.location.reload();
			//parent.location.reload();
		}
	});
};

function resetPwd() {
	layer.open({
		type : 2,
		title : false,
		closeBtn : true,
		area : [ '400px', '200px' ],
		shadeClose : true,
		content : 'update_password.html'
	});	
//	$.layer({
//	type: 2,
//	title: '修改密码',
//	maxmin: true,
//	shadeClose: true, //开启点击遮罩关闭层
//	area: ['400px', '200px'],
//	iframe: { src: 'update_password.html' }
//	});
};

function resetEmail() {
	layer.open({
		type : 2,
		title : false,
		closeBtn : true,
		area : [ '400px', '200px' ],
		shadeClose : true,
		content : 'check_email.html'
	});		
//	$.layer({
//	type: 2,
//	title: '验证邮箱',
//	maxmin: true,
//	shadeClose: true, //开启点击遮罩关闭层
//	area: ['400px', '200px'],
//	iframe: { src: 'check_email.html' }
//	});
};

function resetMobile() {
	layer.open({
		type : 2,
		title : false,
		closeBtn : true,
		area : [ '400px', '200px' ],
		shadeClose : true,
		content : 'check_phone.html'
	});		
//	$.layer({
//	type: 2,
//	title: '手机验证',
//	maxmin: true,
//	shadeClose: true, //开启点击遮罩关闭层
//	area: ['400px', '200px'],
//	iframe: { src: 'check_phone.html' }
//	});
};