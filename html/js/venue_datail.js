	$(function(){
		loadCheckSport();
		loadCheckService();
		loadDateList();//加载日期
		loadSpaceList();//加载场地信息
		loadHourList();//加载场地开放时间
		
		loadVenuesClick();;
		loadWeekClick();
		loadclickFunction();//加载点击事件
		loadMessagesBy();//异步加载评论信息
		loadfabuinfo();
		loadtijiaoOrder();
		venuesBySeat(); //加载附近场馆信息
		checkTextAeaLen(); //场馆评价字数
		
    });
	
    var index="";
    function ajax_open() {
    	index = $.layer({
            type: 2,
            title: false, //不显示默认标题栏
            shade: [0.5, '#000'], //不显示遮罩
            shift: 'top', //从头动画弹出
            area: ['800px', '520px'],
            iframe: { src: '/ajax_login.html' }
        });
    }

    function close(){
    	layer.close(index);
    	$.post("/umanages/showlogin.do",{},function (data){
    		var userAccount=data.data;
    		if(userAccount.type==1){
    			$(".login").html("<a href='/personal_center.html'>"+userAccount.nickName+"</a>| <a href='javascript:;' onclick='loginout()'>注销</a>");
    		}else{
    			$(".login").html("<a href='/app/site/siteIndex.html'>"+userAccount.nickName+"</a>| <a href='javascript:;' onclick='loginout()'>注销</a>");
    		}
    		
    	});
    	
    	//alert(data.data);
    }	
	
	function validatemobile() {
		var mobile = $("#cellphone").val();
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
	
	function loadtijiaoOrder(){
		$("#orderSave").click(function(){
        	var trLength = $("#choosed_item_box").find("span").length;
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
			$(".choosed_item_box span").each(function(index,domEle){
				orderItems+=domEle.id+",";
				itemPrices+=$(domEle).attr("data-price")+",";
				itemSpaceName+=$(domEle).attr("data-spacename")+",";
			});
			var ownerAccountId = $("#ownerAccountId").val();
			var telephone = $("#cellphone").val();
			var orderDate = $("#orderTime").val();
			var orderTotal = $(".price").attr("data-price");//.val();
			var sportType = $("#sportTypeId").val();
			var validCode = $("#identifycode").val();
			var jsonData = {validCode:validCode,sportType:sportType,orderTotal:orderTotal,ownerAccountId:ownerAccountId,telephone:telephone,orderTime:orderDate,orderItems:orderItems,itemPrices:itemPrices,itemSpaceName:itemSpaceName};
			$.ajax({
		        url: "/api/orderBuy/buy.do",
		        data: jsonData,
		        async:false,
		        type: 'POST',
		        dataType: 'json',
		        success: function (data) {
					 //console.log(data);
		        	 if(data.status == '500'){
		        		 if(data.data.enable==0){//为登录处理
		        			 $('.login_pop').addClass('poping');
		        			 //ajax_open();
		        			 return false;
		        		 }
		        		 layer.msg(data.message, 1, 1);//alert("系统错误！");
		        		 return false;
		        	 }else{
		        		 layer.msg(data.message, 1, 1);//alert("系统错误！");
		        		 checkOrder(data.data);
//		        		 if(data.data.gotoPay==1){//需要支付
//		        			 check(data.data.orderId);	 
//		        		 }else{//无须支付
//		        			 freeCheck(data.data.orderId);
//		        		 }
						 
		        	 }
		        }
		    });
		});		
	};
	
	function checkOrder(_this){
		$("#orderId").val(_this.orderId);
		var action_v = "";
		if(_this.gotoPay==1){//需要支付
			action_v = "/api/orderBuy/payWait.do";
		}else{
			action_v = "/api/success.do";
		};
		$("#payForm").attr("action",action_v);
		$("#payForm").submit();
		/*var $action = "";

		// 创建Form  
	    var form = $('<form></form>');  
	    // 设置属性  
	    form.attr('action',$action);  
	    form.attr('method', 'post');  
	    // form的target属性决定form在哪个页面提交  
	    // _self -> 当前页面 _blank -> 新页面  
	    //form.attr('target', '_self');  
	    // 创建Input  
	    var my_input = $('<input type="hidden" name="orderId" id="orderId" value=""/>');  
	    my_input.attr('value', _this.orderId);  
	    // 附加到Form  
	    form.append(my_input);  
	    // 提交表单  
	    form.submit();*/  		
	}
	
	function freeCheck(orderIdNo){
		$("#orderId_free").val(orderIdNo);
		//$("#freePayForm").submit();		
	}
	
	function check(orderIdNo){
		$("#orderId_pay").val(orderIdNo);
		//$("#payForm").submit();
	}
	
	function loadCheckSport(){
		$(".sbutton_box a").each(function(index,domEle){
			if($(domEle).attr("class")=="cur"){
				$("#sportTypeId").val($(domEle).attr("data-v"));
			}
			if($(domEle).attr("data-v")==1){
				$(domEle).attr("id","football");
			}else if($(domEle).attr("data-v")==2){
				$(domEle).attr("id","basketball");
			}else if($(domEle).attr("data-v")==3){
				$(domEle).attr("id","badminton");
			}else if($(domEle).attr("data-v")==8){
				$(domEle).attr("id","running");
			}
		});
	}
	
	function loadCheckService(){
		$(".device ul li").each(function(index,domEle){
			if($(domEle).text()=="停车位"){
				$(domEle).attr("id","park");
			}else if($(domEle).text()=="WIFI"){
				$(domEle).attr("id","wifi");
			}else if($(domEle).text()=="商品有售"){
				$(domEle).attr("id","shop");
			}
		});
	}

	
	//获取所有右侧栏订单,并实现订单删除功能
	function orderDel(orderId,start){
		id=orderId+"_"+start
		$("#choosed_item_box span").each(function(){
		    if($(this).attr("id")==id){
		    	$(this).remove();
		    	return ;
		    	
		    }
		});
		
	}

	function loadLastClick(){
		//选择场地和时间
		$("#choosed_item_box").html("");
		$('.choose_box ul li.res').on('click',function(){
			orderDel($(this).attr('data-space')+"",$(this).attr('data-start'));
			var data_tag=$(this).attr('data-tag');
			var data_price=$(this).attr('data-price');
			if(data_price=="null"){
				data_price=0;
			}
			var data_spaceId=$(this).attr('data-space');
			var data_spacename=$(this).attr('data-spacename');
			var data_start=$(this).attr('data-start');
			var data_end=$(this).attr('data-end');
			if(data_tag == 0){
				//免费场地和收费场地不能同时预定
				var len= $('#choosed_item_box').children('span').length;
				var choosed = true;
				$('#choosed_item_box').children('span').each(function(index,item){
					if($(item).attr("data-price") <= 0){
						choosed =  false;
					}
				});

				if(!choosed){
					layer.msg("免费场地只能预订1块场地！", 1, 1);
					return false;
				}

				if(len >= 4){
					layer.msg("一个用户一次最多预订4块场地！", 1, 1);
					return false;
				}
				//id='"+$("#" + cid).attr('data-space-id')+"_"+$("#sjTime").val()+"'
				$("#choosed_item_box").append("<span id='"+data_spaceId+"_"+data_start+"' data-spacename='"+data_spacename+"' data-price ='" + data_price +"'  data_tag =" + data_tag +">"+ data_start + ":00-" + data_end + ":00 " + data_spacename  + " " + data_price + "元</span>");
				$(this).attr("data-tag",1);
				//将原来的data-flag赋值为1
			}else{
				$("#"+data_spaceId+data_start).remove();
				$(this).attr("data-tag",0);
			}
			$(this).toggleClass('cur');
			var itemPrices=0;
			$(".choosed_item_box span").each(function(index,domEle){
				itemPrices+= parseInt($(domEle).attr("data-price"));
			});
			$(".price").html("￥" + itemPrices + "元");
			$(".price").attr("data-price",itemPrices);
		});
	};
	
	function loadWeekClick(){
		//week切换内容
		$('.week_box li').on('click',function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');
			$("#orderTime").val($(this).attr("data-tag"));
			
			loadSpaceList();//加载场地信息
			loadHourList();//加载场地开放时间
			loadLastClick();//加载点击事件		
			$(".price").html("￥ 0 元");
			$(".price").attr("data-price",0);
			//$('#page_' + $(this).attr('tag')).addClass('show').siblings('div').removeClass('show')
		});
	};
	
	//场馆类型切换内容
	function loadVenuesClick(){
		//体育馆种类切换
		$('.sbutton_box a').on('click',function(){
			$(this).addClass('cur').siblings('a').removeClass('cur');
			$('.pay_box h2').html($(this).text()).attr('id',$(this).attr('id'));
			if($(this).attr("class")=="cur"){
				$("#sportTypeId").val($(this).attr("data-v"));
			};
			
			
			
			loadDateList();//加载日期
			loadSpaceList();//加载场地信息
			loadHourList();//加载场地开放时间
			
			loadLastClick();//加载点击事件			
			$(".price").html("￥ 0 元");
			$(".price").attr("data-price",0);
		});
	}
	
	function loadclickFunction(){
		//显示场馆评分
		var m_count = Math.floor($('.score').find('span').text())
		for(i=0;i<m_count;i++){
			$('.score ul').find('li').eq(i).addClass('org')
		}
		//paybox标题显示
		$('.pay_box h2').html($('.sbutton_box').find('a').eq(0).text()).attr('id',$('.sbutton_box').find('a').eq(0).attr('id'))

		//时间切换
		$('.week_box ul li').on('click',function(){
			$(this).addClass('cur').siblings('li').removeClass('cur');				
		})
		//评论打分
		var g_score = 0;
		$('.grade_box ul li').on('click',function(){
			$('.grade_box ul li').removeClass('cur')
			$(this).prevAll('li').andSelf().addClass('cur')
			g_score = $(this).index() +1
		});
		//切换场馆
		$('.next_arr').on('click',function(){
			$('.container ul').css('left', '-896px')
		})
		$('.prev_arr').on('click',function(){
			$('.container ul').css('left', 0)
		});

		loadLastClick();

	};
    
    function loadDateList(){
//		var userAccountId = '1b444c45-3af5-4f9e-92af-d84cb233d84f';
		var ownerAccountId = $("#ownerAccountId").val();
		var sportTypeId = $("#sportTypeId").val();
		var postUrl = "/venues/dateList/"+ownerAccountId+".do";
		var jsonData = {sportTypeId:sportTypeId} 
		jQuery.ajax({
			url: postUrl,
			data: jsonData,
            type: 'POST',  
            async:false,
            dataType: 'json',    
            error: erryFunction,  //错误执行方法
            success: succFunction //成功执行方法    
		});	
		function succFunction(data){
//			console.log(data);
			 var weekListObj = $("#week_list");
			 weekListObj.empty();
			  $.each(data, function(index, item) {
					var dateobj = item['date'].split("-");
					var month= dateobj[1];
					var day= dateobj[2];
					var date = month + "/" + day;
			  		var objHtml = "";
			  		var counts = item['counts'];
			  		if(counts==null || counts ==""){
			  			counts = 0;
			  		}
				  	if(index==0){
				  		objHtml += " <li class=\"cur\" data-tag="+item['date']+"><span class=\"date\">周"+item['week']+"</span><span class=\"date_t\">今天</span><span class=\"remainder\"><span id="+item['date']+">剩余"+counts+"场</span></li>";
				  		$("#orderTime").val(item['date']);
				  	}
				  	else if(index==1){
				  		objHtml += " <li data-tag="+item['date']+"><span class=\"date\">周"+item['week']+"</span><span class=\"date_t\">明天</span><span class=\"remainder\"><span id="+item['date']+">剩余"+counts+"场</span></li>";
				  	}else{
				  		objHtml += " <li data-tag="+item['date']+"><span class=\"date\">周"+item['week']+"</span><span class=\"date_t\">"+date+"</span><span class=\"remainder\"><span id="+item['date']+">剩余"+counts+"场</span></li>";
				  	}
					weekListObj.append(objHtml);
			  });
			  loadWeekClick();
		}
		function erryFunction(){
			//alert('系统错误！');
			layer.msg("系统错误！", 1, 1);
		};
	}
	
	 function loadHourList(){
		var ownerAccountId = $("#ownerAccountId").val();
		var orderTime = $("#orderTime").val();
		var sportId = $("#sportTypeId").val();
		var postUrl = "/venues/hourList/"+ownerAccountId+".do";
		var jsonData = {ownerAccountId:ownerAccountId,orderTime:orderTime,sportId:sportId} 
	    $.ajax({
	        url: postUrl,
	        data: jsonData,
	        type: 'POST',
	        async:false,
	        dataType: 'json',
	        success: function (data) {
          		var hourListObj = $("#timelist");
          		hourListObj.empty();
          		var sta = $("#sta").val();              // 场地为null sta=0 不加载时间   场地不为null sta=1 加载时间
          		if(parseInt(sta)!=0){					
          			$.each(data, function(index, item) {
    		  			var objHtml = "";
    		  			//console.log("data"+data); 
    				  	objHtml += "<li>" + item + ":00" +"</li>";
    		     		hourListObj.append(objHtml);
    		  		});
          		}
	        }
	    });
		}
	
	 function loadSpaceList(){
		 	var ownerAccountId = $("#ownerAccountId").val();
			var orderTime = $("#orderTime").val();
			var postUrl = "/venues/spaceList/"+ownerAccountId+".do";
			var sportTypeId =$("#sportTypeId").val();
			var jsonData = {ownerAccountId:ownerAccountId,orderTime:orderTime,sportId:sportTypeId} 
		    $.ajax({
		        url: postUrl,
		        data: jsonData,
		        type: 'POST',
		        async:false,
		        dataType: 'json',
		        success: function (data) {
		        	var spaceListObj = $("#spaceList");
		        	spaceListObj.empty();
		        	$("#sta").val(0);   //场地为null 禁止加载时间
				  	$.each(data, function(key, value) {
			        $("#sta").val(1);	//场地不为null 加载时间
				  	var objHtml = "";
						objHtml += " <div id='page_day'><ul><p>" + key + "</p>";
				  		$.each(value, function(index, item) {
				  			var isnull=item['price'];
				  			if(!isnull){
				  				isnull=0;
				  			}
				  			//var data_tag = 'tag' + index;
				  			if(item['isUser']==2 || item['isUser']==0){//已经被选择 不能点击
				  				objHtml += "<li></li>";	
				  			}else{
				  				objHtml += "<li class=\"res\" data-price="+item['price']+"  data-space="+item['spaceId']+" data-spacename="+key+" data-config="+item['isUser']+" data-space="+key+" data-start="+item['startHour']+" data-end="+item['endHour']+" data-tag = 0>"+ isnull+"元"+"</li>";
				  			}
							
					  		//console.log(key+"--"+item);	
				  		});
				  		objHtml += "</ul></div>";
				  		spaceListObj.append(objHtml);
			  		});
				  	
				  	if($("#spaceList div").length < 1){
		          		var hourListObj = $("#timelist");
		          		hourListObj.empty();				  		
				  		spaceListObj.addClass('redalert');
				  		spaceListObj.append("抱歉,当前没有场地可预定!");
				  	}else{
				  		spaceListObj.removeClass('redalert');
				  	}
				  	//完成之后获取剩余场数量
//				  	loadSpaceNum();
		        }
		    });
		};
	 
