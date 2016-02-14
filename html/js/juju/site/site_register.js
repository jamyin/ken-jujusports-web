requirejs.config({
	baseUrl: '../js',
	paths: {
		jquery: '/js/juju/jquery-2.1.3.min',
		sportTypeJQ:'/js/juju/site/sportType',
		serviceTypeJQ:'/js/juju/site/serviceType'	
	}
});

/*
 * 场馆注册
 */
requirejs(['jquery','sportTypeJQ','serviceTypeJQ'], function($) {
	//模拟城市（动态从数据库获取选项内容）
	jQuery.ajax({
		url:'/address/listByParentId.do',
		type: 'POST',
		dataType :'json',
		data : {parentId:1},
		success : function(data){
			var jsonData=data.data;//eval("("+data+")");
			//console.log(jsonData);
			//console.log("=province="+data);				
			$("#provinceid").html('');
			$("#provinceid").append("<option value=\'-1\'>请选择</option>");    			
			for(var i=0;i<jsonData.length;i++){
				opt = "<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>";
				$("#provinceid").append(opt);  
				//console.log(opt);						 
			}
		}			
	});	

	$("#provinceid").change(function(){
		$("#countryid").html('');
		$("#countryid").append("<option value=\'-1\'>请选择</option>"); 
		
		var provinceid=$("#provinceid").find("option:selected").val();			
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:provinceid},
			//data :{cityid:cityTxt,countryid:disTxt,venueType:sportTxt},
			success : function(data){
				$("#cityid").html('');
				$("#cityid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data.data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
					$("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});

	$("#cityid").change(function(){
		var cityid=$("#cityid").find("option:selected").val();
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:cityid},
			success : function(data){
				$("#countryid").html('');
				$("#countryid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data.data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
					$("#countryid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});

	$("#venues_sub").click(function(){	
		var dataParams =  $("#venues_reg").serialize();
		var userAccount = $("#venues_userAccount").val() ;
		var password = $("#venues_password").val() ;
		var password1 = $("#venues_password1").val() ;
		/* 		if ($('#agree').attr('checked')) {
		alert("请先阅读并同意我们的服务协议！");
			return false;	
		} */
		/* 		if(userAccount == null ||userAccount == ''){
			layer.tips('请输入邮箱/手机！', '#venues_userAccount');	
			//alert("请输入场馆名称！");
			$("#venues_userAccount").focus(); 
			return false;
		}
		if(password == null ||password == ''){
			layer.tips('请输入密码！', '#venues_password');
			$("#venues_password").focus(); 
			//alert("请输入密码！");
			return false;
		}
		if(password1 == null ||password1 == ''){
			layer.tips('请输入确认密码！', '#venues_password1');	
			$("#venues_password1").focus(); 
			//alert("请重复输入密码！");
			return false;
		} */
		var email_reg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;  
		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;			
		if (!email_reg.test(userAccount) && !phone_reg.test(userAccount)) {
			layer.tips('邮箱/手机号格式错误！', '#venues_userAccount');
			//$("#venues_userAccount").focus();
			return false;
		}

		var re = /^[a-zA-z].{5,15}$/;
		if (!re.test(password)) {
			layer.tips('必须以字母开头的6-16位', '#venues_password');
			//$("#venues_password").focus(); 	
			return false;
		}

		if (password != password1) {
			layer.tips('两次密码输入不一致', '#venues_password1');	
			//$("#venues_password1").focus();		
			return false;
		}

		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
		var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
		var str = $("#mobileNo").val();
		if (!phone_reg.test(str) && !tel_reg.test(str)) {		
			layer.tips('电话号码格式不对！', '#mobileNo');	
			return false;
		}

		var agree=$('#venues_agree'); 
		for(var i=0; i<agree.length; i++){
			if(!agree[0].checked){
				//alert(agree[0].checked);
				//alert("请先阅读并同意我们的服务协议再进行注册！");	
				layer.tips('请先阅读并同意我们的服务协议！', '#venues_agree');
				return false;
			}
		}

		//var userAccount =  $("#userAccount").val();
		//var password =  $("#password").val();
		$.ajax({
			url:'/stadium/registerSite.do',
			type: 'POST',  
			dataType: 'json',  	
			data:dataParams,
			success: function(data){
				//console.log(data.data);
				var message = data.message;
				//alert(message);
				if(message == '场馆类型为空！'){
					layer.tips(message, '#venueType');
				}else if(message == '验证码输入错误！'){
					layer.tips(message, '#change2');
				}
				else{
					layer.tips(message, '#venues_sub');}
				if(message=="恭喜您注册成功！"){
					window.location.href = '/app/site/siteIndex.html';
				}
			},error :function(){	
				//alert('注册失败！');
				layer.tips('注册失败！', '#venues_sub');
			}
		});
	});

	/*
	 * 全选/取消全选
	 */
	/*$("#checkall").click(function(){
		if(this.checked){
			$("input[name='venueType']").each(function(){this.checked=true;});
		}else{
			$("input[name='venueType']").each(function(){this.checked=false;});
		}
	});*/
	
	  $("input[type='checkbox'][id='checkall']").on("click",function(){
			if(this.checked){
				$("input[name='venueType']").each(function(){this.checked=true;});
			}else{
				$("input[name='venueType']").each(function(){this.checked=false;});
			}
	  });



	$("#checkAllService").click(function(){
		if(this.checked){
			$("input[name='otherServices']").each(function(){this.checked=true;});
		}else{
			$("input[name='otherServices']").each(function(){this.checked=false;});
		}

	});	

});

//复选框事件  
//全选、取消全选的事件  
/*function selectAll(){  
  if ($("#checkall").attr("checked")) {  
      $(":checkbox").attr("checked", true);  
  } else {  
      $(":checkbox").attr("checked", false);  
  }  
} */ 

//运动类型取消全选
//子复选框的事件  
/*function setSelectAll(){  
	//当没有选中某个子复选框时，checkall取消选中  
	if (!$("#venueType").checked) {  
		$("#checkall").attr("checked", false);  
	} else{
		$("#checkall").attr("checked", true);  
	} 

	var chsub = $("input[type='checkbox'][id='venueType']").length; //获取venueType的个数  
	//alert('chsub = ' + chsub);
	var checkedsub = $("input[type='checkbox'][id='venueType']:checked").length; //获取选中的venueType的个数  
	//alert('checkedsub = ' + checkedsub);
	if (checkedsub == chsub) {  
		//alert("111");
		//alert($("#checkall"));
		$("#checkall").prop("checked", true); 
		//alert("222");
	}else{
		$("#checkall").prop("checked", false); 
	}
} */

function setSelectAll(){  
	var chsub = $(".venueType").length; //获取venueType的个数  
	var checkedsub = $(".venueType:checked").length; //获取选中的venueType的个数  
	if (checkedsub == chsub) {  

			$("input[type='checkbox'][id='checkall']").each(function(){this.checked=true;});
	}else if(checkedsub < chsub){
	
			$("input[type='checkbox'][id='checkall']").each(function(){this.checked=false;});
	}
}

function check_venuesRepeat(){
	var venues_userAccount = $("#venues_userAccount").val();
	$.ajax({
		async: false,  //async异步 false
		type:"Post",   //提交数据的类型 POST GET
		url:"/umanages/checkrepeat.do",//提交的网址
		data:{"userAccount":venues_userAccount},//提交的数据
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
				layer.tips('邮箱/手机号已被注册！', '#venues_userAccount');
				//$("#venues_userAccount").focus(); 
			}else{
				/*layer.tips('用户名可以使用！', this, {
					style: ['background-color:#78BA32; color:#fff', '#78BA32'],
					maxWidth:185,
					time: 3,
					closeBtn:[0, true]
					});*/
				layer.tips('邮箱/手机号可以使用！', '#venues_userAccount');	
			}
		}
	}); 
	var email_reg =/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;  
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;			
	//alert(!email_reg.test(venues_userAccount));alert(!phone_reg.test(venues_userAccount));
	if (!email_reg.test(venues_userAccount) && !phone_reg.test(venues_userAccount)) {
		layer.tips('邮箱/手机号格式错误！', '#venues_userAccount');
		//$("#venues_userAccount").focus();
	}
}
var checkVenueRepick = function() {
	if ($("#venues_password").val() != $("#venues_password1").val()) {
		layer.tips('两次密码输入不一致', '#venues_password1');			
		return false;
	}
}
var checkVenuePWD = function() {
	var re = /^[a-zA-z].{5,15}$/;
	var str = $("#venues_password").val();
	if (!re.test(str)) {
		/*layer.tips('必须以字母开头的6-16位', '#venues_password', {
                     tips: [2, '#fff'],
                    time: 2, 
                });*/
		//$("#venues_password").focus();
		layer.tips('必须以字母开头的6-16位！', '#venues_password');	
		return false;
	}
	//return re.test(str);

}

var checkVenueTel = function() {
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
	//var tel_reg =/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;	
	var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
	var str = $("#mobileNo").val();
	if (!phone_reg.test(str) && !tel_reg.test(str)) {		
		layer.tips('电话号码格式不对！', '#mobileNo');	
		return false;
	}
}

function venues_refreshImage(){
	var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
	$("#venues_check_Code").attr("src",imageUrl + '?' + Math.random());
};

