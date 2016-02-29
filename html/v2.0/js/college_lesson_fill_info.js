	var classid = "";	
	$(function(){
			classid = getUrlParam("classId");

			jQuery.ajax({
				url:'/trainInfo/findUserCourceBy.do',
				type: 'POST',
				dataType :'json',
				data : {classId:classid},
				success : function(data){
					if(data.data.isneedCname==0){//0不需要小孩名字
						$(".college_lesson_fillinfo_box li:last").attr("style","display:none");
						$(".cname").attr("value","-");
					}
				}
			}); 			
			
			$('.rules').on('click',function(){
				$(this).toggleClass('cur')	
			})
			
			$('input[type=text], input[type=password]').keyup(function(){
				$('.wrong').remove();
			})
			
			//提交表单
			$('.submitbtn').on('click',function(){
				applyCourse();
			})
		})
			
		function check_form(){
			var p_name = $.trim($(".pname").val());
			if(p_name.length <= 0){
			    $('.wrong').remove();
				alert_redtext('pname','请输入家长姓名！');
	            	return false;
			}
			
			var tel = $.trim($(".tel").val());
			var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	        	if (!phone_reg.test(tel)) {
			   $('.wrong').remove();
	            alert_redtext('tel','请输入正确的手机号！');
	                return false;
	         	}
				
			var c_name = $.trim($(".cname").val());
			if(c_name.length <= 0){
			    $('.wrong').remove();
				alert_redtext('cname','请输入孩子姓名！');
	            	return false;
			}
			return true;
		}	
		
		function alert_redtext(d,t){
			$('.' +d).focus().parent().append('<i class="wrong">' + t + '</i>')
		}
		
		function getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); // 匹配目标参数
			if (r != null)
				return unescape(r[2]);
			return null; // 返回参数值
		}

		var orderno=getUrlParam("orderno");
		
		function applyCourse(){
			if(!check_form()){
				return false;
			}
			var openid = "";
			$.post("/training/getWXUser.do",{},function(data){
				var dataObj=eval('(' + data + ')');
				openid = dataObj.openId;
				if(openid){
					applyCouseSubmit(openid);
				}else{
					alert("请重新登录后进行选课!");
				}
			});
			 
		}
		
		function applyCouseSubmit(openid){
			var parentname = $.trim($(".pname").val());
			var childname = $.trim($(".cname").val());
			var mobile = $.trim($(".tel").val());
			jQuery.ajax({
				url:'/training/applycourse.do',
				type: 'POST',
				dataType :'json',
				data : {classid:classid,openid:openid,parentname:parentname,mobile:mobile,childname:childname},
				success : function(data){
					if(data.status == 200){
						alert("报名成功,前往支付定金页面!");
						window.location.href="sign_up_pay_deposit.html?order_no="+data.data;
					}else{
						if(data.message){
							alert(data.message);
						}else{
							alert("对不起,报名失败!");
						}
					}
				}
			}); 
		}
		
		