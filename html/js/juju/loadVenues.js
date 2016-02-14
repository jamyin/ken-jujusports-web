    	$(document).ready(function() {
    		//列出预订场地的日期
    		loadorderdate();
    		//列出预定场地的时间
    		loadordertime();
    		
    		loadDateList();
    		loadHourList();
    		loadSpaceList();
    		var myDate = new Date();
    		$("#y").html(myDate.getFullYear());
    		$("#m").html(myDate.getMonth()+1);
			$("#orderSave").click(function(){
	        	var trLength = $("#cd_tbody").find("tr").length;
	        	if(trLength==0){
	        		layer.msg("请先选择场地！", 1, 1);//alert("系统错误！");
	        		return false;
	        	}

	        	if(!validatemobile()){
	        		return false;
	        	}

				var orderItems = "";
				var itemPrices = "";
				var itemSpaceName = "";
				$(".orderListCls").each(function(index,domEle){
					orderItems+=domEle.id+",";
					itemPrices+=$(domEle).attr("data-price")+",";
					itemSpaceName+=$(domEle).attr("data-spacename")+",";
				});
				var ownerAccountId = $("#ownerAccountId").val();
				var telephone = $("#telephone").val();
				var orderDate = $("#orderTime").val();
				var orderTotal = $("#totalPrice").val();
				var sportType = $("#spaceType").val();
				var validCode = $("#validCode").val();
				var jsonData = {validCode:validCode,sportType:sportType,orderTotal:orderTotal,ownerAccountId:ownerAccountId,telephone:telephone,orderTime:orderDate,orderItems:orderItems,itemPrices:itemPrices,itemSpaceName:itemSpaceName};
				$.ajax({
			        url: "/api/orderBuy/buy.do",
			        data: jsonData,
			        type: 'POST',
			        dataType: 'json',
			        success: function (data) {
						 //console.log(data);
			        	 if(data.status == '500'){
			        		 if(data.data.enable==0){//为登录处理
			        			 _open();
			        			 return false;
			        		 }
							 if(data.data!=''&&data.data!=null){
								if(data.data.status=='401'){
									singleOrTeam();
									return false;
								 }	 
							 }
			        		 layer.msg(data.message, 1, 1);//alert("系统错误！");
			        		 return false;
			        	 }else{
			        		 layer.msg(data.message, 1, 1);//alert("系统错误！");
							 check(data.data.orderId);
			        	 }
			        }
			    });
			});
			
	        $("#pfBut").click(function(){
	        	var ownerAccountId = $("#ownerAccountId").val();
	        	var pf = $("#starScore").val();
	        	var pfText= $("#pfText").val();
	        	if(pf==''){
	        		pf=0;
	        	}
	        	if(pfText.length>140){
	    				layer.msg("字数不能超过140字", 1, 1);
	    				return false;
	    		}else if(pfText==''){
	    			layer.msg("评论不能为空", 1, 1);
	    				return false;
	    		}else if($.trim(pfText)==''){
					layer.msg("评论不能为空",1,1);
					return false;
				}else{
	    			jQuery.ajax({
	    				url: '/api/message/insert.do',  
	                    type: 'POST',
	                    dataType: 'json', 
	    				data:{msgToId:ownerAccountId,msgContent:pfText,msgScore:pf,msgResource:1},
	                    success: function(data){
	                    	if(data.status==500){
	                    		layer.msg(data.message, 1, 1);
	                    	}else{
	                    		var dataObj = data.data;
	    						var pfAllObj = $("#pfBut");
	    						var pfList = "";
	    						pfList+="<div style='width: 100%; margin-top: 5px; height: 100%; min-height: 50px; overflow: hidden; border-top: 1px solid #808080; padding: 5px 0 10px 0;'>";
	    						pfList+="<div style='float: left;'>";
	    						pfList+="<img onerror=this.src='/images/default.png' src='"+dataObj['userImg']+"' width='43px' height='43px'>";
	    						pfList+="</div>";
	    						pfList+="<div style=\"width:880px; margin-left:8px; float:left; word-wrap: break-word; word-break: normal;  word-break:break-all;\">";
	    						pfList+="&nbsp;&nbsp;&nbsp;<span style='color: rgb(207, 0, 57);'>"+dataObj['userAccount']+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>"+dataObj['msgContent']+"</span>";
	    						pfList+="<p>";
	    						pfList+="<span style='font-size: 12px; color: #cecaca;padding-left:10px;'>"+dataObj['showMsgTime']+"";
	    						if(dataObj['msgResource']==1){
	    							pfList+="来自web客户端</span>";
	    						} else if(dataObj['msgResource']==2){
	    							pfList+="来自手机客户端</span>";
	    						}
	    						pfList+="</p>";
	    						pfList+="<div style='float: right;'>";
	    						pfList+="<img src='/images/xing"+dataObj['msgScore']+".png'>";
	    						pfList+="</div>";
	    						pfList+="<p></p>";
	    						pfList+="</div>";
	    						pfList+="</div>";				
	    						pfAllObj.after(pfList);
	    						$("#pfText").val('');
	    						layer.msg("评论发布成功", 1, 1);
	                    	}
	    				}
	    			});	
	    		}
	        });  			
    	});

    	function validatemobile() {
    		var mobile = $("#telephone").val();
    		if (mobile.length == 0) {
    			layer.msg("请输入您的电话号码！", 1, 1);//alert("系统错误！");
    			return false;
    		}
    		if (mobile.length != 11) {
    			layer.msg("请输入有效的手机号码！", 1, 1);//alert("系统错误！");
    			return false;
    		}

    		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    		if (!myreg.test(mobile)) {
    			layer.msg("请输入有效的手机号码！", 1, 1);//alert("系统错误！");
    			return false;
    		}
    		return true;
    	};
    	
    	
    	function check(orderIdNo){
    		$("#orderId").val(orderIdNo);
    		$("#payForm").submit();
    	}
    	
		function singleOrTeam(){
			$.layer({
			    shade: [0],
			    area: ['auto','auto'],
			    dialog: {
			        msg: '请选择您订单类型',
			        btns: 2,                    
			        type: 4,
			        btn: ['个人','战队'],
			        yes: function(){
			  	var orderItems = "";
				var itemPrices = "";
				var itemSpaceName = "";
				$(".orderListCls").each(function(index,domEle){
					orderItems+=domEle.id+",";
					itemPrices+=$(domEle).attr("data-price")+",";
					itemSpaceName+=$(domEle).attr("data-spacename")+",";
				});
				var ownerAccountId = $("#ownerAccountId").val();
				var telephone = $("#telephone").val();
				var orderTime = $("#orderTime").val();
				var orderTotal = $("#totalPrice").val();
				var sportType = $("#spaceType").val();
				var validCode = $("#validCode").val();
				var jsonData = {validCode:validCode,sportType:sportType,orderTotal:orderTotal,ownerAccountId:ownerAccountId,telephone:telephone,orderTime:orderTime,orderItems:orderItems,itemPrices:itemPrices,itemSpaceName:itemSpaceName};
				$.ajax({
			        url: "/api/orderBuy/orderWait.do",
			        data: jsonData,
			        type: 'POST',
			        dataType: 'json',
			        success: function (data) {
						var orderId = data.data;
						if(orderId=='401'){
							layer.msg(data.message,1,2);
							return false;	
						}
						if(orderId=='405'){
							layer.msg(data.message,1,2);
							return false;
						}
						if(orderId!=''){
							window.location.href="/api/orderBuy/"+orderId+".do";
						}else{
							layer.msg('插入订单失败!',1,2);
							return false;
						}
			        }
			    });
			        }, no: function(){
				var orderItems = "";
				var itemPrices = "";
				var itemSpaceName = "";
				$(".orderListCls").each(function(index,domEle){
					orderItems+=domEle.id+",";
					itemPrices+=$(domEle).attr("data-price")+",";
					itemSpaceName+=$(domEle).attr("data-spacename")+",";
				});
				var ownerAccountId = $("#ownerAccountId").val();
				var telephone = $("#telephone").val();
				var orderTime = $("#orderTime").val();
				var orderTotal = $("#totalPrice").val();
				var sportType = $("#spaceType").val();
				var validCode = $("#validCode").val();
				var jsonData = {validCode:validCode,sportType:sportType,orderTotal:orderTotal,ownerAccountId:ownerAccountId,telephone:telephone,orderTime:orderTime,orderItems:orderItems,itemPrices:itemPrices,itemSpaceName:itemSpaceName};
				$.ajax({
			        url: "/api/orderBuy/teamWait.do",
			        data: jsonData,
			        type: 'POST',
			        dataType: 'json',
			        success: function (data) {
						var orderId = data.data;
						if(orderId=='401'){
							layer.msg(data.message,1,2);
							return false;	
						}
						if(orderId=='502'){
							layer.msg(data.message,1,2);
							return false;
						}
						if(orderId=='405'){
							layer.msg(data.message,1,2);
							return false;
						}
						if(orderId!=''){
							window.location.href="/api/orderBuy/"+orderId+".do";
						}else{
							layer.msg('插入订单失败!',1,2);
							return false;
						}
			        }
			    });
			        }
			    }
			});
		}

		function loadDateList(){
			var ownerAccountId = $("#ownerAccountId").val();
			var postUrl = "/preOrder/dateList/"+ownerAccountId+".do";
		    $.ajax({
		        url: postUrl,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
				//console.log(data);
		          var dateListObj = $("#dateList");
		          var dObj = $("#d");
		          var weekObj = $("#week_id");
		          dObj.empty();
		          weekObj.empty();
		          dateListObj.empty();
				  $.each(data.data, function(index, item) {
				  		var objHtml = "";
				  		var dHtml = "";
				  		if(index==0){
				  			$("#dt").html(item['date']+" 星期"+item['week']);
				  			dHtml+="<td onclick=sel_data_time('d"+index+"','td"+index+"'); style='padding-left:5px;'><div data-week='"+item['dayForWeek']+"' data-value='"+item['date']+"' id='d"+index+"' class='div'>"+item['day']+"</div></td>";
				  		}else{
				  			dHtml+="<td onclick=sel_data_time('d"+index+"','td"+index+"');><div data-week='"+item['dayForWeek']+"' data-value='"+item['date']+"' id='d"+index+"' class='div'>"+item['day']+"</div></td>";
				  		}
				  		var weekHtml = "";
				  		weekHtml+="<td>";
				  		if(index==0){
				  			weekHtml+="<div id='td"+index+"' style='padding-left:15px;'>"+item['week']+"</div>";
				  		}else if(index==6){
				  			weekHtml+="<div id='td"+index+"' style='padding-right:10px; text-align:center;'>"+item['week']+"</div>";
				  		}else{
				  			weekHtml+="<div id='td"+index+"' style='padding-left:10px;'>"+item['week']+"</div>";
				  		}
				  		weekHtml+="</td>";

				  		dObj.append(dHtml);
				  		weekObj.append(weekHtml);
				     	dateListObj.append(objHtml);
				  });
		        }
		    });
		};

        function sel_data_time(id, pid) {
            var dt = "";
            dt += $("#"+id).attr("data-value");
            dt += "  星期";
            dt += $("#" + pid).html();
            $("#dt").html(dt);
            $("#d td div").each(function () {
                $(this).css({ "background-color": "", "color": "" });
            });
            $("#" + id).css({ "background-color": "rgb(207,0,57)", "color": "#FFF" });
            $("#orderTime").val($("#" + id).attr("data-value"));
            $("#sjWeek").val($("#" + id).attr("data-week"));
            $("#sjTime").val("");
            _flag1 = false;
            loadHourList();
            
            loadWeather();
            
            $("#cd_tbody").empty();
            $("#spaceType").val('');
        }		
		
        function loadWeather(){
        	var orderTime = $("#orderTime").val();
        	var postUrl = "/preOrder/weatherList.do";
        	var jsonData = {orderTime:orderTime};
		    $.ajax({
		        url: postUrl,
		        data: jsonData,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
		        	if(data.status==200){
		        		var weatherObj = data.data;
		        		$("#weatherId").attr("src","http://tianqi.911cha.com/pic/day/"+weatherObj.weather_id.fa+".gif");
		        		$("#weather").html(weatherObj.weather);
		        		$("#temperature").html(weatherObj.temperature);
		        		$("#wind").html(weatherObj.wind);
		        	}
		        }
		    });        	
        };
        
		function chooseDay(thisObj){
			var tdObj = $(thisObj).parent().children();
			$.each(tdObj, function(i,val){
				$(val).removeClass("td_check");
				$(val).find('span').removeClass("span_check");
				$(val).find('span').addClass("span");
			});
			$(thisObj).addClass("td_check");
			$(thisObj).find('span').removeClass("span");
			$(thisObj).find('span').addClass("span_check");

			$("#orderTime").val($(thisObj).attr("data-value"));
			$("#showDate").html($(thisObj).attr("data-value"));

			$("#choose").empty();

			loadHourList();

			loadSpaceList();
		};		
		
		function loadHourList(){
			var ownerAccountId = $("#ownerAccountId").val();
			var orderTime = $("#orderTime").val();
			var postUrl = "/preOrder/hourList/"+ownerAccountId+".do";
			var jsonData = {ownerAccountId:ownerAccountId,orderTime:orderTime} 
		    $.ajax({
		        url: postUrl,
		        data: jsonData,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
	          		var t1Obj = $("#t1");
	          		var t2Obj = $("#t2");
	          		var t3Obj = $("#t3");
	          		var sjObj = $("#sj");
	          		t1Obj.empty();
	          		t2Obj.empty();
	          		t3Obj.empty();
	          		sjObj.empty();
	          		var t1Html = "";
	          		var t2Html = "";
	          		var t3Html = "";
	          		var sjHtml = "";
	          		var dataLength = 0;
	          		if(data.data!=null){
	          			dataLength = data.data.length;	
	          		}
	          		if(dataLength>0){
				  		$.each(data.data, function(index, item) {
							t1Html += "<td id='t_img"+index+"' onclick=sel_sj_node('t_img"+index+"','t_td"+index+"')><img src='/images/y.png'/></td>";
							t2Html +="<td onclick=sel_sj_node('t_img"+index+"','t_td"+index+"')>"+item+"</td>";
							t3Html +="<td id='t_td"+index+"'>"+item+"</td>";
							if(index==0){
								sjHtml+=item+":00-";
							}
							if(index==(dataLength-1)){
								sjHtml+=item+":00";
							}
				  		});	          			
	          		}else{
	          			sjHtml = "已经没有可预订时间";
	          		}

			  		t1Obj.append(t1Html);
			  		t2Obj.append(t2Html);
			  		t3Obj.append(t3Html);
			  		sjObj.append(sjHtml);
		        }
		    });
		};

        function sel_sj_node(tid, id) {
            $("#t1 td img").each(function () {
                $(this).attr("src", "/images/y.png");
            });
            $("img", $("#" + tid)).attr("src", "/images/hy.png");
            var sj = "";
            //sj += $("#" + id).html() + ":00- ";
            sj += parseInt($("#" + id).html()) < 10 ? "0" + (parseInt($("#" + id).html())) : parseInt($("#" + id).html()) ;
            sj += ":00- ";
            sj += parseInt($("#" + id).html()) + 1 < 10 ? "0" + (parseInt($("#" + id).html()) + 1) : parseInt($("#" + id).html()) + 1;
            $("#sj").html(sj + ":00");
            $("#t3 td").each(function () {
                $(this).css({ "visibility": "hidden" });
            });
            $("#" + id).css({ "visibility": "visible" });
            $("#sjTime").val($("#" + id).html());
            _flag2 = false;
            
            /*根据日期 和时间 获取场地数据*/
            loadSpaceList();
            
        }		
		
		function loadSpaceList(){
			var ownerAccountId = $("#ownerAccountId").val();
			var orderTime = $("#orderTime").val();
			var sjTime = $("#sjTime").val();
			var sjWeek = $("#sjWeek").val();
			var postUrl = "/preOrder/spaceLists/"+ownerAccountId+".do";
			var jsonData = {ownerAccountId:ownerAccountId,orderTime:orderTime,sjTime:sjTime,sjWeek:sjWeek} 
		    $.ajax({
		        url: postUrl,
		        data: jsonData,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
					//console.log(data);
		        	var cdObj = $("#cd");
		        	cdObj.empty();
		        	var objHtml = "";
		        	$.each(data.data,function(index,item){
		        		objHtml += "<div id='cd_div"+index+"' data-space-type='"+item['sportId']+"' data-space-id='"+item['id']+"' data-spacename='"+item['spaceName']+"' data-price='"+item['price']+"' class='cd_div' check='false' onclick=sel_cd('cd_div"+index+"')>"+item['spaceName']+"</div>";
		        	});
		        	cdObj.append(objHtml);
		        }
		    });
		};
		
        function sel_cd(cid) {
        	var sjTime = $("#sjTime").val();
		
        	if(sjTime==""){
        		layer.msg("请先选择您选择的时间段！", 1, 1);//alert("系统错误！");
        		return false;        		
        	}
			if($("#spaceType").val()==''){
				$("#spaceType").val($("#" + cid).attr('data-space-type'));
			}else{
				if(($("#" + cid).attr('data-space-type')==1||$("#spaceType").val()==1)&&($("#" + cid).attr('data-space-type')!=$("#spaceType").val())){
					layer.msg("不能同时预订不同类型的场地");
					return false;
				}
			}

			if($("#" + cid).attr('data-space-type')=='1'){
				$(".orderSave").hide();
			}
			
			var nowSpaceId = $("#" + cid).attr('data-space-id')+"_"+$("#sjTime").val();//当前选择的场地Id和开始时间
			var trObj =  $("#cd_tbody").find("tr");
//			console.log("trObj"+trObj.length);
			var isTf = true;
			$("#cd_tbody").find("tr").each(function(i, item){
				if(nowSpaceId==$(item).attr("id")){
					isTf = false;
				}     
			});

			if(!isTf){
				layer.msg("该场地和时间已经被选择请重新选择");
				return false;
			}
        	var trLength = trObj.length;
        	if(trLength>=4){
        		layer.msg("当前场次组合最多可选4片场地！", 1, 1);//alert("系统错误！");
        		return false;
        	}
        	
        	//判断场地 时间是否还能预订
			var orderItems = $("#" + cid).attr('data-space-id')+"_"+sjTime;//场地Id_选择的时间
			var ownerAccountId = $("#ownerAccountId").val();
			var orderTime = $("#orderTime").val();
			var sportType = $("#spaceType").val();
			var jsonData = {sportType:sportType,ownerAccountId:ownerAccountId,orderTime:orderTime,orderItems:orderItems};        	
			jQuery.ajax({
				url: '/api/orderBuy/checkBuy.do',  
                type: 'POST',
                dataType: 'json', 
				data:jsonData,
                success: function(data){
                	if(data.status == 500){//失败
                		layer.msg(data.message, 1, 1);//alert("系统错误！");
                		$("#spaceType").val('');
                		return false;
                	}else{//成功
                		chooseCd(cid);
                	}
				}
			});	

			_flag3 = false;
        };
        
        function chooseCd(cid){
            $("#cd_text").html($("#" + cid).html()); 
            if ($("#" + cid).attr("check") == "false") {
                var tr = " <tr class='orderListCls' id='"+$("#" + cid).attr('data-space-id')+"_"+$("#sjTime").val()+"'  data-spacename='"+$("#" + cid).html()+"' data-price='"+$("#" + cid).attr("data-price")+"'>\
                           <td>" + $("#" + cid).html() + "</td>\
                           <td>" + $("#sj").html() + "</td>\
                           <td>"+$("#" + cid).attr("data-price")+"元/时</td>\
                           <td>\
                                 <div cid=\""+cid+"\" style=\"font-size:12px; color:#fff; text-align:center; width:80px; height:20px; line-height:20px; background-color:rgb(247, 122, 66); border-radius:5px; margin:0 auto;\"  onclick=\"delete_tr(this)\">删除</div>\
                           </td>\
                       </tr>";
                $("#cd_tbody").append(tr);
				
            }
            $("#" + cid).css({ "background-color": "rgb(207,0,57)", "border": "1px solid rgb(207,0,57)" ,"color":"#fff"}).attr("check", "true");
			var itemPrices=0;
			$(".orderListCls").each(function(index,domEle){
				itemPrices+= parseInt($(domEle).attr("data-price"));
			});
			$("#totalPrice").val(itemPrices);	
        };
        
        function delete_tr(t) {
            var cid = $(t).attr("cid"); 
            $("#" + cid).css({ "background-color": "", "border": "1px solid #808080" ,"color":"#000"}).attr("check", "false");
			$("#spaceType").val('');
            $(t).parent().parent().remove()
        };        

		function change(_this){
			var obj = _this.style.background;
			var objObj = $(_this);
			var className = objObj.attr('class');
			if(className=="showClass"){
				var showInfo = "<p><span class='imgFocus' id="+objObj.attr('data-space')+"_"+objObj.attr('data-start')+" data-price="+objObj.attr('data-price')+" data-spacename="+objObj.attr('data-spacename')+" style='border:1px solid #333; padding:0 5px 0 5px;'>"+objObj.attr('data-spacename')+" "+objObj.attr('data-start')+":00 - "+objObj.attr('data-end')+":00</span></p>";
				//var showInfo = "<div class='imgFocus' id="+objObj.attr('data-space')+"_"+objObj.attr('data-start')+" data-price="+objObj.attr('data-price')+" data-spacename="+objObj.attr('data-spacename')+">"+objObj.attr('data-start')+"-"+objObj.attr('data-end')+" "+objObj.attr('data-spacename')+"</div>";
				$("#choose").append(showInfo);
				objObj.addClass("checkSeat");
				objObj.addClass("td_check");//.background = "#0ca500";
			}else{
				$("#"+objObj.attr('data-space')+"_"+objObj.attr('data-start')).remove();
				objObj.removeClass("td_check");
				objObj.removeClass("checkSeat");
			}
			var itemPrices=0;
			$(".imgFocus").each(function(index,domEle){
				itemPrices+= parseInt($(domEle).attr("data-price"));
			});
			$("#totalPrice").html(itemPrices);		
		};		
		
		function refreshImage(_this){
			var imageUrl = '/draw/drawRandom.do'; //你的生成图片的页面
    		_this.src = imageUrl + '?' + Math.random();
		};
		
        function pf(t) {
            $("#pf img").attr("src", "/images/hx.png");
            $(t).attr("src", "/images/1.png");
            $(t).prevAll().each(function () {
                $(this).attr("src", "/images/1.png");
            });
        };   
        
        
        
        function loadorderdate(){
        	var ownerAccountId = $("#ownerAccountId").val();
			var postUrl = "/preOrder/dateList/"+ownerAccountId+".do";
		    $.ajax({
		        url: postUrl,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
				//console.log(data);
		          var objHtml = "";
				  $.each(data.data, function(index, item) {
				  	  //console.log(item['date']+" 星期"+item['week']);
					  objHtml += item['date']+" 星期"+item['week']+ "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
					 
				  });
				  //console.log(objHtml);
				  $("#orderdate").html(objHtml);
		        }
		    });
        }
        
        function loadordertime(){
			var ownerAccountId = $("#ownerAccountId").val();
			var orderTime = $("#orderTime").val();
			var postUrl = "/preOrder/hourList/"+ownerAccountId+".do";
			var jsonData = {ownerAccountId:ownerAccountId,orderTime:orderTime} 
		    $.ajax({
		        url: postUrl,
		        data: jsonData,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
	          		  //console.log(data.data);
			          var objHtml = "";
					  $.each(data.data, function(index, item) {
					  	  //console.log(item + ":00");
						  objHtml += item + ":00" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						 
					  });
					  console.log(objHtml);
					  //console.log( $("#ordertime"));
					  $("#ordertime").html(objHtml);
		        	
		        }
		    });
		};

        