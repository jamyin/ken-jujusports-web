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
		//alert($(this).attr('pid'));
		var pid = $(this).attr('pid');
		$.ajax({
			url:"/pic/setDelete.htm",//提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{'picId':pid},//提交的数据
			success: function(data){
				layer.msg("删除图片成功!");
				//$(this).closest('li').remove()
			
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
		
	})
	
	
	
	
	$(".save_btn").on("click", function() {
		/* var picTitle =$(this).parent("div").eq(0)("input").val();
		 var picId=$(this).parent("div").last("input").val();*/
		if($(this).parent().attr('id') == 'title'){			
			var d = $(this).parent().find("input[type=text]");
			//alert($(".save_btn").prevAll("input[type='text']").size());
			var picTitle = d.val();
			var picId = d.attr('pid');
			if(picTitle == null || picTitle == ""){
				layer.msg("输入的图片名称为空!");
				return ;
			}else{
				$.ajax({
					url:"/pic/setTitle.htm",//提交的网址
					type: 'POST',  
					dataType: 'json', 
					async: false,
					data:{'picTitle':picTitle,'picId':picId},//提交的数据
					success: function(data){
						layer.msg("更新图片名称成功!");
						$('.cancel_btn').click();
					
					},error :function(){
						layer.msg("系统错误！", 1, 1);
					}
				});
			}
		}else if($(this).parent().attr('id') == 'dec'){
		var t = $(this).parent().find("input,textarea");
		var picId = t.attr('pid');
		var picDescribe = t.val();
		if(picDescribe == null || picDescribe == ""){
			layer.msg("输入的图片描述为空!");
			return ;
		}else{
		$.ajax({
			url:"/pic/setDescribe.htm",//提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{'picDescribe':picDescribe,'picId':picId},//提交的数据
			success: function(data){
				layer.msg("更新图片描述成功!");
				$('.cancel_btn').click();
			
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
		}
		}
	});
});

