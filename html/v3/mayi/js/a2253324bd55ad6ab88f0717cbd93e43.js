jQuery.fn.cm_dialog = function(options) {
    var options = options || {};
    var msgDivWidth = options.width || '680px';
    var msgDivHeight = options.height || '450px';
    var msgDivTop = options.top || '100px';
    var msgDivLeft = options.left || '200px';
    var endOpacityVal = options.endOpacityVal || 0.5;
    var msgDivUrl = options.url || '';
    var msgDivHtml = options.html || '';
    if (msgDivUrl != '' && msgDivHtml != '') {
        return false
    };
    var popupOver = options.popupOver === undefined ? false : options.popupOver;
    var popupWindowId = options.winId || 'mesWindow';
    var maskId = options.maskId || 'back';
    var closeOnMaskClick = options.closeOnMaskClick == undefined ? true : options.closeOnMaskClick;
    $('#' + popupWindowId).remove();
    if (!popupOver) $('#' + maskId).remove();
    $('input.jptrigger').blur();
    var pageSize = GetPageSize();
    var bodyHeight = pageSize.PageH;
    if (popupOver == false) {
        var shadowDivObj = $('<div id="' + maskId + '"></div>');
        shadowDivObj.css({
            width: cW(),
            height: bodyHeight,
            top: '0px',
            left: '0px',
            background: "#666",
            position: 'absolute',
            zIndex: '100000',
            opacity: '0'
        });
        $(document.body).prepend(shadowDivObj);
        var maskObj = $('#' + maskId);
        showMask(endOpacityVal);
        $(window).resize(resizeMask).scroll(resizeMask);
        if (closeOnMaskClick) maskObj.click(function() {
            close();
            $('.alert-window').remove()
        })
    };
    pageSize = GetPageSize();
    bodyHeight = pageSize.PageH;
    $(document.body).append($('<div class="alert-window" id="' + popupWindowId + '" ></div>'));
    var popupWindowObj = $('#' + popupWindowId);
    var loading_html = '';
    loading_html += '<div style="width:385px;margin: 0px auto 0px auto;border: 5px solid #dadada;background-color: #FFFFFF;">';
    loading_html += '<div style="float:left;width:345px;padding: 20px;">';
    loading_html += '<div style="background: url(http://img.chemayi.com/version63/common/img_loading.gif) no-repeat center;padding:45px;font-size: 12px;line-height: 22px;width:25px;height:25px;margin: 0px auto 0px auto;vertical-align: middle;"></div>';
    loading_html += '</div>';
    loading_html += '<div style="clear:both;"></div>';
    loading_html += '</div>';
    popupWindowObj.html(loading_html);
    popupWindowObj.css({
        width: msgDivWidth,
        height: msgDivHeight,
        left: '50%',
        top: getPopupTop() + 'px',
        marginLeft: -parseInt(msgDivWidth) / 2,
        position: 'absolute',
        zIndex: '100001'
    });
    if (msgDivUrl != '' && msgDivHtml == '') {
        $.get(msgDivUrl, {}, function(data) {
            popupWinInit(data)
        })
    };
    if (msgDivUrl == '' && msgDivHtml != '') {
        popupWinInit(msgDivHtml)
    };
    var popupHeight = 0;

    function popupWinInit(html) {
        var popupObj = $('#' + popupWindowId);
        popupObj.html('').append(html).find('*').click(function(e) {
            e.stopPropagation()
        }).end().click(function() {
            if (closeOnMaskClick && !popupOver) close()
        }).find('.popClose,.close,#cm_closeMsg, #cm_closeMsg_cancel').bind('click', close).end();
        popupHeight = popupObj.height();
        resizeMask();
        b = options.callback;
        if (typeof b == "function") {
            b()
        }
    };

    function showMask(endOpacityVal) {
        var num = parseFloat(maskObj.css('opacity')) + 0.05;
        maskObj.css('opacity', num);
        if (maskObj.css('opacity') < endOpacityVal) {
            setTimeout(function() {
                showMask(endOpacityVal)
            }, 5)
        }
    };

    function resizeMask() {
        if (maskObj) maskObj.css({
            width: cW(),
            height: cH(),
            top: (st() + 'px'),
            left: (sl() + 'px')
        });
        popupWindowObj.css({
            top: getPopupTop() + 'px'
        })
    };

    function close() {
        popupWindowObj.remove();
        if (!popupOver) maskObj.remove();
        return false
    };

    function getPopupTop() {
        var msgTop = parseInt(msgDivTop);
        var currentTop = msgTop;
        var scrollTop = st();
        var popupTop = msgTop + scrollTop;
        if (popupWindowObj.length) {
            var position = popupWindowObj.position();
            currentTop = position.top
        };
        if (popupTop + popupHeight > bodyHeight) {
            return bodyHeight - msgTop - popupHeight
        };
        if (currentTop - scrollTop > msgTop) {
            return msgTop + st()
        };
        if (currentTop + popupHeight > scrollTop && scrollTop <= bodyHeight) {
            return currentTop
        };
        return popupTop
    }
};
var ye_msg = {
    Counter: 0,
    AlertWindowPrefix: 'WL_ALERT_',
    AlertWindowId: '',
    MaskId: 'WL_ALERT_MASK',
    open: function(e, d, c, b, a) {
        if (e.indexOf('<script') != -1) {
            e = '正在载入中...' + e
        };
        var withMask = a === undefined ? true : a;
        this.Counter++;
        this.AlertWindowId = this.AlertWindowPrefix + this.Counter;
        if (withMask) {
            var shadowDivObj = $('<div id="' + this.MaskId + '"></div>');
            shadowDivObj.css({
                width: cW(),
                height: cH(),
                background: "#666",
                position: 'absolute',
                top: st() + 'px',
                left: sl() + 'px',
                zIndex: '200000',
                opacity: '0.5'
            });
            $('body').append(shadowDivObj);
            var maskObj = $('#' + this.MaskId);
            showMask(0.5);
            maskObj.click(function() {
                close();
                $('.alert-window').remove()
            });
            $(window).resize(resizeMask).scroll(resizeMask)
        };
        var iconClass = '';
        switch (c) {
            case 2:
                iconClass = 'pop-confirm-wrong';
                break;
            case 3:
                iconClass = 'pop-confirm-error';
                break;
            default:
                iconClass = 'pop-confirm-ok';
                break
        }
        var _bd_img_url = 'images/';
        var popupHtml = '';
        popupHtml += '<div class="popbox alert-window" id="' + this.AlertWindowId + '">';
        popupHtml += '<div class="popcon ' + iconClass + '">';
        popupHtml += '<div class="pop_head">';
        popupHtml += '<a href="javascript:;" class="close popClose" id="cm_closeMsg"></a>';
        popupHtml += '</div>';
        popupHtml += '<div class="popIcon "></div>';
        popupHtml += '<p class="pop_tip">' + e + '</p></div></div>';
        $('body').append(popupHtml);
        var alertWindowObj = $('#' + this.AlertWindowId);
        $(alertWindowObj).css({
            width: 440,
            height: 270,
            left: '50%',
            top: 200 + $(window).scrollTop() + 'px',
            marginLeft: -220 + 'px',
            position: 'absolute',
            zIndex: '200001'
        }).click(function() {
            close()
        }).find('*').click(function(e) {
            e.stopPropagation()
        });
        $('#' + this.AlertWindowId).find('.close, #cm_closeMsg, .popClose').bind('click', close);
        if (d != undefined && d != 0) {
            d = c == 1 ? 1 : d;
            setTimeout(function() {
                close()
            }, d * 1000)
        }

        function showMask(endOpacityVal) {
            var num = parseFloat(maskObj.css('opacity')) + 0.05;
            maskObj.css('opacity', num);
            if (maskObj.css('opacity') < endOpacityVal) {
                setTimeout(function() {
                    showMask(endOpacityVal)
                }, 5)
            }
        }

        function close() {
            alertWindowObj.remove();
            if (withMask == true) {
                maskObj.remove()
            }
            if (typeof b == "function") {
                b()
            }
        }

        function resizeMask() {
            if (maskObj) maskObj.css({
                width: cW(),
                height: cH(),
                top: (st() + 'px'),
                left: (sl() + 'px')
            });
            alertWindowObj.css({
                top: 200 + st() + 'px'
            })
        }
    }
};