//	 function loadSpaceNum(){
//		 var resLength =  $("#page_day ul li.res").length;
//		 var $Id = $("#orderTime").val();
//		 var resObj = $("#"+$Id);
//		 resObj.html("剩余"+resLength+"场");
////		 console.log("resLength"+resLength);
//	 };
	 
	 function loadMessagesBy(){
    	var ownerAccountId = $("#ownerAccountId").val();
		var pageSize =$("#pageSize").val();
		var currPage = $("#currPage").val();
		$("#pfAll").html('');		
		jQuery.ajax({
			url: '/api/message/findMessByOwner.do',  
                type: 'POST',
                dataType: 'json',
                async:false,
				data:{msgToId:ownerAccountId,pageSize:pageSize,currPage:currPage},
                success: function(data){
                	$(".message_box ul").html('');
                	if(data==''){
                		$(".message_box").html("<h2 align=center>暂无评论！</h2>")
                	}else{
                		var myObject = data.data;
                		if(myObject!=null){
	                		var Obj = myObject.results;
							var objHtml='';
							for(var i =0;i<Obj.length;i++){
								objHtml+="<li>";
								if(Obj[i].userImg == null || Obj[i].userImg == "" ){
									objHtml+="<img class='portrait_s' src='/images/king.jpg' border='0'>";
								}else{
									objHtml+="<img class='portrait_s' src='"+Obj[i].userImg+"' border='0'>";
								}
								objHtml+="<div class='cout'>";
								objHtml+="<h2>";
								var userAccount = Obj[i].userAccount;
								if(userAccount == null){
									userAccount == "";
								}
								var b = '';
								if(Obj[i].msgResource==1){b="来自web客户端";} else if(Obj[i].msgResource==2){b="来自手机客户端";}
								if(Obj[i].msgScore!=null){
									objHtml+="<span class='userAccountName'>"+userAccount+"</span> <img src='/img/dis_star_"+Obj[i].msgScore+".png' border='0'><span class='time'>"+Obj[i].showMsgTime+b+"</span>";	
								}else{
									objHtml+="<span class='userAccountName'>"+userAccount+"</span> img src='/img/dis_star_3.png' border='0'><span class='time'>"+Obj[i].showMsgTime+b+"</span>";
								}
								
								objHtml+="</h2>";
								objHtml+="<p>"+Obj[i].msgContent+"</p>";
								objHtml+="</div>";
								objHtml+="</li>";								
							}
							$(".message_box ul").append(objHtml);
							
							

							var totals = myObject.total;
							var currPages = myObject.currPage;
							$("#comment").attr("data-value",totals);
							$("#comment").append('('+totals+'条评论)');
							if(totals <=3 || totals==null){
								$(".load_mes").html("没有更多评论了。");
							}
							var tempCurr =0;
							if(totals%10==0){
								tempCurr = parseInt(totals/3);
							}else{
								tempCurr = parseInt(totals/3+1);
							}
							$("#currPage").val(myObject.currPage);
							$(".load_mes").click(function(event){
								findMore();
							});
                		}else{
                			$(".load_mes").html("没有更多评论了。");
                		}
                	}
			    }
		});
	 };
	 
	 function loadfabuinfo(){
        $("#fabu").click(function(){
        	var ownerAccountId = $("#ownerAccountId").val();
        	var pf = $(".grade_box ul li.cur").length;
        	if(pf==0){
        		pf = 5;
        	}
        	var pfText= $("#pfText").val();
        	if(pfText.length>140){
    				layer.msg("评论字数不能超过140字", 1, 1);
    				return false;
    		}else if($.trim(pfText)==''){
				layer.msg("评论不能为空",1,1);
				return false;
			}else{
    			jQuery.ajax({
    				url: '/api/message/insert.do',  
                    type: 'POST',
                    dataType: 'json', 
                    async:false,
    				data:{msgToId:ownerAccountId,msgContent:pfText,msgScore:pf,msgResource:1},
                    success: function(data){
                    	if(data.status==500){
                    		layer.msg(data.message, 1, 1);
                    	}else{
                    		var dataObj = data.data;
    						var pfAllObj = $(".message_box ul");
    						var pfList = "";
    						pfList+="<li>";
    						if(dataObj['userImg'] == "" || dataObj['userImg'] == null){
    							pfList+="<img class='portrait_s' src='/images/king.jpg' border='0'>";	
    						}else{
    							pfList+="<img class='portrait_s' src="+dataObj['userImg']+" border='0'>";
                    	    }
    						pfList+="<div class='cout'>";
    						pfList+="<h2>";
    						var userAccount = dataObj['userAccount'];
    						if(userAccount == null){
    							userAccount == "";
    						}
    						var b = '';
							if(dataObj['msgResource']==1){b="来自web客户端";} else if(dataObj['msgResource']==2){b="来自手机客户端";}
							if(dataObj['msgScore']!=null){
								pfList+="<span class='userAccountName'>"+userAccount+"</span> <img src='/img/dis_star_"+dataObj['msgScore']+".png' border='0'><span class='time'>"+dataObj['showMsgTime']+b+"</span>";	
							}else{
								pfList+="<span class='userAccountName'>"+userAccount+"</span> <img src='/img/dis_star_3.png' border='0'><span class='time'>"+dataObj['showMsgTime']+b+"</span>";
							}
							
							pfList+="</h2>";
							pfList+="<p>"+dataObj['msgContent']+"</p>";
							pfList+="</div>";
							pfList+="</li>";
    						pfAllObj.prepend(pfList);
    						var len =$(".message_box ul li").length;
    						if(len > 3){ 
    						$(".message_box ul li:last").remove();
    						}
    						$("#pfText").val('');
    						//$("#pfsize").html(parseInt($("#totalLists").html())+1);
    						layer.msg("评论发布成功", 1, 1);
    						var tt = $("#comment").attr("data-value");//.html();
    						$("#comment").html('('+ (parseInt(tt)+1) +'条评论)');
    						$("#comment").attr("data-value",(parseInt(tt)+1));//.html();
                    	}
    				}
    			});	
    		}
        }); 
	 };
	 
 	function findMore(){
		var currPage =parseInt($("#currPage").val())+1;
		var pageSize = parseInt($("#pageSize").val());
		var ownerAccountId = $("#ownerAccountId").val();
		jQuery.ajax({
			url: '/api/message/findMessByOwner.do',  
            type: 'POST',
            dataType: 'json', 
            async:false,
			data:{msgToId:ownerAccountId,pageSize:pageSize,currPage:currPage},
            success: function(data){
            	var myObject = data.data;
            	if(myObject==null){
            		$(".load_mes").html("没有更多评论了。");
            	}else{
	        		var Obj = myObject.results;
					var objHtml='';
					for(var i =0;i<Obj.length;i++){
						objHtml+="<li>";
						if(Obj[i].userImg == "" ||Obj[i].userImg == null ){
							objHtml+="<img class='portrait_s' src='/images/king.jpg' border='0'>";
						}else{
							objHtml+="<img class='portrait_s' src="+Obj[i].userImg+" border='0'>";
						}
						objHtml+="<div class='cout'>";
						objHtml+="<h2>";
						var b = '';
						if(Obj[i].msgResource==1){b="来自web客户端";} else if(Obj[i].msgResource==2){b="来自手机客户端";}
						var userAccount = Obj[i].userAccount;
						if(userAccount == null){
							userAccount == "";
						}
						if(Obj[i].msgScore!=null){
							objHtml+="<span class='userAccountName'>"+userAccount+"</span> <img src='/img/dis_star_"+Obj[i].msgScore+".png' border='0'><span class='time'>"+Obj[i].showMsgTime+b+"</span>";	
						}else{
							objHtml+="<span class='userAccountName'>"+userAccount+"</span><img src='/img/dis_star_3.png' border='0'><span class='time'>"+Obj[i].showMsgTime+b+"</span>";
						};
						objHtml+="</h2>";
						objHtml+="<p>"+Obj[i].msgContent+"</p>";
						objHtml+="</div>";
						objHtml+="</li>";								
					}
					$(".message_box ul").append(objHtml);
					var totals = myObject.total;
					var currPages = myObject.currPage;
					var tempCurr =0;
					if(totals%3==0){
						tempCurr = parseInt(totals/3);
					}else{
						tempCurr = parseInt(totals/3+1);
					}					
					$("#comment").html('('+totals+'条评论)');
					if(currPages>=tempCurr){
						$(".load_mes").html("没有更多评论了。");
					}
					
					$("#currPage").val(myObject.currPage);
            	}
		    }
		});
	};
	
	
	function refreshImage(_this){
		var imageUrl = '/draw/drawRandom.do'; //你的生成图片的页面
		_this.src = imageUrl + '?' + Math.random();
	};	
	
	//获取附近场馆信息
	function venuesBySeat(){
		var xLocation = $("#xLocation").val() * 1;
		var yLocation = $("#yLocation").val() * 1;
		var postUrl = "/api/m/venue/queryBySeat.do";
		$.ajax({
	        url: postUrl,
	        data: {longitude:xLocation,latitude:yLocation},
	        type: 'POST',
	        async:false,
	        dataType: 'json',
	        success: function (data) {
	        	var str = data.data;
	        	var strText = "";
	        	strText += "<ul>";
	        	for (var i = 0; i <str.length; i++) {
	        		var address =str[i].address;
	        		if(address.length>9){
	        			address=address.substring(0,9)+"...";
	        		}
	        		
	        		if(str[i].userScore==0 || str[i].userScore == null){
	        			str[i].userScore=5;
	        		}
	        		if(str[i].venueImg=="" | str[i].venueImg == null){
		        		strText += "<li style=\"cursor:pointer;\" onclick='toven(\""+str[i].userAccountId+"\");'><img src=\"/img/venue_t.jpg\" width=\"200\" height=\"200\"  alt=\"\"/><p><span class=\"name\">"+address+"</span><span class=\"score\">"+str[i].userScore+".0</span></p></li>";
	        		}else{
	        			strText += "<li style=\"cursor:pointer;\" onclick='toven(\""+str[i].userAccountId+"\");'><img src=\""+str[i].venueImg+"\" width=\"200\" height=\"200\"  alt=\"\"/><p><span class=\"name\">"+address+"</span><span class=\"score\">"+str[i].userScore+".0</span></p></li>";
	        		}
				}
	        	strText += "</ul>";
	        	$("#venuesBySeat").html("");
	        	$("#venuesBySeat").html(strText);
	        }
	    })
	}
	
	function checkTextAeaLen(){
		 var limitNum = 140;    //数据库为varchar(255)
		    //var pattern = '还可以输入' + limitNum + '字符';
		    $('#num').html(limitNum);
		    var teamDescLen = $("#pfText").val().length;
		    if(teamDescLen>255){
		    	 $('.num').html("字数超过限制！");
		    }else{
		    	var result = limitNum - teamDescLen;
	            pattern = '还可输入' + result + '字';
	            $('.num').html(pattern);
		    }
		     /* $('#teamDesc').keyup(function(){
		        var remain = $(this).val().length;
		        if(remain > 255){
		                pattern = "字数超过限制！";
		            }else{
		                var result = limitNum - remain;
		                pattern = '还可以输入' + result + '字符';
		            }
		            $('#contentwordage').html(pattern);
		        });  */
		    $('#pfText').on('propertychange input keyup', function() {
		    	var remain = $(this).val().length;
		    	var result = limitNum - remain;
		        if(remain > 140){
		                pattern = "字数超过限制！";
		         }else{
		                pattern = '还可输入' + result + '字';
		                $('.num').html(pattern);
		         }
		    });
		    
		}
		//跳转
	function toven(id){
		location.href="/venues/"+id+".do";
	}
	