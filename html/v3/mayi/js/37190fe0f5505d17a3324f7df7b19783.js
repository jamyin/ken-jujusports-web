$(function() {
    $('#servicebox .main_service_tit li').on('click', function() {
        var _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#servicebox table').hide();
        $('#servicebox table').eq(_index).show()
    });
    $('#hot_baoyang .main_service_tit li').live('click', function() {
        var _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#hot_baoyang table').hide();
        $('#hot_baoyang table').eq(_index).show()
    });
    $('#shopbox .main_service_tit li').on('click', function() {
        var _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#shopbox table').hide();
        $('#shopbox table').eq(_index).show()
    });
    $('#by_taocan .main_service_tit li').on('click', function() {
        var _index = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#by_taocan table').hide();
        $('#by_taocan table').eq(_index).show()
    });
    $('.mr_toppro_con .pro_checkbox').live('click', function() {
        var totalPrice = parseInt($('.detect_total_price').text());
        var price = $(this).next().find('span').text();
        price = parseInt(price.match(/[\d\.]+/).toString());
        if ($(this).hasClass("pro_checkbox_select")) {
            $(this).removeClass("pro_checkbox_select");
            totalPrice -= price
        } else {
            $(this).addClass("pro_checkbox_select");
            totalPrice += price
        } if ($('.mr_toppro_con .pro_checkbox_select').length == 0) {
            $(".mr_top_probox_btn .a_org_big").addClass("a_gray_big").removeAttr("onclick")
        } else {
            $(".mr_top_probox_btn .a_org_big").removeClass("a_gray_big").attr("onclick", "addToCart();")
        }
        $('.detect_total_price').html(totalPrice)
    });
    focusImg();
    checkBaoyang();
    baoyangFrom();
    proItem();
    checkedDel();
    checkWeixiu();
    weixiuFrom();
    tab_item_hotservicy();
    tab_item_baoyang();
    tab_item_tejia();
    tab_item_taocan()
});

function tab_item_taocan() {
    var sWidth = $(".by_taocan_con").width();
    var len = $(".by_taocan_con table").length;
    var index = 0;
    var picTimer;
    $(".by_taocan_con .by_taocan_big").css("width", sWidth * (len));
    $("#by_tc li").click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        index = $(this).index();
        if (index == len) {
            index = 0
        }
        showPics(index)
    });

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $(".by_taocan_con .by_taocan_big").stop(true, false).animate({
            "left": nowLeft
        }, 300)
    }
};

function tab_item_tejia() {
    var sWidth = $(".tab_boxMain3").width();
    var len = $(".tab_boxMain3 ul li").length;
    var index = 0;
    var picTimer;
    $(".tab_boxMain3 ul").css("width", sWidth * (len));
    $("#main_mytj li").click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        index = $(this).index();
        if (index == len) {
            index = 0
        }
        $('.tab_box_ul3').find('img').lazyload({
            event: 'sporty'
        }).trigger('sporty');
        showPics(index)
    });

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $(".tab_boxMain3 ul").stop(true, false).animate({
            "left": nowLeft
        }, 300)
    }
};

function tab_item_baoyang() {
    var sWidth = $(".tab_boxMain2").width();
    var len = $(".tab_boxMain2 ul li").length;
    var index = 0;
    var picTimer;
    $(".tab_boxMain2 ul").css("width", sWidth * (len));
    $("#main_hotbaoyang li").click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        index = $(this).index();
        if (index == len) {
            index = 0
        }
        showPics(index)
    });

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $(".tab_boxMain2 ul").stop(true, false).animate({
            "left": nowLeft
        }, 300)
    }
};

function tab_item_hotservicy() {
    var sWidth = $(".tab_boxMain").width();
    var len = $(".tab_boxMain ul li").length;
    var index = 0;
    var picTimer;
    $(".tab_boxMain ul").css("width", sWidth * (len));
    $("#main_jpfw li").click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        index = $(this).index();
        if (index == len) {
            index = 0
        }
        showPics(index)
    });

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $(".tab_boxMain ul").stop(true, false).animate({
            "left": nowLeft
        }, 300)
    }
};