function cH() {
    return document.documentElement.clientHeight
};

function cW() {
    return document.documentElement.clientWidth
};

function sl() {
    return document.documentElement.scrollLeft
};

function st() {
    return document.documentElement.scrollTop || document.body.scrollTop
};

function GetPageSize() {
    var scrW, scrH;
    if (window.innerHeight && window.scrollMaxY) {
        scrW = window.innerWidth + window.scrollMaxX;
        scrH = window.innerHeight + window.scrollMaxY
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        scrW = document.body.scrollWidth;
        scrH = document.body.scrollHeight
    } else if (document.body) {
        scrW = document.body.offsetWidth;
        scrH = document.body.offsetHeight
    };
    var winW, winH;
    if (window.innerHeight) {
        winW = window.innerWidth;
        winH = window.innerHeight
    } else if (document.documentElement && document.documentElement.clientHeight) {
        winW = document.documentElement.clientWidth;
        winH = document.documentElement.clientHeight
    } else if (document.body) {
        winW = document.body.clientWidth;
        winH = document.body.clientHeight
    };
    var pageW = (scrW < winW) ? winW : scrW;
    var pageH = (scrH < winH) ? winH : scrH;
    return {
        PageW: pageW,
        PageH: pageH,
        WinW: winW,
        WinH: winH
    }
}! function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(f) {
        function g() {
            var b = 0;
            i.each(function() {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible"))
                    if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                    else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }
        var h, i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
            return g()
        }), this.each(function() {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function() {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function(a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function() {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function() {
                a(this).trigger("appear")
            })
        }), a(c).ready(function() {
            g()
        }), this
    }, a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function(b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);
$.fn.extend({
    PublicSelect: function() {
        return $(this).each(function(index, element) {
            var obj = $(this).find('.pub-select-input'),
                list = $(this).find('.pub-select-list');
            obj.find('.input-text').html(list.find('li.option:first').html());
            obj.bind('click', function(e) {
                list.toggle();
                $(this).toggleClass('cur');
                e.stopPropagation()
            });
            list.find('li.option').bind('click', function(e) {
                obj.find('.input-text').html($(this).html());
                obj.removeClass('cur');
                list.hide();
                e.stopPropagation()
            });
            $(document).click(function() {
                list.hide();
                obj.removeClass('cur')
            })
        })
    },
    PublicSelectAjax: function(ajax) {
        return $(this).each(function(index, element) {
            var obj = $(this).find('.pub-select-input'),
                list = $(this).find('.pub-select-list');
            obj.find('.input-text').html(list.find('li.option:first').html());
            obj.bind('click', function(e) {
                list.toggle();
                $(this).toggleClass('cur');
                e.stopPropagation()
            });
            list.find('li.option').bind('click', function(e) {
                var name = $(this).html();
                obj.find('.input-text').html(name);
                obj.removeClass('cur');
                list.hide();
                e.stopPropagation();
                ajax(name)
            });
            $(document).click(function() {
                list.hide();
                obj.removeClass('cur')
            })
        })
    },
    PubDateModule: function(config) {
        var option = {
            ableBeforeToday: true,
            appoint: function() {
                var date = new Date();
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            },
            before_after: 0
        };
        option = config ? $.extend(option, config) : option;
        return $(this).each(function(index, element) {
            $(this).append(DateModuleStr());
            $(this).css("border", "none");
            var Obj = $(this),
                obj = $(this).find('.pub-date-input'),
                view = $(this).find('.pub-date-view');
            obj.bind('click', function(e) {
                view.toggle();
                $(this).toggleClass('cur');
                e.stopPropagation()
            });
            view.bind('click', function(e) {
                e.stopPropagation()
            });
            $(document).click(function() {
                view.hide();
                obj.removeClass('cur')
            });
            var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var D = new Date(),
                Y = D.getFullYear(),
                M = D.getMonth();
            view.find('.year-input').html(Y);
            view.find('.month-input').html(M < 9 ? '0' + (M + 1) : M + 1);
            for (var i = 2000; i <= 2018; i++) {
                view.find('.year-list').append('<li>' + i + '</li>')
            }
            NewCalenda();
            view.find('.year-input').bind('click', function() {
                $(this).siblings('.year-list').toggle();
                $(this).toggleClass('cur')
            });
            view.find('.month-input').bind('click', function() {
                $(this).siblings('.month-list').toggle();
                $(this).toggleClass('cur')
            });
            view.find('.year-list li').bind('click', function(e) {
                view.find('.year-input').html($(this).html());
                view.find('.year-input').removeClass('cur');
                view.find('.year-list').hide();
                NewCalenda();
                e.stopPropagation()
            });
            view.find('.month-list li').bind('click', function(e) {
                view.find('.month-input').html($(this).html());
                view.find('.month-input').removeClass('cur');
                view.find('.month-list').hide();
                NewCalenda();
                e.stopPropagation()
            });
            view.find('a.pre-year').bind('click', function(e) {
                var y = view.find('.year-input').html();
                if (y == 2000) return false;
                view.find('.year-input').html(parseInt(y) - 1);
                NewCalenda();
                e.stopPropagation()
            });
            view.find('a.next-year').bind('click', function(e) {
                var y = view.find('.year-input').html();
                if (y == 2018) return false;
                view.find('.year-input').html(parseInt(y) + 1);
                NewCalenda();
                e.stopPropagation()
            });
            view.find('a.pre-month').bind('click', function(e) {
                var m = view.find('.month-input').html();
                if (parseInt(m) != 1) {
                    view.find('.month-input').html(parseInt(m) <= 10 ? '0' + (parseInt(m) - 1) : parseInt(m) - 1)
                } else {
                    view.find('.month-input').html(12);
                    view.find('.year-input').html(parseInt(view.find('.year-input').html()) - 1)
                }
                NewCalenda()
            });
            view.find('a.next-month').bind('click', function(e) {
                var m = view.find('.month-input').html();
                if (parseInt(m) != 12) {
                    view.find('.month-input').html(parseInt(m) < 9 ? '0' + (parseInt(m) + 1) : parseInt(m) + 1)
                } else {
                    view.find('.month-input').html('01');
                    view.find('.year-input').html(parseInt(view.find('.year-input').html()) + 1)
                }
                NewCalenda()
            });
            Obj.find('.pub-date-calenda span').bind('click', function() {
                if ($(this).html() == "") return;
                if (!$(this).hasClass("day")) return;
                var date = view.find('.year-input').html() + '-' + parseInt(view.find('.month-input').html()) + '-' + $(this).html();
                Obj.find('.time-text').html(date);
                view.hide();
                obj.toggleClass('cur')
            });

            function GetDay(datestr) {
                var date = new Date(datestr);
                return date.getDay()
            }

            function NewCalenda() {
                var _y = parseInt(view.find('.year-input').html());
                var _m = parseInt(view.find('.month-input').html());
                var _today = new Date();
                _today = _today.getFullYear() + "/" + (_today.getMonth() + 1) + "/" + _today.getDate();
                var now = (new Date(_today)).getTime(),
                    _this, _class = 'day';
                Obj.find('.pub-date-calenda span').html('').removeClass("day");
                var L = monthDays;
                if (_y % 4 == 0 && _y % 100 != 0 || _y % 400 == 0) {
                    L[1] = 29
                }
                var day1 = parseInt(GetDay(_y + '/' + _m + '/' + 1));
                var appoint = now;
                if (option.appoint) {
                    var tt = new Date(option.appoint),
                        _tt = tt.getFullYear() + "/" + (tt.getMonth() + 1) + "/" + tt.getDate();
                    appoint = (new Date(_tt)).getTime()
                }
                for (var i = 0; i < monthDays[parseInt(_m) - 1]; i++) {
                    if (!option.ableBeforeToday) {
                        _this = (new Date(_y + '/' + _m + '/' + (i + 1))).getTime();
                        _class = appoint > _this ? "" : "day"
                    }
                    view.find('.pub-date-calenda').find('span').eq(i + day1).html(i + 1).addClass(_class)
                }
            }
        });

        function DateModuleStr() {
            var str = "" + "   <div class='pub-date-input'>" + "		<div class='time-text'>" + GetDate() + "</div>" + "		<em class='pub-date-ico'></em>" + "	</div>" + "	<div class='pub-date-view'>" + "		<div class='pub-date-select'>" + "			<a class='pre-year'><b></b><b></b></a>" + "			<a class='pre-month'><b></b></a>" + "			<span class='date-now'>" + "				<div class='year-select'>" + "					<div class='year-input'>2014</div>" + "					<ul class='year-list'>" + "					</ul>" + "				</div>" + "				<div class='yyy'>年</div>" + "				<div class='month-select'>" + "					<div class='month-input'>03</div>" + "					<ul class='month-list'>" + "						<li>01</li><li>02</li><li>03</li><li>04</li>" + "						<li>05</li><li>06</li><li>07</li><li>08</li>" + "						<li>09</li><li>10</li><li>11</li><li>12</li>" + "					</ul>" + "				</div>" + "				<div class='mmm'>月</div>" + "			</span>" + "			<a class='next-month'><b></b></a>" + "			<a class='next-year'><b></b><b></b></a>" + "		</div>" + "		<div class='day-number'>" + "			<span>日</span> <span>一</span> <span>二</span> <span>三</span> <span>四</span> <span>五</span> <span>六</span>" + "		</div>" + "		<div class='pub-date-calenda'>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "			<span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>" + "		</div>" + "	</div>";
            return str;

            function GetDate() {
                if (Object.prototype.toString.call(option.appoint) == "[object Function]") {
                    if (option.before_after == 0) {
                        return option.appoint()
                    } else {
                        var date = new Date(),
                            y = date.getFullYear(),
                            m = date.getMonth(),
                            d = date.getDate(),
                            _val = option.before_after;
                        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                        if (_val > 0) {
                            if (d > monthDays[m] - _val) {
                                d = _val - monthDays[m] + d;
                                m = m + 1
                            } else {
                                d = d + _val
                            }
                        }
                        if (_val < 0) {
                            if (d <= Math.abs(_val)) {
                                d = monthDays[m - 1] + d + _val;
                                m = m - 1
                            } else {
                                d = d + _val
                            }
                        }
                        return (y + "-" + (m + 1) + "-" + d)
                    }
                } else {
                    return option.appoint
                }
            }
        }
    },
    center: function() {
        return $(this).css({
            "margin-left": $(this).width() * -0.5 + "px",
            "margin-top": ($(this).height() * -0.5) + "px"
        })
    },
    ShowViewPic: function(eType, className) {
        return $(this).each(function(index, element) {
            var view, list;
            $(this).children().each(function() {
                if ($(this).attr("class").indexOf('view') > 0) {
                    view = $(this)
                }
                if ($(this).attr("class").indexOf('list') > 0) {
                    list = $(this)
                }
            });
            $(list).find('li').bind(eType, function() {
                $(this).addClass(className).siblings().removeClass(className);
                view.find('img').attr("src", $(this).find('img').attr('src'))
            })
        })
    },
    Tab: function(eType, className) {
        return $(this).each(function(index, element) {
            var title, content;
            $(this).children().each(function() {
                if ($(this).attr("class").indexOf('title') > 0) {
                    title = $(this)
                }
                if ($(this).attr("class").indexOf('content') > 0) {
                    content = $(this)
                }
            });
            $(title).children().bind(eType, function() {
                $(this).addClass(className).siblings().removeClass(className);
                var index = $(this).index();
                content.children().hide();
                content.children().eq(index).show()
            })
        })
    },
    GetLessTime: function() {
        $(this).each(function(index, element) {
            var endtime = $(this).attr("endtime").replace(/-/g, "/");
            var tt = new Date(endtime);
            var obj = $(this).find("b");
            setInterval(function() {
                var _t = new Date(),
                    less = (tt - _t) / 1000;
                var one = 60 * 60 * 24;
                var d = Math.floor(less / one);
                var h = Math.floor((less - d * one) / 3600);
                var m = Math.floor((less - d * one - h * 3600) / 60);
                var s = Math.floor((less - d * one - h * 3600 - m * 60));
                obj.html("<s>" + d + "</s>天<s>" + h + "</s>时<s>" + m + "</s>分<s>" + s + "</s>秒")
            }, 1000)
        })
    },
    Slide: function(config) {
        $(this).each(function(index, element) {
            var mainCell = $(this).find(config.mainCell),
                viewCell = $(this).find(config.viewCell),
                autoPlay = config.autoPlay,
                delayTime = config.delayTime,
                speed = config.speed;
            viewCell.children().eq(0).addClass('on');
            var leng = mainCell.children().eq(0).width();
            mainCell.css("width", leng * mainCell.children().length + "px");

            function slideRoll() {
                var index = viewCell.find('.on').index();
                index = index == viewCell.children().length - 1 ? 0 : index + 1;
                viewCell.children().removeClass("on").eq(index).addClass("on");
                mainCell.stop().animate({
                    "left": leng * index * -1 + "px"
                }, speed)
            };
            var slideTimer = null;

            function BindTimer() {
                if (autoPlay) {
                    slideTimer = setInterval(function() {
                        slideRoll()
                    }, delayTime)
                }
            };
            BindTimer();
            viewCell.children().bind("mouseover", function() {
                clearInterval(slideTimer);
                slideTimer = null;
                $(this).addClass('on').siblings().removeClass('on');
                var ind = $(this).index();
                mainCell.stop().animate({
                    "left": leng * ind * -1 + "px"
                }, speed, BindTimer())
            });
            mainCell.bind("mouseover", function() {
                mainCell.stop(true, true);
                clearInterval(slideTimer);
                slideTimer = null
            });
            mainCell.bind("mouseout", function() {
                BindTimer()
            });
            if (config.leftCell) {
                var leftCell = $(this).find(config.leftCell),
                    rightCell = $(this).find(config.rightCell);
                leftCell.click(function() {
                    clearInterval(slideTimer);
                    var index = viewCell.find('.on').index();
                    index = index == 0 ? (viewCell.children().length - 1) : (index - 1);
                    viewCell.children().removeClass("on").eq(index).addClass("on");
                    mainCell.stop().animate({
                        "left": leng * index * -1 + "px"
                    }, speed, BindTimer())
                });
                rightCell.bind('click', function() {
                    clearInterval(slideTimer);
                    var index = viewCell.find('.on').index();
                    index = index == viewCell.children().length - 1 ? 0 : (index + 1);
                    viewCell.children().removeClass("on").eq(index).addClass("on");
                    mainCell.stop().animate({
                        "left": leng * index * -1 + "px"
                    }, speed, BindTimer())
                })
            }
        })
    }
});
NoticeTimer = null;
jQuery.notice = jQuery.prototype = function(string, delay, type, callback, bool) {
    var _string = string || "";
    var _delay = (typeof delay == "number" && delay > 3) ? delay : 10;
    var _type = delay ? delay : 1;
    if (typeof delay == "string") {
        _type = ["sucess", "warning", "error", "tip"].indexOf(delay) + 1
    };
    if (typeof delay == "number" && delay <= 3) {
        _type = delay
    };
    var _callback = callback || null,
        _bool = bool;
    ye_msg.open(_string, _delay, _type, _callback, _bool)
};
jQuery.layerBox = jQuery.prototype = function(title, content) {
    $.layerBoxClose();
    $(".cover-layer-bg").remove();
    var titlebox = title == '' ? "" : "<div class='jquery-layer-title'>" + title + "<a class='jquery-layer-close'></a></div>";
    var layerBg = "<div class='cover-layer-bg'></div>";
    var layer = "<div class='jquery-layer'>" + "	<div class='jquery-layer-bg'></div>" + "	<div class='jquery-layer-box'>" + titlebox + "		<div class='jquery-layer-content'>" + content + "		</div>" + "	</div>" + "</div>";
    $("body").append(layerBg + layer);
    $(".cover-layer-bg").css("height", $(document).height() + "px");
    $(".jquery-layer").last().center();
    if (navigator.appVersion.indexOf('MSIE 6.0') > -1) {
        $(".jquery-layer").last().css("position", "absolute")
    };
    $(".jquery-layer-close").bind('click', function() {
        $.layerBoxClose()
    })
};
jQuery.layerBoxClose = jQuery.prototype = function() {
    $(".jquery-layer").each(function() {
        if (!$(this).attr('id')) {
            $(this).remove()
        }
    });
    $(".cover-layer-bg").hide()
};
jQuery.layerShow = jQuery.prototype = function(ele) {
    var layerBg = "<div class='cover-layer-bg'></div>";
    $("body").append(layerBg);
    $(".cover-layer-bg").css("height", $(document).height() + "px");
    ele.show()
};
jQuery.layerClose = jQuery.prototype = function(ele) {
    ele.hide();
    $(".cover-layer-bg").hide()
};
jQuery.PaySuccess = jQuery.prototype = function(href) {
    var layerBg = "<div class='cover-layer-bg'></div>";
    var layer = "<div class='pay-success'>" + "<div class='pay-success-bg'></div>" + "<div class='pay-success-box'>" + "<div class='pay-success-title'>" + "<a class='close-pay-success'>X</a>" + "</div>" + "<div class='pay-success-content'>" + "<h3>恭喜您支付成功！！！</h3>" + "<p>立即选择服务网点，获得免费施工服务。</p>" + "<a class='pub-btn-middle-green' href='" + href + "'>马上就去</a>" + "</div>" + "</div>" + "</div>";
    $("body").append(layerBg + layer);
    $(".cover-layer-bg").css("height", $(document).height() + "px");
    $(".pay-success").center().css({
        "position": "fixed",
        "_position": "absolute"
    });
    $(".close-pay-success").bind('click', function() {
        $.layerBoxClose();
        $(".pay-success").remove()
    })
};
jQuery.DealSuccess = jQuery.prototype = function(number, code, href, member) {
    var layerBg = "<div class='cover-layer-bg'></div>";
    var layer = "<div class='deal-success'>" + "<div class='deal-success-bg'></div>" + "<div class='deal-success-box'>" + "<div class='deal-success-title'>" + "<a class='close-deal-success'>X</a>" + "</div>" + "<div class='deal-success-content'>" + "<h3>恭喜您交易成功！！！</h3>" + "<span class='sp1'><em></em><b></b>配件将由厂家发货，三日内直达服务商</span>" + "<p class='p1'>您将收到一条短信，包含以下内容，请在服务时出示您的短信。</p>" + "<em class='em1'>1、您的订单及验证码信息</em>" + "<em class='em1'>2、您选择的服务网点地址及联系方式</em>" + "<div class='number'>您的订单号是：<b>" + number + "</b></div>" + "<div class='code'>您的验证码是：<b>" + code + "</b></div>" + "<div class='btn'>" + "<a class='pub-btn-middle-green' href='" + member + "'>进入会员中心</a>" + "<a class='myorder' href='" + href + "'>查看我的订单</a>" + "</div>" + "<p class='bottom'>有任何疑问，请及时与我们取得联系 <em>400-0571-137</em></p>" + "</div>" + "</div>" + "</div>";
    $("body").append(layerBg + layer);
    $(".cover-layer-bg").css("height", $(document).height() + "px");
    $(".deal-success").center().css({
        "position": "fixed",
        "_position": "absolute"
    });
    $(".close-deal-success").bind('click', function() {
        $.layerBoxClose();
        $(".deal-success").remove()
    })
};
jQuery.GetRedPackSuccess = jQuery.prototype = function(name, yen, href) {
    var layerBg = "<div class='cover-layer-bg'></div>";
    var layer = "<div class='redpack-success'>" + "<div class='redpack-success-bg'></div>" + "<div class='redpack-success-box'>" + "<div class='redpack-success-title'>" + name + 　"，欢迎回来<a class='close-redpack-success'></a>" + "</div>" + "<div class='redpack-success-content'>" + "<h3>登陆成功！恭喜您获得<span><em>" + yen + "</em>元</span>红包</h3>" + "<div class='repack-tips'>* 小提示：红包结算时直接抵扣现金，每次限用一个！</div>" + "<div class='repack-btn'>" + "<a class='pub-btn-middle-orange'>我知道了</a>" + "<a class='check-my-redpack' href='" + href + "'>立即查看我的红包 >></a>" + "</div>" + "</div>" + "</div>" + "</div>";
    $("body").append(layerBg + layer);
    $(".cover-layer-bg").css("height", $(document).height() + "px");
    $(".redpack-success").center().css({
        "position": "fixed",
        "_position": "absolute"
    });
    $(".close-redpack-success").bind('click', function() {
        $.layerBoxClose();
        $(".redpack-success").remove()
    });
    $(".repack-btn .pub-btn-middle-orange").bind('click', function() {
        $.layerBoxClose();
        $(".redpack-success").remove()
    })
};
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $(".rightnav_top").fadeIn(500);
            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                $('.rightnav_top').hide()
            }
        } else {
            $(".rightnav_top").fadeOut(500)
        }
    });
    var _rightnav_tip = $('#rightnav .rightnav_tip');
    var _big = $('#rightnav .big');
    _rightnav_tip.hover(function() {
        var _index = $(this).index();
        _big.attr("class", "big");
        if (_index) {
            _big.addClass('big_icon' + _index)
        } else {
            _big.removeClass('big_icon')
        }
        _big.show()
    }, function() {
        _big.hide()
    });
    $("#rightnav .rightnav_top").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 50);
        return false
    });
    $('#search_imglist li,#pub_imglist li').live('mouseover', function() {
        $(this).children('a').show()
    });
    $('#search_imglist li,#pub_imglist li').live('mouseout', function() {
        $(this).children('a').hide()
    })
});
$(function() {
    $("input[name=quick_search_sp]").focus(function() {
        if ($(this).val() == "年中大促，汽车服务3折起！") {
            $(this).val("")
        }
    });
    $("input[name=quick_search_sp]").blur(function() {
        if ($(this).val() == "") {
            $(this).val("年中大促，汽车服务3折起！")
        }
    });

    function CountRoll(num) {
        if (!num) {
            return
        }
        var obj = $(".change-by-mobile .count span").not(".douhao");
        obj.eq(obj.length - num.length).prevAll("span").hide();
        var _obj = obj.eq(obj.length - num.length - 1).nextAll("span:not('.douhao')");
        var length = _obj.length;
        for (var i = 0; i < length; i++) {
            _obj.eq(i).addClass("to" + num.charAt(i))
        }
    }
    if ($(".change-by-mobile .count").length) {
        CountRoll($(".change-by-mobile .count").attr("data-count"))
    }
    var _nav_category = $('#nav_category');
    var _nav_category_list_li = $('.nav_category_list li');
    var _nav_cate_item = $('.nav_cate_item');
    _nav_category_list_li.bind("mouseenter", function() {
        _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        _nav_cate_item.eq(_index).addClass('cur').siblings().removeClass('cur')
    });
    _nav_category.hover(function() {
        _nav_category.addClass('nav_cate_hover')
    }, function() {
        _nav_category.removeClass('nav_cate_hover')
    });
    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    if (ie6) {
        $('#tipIE6').html("<div class='tipIE6'>您现在使用的浏览器版本过低，可能会导致部分图片和信息的缺失。请立即<a href='http://www.microsoft.com/china/windows/IE/upgrade/index.aspx' target='_blank'>免费升级</a>或下载使用<a href='http://www.google.cn/intl/zh-CN/chrome/browser/' target='_blank'>谷歌浏览器</a>， 安全更放心！</div>")
    }
});
var clickDmo = ".pop_tip em,.pop_tip i";
$(document).delegate(clickDmo, 'click', function() {
    var _pop_tipEm = $('.pop_tip em');
    if (_pop_tipEm.hasClass('click')) {
        _pop_tipEm.removeClass('click');
        _pop_tipEm.siblings('input[name=autologin]').val(0)
    } else {
        _pop_tipEm.addClass('click');
        _pop_tipEm.siblings('input[name=autologin]').val(1)
    }
}).delegate('.pop_inputli', 'focusin', function() {
    if ($(this).hasClass('pop_err')) {
        $(this).removeClass('pop_err')
    }
    var _pop_info = $(this).parent().find('.pop_info');
    if (_pop_info.is(":visible")) {
        _pop_info.fadeOut(100)
    }
});
(function($) {
    $.Placeholder = {
        settings: {
            color: "rgb(169,169,169)",
            dataName: "original-font-color"
        },
        init: function(settings) {
            if (settings) {
                $.extend($.Placeholder.settings, settings)
            }
            var getContent = function(element) {
                return $(element).val()
            };
            var setContent = function(element, content) {
                $(element).val(content)
            };
            var getPlaceholder = function(element) {
                return $(element).attr("placeholder-text")
            };
            var isContentEmpty = function(element) {
                var content = getContent(element);
                return (content.length === 0) || content == getPlaceholder(element)
            };
            var setPlaceholderStyle = function(element) {
                $(element).data($.Placeholder.settings.dataName, $(element).css("color"));
                $(element).css("color", $.Placeholder.settings.color)
            };
            var clearPlaceholderStyle = function(element) {
                $(element).css("color", 'rgb(51,51,51)');
                $(element).removeData($.Placeholder.settings.dataName)
            };
            var showPlaceholder = function(element) {
                setContent(element, getPlaceholder(element));
                setPlaceholderStyle(element)
            };
            var hidePlaceholder = function(element) {
                if ($(element).data($.Placeholder.settings.dataName)) {
                    setContent(element, "");
                    clearPlaceholderStyle(element)
                }
            };
            var inputFocused = function() {
                if (isContentEmpty(this)) {
                    hidePlaceholder(this)
                }
            };
            var inputBlurred = function() {
                if (isContentEmpty(this)) {
                    showPlaceholder(this)
                }
            };
            var parentFormSubmitted = function() {
                if (isContentEmpty(this)) {
                    hidePlaceholder(this)
                }
            };
            $("textarea").add("input[type='text']").each(function(index, element) {
                if ($(element).attr("placeholder-text")) {
                    $(element).focus(inputFocused);
                    $(element).blur(inputBlurred);
                    $(element).bind("parentformsubmitted", parentFormSubmitted);
                    $(element).trigger("blur");
                    $(element).parents("form").submit(function() {
                        $(element).trigger("parentformsubmitted")
                    })
                }
            });
            return this
        },
        cleanBeforeSubmit: function(theForm) {
            if (!theForm) {
                theForm = $("form")
            }
            $(theForm).find("textarea, input[type='text']").trigger("parentformsubmitted");
            return theForm
        }
    }
})(jQuery);
$(function() {
    $.Placeholder.init({
        color: "rgb(141,141,141)"
    })
});
$.fn.initValidform = function() {
    var checkValidform = function(formObj) {
        $(formObj).Validform({
            tiptype: function(msg, o, cssctl) {
                if (!o.obj.is("form")) {
                    if (o.obj.is(o.curform.find(".Validform_error:first"))) {
                        var tabobj = o.obj.parents(".tab-content");
                        var tabindex = $(".tab-content").index(tabobj);
                        if (!$(".content-tab ul li").eq(tabindex).children("a").hasClass("selected")) {
                            $(".content-tab ul li a").removeClass("selected");
                            $(".content-tab ul li").eq(tabindex).children("a").addClass("selected");
                            $(".tab-content").hide();
                            tabobj.show()
                        }
                    }
                    if (o.obj.parents("td").find(".Validform_checktip").length == 0) {
                        o.obj.parents("td").append("<span class='Validform_checktip' />");
                        o.obj.parents("td").next().find(".Validform_checktip").remove()
                    }
                    var objtip = o.obj.parents("td").find(".Validform_checktip");
                    cssctl(objtip, o.type);
                    objtip.text(msg)
                }
            },
            showAllError: true
        })
    };
    return $(this).each(function() {
        checkValidform($(this))
    })
};

