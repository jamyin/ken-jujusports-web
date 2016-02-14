// JavaScript Document
$(function(){
	$('.wx_icon').hover(function(){
			$(this).find('.wx_code').addClass('show')
    		},function(){
			$(this).find('.wx_code').removeClass('show')
	});
})