function proItem() {
    var _htmlLi = "";
    $('.probigbox .pro_litit_l span').on('click', function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parent().siblings().find('em').html(0);
            totalNum();
            $(this).parent().parent().siblings('.pro_ul').find('li .pro_licheck').removeClass('pro_licheckon');
            var _ischeckBox = $(this).parent().parent().siblings('.pro_ul').find('li .pro_licheck').hasClass('pro_licheckbox');
            if (_ischeckBox) {
                var _checkLi = $(this).parent().parent().siblings('.pro_ul').find('li');
                for (var i = 0; i < _checkLi.length; i++) {
                    var cid = _checkLi.eq(i).data('id');
                    checkedBoxHtml(cid, '')
                }
            } else {
                checkedBoxHtml($(this).parent().parent().siblings('.pro_ul').data('id'), "")
            }; if ($(this).parent().parent().siblings('.pro_ul').data('id') == 1) {
                $('#baoyangBox').hide()
            };
            if ($(this).parent().parent().siblings('.pro_ul').find('li span').hasClass('nodata')) {
                $('#pro_btnbox').find(".pro_btnTip").hide()
            }
        } else {
            $(this).addClass('on');
            $(this).parent().parent().siblings('.pro_ul').find('li .pro_licheck').eq(0).trigger("click");
            if ($(this).parent().parent().siblings('.pro_ul').data('id') == 1) {
                $('#baoyangBox').show()
            };
            if ($(this).parent().parent().siblings('.pro_ul').find('li span').hasClass('nodata')) {
                addNoData($(this).parent().parent().siblings('.pro_ul').data('id'), this);
                $('#pro_btnbox').find(".pro_btnTip").show();
                $('#pro_btnbox').find(".lbt_btn").removeClass('a_org_big').addClass('a_gray_big')
            }
        }
    });
    $('.probigbox .pro_licheck').on('click', function() {
        $(this).parents(".probigbox").find(".pro_litit_l span").addClass("on");
        var _childLi = $(this).parent().parent().find('li');
        var titleSpan = $(this).parent().parent().siblings('.pro_litit').find('.pro_litit_l span');
        var flag = titleSpan.hasClass('on');
        var _parentLi = $(this).parent();
        var _curID = _parentLi.parent().data("id");
        var _checkedBox = $('#pro_itemrbox');
        if (flag) {
            if ($(this).hasClass('pro_licheckon')) {
                $(this).removeClass('pro_licheckon');
                var _ul = $(this).parents("ul");
                if (_ul.find("li .pro_licheckon").length == 0) {
                    titleSpan.removeClass("on")
                }
                if ($(this).hasClass('pro_licheckbox')) {
                    _curID = $(this).parent().data('id');
                    $(this).parent().parent().parent().find('.pro_litit_r em').html(checkboxPrice($(this)));
                    totalNum()
                } else {
                    $(this).parent().parent().parent().find('.pro_litit_r em').html(0);
                    totalNum()
                };
                checkedBoxHtml(_curID, "")
            } else {
                if ($(this).hasClass('pro_licheckbox')) {
                    _curID = $(this).parent().data('id');
                    $(this).addClass('pro_licheckon')
                } else {
                    _childLi.find('.pro_licheck').removeClass('pro_licheckon');
                    $(this).addClass('pro_licheckon')
                };
                var _price = $(this).parent().find('.pro_lir_num em').html();
                if ($(this).hasClass('pro_licheckbox')) {
                    $(this).parent().parent().parent().find('.pro_litit_r em').html(checkboxPrice($(this)));
                    totalNum()
                } else {
                    $(this).parent().parent().siblings('.pro_litit').find('.pro_litit_r em').html(_price);
                    totalNum()
                };
                var _parHtml = $(this).parent().parent().parent().find('.pro_litit_l em').html();
                var _curHtml = $(this).siblings('.pro_litext1').html();
                var _itemID = $(this).data('id');
                _htmlLi = "<div class='pro_itemr_li' data-id='" + _curID + "'>";
                _htmlLi += "<div class='pro_item_li_tit'>" + _parHtml + "&nbsp;&nbsp;" + _curHtml + "</div>";
                _htmlLi += "<div class='icon_com pro_item_li_del'" + "data-id=" + _itemID + "><a href='javascript:'>删除</a></div></div>";
                checkedBoxHtml(_curID, _htmlLi)
            }
        }
    })
};

