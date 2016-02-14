    	$(document).ready(function() {
    		loadDateList();
    		loadHourList();
    		loadSpaceList();
    		
			$("#orderSave").click(function(){
	        	var trLength = $("#cd_tbody").find("tr").length;
	        	if(trLength==0){
	        		layer.msg("请先选择场地！", 1, 1);//alert("系统错误！");
	        		return false;
	        	}

	        	var teleHtml = $("#telephone").val();//判断手机号码
	        	if(teleHtml==""){
	        		layer.msg("请输入您的电话号码！", 1, 1);//alert("系统错误！");
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
				var orderTime = $("#orderTime").val();
				var orderTotal = $("#totalPrice").html();
				var jsonData = {orderTotal:orderTotal,ownerAccountId:ownerAccountId,telephone:telephone,orderTime:orderTime,orderItems:orderItems,itemPrices:itemPrices,itemSpaceName:itemSpaceName};
			    $.ajax({
			        url: "/api/orderBuy/buy.do",
			        data: jsonData,
			        type: 'POST',
			        dataType: 'json',
			        success: function (data) {
			        	 if(data.status == 500){
			        		 layer.msg(data.message, 1, 1);//alert("系统错误！");
			        		 return false;
			        	 }else{
			        		 
			        	 }
			        	 var dObj = eval('(' + data + ')');
			        	  if(dObj.success){
			        		  var ii = layer.load()
			        		  layer.close(ii);
			        		  layer.msg('订单处理成功', 2, 1)
			        	  	  //$("#resultInfo").css("display","block");
			        	  	//alert("保存成功");
			        	  }else{
			        	  	alert("用户未登录,请重新处理"+dObj.message);
			        	  }
			        }
			    });
			});
    	});

		function loadDateList(){
			var ownerAccountId = $("#ownerAccountId").val();
			var postUrl = "/preOrder/dateList/"+ownerAccountId+".do";
		    $.ajax({
		        url: postUrl,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
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
            dt += $("#y").html() + "-";
            dt += $("#m").html() + "-";
            dt += $("#" + id).html() + "  星期";
            dt += $("#" + pid).html();
            $("#dt").html(dt);
            $("#d td div").each(function () {
                $(this).css({ "background-color": "", "color": "" });
            });
            $("#" + id).css({ "background-color": "rgb(207,0,57)", "color": "#FFF" });
            $("#orderTime").val($("#" + id).attr("data-value"));
            $("#sjWeek").val($("#" + id).attr("data-week"));
            _flag1 = false;
            loadHourList();
        }		
		
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
	          		var dataLength = data.data.length;
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
            sj += $("#" + id).html() + ":00- ";

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
		        	var cdObj = $("#cd");
		        	cdObj.empty();
		        	var objHtml = "";
		        	$.each(data.data,function(index,item){
		        		objHtml += "<div id='cd_div"+index+"' data-price='"+item['price']+"' class='cd_div' check='false' onclick=sel_cd('cd_div"+index+"')>"+item['spaceName']+"</div>";
		        	});
/*				  	$.each(data.data, function(key, value) {
				  		objHtml += "<table class='content_info_tab'>";
						objHtml += "<tr>";
						objHtml += "<td title="+key+">"+key+"</td>";
				  		$.each(value, function(index, item) {
							objHtml += "<td data-price="+item['price']+"  data-space="+item['spaceId']+" data-spacename="+key+" data-config="+item['isUser']+" data-space="+key+" data-start="+item['startHour']+" data-end="+item['endHour']+"";
							if(item['isUser']==1){
								objHtml += " class='showClass' onclick='change(this)'";
							}else if(item['isUser']==2){
								objHtml += " class='ownerClass'";
							}else{
								objHtml += " class='hiddenClass'";
							}
							objHtml += ">";
							objHtml += "<span style='display:none;'>"+item['price']+"元</span>";<!--其它值雷同-->
							objHtml += "</td>";
				  		});
				  		objHtml += "</tr>";
				  		objHtml += "</table>";
			  		});*/
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
        	var trLength = $("#cd_tbody").find("tr").length;
        	if(trLength>=4){
        		layer.msg("当前场次组合最多可选4片场地！", 1, 1);//alert("系统错误！");
        		return false;
        	}
            $("#cd_text").html($("#" + cid).html()); 
            if ($("#" + cid).attr("check") == "false") {
                var tr = " <tr class='orderListCls' id=''>\
                           <td>" + $("#" + cid).html() + "</td>\
                           <td>" + $("#sj").html() + "</td>\
                           <td>"+$("#" + cid).attr("data-price")+"元/时</td>\
                           <td>\
                                 <div cid=\""+cid+"\" style=\"font-size:12px; color:#fff; text-align:center; width:80px; height:20px; line-height:20px; background-color:rgb(247, 122, 66); border-radius:5px; margin:0 auto;\"  onclick=\"delete_tr(this)\">删除订单</div>\
                           </td>\
                       </tr>";
                $("#cd_tbody").append(tr);
            }
            $("#" + cid).css({ "background-color": "rgb(207,0,57)", "border": "1px solid rgb(207,0,57)" ,"color":"#fff"}).attr("check", "true");
            
        };
        
        function delete_tr(t) {
            var cid = $(t).attr("cid"); 
            $("#" + cid).css({ "background-color": "", "border": "1px solid #808080" ,"color":"#000"}).attr("check", "false");
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
			var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
    		_this.src = imageUrl + '?' + Math.random();
		};
		
        function pf(t) {
            $("#pf img").attr("src", "/images/hx.png");
            $(t).attr("src", "/images/1.png");
            $(t).prevAll().each(function () {
                $(this).attr("src", "/images/1.png");
            });
        }	