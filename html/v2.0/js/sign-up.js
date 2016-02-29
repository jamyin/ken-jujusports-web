document.write("<script src='js/layer-v2.0/layer/layer.js'><\/script>");

$(function() {

	$.post("/training/getWXUser.do",{},function(data){
		if(!data){
			layer.msg('正在努力加载到登陆页面', {
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
	
	//选择支付方式页 微信和支付宝切换
	$(".pay-type li").on("click", function() {
		var current = $(this.children[0]);
		var cur = $(".pay-type-img.cur");
		cur.removeClass("cur").attr("src", "img/" + cur.attr("data-name") + ".png");
		current.addClass("cur").attr("src", "img/" + current.attr("data-name") + "-selected.png");
	});
	//选择支付方式页立即支付
//	$("#pay-now").on("click", function() {
//		location.href = "sign_up_pay_success.html"
//	});
	
	//我要报名页 选择行政区
	$(".addr").on("click", "li", function() {
		
		$(".addr li").removeClass("cur");
		$(this).addClass("cur");
		
		var courseID = $('#course-info li.cur').attr('name');
		var areaID = $('#area-info li.cur').attr('name');
		
		/*$.post("/training/getClassByCDV02.do",{courseId:courseID,districtId:areaID},function(data){
			$('#class_place').empty();
			var clazzLst = data.data;
			if(data.message != "nodata"){
				var i = 0;
				var html = "";
				for(var o in clazzLst){
					i++;
					var id = "cl_"+i;
					var json = clazzLst[o];
					if(i == 1){
						html += "<li class='cur'";
					}else{
						html += "<li";
					}
					var html_text = " id='" + id + "' name='" + json.id + "'><span class='address'>" + json.district + " | " + json.place + " | " + json.addressValue + "</span><span class='time'>" + json.startTime + " —" + json.endTime + "</span><span class='date'>" + json.openDateFmt + "</span></li>"
					html += html_text;
				}
				$('#class_place').append(html);
				var _addr = $('#class_place li:first .address').text()
				$('.js-addr').text(_addr)
			}
		});*/
		
		classGroup(courseID,areaID);
	});
	
	
	
	//我要报名页 选择场地
	$(".add-date-time").on("click", "li", function() {
		
		$(".add-date-time li").removeClass("cur");
		$(this).addClass("cur");
		$(".js-addr").text(this.children[0].innerHTML);
	});
//	//我要报名页 选择时间
//	$("[name='time']").on("click", function() {
//		debugger;
////		$(".js-time").text($(this).next().text());
//		$(".js-time").text($(this).next().text());
//	});
	//咨询页分页
	$(".page-ul").on("click", "li", function() {
		$(this).parent().children().removeClass("cur");
		$(this).addClass("cur");
	});

	$('input[type=text]').keyup(function() {
		$(this).parent().find(".wrong").remove()
	});
	//我要报名 确认提交按钮点击
	$("#signup-submit").on("click", function() {
		if(!check_form()){
			return false;
		}
	
		//-------逻辑块 开始---------
		$.post("/training/getWXUser.do",{async:false},function(data){
			
			var json = eval('(' + data + ')');
			var openID = json.openId;
			var classid = "";
			var deposit = ""; //预付金
			var discount = ""; //折扣
			var price = ""; //价格
			var curNode = $("#clazz-info input[type='radio']:checked ");
			var timeDistrict = curNode.next().html();
			var classObjs = document.getElementById("clazz-info").childNodes;
			for(var i = 0;i < classObjs.length; i++){
				if(classObjs[i].nodeName == "INPUT"){
					if(classObjs[i].checked){
						var jsonxStr = classObjs[i].attributes["pname"].value;
						var jsonx = eval('(' + jsonxStr + ')'); 
						classid = jsonx.classId;
						deposit = jsonx.deposit;
						discount = jsonx.discount;
						price = jsonx.price; // 该字段预留
						break;
					}
				}
			}
			//获取课程
			var courseName = $('#courseName').text();
			// 开班时间
			var dayOfWeek = $(".add-date-time .cur .date").text();
			//获取地址
			var location = $(".add-date-time .cur .address").text();
			var parentname = $("#parentName").val();
			var mobile = $("#mobile").val();
			var childname = $("#childName").val();
			 
			$.post("/training/applycourse.do",{classid:classid,openid:openID,parentname:parentname,mobile:mobile,childname:childname},function(data){
				if(data.status == 200){
					var orderNo = data.data;
					$.post("/training/setSignUpSucData.do",{courseName:courseName,orderNo:orderNo,discount:discount,deposit:deposit,pname:parentname,mobile:mobile,childName:childname,dayOfWeek:dayOfWeek,timeDistrict:timeDistrict,location:location},function(data){
						if(data.status == 200){
							window.location.href="sign_up_success.html";
						}else{
							alert(json.message);
						}
					});
				}else{
					alert(data.message);
				}
			});
		});
		//-------逻辑块 结束---------
	});
	//我要报名 选择课程
	$(".caurse-info").on("click", "li", function() {
		click_course()
		var _this = $(this);
		_this.parent().children().removeClass("cur");
		$(".js-course-name").text(_this.addClass("cur").find("h3").text());
	});

	$("#read").on("change", function() {
		if ($(this).prop("checked")) {
			$("#signup-submit").removeAttr("disabled");
		} else {
			$("#signup-submit").attr("disabled", "disabled");
		}
	})
});

function check_form() {
	$(".wrong").remove();
	var tel = $.trim($("#mobile").val());
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;
	var flag = true;
	if (!phone_reg.test(tel)) {
		$('#mobile').focus().parent().append('<i class="wrong">请输入正确的手机号！</i>');
		flag = false;
	}
	var parentName = $.trim($("#parentName").val());
	if (parentName.length < 1) {
		$('#parentName').focus().parent().append('<i class="wrong">请输入家长姓名！</i>')
		flag = false;
	}
	var childName = $.trim($("#childName").val());
	if (childName.length < 1) {
		$('#childName').focus().parent().append('<i class="wrong">请输入孩子姓名！</i>')
		flag = false;
	}
	return flag;
}

//---------------sin_up.html页面js代码   开始-------------------

// 根据课程id和区域id查询可选的上课地点
function classGroup(cid, aid){
	$.post("/training/getClassGroup.do",{"courseId":cid,"districtId":aid},function(data){
		if(data.status == 200){
			var clazzLst = data.data;
			var i = 0;
			var html = "";
			for(var o in clazzLst){
				i++;
				var id = "cl_"+i;
				var json = clazzLst[o];
				if(i == 1){
					html += "<li class='cur'";
				}else{
					html += "<li";
				}
				var html_text = " id='" + id + "' name='" + json.addressId + "'><span class='address'>" + json.district + " | " + json.place + " | " + json.addressValue + "</span><span class='date'>";
				if(json.minOpenDateFmt == json.maxOpenDateFmt){
					html_text += json.minOpenDateFmt + "</span></li>";
				}else{
					html_text +=  json.minOpenDateFmt + " &nbsp--&nbsp " + json.maxOpenDateFmt + "</span></li>";
				}
				
				html += html_text;
			}
			
			//---将之前的数据清理掉 开始-----
			$('#class_place').empty();
			//---将之前的数据清理掉 结束-----
			
			$('#class_place').append(html);
			var _addr = $('#class_place li:first .address').text()
			$('.js-addr').text(_addr)
			// 初始化可选课程小节/时间段
			var addressId = $('#class_place li.cur').attr('name');
			
			clazzList(cid, addressId);
		}else{
			/*alert(data.message);*/
			$('#clazz-info').empty();
		}
		
	});
}



//---------------sin_up.html页面js代码   结束-------------------