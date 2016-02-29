requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min',
        slide: 'widget/slide',
        tabs: 'widget/tabs'
    }
});

/*
 * 模拟复选框
 */
requirejs(['jquery'], function($) {
    $('.filter .list li label').click(function() {
        if ( $(this).find('input').prop('checked') ) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
});

/*
 * 筛选价格
 */
requirejs(['jquery'], function($){
    var obj = $('#J_filter_range'),
        oBtn = obj.find('.range-btn'),
        iCur = obj.find('.range-inner'),
        disX = 0,
        iPrice = 0;

    var conf_limits = function(val, min, max) {
        if ( val < min ) {
            return min;
        } else if ( val > max ) {
            return max
        } else {
            return val;
        }
    };

    oBtn.mousedown(function(e) {
        disX = e.clientX - $(this).position().left;

        $(document).mousemove(function(e) {

            var iWidth = e.clientX - disX;

            iWidth = conf_limits(iWidth, 0, 198 );

            iCur.css({
                'width':  iWidth
            });

            iPrice = iWidth + 17;

            if ( iPrice >= 0 && iPrice <= 50 ) {
                $('#J_filter_price').val('0-2000');
            } else if ( iPrice >= 51 && iPrice <= 90 ) {
                $('#J_filter_price').val('2000-3000');
            } else if ( iPrice >= 91 && iPrice <= 130 ) {
                $('#J_filter_price').val('3000-4000');
            } else if ( iPrice >= 131 && iPrice <= 170 ) {
                $('#J_filter_price').val('4000-5000');
            } else if ( iPrice >= 171 ) {
                $('#J_filter_price').val('5000-0');
            }
        });

        $(document).mouseup(function() {
            $(document).off();
        });

        return false;
    });
});

/*
 * 模拟下拉框
 */
requirejs(['jquery'], function($) {
    var obj = $('#J_filter_select');
    var options = obj.find('select > option');

    options.each(function() {
        var li = $('<li><a href="javascript:;">'+ $(this).val() +'</a></li>');
        obj.find('.select-bd > ul').append(li);
    });

    obj.on('click', function(e) {
        e.stopPropagation();
        $(this).find('.select-hd').toggleClass('active');
        $(this).find('.select-bd').toggleClass('hide');
    });

    $(document).on('click', function() {
        obj.find('.select-hd').removeClass('active');
        obj.find('.select-bd').addClass('hide');
    });

    var aLi = obj.find('.select-bd li');
    aLi.each(function() {
        $(this).click(function() {
            obj.find('.select-hd > span').text($(this).text());
            obj.find('select').get(0).selectedIndex = $(this).index();
        });
    });
});

/*
 * 轮播图
 */
requirejs(['jquery', 'slide'], function($) {
    $('#J_config_slide').slide();
    $('#J_hunqing_side').slide();
    $('#J_recommend_slide').slide();
    $('#J_hunsha_slide').slide();
});


/*
 * 选项卡
 */

requirejs(['jquery', 'tabs'], function($) {
    $('#J_TABS_MIN').tabs();
    $('#J_TABS_MAX').tabs();
});


/*
 * 品蔚婚典
 */
requirejs(['jquery'], function($) {
    var aLi = $('.wedding-type .type-hd  li');
    aLi.mouseenter(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        $('.wedding-type .type-bd > div').eq(index).show().siblings().hide();
    });
});

/*频道页面数据加载*/
requirejs(['jquery','./source/api'],function($,api) {
    $.ajax({
        url: api.CHANNEL_HQ_ITEMS_DATA_URL,
        data: {t: new Date().getTime(),itemType:1,number:10},
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var hq_data = [];
            for(var i = 0;i<data.results.length;i++){
                hq_data.push('<li>'+
                    '<p class="pic"><a href="#"><img src="'+data.results[i].image+'"></a></p>'+
                    '<p class="txt text-overflow"><a href="'+data.results[i].href+'">'+data.results[i].itmeName+'</a></p>'+
                '<p class="price">最低价：'+data.results[i].description1+'</p>'+
                '<p class="song">送聚喜红包：'+data.results[i].description2+'</p>'+
                '</li>');
            }
            // 婚庆渠道数据加载
            $('.data-hq-channel-items').append(hq_data.join(''));
        }
    });
});

    /*
     * 首页数据加载
     * */
    requirejs(['jquery','./source/api','slide'],function($, api){
        $.ajax({
            url: api.INDEX_DATA_URL,
            data: {t: new Date().getTime()},
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                // 热销
                for (var i = 0; i < data.hot_sale.length; i++) {
                    $('.hot-bd > ul').append('<li>'
                        + '<p class="pic"><a href="#"><img src="' + data.hot_sale[i].image + '"></a></p>'
                        + '<p class="txt text-overflow"><a href="#">' + data.hot_sale[i].title + '</a></p>'
                        + '<p class="price">' + data.hot_sale[i].description + '</p>'
                        + '</li>');
                }
                // 排行
                var seller_data = [];
                for (var i = 0; i < data.top10.length; i++) {
                    if (i == 0) {
                        seller_data.push('<dl class="first">' +
                            '<dt class="text-overflow"><span>' + (i + 1) + '</span><a href="#">唯一视觉婚纱摄影</a></dt>' +
                            '<dd class="clear-fix">' +
                            '<div class="pic"><a href="#"><img src="../img/pic_88x55.jpg"></a></div>' +
                            '<div class="price"><p>&yen;5888 - 7888</p></div>' +
//                            '<div class="number"><p>最大容纳：55桌</p></div>'+
                            '<div class="score"><p><span style="width: 60%;"></span></p>3.0</div>' +
                            '</dd>' +
                            '</dl>');
                    } else {
                        seller_data.push('<dl>' +
                            '<dt class="text-overflow"><span>' + (i + 1) + '</span><a href="#">唯一视觉婚纱摄影</a></dt>' +
                            '<dd class="clear-fix hide">' +
                            '<div class="pic"><a href="#"><img src="../img/pic_88x55.jpg"></a></div>' +
                            '<div class="price"><p>&yen;5888 - 7888</p></div>' +
//                        '<div class="number"><p>最大容纳：55桌</p></div>'+
                            '<div class="score"><p><span style="width: 60%;"></span></p>3.0</div>' +
                            '</dd>' +
                            '</dl>')
                    }
                }
                $('.data-seller-sale').append(seller_data.join(''));
                // 添加交互效果
                $('.rank dl').mouseenter(function () {
                    $(this).find('dd').show().end().siblings().find('dd').hide();
                });
                var family_data = [];

                // 大家庭
                for (var i = 0; i < data.family.length; i++) {
                    if (i == 10) {
                        family_data.push('<li class="love"><img src="../img/love.png"></li>');
                    }
                    family_data.push('<li>'
                        + '<p class="pic"><img src="' + data.family[i].image + '"></p>'
                        + '<div class="info">'
                        + '<p class="tit">会员：' + data.family[i].title + '</p>'
                        + '<p class="date">婚期：' + data.family[i].date + '</p>'
                        + '<div class="score"><p><span style="width: ' + (data.family[i].score * 100 / 5) + '%;"></span></p>' + data.family[i].score + '</div>'
                        + '<p class="btn"><a href="#">立即查看</a></p>'
                        + '</div>'
                        + '</li>')

                }
                $('#data-family').append(family_data.join(''));
                // 加载type-list
                var wed_style_data = [];
                for (var i = 0; i < data.wed_style.length; i++) {
                    // console.log(data.wed_style.length);
                    var nodeHtml = '';
                    var subImageHtml = '';
                    for (var j = 0; j < data.wed_style[i].children.length; j++) {
                        var node = data.wed_style[i].children[j];
                        nodeHtml += '<li class="clear-fix">'
                            + '<p class="pic"><a href="#"><img src="' + node.image + '"></a></p>'
                            + '<p class="look"><span><a>' + node.title + '</a></span></p>'
                            + '</li>';

                    }
                    for (var j = 0; j < data.wed_style[i].subImage.length; j++) {
                        var value = data.wed_style[i].subImage[j];
                        subImageHtml += '<li>'
                            + '<p class="pic"><a href="#"><img src="' + value + '"></a></p>'
                            + '<p class="txt text-overflow"><a href="#">品蔚婚典</a></p>'
                            + '</li>';

                    }
                    wed_style_data.push('<div ' + (i == 0 ? 'class="type-item"' : 'class="type-item hide"') + '>'
                        + '<dl>'
                        + '<dt><a href="#"><img src="' + data.wed_style[i].image + '"></a></dt>'
                        + '<dd>'
                        + '<div class="inner">'
                        + '<h3>品蔚婚典</h3>'
                        + '<p class="address text-overflow" title="">地址：' + data.wed_style[i].description + '</p>'
                        + '<div class="user">'
                        + '<strong>以下会员使用了品蔚婚典：</strong>'
                        + '<ul>'
                        + nodeHtml
                        + '</ul>'
                        + '</div>'
                        + '</div>'
                        + '</dd>'
                        + '</dl>'
                        + '<div class="type-list ">'
                        + '<h3>' + data.wed_style[i].title + '</h3>'
                        + '<ul class="clear-fix">'
                        + subImageHtml
                        + '</ul>'
                        + '</div>'
                        + '</div>');
                }
                $('.data-type-style').append(wed_style_data.join(''));

                // 加载推荐
                var jx_recommend_data = [];
                for (var i = 0; i < data.jx_recommend.length; i++) {
                    jx_recommend_data.push('<li><a href="#">'
                        + '<p class="pic"><img src="' + data.jx_recommend[i].image + '"></p>'
                        + '<p class="mask">'
                        + '<span class="txt text-overflow">' + data.jx_recommend[i].title + '</span>'
                        + '<span class="price">聚喜网特价：' + data.jx_recommend[i].description + '</span>'
                        + '</p>'
                        + '</a></li>');
                }
                $('.data-jx-recommend').append(jx_recommend_data.join(''));
                // 大轮播图数据
                for (var i = 0; i < data.big_slide.length; i++) {
                    $('.data-slide-big').append('<li><a href="#"><img src="' + data.big_slide[i].image + '"></a></li>');
                }
                // 小轮播图数据
                for (var i = 0; i < data.small_slide.length; i++) {
                    $('.data-slide-small').append('<li><a href="#"><img src="' + data.small_slide[i].image + '"></a></li>');
                }
                $('#J_config_slide').slide();
                $('#J_recommend_slide').slide();
            },
            error: function () {
                console.log('the server is error!')

            }


        });
    })
