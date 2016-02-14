$(function(){
	$('.edit_title, .edit_dec').on('click', function(){
		var _pClass = $(this).parent().attr('id')
		if(_pClass == 'title'){
			$(this).parent().find('input[type=text]').removeAttr('disabled').addClass('edited')
			$(this).closest('li').find('#dec').removeClass('show')
		}else if(_pClass = 'dec'){
			$(this).parent().find('textarea').removeAttr('disabled').addClass('edited')
			$(this).closest('li').find('#title').removeClass('show')
		}
		$(this).parent().find('.save_btn').addClass('show')
		$(this).parent().find('.cancel_btn').addClass('show')
		$(this).removeClass('show')
	})
			
	
	$('.cancel_btn').on('click', function(){
		var _pClass = $(this).parent().attr('id')
		if(_pClass == 'title'){
			$(this).parent().find('input[type=text]').attr('disabled','disabled').removeClass('edited')
			$(this).closest('li').find('#dec').addClass('show')
		}else if(_pClass = 'dec'){
			$(this).parent().find('textarea').attr('disabled','disabled').removeClass('edited')
			$(this).closest('li').find('#title').addClass('show')
		}
		
		$(this).parent().find('.save_btn').removeClass('show')
		$(this).parent().find('.edit_'+_pClass).addClass('show')
		$(this).removeClass('show')
	})
	
	$('.del').on('click', function(){
		$(this).closest('li').remove()
		var videoId = $(this).attr('pid');
		$.ajax({
			url:"/video/delVideo.htm",//提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{'ids':videoId},//提交的数据
			success: function(data){
				layer.msg("删除视屏成功!");
				//$(this).closest('li').remove()
			
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
		
	})
	
	
	
	$(".save_btn").on("click", function() {
		if($(this).parent().attr('id') == 'title'){			
			var d = $(this).parent().find("input[type=text]");
			var videoTitle = d.val();
			var videoId = d.attr('pid');
			if(videoTitle == null || videoTitle == ""){
				layer.msg("输入的视屏名称为空!");
				return ;
			}else{
				$.ajax({
					url:"/video/editVideo.htm",//提交的网址
					type: 'POST',  
					dataType: 'json', 
					async: false,
					data:{'videoName':videoTitle,'id':videoId},//提交的数据
					success: function(data){
						layer.msg("更新视屏名称成功!");
						$('.cancel_btn').click();
					
					},error :function(){
						layer.msg("系统错误！", 1, 1);
					}
				});
			}
		}else if($(this).parent().attr('id') == 'dec'){
		var t = $(this).parent().find("input,textarea");
		var videoId = t.attr('pid');
		var videoDescribe = t.val();
		if(videoDescribe == null || videoDescribe == ""){
			layer.msg("输入的视屏描述为空!");
			return ;
		}else{
		$.ajax({
			url:"/video/editVideo.htm",//提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{'described':videoDescribe,'id':videoId},//提交的数据
			success: function(data){
				layer.msg("更新视屏描述成功!");
				$('.cancel_btn').click();
			
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
		}
		}
	});
});

