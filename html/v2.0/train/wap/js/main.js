$(function(){

  $(".list .school>li").click(function(){
    $(this).next().slideToggle();
    $(this).children("img").toggleClass("rotate");
    $(this).siblings().find("img").removeClass("rotate");
    $(this).next().siblings("ul").slideUp();
    $(this).next().siblings("ul").find(".order_menu").slideUp();
  });

  var container = '<li class="order_menu"><span>查看报名</span><span>开始报名</span></li>';
  $(".list>.school>ul li").after(container)

  $(".list .school>ul>li").click(function(){
    $(this).next("li.order_menu").slideToggle();
    $(this).next("li.order_menu").siblings(".order_menu").slideUp();
  });

});
