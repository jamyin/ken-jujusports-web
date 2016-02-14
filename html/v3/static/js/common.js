//导航事件
function nav_mark(n){
	var _t;
	if(n=='home'){
		_t = 0
	}else if(n=='competition'){
		_t = 1
	}else if(n=='activity'){
		_t = 2
	}else if(n=='futurestar'){
		_t = 3
	}else if(n=='SportStore'){
		_t = 4
	}else if(n=='Transfermarket'){
		_t = 5
	}
	$(".nav_bar").find('li.items').eq(_t).addClass('cur')
	$(".nav_bar li").hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	},function(){
		$(this).removeClass('cur')
		$(".nav_bar").find('li.items').eq(_t).addClass('cur')
	});
}

$(function(){
	$('.wechat_codes').hover(function(){
			$(this).find('.wx_code').addClass('show')
    		},function(){
			$(this).find('.wx_code').removeClass('show')
	});
})