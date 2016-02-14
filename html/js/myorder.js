$("#myorder").html("");
//获取当前月份
var mydate = new Date();
 //获取当前月份(0-11,0代表1月)
$("#month>option").each(function(){  
	if(mydate.getMonth()+1==$(this).html().substr(0,$(this).html().length-1)){
		$(this).attr("selected","selected"); 
	}
	
});  

//分页
var orderList=null;
function paging(id,data){
		var page=data.data.page;
		var htm=$("#"+id);
		var con="<ul class='pagnation'>";
		$("#minPage").val(page.minPage);
		$("#maxPage").val(page.maxPage);
		
		if(page.currentPage!=1){
			con+="<li onclick='findData("+(page.currentPage-1)+")' class='width'>上一页</li>";
			
		}
		
		if(page.maxPage!=1){
			for(var x=page.minPage;x<=page.maxPage;x++){
				if(page.currentPage==x){
					con+="<li class='cur' onclick='findData("+x+")'>"+x+"</li>";
				}else{
					con+="<li onclick='findData("+x+")'>"+x+"</li>";
				}
			}
		}
		
		if(page.currentPage!=page.maxPage){
			con+="<li onclick='findData("+(page.currentPage+1)+")' class='width'>下一页</li>";
		}
		htm.append(con);
}


	var currentOrder="";
	function cancelOrder(orderId){
		if(!window.confirm("您确定取消订单么?")){
			return;
		}
		$.post("/order/cancelOrder.do",{"orderId":orderId},function(data){
			if(data.status==500){
				alert(data.message);
				return;
			}
			alert(data.message);
			findData(currentOrder);
			
		});
	}
	
	//个人订单列表
	function findData(currentPage){
		currentOrder=currentPage;
		//var val=$("#form").serialize();
		var url="/order/myorder.do";
		var minPage=$("#minPage").val();
		var maxPage=$("#maxPage").val();
		var year=$("#year").val().substr(0,$("#year").val().length-2);
		var month=$("#month").val().substr(0,$("#month").val().length-2);
		var year=$("#year").val().substr(0,$("#year").val().length);
		var month=$("#month").val().substr(0,$("#month").val().length);
		var startTime=year+"-"+month+"-01";
		$.post(url,{"currentPage":currentPage,"minPage":minPage,"maxPage":maxPage,"startTime":startTime},function(data){
			var status = data.status;
			if(status==500){
				alert(data.message);
			}
			
			$("#myorder").html("");
			var list=data.data.list;
			orderList=list;
			for(var x=0;x<list.length;x++){
				var order=list[x];
				var orderCon=$("#myorder");
				
				var con ="<ul class='orderlists'>"+
							"<li class='first' id='orderlistsfirst' onclick='orderDetail(\""+order.orderId+"\")' style='cursor:pointer'>"+order.venuesName+"</li>"+	
							"<li class='second'>"+order.orderTime+"</li>"+		
							"<li class='third'>￥"+order.price+"</li>"+
							"<li class='fourth'>"+order.orderStatusName+"</li><li class='fifth'></li>";
				
				var orderItemList=order.orderItemList;
				for(var i=0;i<orderItemList.length;i++){
					var orderItem=orderItemList[i];
					con+="<div class='imagetext'>"+
							"<img class='ordervenue' src='"+orderItem.spaceImg+"' border='0'>"+
							"<ul class='detailtext'>"+
								"<li>"+orderItem.spaceName+"</li>"+
								"<li>"+orderItem.orderTime+":00 ~ "+orderItem.endTime+":00</li>"+
							"</ul>"+
							"<p class='detailmoney'>￥"+orderItem.orderTotal+"</p>"+				
						"</div>";
				}
				if(order.orderStatus=="0"){
					con+="<ul class='orderbtn'>"+
							"<li class='involvement' onclick='cancelOrder(\""+order.orderId+"\")'>取消</li>"+
							"<li class='involvement' onclick='payInfo(\""+order.orderId+"\")'>付款</li>"+
						"</ul>"+	
					"</ul>";
					
				}else if(order.orderStatus=="1"){
					//"<li class='involvement'><a href='/share/shareOrder.do?orderId="+order.orderId+"'>约人参与</a></li>"+
				con+="<ul class='orderbtn'>"+
						"<a href='/venues/"+order.userAccountId+".do'><li class='involvement'>追加评论</li></a>"+
					"</ul>"+	
				"</ul>";
				}else if(order.orderStatus=="3"){
					con+="<ul class='orderbtn'>"+
								"<li class='cancel' onclick='cancelOrder(\""+order.orderId+"\")'>取消</li>"+
								"<li class='involvement' onclick='location.href = \"/share/shareOrder.do?orderId="+order.orderId+"\"'>分享</li>"+
							"</ul>"+	
						"</ul>";
					
				}
				
				orderCon.append(con);
			}
			paging("myorder",data);
			$("img").on('error',function(){	 
				$(this).attr("src","/images/venueImg.png");
		});
			
		});
	}
	
	/**
	 * 跳转至支付页面
	 * @param orderId
	 */
	function payInfo(orderId){
		$("#orderId").val(orderId);
		$("#payForm").submit();
	}
	
	//获取订单详情
	function orderDetail(orderId){
		var con="";
		var htm=$("#orderinfo");
		
		htm.html("");
		
		if(orderList){
			for(var x=0;x<orderList.length;x++){
				var order=orderList[x];
				
				if(order.orderId==orderId){
					var str="";
					var lastUpdateTime=order.lastUpdateTime;
					if(!order.lastUpdateTime){lastUpdateTime="未支付"}
					if(order.orderStatus=="0"){
						str="<li class='third'>等待买家付款</li>";
						
					}else if(order.orderStatus=="1"){
						str="<li class='third'>支付时间："+lastUpdateTime+"</li>";
					}else if(order.orderStatus=="3"){
						str="<li class='third'>支付时间："+lastUpdateTime+"</li>";
					}else{
						str="<li class='third'>支付时间："+lastUpdateTime+"</li>";
					}
					con+="<ul class='orderlists'>"+
							"<li class='first'>订单编号："+order.orderNumber+"</li>"	+
							"<li class='second'>付款方式：支付宝</li>"	+str
							
							
						
							
					var orderItemList=order.orderItemList;
					for(var i=0;i<orderItemList.length;i++){
						var orderItem=orderItemList[i];
						var validCode=orderItem.validCode;
						if(!validCode){validCode="无"}
						//"<img class='ordervenue' src='img/ordervenue.jpg' border='0'>"+
						con+="<div class='imagetext'>"+
							"<img class='ordervenue' src='"+orderItem.spaceImg+"' border='0'>"+
								"<ul class='detailtext'>"+
									"<li>"+orderItem.spaceName+"</li>"+
									"<li>运动项目："+orderItem.spaceSportName+"</li>"+
									"<li>入场时间："+orderItem.date+" "+orderItem.orderTime+":00</li>"+
									"<li>取票密码："+validCode+"</li>"+
								"</ul>"+
							"</div>"
					}
					con+="</ul>"+
					"<div class='returnbtn' id='returnbtn' onclick='returnbtn()'>返回</div>"
				}
			}
			htm.append(con);
			
			$('.detail').addClass('none');
			$('.order').addClass('none');
			$('#detailinfo').removeClass('none');
			$('#orderinfo').removeClass('none');
		}
	}
	findData(1);
		
		
function returnbtn(){
	 $('.detail').removeClass('none')
	 $('.order').removeClass('none')
	 $('#detailinfo').addClass('none')
	 $('#orderinfo').addClass('none')

}


    




	