function checkboxPrice(cur) {
    var _pro_licheckboxLl = cur.parent().parent().find('li');
    var _checkTotal = Number(0);
    for (var i = 0; i < _pro_licheckboxLl.length; i++) {
        var flag = _pro_licheckboxLl.eq(i).find('.pro_licheckbox').hasClass('pro_licheckon');
        if (flag) {
            _checkTotal += Number(_pro_licheckboxLl.eq(i).find('.pro_lir_num em').html())
        }
    };
    return _checkTotal.toFixed(2)
};

function addNoData(a, b) {
    var _parHtml = $(b).siblings('em').html();
    var _curHtml = "暂无报价";
    _htmlLi = "<div class='pro_itemr_li' data-id='" + a + "'>";
    _htmlLi += "<div class='pro_item_li_tit'>" + _parHtml + "&nbsp;&nbsp;" + _curHtml + "</div>";
    _htmlLi += "<div class='icon_com pro_item_li_del'" + "data-id=" + a + "><a href='javascript:'>删除</a></div></div>";
    checkedBoxHtml(a, _htmlLi)
}

function totalNum() {
    var _probigbox = $('.probigbox');
    var totalNum = Number(0);
    for (var i = 0; i < _probigbox.length; i++) {
        totalNum += Number(_probigbox.eq(i).find('.pro_litit_r em').html())
    };
    totalNum = totalNum.toFixed(2);
    if (totalNum > 0) {
        if ($('#pro_btnbox').find(".lbt_btn").hasClass('a_gray_big')) {
            $('#pro_btnbox').find(".lbt_btn").removeClass('a_gray_big').addClass('a_org_big')
        }
    } else {
        $('#pro_btnbox').find(".lbt_btn").removeClass('a_org_big').addClass('a_gray_big')
    }
    $(".pro_total span").html(totalNum)
};

function checkedDel() {
    var _checkedBoxli = $('#pro_itemrbox .pro_item_li_del');
    _checkedBoxli.live('click', function() {
        $(this).parent().remove();
        var _pro_licheck = $('.pro_licheck');
        var _check_ul = $('.pro_ul');
        var _checkData = $(this).data('id');
        for (var i = 0; i < _pro_licheck.length; i++) {
            if (_pro_licheck.eq(i).data('id') == _checkData) {
                _pro_licheck.eq(i).trigger('click')
            }
        };
        for (var j = 0; j < _check_ul.length; j++) {
            if (_check_ul.eq(j).data('id') == _checkData) {
                $($(_check_ul.eq(j)).parent().find('.fl span')).removeClass("on")
            }
        }
    })
}

function checkedBoxHtml(cid, con) {
    var _checkedBox = $('#pro_itemrbox');
    var _checkedBoxLi = _checkedBox.find(".pro_itemr_li");
    var _checkedBoxLiLen = _checkedBox.find(".pro_itemr_li").length;
    if (_checkedBoxLiLen > 0) {
        var conFlag = true;
        for (var i = 0; i < _checkedBoxLiLen; i++) {
            if (cid == _checkedBoxLi.eq(i).data('id')) {
                _checkedBoxLi.eq(i).remove();
                _checkedBox.append(con);
                conFlag = false;
                return ""
            }
        };
        if (conFlag) {
            _checkedBox.append(con)
        }
    } else {
        _checkedBox.append(con)
    }
};

