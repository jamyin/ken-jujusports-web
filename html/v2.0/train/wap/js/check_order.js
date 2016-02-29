$(".list").html("");
$("#dialog").html("");
$(function(){
	
	var da="";
	
	// 获取url中的参数
	// name=需要获取的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); // 匹配目标参数
		if (r != null)
			return unescape(r[2]);
		return null; // 返回参数值
	}
	
	
	var classId=getUrlParam("classId");
	
	function open(orderId){
		var con="";
		for(var i=0;i<da.length;i++){
			var view=da[i];
			var id=view.orderId;
			if(id==orderId){
				var pname=view.pname;//父母姓名
				var totoFee=view.totoFee;//价格
				con+="<span id='close_bt'>x</span>"+
					  "<div class='user_info'>"+
					    "<span class='chilren_name'>"+pname+"</span>"+
					  "</div>"+
					  "<p class='pay_info'>是否已支付<span>"+totoFee+"</span>元</p>"+
					  "<div class='bt'>"+
					    "<span class='cancel'>取消</span>"+
					    "<span class='ok'>确认</span>"+
					  "</div>";
				$("#dialog").html(con);
				
				$(".ok").click(function(){
					$.post("/training/locale/toPay.do?id="+orderId,{},function(data){
						
						if(data.status!=200){
							alert(data.message);
							return;
						}
						var payResult=data.data;
						if(payResult.stauts==2){
							location.href = "/train/wap/pay_complate_child.html?orderId="+orderId+"&totoFee="+totoFee+"&classId="+classId;
						}else{
							location.href = "/train/wap/pay-complate.html?orderId="+orderId+"&totoFee="+totoFee+"&classId="+classId;
						}
					});
				});
				
				$("#close_bt").click(function(){
				    $("#mask,#dialog").fadeOut();
				});
				$(".cancel").click(function(){
				    $("#mask,#dialog").fadeOut();
				});
				break;
			}
		}
	}
	
	$.post("/training/locale/applyView.do?classId="+classId,{},function(data){
		da=data.data;
		if(!da){
			alert("暂无报名");
			location.href = "/train/wap/home.html";
		}
		if(data.status!=200){
			alert(data.message);
			return;
		}
		
		var con="";
		var viewList=data.data;
		for(var i=0;i<viewList.length;i++){
			var view=viewList[i];
			var pname=view.pname;//父母姓名
			var cname=view.cname;//孩子姓名
			if(!cname){
				cname="";
			}
			var mobile=view.mobile;//手机
			var totoFee=view.totoFee;//价格
			var deposit_ispayed=view.deposit_ispayed;//是否支付过定金
			var orderId=view.orderId;
			
			if(deposit_ispayed){
				deposit_ispayed="<span class='status check_right'>定金已支付</span>";
			}else{
				deposit_ispayed="<span class='status check_wrong'>定金未支付</span>";
			}
			
			con+="<li>"+
			      "<div class='wrap clearfix'>"+
			        "<span class='name'>姓名: <span id='name'>"+pname+"</span></span>"+
			        "<span class='tele'>手机：<span id='tele_num'>"+mobile+"</span></span>"+
			        "<span class='chilren_name'>孩子：<span id='chilren_name'>"+cname+"</span></span>"+
			        deposit_ispayed+
			        "<span class='price'><span id='price'>"+totoFee+"</span>元</span>"+
			        "<span class='pay'  orderId='"+orderId+"'>支付学费</span>"+
			      "</div>"+
			    "</li>";
		}
		$(".list").html(con);
		
		$(".pay").click(function(){
		    $("#mask,#dialog").fadeIn();
		    $("#dialog").css({
		      "left":(dialog_left-5) + "px",
		      "top":(dialog_top-10) + "px"
		    });
		    
		    var node=$(this);
		    open(node.attr("orderId"));
		});
	});
	
	
	

  $("#mask").height($(document).height());//遮罩高度
  var dialog_left = ($(window).width() - $("#dialog").width())/2;
  var dialog_top = ($(window).height() - $("#dialog").height())/2;

});