function AjaxInitForm(formId, btnId, isDialog, urlId) {
    var formObj = $('#' + formId);
    var btnObj = $("#" + btnId);
    var urlObj = $("#" + urlId);
    formObj.Validform({
        tiptype: function(msg, o, cssctl) {
            if (!o.obj.is("form")) {
                var objtip = o.obj.parents(".pop_inputli");
                var errinfo = o.obj.parents().parents().find('.pop_info');
                if (o.type == 2) {
                    objtip.removeClass('pop_err')
                } else {
                    objtip.addClass('pop_err');
                    errinfo.text(msg).fadeIn(500)
                }
            }
        },
        callback: function(form) {
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: formObj.attr("url"),
                type: "post",
                dataType: "json",
                timeout: 60000
            });
            return false
        }
    });

    function formRequest(formData, jqForm, options) {
        btnObj.prop("disabled", true);
        btnObj.val("提交中...")
    }

    function formResponse(data, textStatus) {
        if (!data.errCode) {
            $('input[name=bag_contact], input[name=contact]').val(data.username);
            $('input[name=mobile], input[name=phone]').val(data.mobile);
            $('input[name=car_model]').val(data.car_model);
            if (data.login_action) {
                $.notice('登录成功')
            } else {
                $.notice('注册成功')
            }
            $.colorbox.close();
            if ($('.pub-top-link').length) {
                $('.pub-top-link li:eq(1)').html('<a class="login" href="' + urlCmy('login', 'index') + '">' + data.name + '</a>');
                $('.pub-top-link li:eq(2)').html('<a href="' + urlCmy('login', 'logOut') + '">退出</a>')
            }
            btnObj.val("提交成功")
        } else {
            var errMsg = '';
            if ($('#pop_login:visible').length) {
                if (data.errCode == 1) {
                    errMsg = '用户名不存在'
                } else if (data.errCode == 2) {
                    errMsg = '密码错误'
                }
            } else {
                if (data.errCode == 1) {
                    errMsg = '该手机已经被注册过'
                } else if (data.errCode == 2) {
                    errMsg = '数据添加失败'
                } else if (data.errCode == 3) {
                    errMsg = '手机号不合法'
                }
            }
            var errinfo = $('.pop_info');
            errinfo.text(errMsg).fadeIn(500);
            btnObj.prop("disabled", false);
            btnObj.val("再次提交")
        }
    }

    function formError(XMLHttpRequest, textStatus, errorThrown) {
        btnObj.prop("disabled", false);
        btnObj.val("再次提交")
    }
}
$.fn.ruleMultiCheckbox = function() {
    var multiCheckbox = function(parentObj) {
        parentObj.addClass("multi-checkbox");
        parentObj.children().hide();
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj);
        parentObj.find(":checkbox").each(function() {
            var indexNum = parentObj.find(":checkbox").index(this);
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj);
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected")
            }
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return
            }
            $(newObj).click(function() {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected")
                } else {
                    $(this).addClass("selected")
                }
                parentObj.find(':checkbox').eq(indexNum).trigger("click")
            })
        })
    };
    return $(this).each(function() {
        multiCheckbox($(this))
    })
};
$.fn.ruleMultiRadio = function() {
    var multiRadio = function(parentObj) {
        parentObj.addClass("multi-radio");
        parentObj.children().hide();
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj);
        parentObj.find('input[type="radio"]').each(function() {
            var indexNum = parentObj.find('input[type="radio"]').index(this);
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj);
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected")
            }
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return
            }
            $(newObj).click(function() {
                $(this).siblings().removeClass("selected");
                $(this).addClass("selected");
                parentObj.find('input[type="radio"]').prop("checked", false);
                console.log(indexNum);
                parentObj.find('input[type="radio"]').eq(indexNum).prop("checked", true);
                parentObj.find('input[type="radio"]').eq(indexNum).trigger("click")
            })
        })
    };
    return $(this).each(function() {
        multiRadio($(this))
    })
};
$.fn.ruleSingleSelect = function() {
    var singleSelect = function(parentObj) {
        parentObj.addClass("single-select");
        parentObj.children().hide();
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj);
        var titObj = $('<a class="select-tit" href="javascript:;"><span></span><i></i></a>').appendTo(divObj);
        var itemObj = $('<div class="select-items"><ul></ul></div>').appendTo(divObj);
        var arrowObj = $('<i class="arrow"></i>').appendTo(divObj);
        var selectObj = parentObj.find("select").eq(0);
        selectObj.find("option").each(function(i) {
            var indexNum = selectObj.find("option").index(this);
            var liObj = $('<li>' + $(this).text() + '</li>').appendTo(itemObj.find("ul"));
            if ($(this).prop("selected") == true) {
                liObj.addClass("selected");
                titObj.find("span").text($(this).text())
            }
            if ($(this).prop("disabled") == true) {
                liObj.css("cursor", "default");
                return
            }
            liObj.click(function() {
                $(this).siblings().removeClass("selected");
                $(this).addClass("selected");
                selectObj.find("option").prop("selected", false);
                selectObj.find("option").eq(indexNum).prop("selected", true);
                titObj.find("span").text($(this).text());
                arrowObj.hide();
                itemObj.hide();
                selectObj.trigger("change")
            })
        });
        if (selectObj.prop("disabled") == true) {
            titObj.css("cursor", "default");
            return
        }
        titObj.click(function(e) {
            e.stopPropagation();
            if (itemObj.is(":hidden")) {
                $(".single-select .select-items").hide();
                $(".single-select .arrow").hide();
                arrowObj.css("z-index", "1");
                itemObj.css("z-index", "1");
                arrowObj.show();
                itemObj.show()
            } else {
                arrowObj.css("z-index", "");
                itemObj.css("z-index", "");
                arrowObj.hide();
                itemObj.hide()
            }
        });
        $(document).click(function(e) {
            selectObj.trigger("blur");
            arrowObj.hide();
            itemObj.hide()
        })
    };
    return $(this).each(function() {
        singleSelect($(this))
    })
};
$(function() {
    $(".rule-single-select").ruleSingleSelect();
    $(".rule-multi-checkbox").ruleMultiCheckbox();
    $(".cmy-multi-radio").ruleMultiRadio();
    $(".cmy_linkbutton").linkbutton();
    $('.pub_submit').hover(function() {
        $(this).addClass('pub_submit_hover')
    }, function() {
        $(this).removeClass('pub_submit_hover')
    });
    $("img.lazy").lazyload({
        threshold: 200,
        effect: "fadeIn",
        skip_invisible: false,
        failurelimit: 5
    })
});
$.fn.linkbutton = function() {
    var _original = $(this).html();
    var _html = "<span class='l-btn-left'><span class='l-btn-text'>" + _original + "</span></span>";
    $(this).addClass("lbt_btn");
    $(this).html(_html)
};
$(function() {
    $("#Login").click(function() {
        $(this).colorbox({
            inline: true,
            href: "#formLoginRegis"
        });
        setTimeout(function() {
            $(".formLoginRegis-tab span").eq(0).trigger("click")
        }, 500)
    });
    $("#Register").click(function() {
        $(this).colorbox({
            inline: true,
            href: "#formLoginRegis"
        });
        setTimeout(function() {
            $(".formLoginRegis-tab span").eq(1).trigger("click")
        }, 500)
    });
    $(".formLoginRegis-tab span").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
        var index = $(this).index();
        $(".formLoginRegis-box").css("margin-left", $(this).index() * -372 + "px");
        $(".formLoginRegis-tab-bg").css({
            "left": $(this).index() * 136 + 50 + "px"
        })
    });
    $(".formLoginRegis-box input[type=text]").focus(function() {
        $(this).parents(".inputbox").addClass("focus").removeClass("error");
        if ($(this).val() == $(this).attr("normal") || $(this).val() == $(this).attr("tip") || $(this).val() == $(this).attr("error")) {
            $(this).val("")
        }
        if ($(this).attr("name") == "formLoginPsw") {
            $(this).hide().siblings("input[type=password]").show().focus().val("")
        }
    });
    $(".formLoginRegis-box input[type=text]").blur(function() {
        $(this).parents(".inputbox").removeClass("focus");
        if ($(this).val() == "") {
            $(this).val($(this).attr("normal"))
        }
    });
    $(".formLoginRegis-box input[type=password]").blur(function() {
        $(this).parents(".inputbox").removeClass("focus");
        if ($(this).val() == "") {
            $(this).hide().siblings("input[type=text]").show()
        }
    });
    $(".form-Login em").click(function() {
        $(this).toggleClass("cur");
        var obj = $(this).find("input[type=checkbox]");
        var checked = obj.attr("checked");
        if (checked) {
            obj.removeAttr("checked")
        } else {
            obj.attr("checked", "checked")
        }
    });
    $(".form-Login .remember span.fl").click(function() {
        $(".form-Login em").trigger("click")
    });
    $(".form-Regis em").click(function() {
        $(this).toggleClass("cur");
        var obj = $(this).find("input[type=checkbox]");
        var checked = obj.attr("checked");
        if (checked) {
            obj.removeAttr("checked")
        } else {
            obj.attr("checked", "checked")
        }
    });
    $(".formLoginRegis-box .inputbox i").click(function() {
        $(this).parents(".inputbox").removeClass("error")
    });
    TestAndVerify("Login", TestAndVerifyCallback);
    TestAndVerify("Regis", TestAndVerifyCallback);
    $("#LoginOut").click(function() {
        $.ajax({
            type: "POST",
            url: "/login/logOut.html",
            success: function() {
                TopLoginOut();
                if ($(".main_loginbox").length > 0) {
                    IndexLoginOut()
                }
            }
        })
    });
    $('#formLoginRegis input').bind('keyup', function(e) {
        if (e.which == 13) {
            $('#formLoginRegis button').trigger("click")
        }
    })
});