function focusImg() {
    var sWidth = $("#focus").width();
    $("#focus ul li").width(sWidth);
    var len = $("#focus ul li").length;
    var index = 0;
    var picTimer;
    var btn = "<div class='btnBg'></div><div class='btn'>";
    for (var i = 0; i < len; i++) {
        j = i + 1;
        btn += "<span>" + j + "</span>"
    };
    btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
    $("#focus").append(btn);
    $("#focus .btn span").mouseenter(function() {
        index = $("#focus .btn span").index(this);
        showPics(index)
    }).eq(0).trigger("mouseenter");
    $("#focus .preNext").css("opacity", 0.2).hover(function() {
        $(this).stop(true, false).animate({
            "opacity": "0.9"
        }, 300)
    }, function() {
        $(this).stop(true, false).animate({
            "opacity": "0.4"
        }, 300)
    });
    $("#focus .pre").click(function() {
        index -= 1;
        if (index == -1) {
            index = len - 1
        }
        showPics(index)
    });
    $("#focus .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0
        }
        showPics(index)
    });
    $("#focus ul").css("width", sWidth * (len));
    $("#focus").hover(function() {
        clearInterval(picTimer)
    }, function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if (index == len) {
                index = 0
            }
        }, 4000)
    }).trigger("mouseleave");

    function showPics(index) {
        var nowLeft = -index * sWidth;
        $("#focus ul").stop(true, false).animate({
            "left": nowLeft
        }, 300);
        $("#focus .btn span").stop(true, false).removeClass('on').eq(index).stop(true, false).addClass('on')
    }
};

function checkBaoyang() {
    var _lichengNum = $('#lichengNum');
    var _lichengTip = $('#lichengTip');
    _lichengNum.bind('blur', function() {
        if (isNaN(_lichengNum.val())) {
            _lichengTip.html("里程数请 ≥1 且 ≤ 600000").show();
            setTimeout(function() {
                _lichengTip.hide()
            }, 1000)
        }
    });
    $('#byear,#bmonth').change(function() {
        var _curVal = $(this).val();
        var _yearVal = $('#byear').val();
        var _monthVal = $('#bmonth').val();
        var d = new Date();
        var _curMonth = d.getMonth() + 1;
        if (_yearVal == d.getFullYear() && _monthVal > _curMonth) {
            $('#buycarTime').html('请选择正确的购车时间').show();
            setTimeout(function() {
                $('#buycarTime').html('请选择购车时间').hide()
            }, 1000)
        }
        if (_curVal == '') {
            $('#buycarTime').html('请选择购车时间').show();
            setTimeout(function() {
                $('#buycarTime').hide()
            }, 1000)
        }
    })
};

function baoyangFrom() {
    $('#checkBaoyangBtn').bind('click', function() {
        if (!isNaN($('#lichengNum').val()) && $('#bmonth').val() != '' && $('#byear').val() != '') {}
    })
};

function checkWeixiu() {
    var _weixiutext = $('#weixiutext');
    var _wx_err2_tip = $('#wx_err2_tip');
    _weixiutext.bind('blur', function() {
        if (_weixiutext.val() == "") {
            weixiutextTip()
        }
    });
    $('#weixiusel').change(function() {
        var _wx_err_tip = $('#wx_err_tip');
        var _curVal = $('#weixiusel').val();
        if (_curVal == '') {
            weixiuselTip()
        }
    })
};

function weixiutextTip() {
    var _wx_err2_tip = $('#wx_err2_tip');
    _wx_err2_tip.html("请简单描述您的问题").show();
    setTimeout(function() {
        _wx_err2_tip.hide()
    }, 1000)
};

function weixiuselTip() {
    var _wx_err_tip = $('#wx_err_tip');
    _wx_err_tip.show();
    setTimeout(function() {
        _wx_err_tip.hide()
    }, 1000)
};

function weixiuFrom() {
    $('#weixiuBtn').bind('click', function() {
        if ($('#weixiusel').val() == '') {
            weixiuselTip()
        } else if ($('#weixiutext').val() == "") {
            weixiutextTip()
        } else {}
    })
};