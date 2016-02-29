define(['jquery'], function($) {
    $.fn.tabs = function( options ) {
        var defaults = {};

        var settings = $.extend(defaults, options);

        var $wrapper = this,
            $tabs_hd = $wrapper.find('.tabs-hd'),
            $tabs_hd_item = $tabs_hd.find('li'),
            $tabs_bd = $wrapper.find('.tabs-bd'),
            $tabs_bd_item = $tabs_bd.find('.tabs-bd-item'),
            _index = 0;

        $tabs_hd_item.on('click', function() {
            $tabs_hd_item.removeClass('active');
            $tabs_bd_item.addClass('hide');
            $(this).addClass('active');
            _index = $(this).index();
            $tabs_bd_item.eq(_index).removeClass('hide');
        });
    };
});