function TestAndVerifyCallback(objjson) {
    $("#cboxClose").show();
    AjaxRefreshHead(objjson);
    if ($(".main_loginbox").length > 0) {
        AjaxRefreshIndexUser(objjson)
    }
    if ($('.car_info').find('h5').length > 0) {
        $('.car_info').find('h5').text(objjson.carBrand);
        $('.car_info').find('font').remove();
        $(".choose_car_model_btn").before(objjson.carType ? "<font>" + objjson.carType + "</font>" : "")
    }
    if ($('.car_logo').find('img').length > 0) {
        $('.car_logo').find('img').attr('src', objjson.carImg)
    }
    if ($('.tenance-recommend-link').length > 0) {
        $(".tenance-recommend-link").click()
    }
};

function AjaxRefreshHead(objjson) {
    $("a.welcome").html("您好");
    $(".login").hide().next().hide();
    var info = "<a class='login login_user' href='/member/index.htm' phone='" + objjson.mobile + "'>" + objjson.username + "</a>&nbsp;";
    if (objjson.roleid > 0) {
        info += "<a><img src='http://" + document.domain.replace("www", "img") + "/version63/common/vip.png'/></a>"
    }
    info += "<a href='http://" + document.domain + "/login/logOut.html'>退出</a>";
    $(".com_top_l").append(info);
    if ($('.gj_item1a').length > 0) {
        window.location.reload()
    }
};

