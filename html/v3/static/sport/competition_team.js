//获取地址栏提交参数 			
			function GetQueryString(name)
			{
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}
			var gameId = GetQueryString("gameId")
			
			//球队信息
			$.ajax({
				url:'/team/getAllTeamPage.htm',
				type:"POST",
				data:{gameId:gameId},
				dataType:'json',
				success:function(data){
				   var result = data.data.results;
				   var str ="";
				   for (var i = 0; i < result.length; i++) {
					   str+="<a href='/tc/index/"+result[i].id+".htm'><img class=\"pic-move\" src=\""+result[i].logo+"\" /></a>";
					}
				    //alert(str);
				   $('#teamImg').empty();
				   $('#teamImg').append(str);
				}
			})
			//视频 
			$.ajax({
				url:'/video/getAllVideoPage.htm',
				type:"POST",
				data:{gameId:gameId,limit:'6'},
				dataType:'json',
				async:false,
				success:function(data){
					var str ="";
					var result = data.data.results;
					for (var i = 0; i < result.length; i++) {
						str+="<li id=\"toVideo\" obj-id=\""+result[i].id+"\" class=\"team-video-li\" >";
						str+="<i></i><img src=\""+result[i].videoThumb+"\" />";
						str+="</li>";
					} 
					$('.team-video-ul').empty();
					$('.team-video-ul').append(str);
				}
			})
			
			//赛事 
			$.ajax({
				url:'/game/getAllPage.htm',
				type:"POST",
				data:{id:gameId},
				dataType:'json',
				success:function(data){
					var result = data.data.results;
					$('#con').empty();
					$('#con').append(result[0].content);
				}
			}) 
			
			//图片列表 
			$.ajax({
				url:'/album/queryAlbum.htm',
				type:"POST",
				data:{id:gameId,limit:'6'},
				dataType:'json',
				success:function(data){
					console.log(data);
					var result = data.results;
					var str ="";
					for (var i = 0; i < result.length; i++) {
						str += "<li class=\"team-pics-li\">";
						str += "<img src=\""+result[i].thumbnail+"\" />";
						str += "<p>"+result[i].title+"</p></li>";
					}
					$('.team-pics-ul').empty();
					$('.team-pics-ul').append(str);
				}
			})
			
			
			$(".team-video-li").on("click", function() {
				/* window.open($(this).attr("url"), "_blank"); */
				var id= $(this).attr("obj-id");
				//iframe层-父子操作
				/* layer.open({
				 	title:'视频信息',
				    type: 2,
				    area: ['420px', '320px'],
				    fix: true, //不固定
				    maxmin: false,
				    content: '/video/toVideo.htm?id='+id
				}); */
				$('<iframe width="600px" height="500px;" scrolling="yes" src="/video/toVideo.htm?id='+id+'"></iframe>').layerModel();
				/*window.open('/video/toVideo.htm?id='+id, "_blank");*/
			}) 
