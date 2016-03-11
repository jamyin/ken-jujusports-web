$(function(){	
	var o = $('.nav > ul > li.cur').attr('tag')
	$('.nav > .mark').css('left', o+'px')

	$('.nav > ul > li').hover(function(){
		var n = $(this).attr('tag')
		$('.nav > .mark').css('left', n+'px')
	},function(){
		var o = $('.nav > ul > li.cur').attr('tag')
		$('.nav > .mark').css('left', o+'px')
	});
});