function AjaxRefreshIndexUser(objjson) {
    $(".main_alreadyLogin").removeClass("hide");
    $(".main_unLogin").addClass("hide");
    var mainbox = $(".main_alreadyLogin");
    mainbox.find("img").attr("src", objjson.userPhoto);
    mainbox.find(".info b").html(objjson.username)
};

function TestAndVerify(elename, callback) {
    return $(".form" + elename + "Btn").bind('click', function() {
        var obj = $(this).parents(".formBox"),
            user = obj.find("input[name=form" + elename + "User]"),
            password = obj.find("input[name='form" + elename + "Psw']"),
            password_obj = elename == "Login" ? obj.find("input[type=password]") : password;
        name = user.val(), psw = password_obj.val(), cookie_time = false;
        var reg = /^1[34578]\d{9}$/;
        if (name == "" || !reg.test(name)) {
            user.val(user.attr("tip")).blur().parent().addClass("error");
            return
        };
        if (psw == "" || psw == password.attr("normal") || psw == password.attr("tip") || psw == password.attr("error")) {
            password.val(password.attr("tip")).blur().parent().addClass("error");
            return
        };
        if (elename == "Regis" && psw.length < 6) {
            password.val(password.attr("error")).parent().addClass("error");
            return
        };
        if (elename == "Regis" && !obj.find("input[type=checkbox]").attr("checked")) {
            $.notice("请接受用户协议", 3);
            return
        }
        var post_url = elename == "Login" ? "/login/doLogin.htm" : "/register/doRegister.htm";
        if (elename == "Login" && obj.find("input[type=checkbox]").attr("checked")) {
            cookie_time = true
        };
        var dataParm = elename == "Login" ? {
            login_user: name,
            login_pwd: psw,
            cookie_time: cookie_time
        } : {
            register_mobile: name,
            register_pwd: psw
        };
        $.ajax({
            type: "POST",
            async: true,
            data: dataParm,
            dataType: "json",
            url: post_url,
            success: function(json) {
                isLoginPage();
                var objson = json;
                if (objson.errCode) {
                    if (objson.errCode == 1) {
                        user.val(user.attr("error")).parent().addClass("error")
                    };
                    if (objson.errCode == 2) {
                        if (elename == "Regis") {
                            alert("注册失败");
                            return
                        };
                        if (elename == "Login") {
                            password.show().siblings("input[type=password]").hide().val("")
                        }
                        password.val(password.attr("error")).parent().addClass("error")
                    };
                    if (objson.errCode == 3) {
                        user.val(user.attr("tip")).parent().addClass("error")
                    }
                } else {
                	console.log("objson"+objson);
                    callback(objson);
                    var saveCarModel = $('#save_car_model').val();
                    if (saveCarModel == '1') {
                        saveMemberCarModel(true)
                    }
                    $("#cboxClose").trigger("click")
                }
            }
        })
    })
};

function TopLoginOut() {
    $(".alreadylogin").addClass("hide");
    $(".unlogin").removeClass("hide");
    $(".alreadylogin .login").html("");
    $(".top-select-car-type").html("选择车型").siblings("font").remove();
    $(".buycar-count").html(0)
};

function IndexLoginOut() {
    $(".main_alreadyLogin").addClass("hide");
    $(".main_unLogin").removeClass("hide");
    $('.front_user').val("").siblings("i").show();
    $('.front_pwd').val("").siblings("i").show();
    var obj1 = $('.front_user').siblings("i");
    obj1.find("em").html(obj1.attr("normal"));
    var obj2 = $('.front_pwd').siblings("i");
    obj2.find("em").html(obj2.attr("normal"))
};

function isLoginPage() {
    var href = location.href;
    if (href.split(document.domain)[1].indexOf("/login/index.htm") >= 0) {
        location.href = "http://" + document.domain
    }
}