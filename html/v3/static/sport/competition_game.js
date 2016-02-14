		$.ajax({
				url:'/game/getGameAll.htm',
				type: 'POST',
				dataType :'json',
				async : false,
				success : function(data){
					console.log(data);
					str = "<h1>热门赛事</h1>"
					 for (var i = 0; i < data.length; i++) {
							if(i == 0){
								str += "<div class=\"wrap\">"
							 }else{
								str += "<div class=\"wrap last\">"
							 } 
							//str += "<img src=\"/static/img/competition1.png\" />"
							str += "<img src=\""+data[i].microPic+"\" />"
							str +="<div obj-id = '"+data[i].id+"' class=\"bt match-detail\">"
							str +="<a target='_' href='/game/toTeam/"+data[i].id+".htm'>了解详情>></a>"
							str +="</div>"
							str +="</div>"				
						} 
					$('.content').empty();
					$('.content').append(str);
				}
			});