		$(function(){
			$(".sent_c").attr("disabled",false);
			var url=window.location.search;
			var Request = new Object();
			if(url.indexOf("?")!=-1){
				var str = url.substr(1);
					strs = str.split("&");
                 for(var i=0;i<strs.length;i++){
                      Request[strs[i].split("=")[0]]=strs[i].split("=")[1];
                 }
			}
            if(Request['edit']!=undefined){
				var r = Request['edit'];
				if(r=='true'){
					$('.allinfo_box').addClass("edit");
					$(".editbtn").css("display","none");
					//console.log($(".editbtn"));//.attr("display","none");
				}
            }
			
			autoHeight()//放到ajax请求后执行
			
			$("#reg_portrait").change(function(){
				$(".editportrait").attr("src",'img/simple9.jpg');
			})
			
			$('.editbtn').on('click',function(){
				$('.allinfo_box').toggleClass("edit")
				var s = parseInt($(this).attr('status'))
				if(s == 0){
					$(this).text('取消')
					$(this).attr('status','1')
				}else if(s == 1){
					$(this).text('编辑')
					$(this).attr('status','0')
				}
				autoHeight();
			})
			
//			$(".sent_c").on('click',function(){
//				time($(this));
//			})
			
			
			  // 日历
			$(function( factory ) {
				if ( typeof define === "function" && define.amd ) {
			
					// AMD. Register as an anonymous module.
					define([ "../jquery.ui.datepicker" ], factory );
				} else {
			
					// Browser globals
					factory( jQuery.datepicker );
				}
			  }(function( datepicker ) {
				datepicker.regional['zh-TW'] = {
					closeText: '關閉',
					prevText: '<上月',
					nextText: '下月>',
					currentText: '今天',
					monthNames: ['一月','二月','三月','四月','五月','六月',
					'七月','八月','九月','十月','十一月','十二月'],
					monthNamesShort: ['一月','二月','三月','四月','五月','六月',
					'七月','八月','九月','十月','十一月','十二月'],
					dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
					dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
					dayNamesMin: ['日','一','二','三','四','五','六'],
					weekHeader: '周',
					dateFormat: 'yy-mm-dd',
					firstDay: 1,
					isRTL: false,
					showMonthAfterYear: true,
					yearSuffix: '年'};
				datepicker.setDefaults(datepicker.regional['zh-TW']);
			
				return datepicker.regional['zh-TW'];
			
			  }));
			
			  $( "#birthday" ).datepicker( $.datepicker.regional[ "fr" ] );
			
			  // 日历 end
			  
			//提交表单
			$('.submitbtn').on('click',function(){
				check_form();
			})
			
			$('input[type=text], input[type=password]').keyup(function(){
				$('.wrong').remove();
			})
		})
	
		function autoHeight(){
			var h = $('.right_box').height()
			$('.myaccount_box').height(h)
		}
		
		//发送验证码按钮 倒数60秒方法
		var wait=90; 
		function time(sendObj) {
			if (wait == 0) {
				//$('.tips_code').empty()
				sendObj.attr("disabled",false);
				sendObj.val("获取验证码");
				//sendObj.removeAttribute("disabled");         
				//sendObj.value="获取验证码"; 
				wait = 90; 
			} else {
				sendObj.attr("disabled",true);
				sendObj.val("请等待"+wait+"秒");			
				//sendObj.setAttribute("disabled", true); 
				//sendObj.value="请等待"+wait+"秒"; 
				wait--; 
				setTimeout(function() { 
					time(sendObj) 
				}, 1000) 
			} 
		} 
		
		function check_form(){
			var tel = $.trim($("#tel").val());
			var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	        	if (!phone_reg.test(tel)) {
	        	$('.wrong').remove();
	            alert_redtext('tel','请输入正确的手机号！');
	                return false;
	         	}
	         	var venuesPicCaptcha = $.trim($("#authCode").val());
				if (venuesPicCaptcha.length <= 0) {
					$('.wrong').remove();
	            	alert_redtext('authCode','请输入图片验证码！');
	            	return false;
	        	}
	        	var venuesTelCaptcha = $.trim($("#captcha").val());
				if (venuesTelCaptcha.length <= 0) {
					$('.wrong').remove();
	            	alert_redtext('captcha','请输手机验证码！');
	            	return false;
	        	}
		}
		
		function alert_redtext(d,t){
			$('#' +d).focus().parent().append('<i class="wrong">' + t + '</i>')
		}
		
		//bY YIN 20151008
		$(function(){
			var openId = "";
			$.post("/training/getWXUser.do",{},function(data){
				openId = data;
			});
			//我的学院
			jQuery.ajax({
				url:'/training/getUserInfo.do',
				type: 'POST',
				dataType :'json',
				success : function(data){
					if(data.status == 500){
						layer.msg(data.message, {
							shade: [0.9, '#000'],
						    icon: 6,
						    time: 3000 
						}, function(){
							window.location.href = "login.html";
						});
					}
					var jsondata = data.data;
					if(data.status == 200){
						//用户信息列表页面信息显示
						var mobile = jsondata.mobile;
						var pname = jsondata.pname;
						var pic = jsondata.pic;        				 // 用户头像
						var location = jsondata.location;   			 // 用户所在地
						var description = jsondata.description;       // 用户描述
						var position = jsondata.position;   			 // 用户位置（中锋等）
						var cname = jsondata.cname;   				 // 孩子姓名
						var fmbirthday = jsondata.fmbirthday;   	 	 // 孩子出身日期
						var originSchool = jsondata.originSchool;   	 // 孩子原学校
						
						if(jsondata.pic==null || jsondata.pic == ""){
							$("#pic").attr('src', "img/icon_unport.png");
						}else{
							$("#pic").attr('src', jsondata.pic);							
						}
						$("#mobile").html(jsondata.mobile);
						$("#pname").html(jsondata.pname);
						$("#location").html(jsondata.location);
						$("#description").html(jsondata.description);
						$("#position_").html(jsondata.position);
						$("#cname").html(jsondata.cname);
						$("#fmbirthday").html(jsondata.fmbirthday);
						$("#originSchool").html(jsondata.originSchool);
						
						//编辑框值的回显
						$("#tel").val(jsondata.mobile);
						$("#pname_edit").val(jsondata.pname);
					    var local=document.getElementById("local");
					   // local[0]=new Option(jsondata.location,0);
					    addLocation(local);
					    for (var i = 0; i < local.options.length; i++) {
					    	if (local.options[i].text == jsondata.location){
       							 	local.options[i].selected=true;  
					        }
					    }
					    $("#descriptionEdit").val(jsondata.description);
					  
					    var position=document.getElementById("position");
					    //填充下拉框值
					    addPosition(position);
					    for (var i = 0; i < position.options.length; i++) {     
       						if (position.options[i].text == jsondata.position){
       							 	position.options[i].selected=true;   
					        }        
					    }
					    $("#childName").val(jsondata.cname);
					    $("#birthday").val(jsondata.fmbirthday);
					    $("#childSchool").val(jsondata.originSchool);
					    if(jsondata.pic==null || jsondata.pic==""){
					    	$("#imgShow").attr("src","img/icon_unport.png");	
					    }else{
							$("#imgShow").attr("src",jsondata.pic);				    	
					    }
					}
					}
			}); 
			//获取短信验证码
			$("#captcha_btn").on("click",function(){
				
				var imgCode = $("#authCode").val();
			 	$.ajax({
			 		url:"/training/authImageCode.do",
			 		type:"post",
					dataType:"json",
					asyn:true,
					data:{imgCode:imgCode},
					success:function(data){
						if(data.status == 500){
							layer.msg(data.message);
						}
						if(data.status == 200){   //ok
							time($(".sent_c"));
							var mobile = $("#tel").val();
								$.ajax({
									url:"/training/messageInfo.do",
									type:"post",
									dataType:"json",
									data :{mobilePhone:mobile}
								})
						}
					}
			 	});
			});
			//提交表单数据
			$("#formSubmit").on("click",function(){
				var tel = $("#tel").val();                           //手机
				var captcha = $("#captcha").val();					 //手机验证码
				var pname_edit = $("#pname_edit").val();			 //姓名
				var reg_portrait =  $("#imgShow").attr('src');  		 //图片路径
				var obj=document.getElementById('local'); 
				var local=obj.options[obj.selectedIndex].text;       //所在地
				var descriptionEdit = $("#descriptionEdit").val();   //介绍
			    
			    var objs=document.getElementById('position'); 
				var position=objs.options[objs.selectedIndex].text;  //位置
				var childName = $("#childName").val();				 //孩子姓名
				var birthday = $("#birthday").val();   				 //孩子生日
				var childSchool = $("#childSchool").val();			 //孩子学校
				var imgurl = $("#hidImgName").val();
				
				if(tel == null || tel == "" || tel == undefined){
					return;
				}
				if(captcha == null || captcha == "" || captcha == undefined){
					return;
				}
				if(pname_edit == null || pname_edit == "" || pname_edit == undefined){
					layer.msg("姓名不可为空~~");
					return;
				}
				if(childName == null || childName == "" || childName == undefined){
					layer.msg("孩子姓名不可为空~~");
					return;
				}
				if(pname_edit == null || pname_edit == "" || pname_edit == undefined){
					layer.msg("姓名不可为空~~");
					return;
				}
				if(birthday == null || birthday == "" || birthday == undefined){
					layer.msg("姓名出生日期不可为空~~");
					return;
				}
				
				
				/*var pnameSP = pname_edit.match(/\d+/g);  //截取字符串中的数字
				var childNameSP = childName.match(/\d+/g);*/ 
				if(pname_edit.length < 2 || pname_edit.length > 30 || childName.length < 2 || childName.length > 30){
					layer.msg("姓名长度为2-30字符~~");
					return ;
				}
				if(childSchool == null || childSchool == "" || childSchool == undefined){
					layer.msg("孩子学校不可为空~~");
					return;
				}
				
				
				$.ajax({
					url:"/training/saveUserInfo.do",
					type:"post",
					dataType:"json",
					data:{mobile:tel,captcha:captcha
					,pname:pname_edit,pic:reg_portrait,location:local
					,description:descriptionEdit,position:position
					,cname:childName,birthdayStr:birthday,originSchool:childSchool},
					success: function (data){
						if(data.status == 200){
							layer.msg(data.message);
							location.reload();
						}
						if(data.status == 500){
							layer.msg(data.message);
						}
					}
					
				})
			});
		});
		
	//图片验证码
	function refreshImage(){
	var imageUrl = '/training/drawRandom.do'; 
		$("#check_Code").attr("src",imageUrl + '?' + Math.random());
	};
	//位置下拉框赋值
	function addPosition(position){
		var arr=new Array("守门员(GK)","清道夫(CWP/SW)","右边后卫(RWB)","右后卫(RB)","右中后卫(RCB)","中后卫(CB)","左中后卫(LCB)","左后卫(LB)"
		,"左边后卫(LWB)","右后腰(RCDM)","后腰(CDM/DMF)","左后腰(LCDM)","左边中场(RWM)","右中场(RM)","右中中场(RCM)","中中场(CM)","左中中场(LCM)"
		,"左中场(LM)","左边中场(LWM)","右前腰(RCAM)","前腰(CAM/OMF)","左前腰(LCAM)","中前锋(CF)","左前锋(LF)","右边锋(RW)","右中锋(RS)","中锋(ST)"
		,"左中锋(LS)","左边锋(LW)");
	    for (var i = 0; i < arr.length; i++) {
	    	position[i]= new Option(arr[i],i);
	    }
	}
	//地址下拉框赋值
	function addLocation(position){
		$.ajax({
			url:"/training/BySHDistrict.do",
			type:"post",
			dataType:"json",
			async: false,
			success:function(data){
				if(data.status == 200){
					var array = data.data;
					for (var i = 0; i < array.length; i++) {
						position[i]= new Option(array[i].name,i);
					}
				}
				if(data.status == 500){
					layer.msg(data.message);
				}
			}
		});
	}