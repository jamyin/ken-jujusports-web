$.fn.extend({
    Center: function() {
        $(this).css({
            "left": ($(window).width() - $(this).width()) * 0.5 + "px",
            "top": (($(window).height() - $(this).height()) * 0.5 + $(document).scrollTop()) + "px"
        })
    },
    RadioHit: function() {
        var obj = $(this).find("input[type=radio]");
        obj.click(function() {
            obj.attr("checked", false);
            $(this).attr("checked", "checked")
        })
    },
    WaterFall: function(margin) {
        $(this).css("position", "relative");
        $(this).children().css("position", "absolute");
        var len = $(this).children().length;
        var wid = parseInt($(this).children().eq(0).outerWidth());
        var left = [];
        var top = [];
        var r = Math.ceil(($(this).width() - margin * (len - 1)) / wid) - 1;
        for (i = 0; i < len; i++) {
            var obj = $(this).children().eq(i);
            if (i <= r) {
                obj.css("left", i * (wid + margin) + "px");
                obj.css("top", 0 + "px");
                left.push(i * (wid + margin));
                top.push(parseInt(obj.outerHeight()) + margin)
            }
            if (i > r) {
                var k = 0;
                for (j = 1; j <= r; j++) {
                    if (top[k] > top[j]) {
                        k = j
                    }
                }
                obj.css({
                    "left": left[k] + "px",
                    "top": top[k] + "px"
                });
                top[k] = top[k] + parseInt(obj.outerHeight()) + margin;
                $(this).css("height", top[k] + "px")
            }
        }
    },
    OneByOne: function(config) {
        var obj = $(this);
        var total = $(this).children().length;
        var ch = $(this).children().eq(0);
        var step = ch.width() + parseInt(ch.css("margin-left")) + parseInt(ch.css("margin-right"));
        $(config["leftbtn"]).bind('click', function() {
            var marL = parseInt(obj.css("margin-left"));
            if (marL >= 0) {
                obj.css("margin-left", "0px");
                return
            } else {
                obj.stop().animate({
                    "margin-left": parseInt(marL + step) + "px"
                }, 300)
            }
        });
        $(config["rightbtn"]).bind('click', function() {
            var marL = parseInt(obj.css("margin-left"));
            if (marL <= (0 - parseInt(total - config["keep"]) * step)) {
                obj.css("margin-left", (0 - parseInt(total - config["keep"]) * step) + "px");
                return
            } else {
                obj.stop().animate({
                    "margin-left": parseInt(marL - step) + "px"
                }, 300)
            }
        })
    }
})