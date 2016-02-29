Menology = {};
Menology.data = [];
Menology.yearList = [];

function ScreeningMenology() {
    var date = new Date();
    Menology.year = date.getFullYear();
    Menology.month = date.getMonth() + 1;
    Menology.yearCurrent = Menology.year;
    Menology.monthCurrent = Menology.month;
    for (var i in menologyData) {
        Menology.data.push(menologyData[i])
    };
    for (var j = 0; j < Menology.data.length; j++) {
        for (var k = 0; k < Menology.data[j].service_time.length; k++) {
            var val = Menology.data[j].service_time[k],
                _val = val.match(/\d{4}/).join("");
            if (Menology.yearList.indexOf(_val) < 0) {
                Menology.yearList.push(_val)
            }
        }
    };
    Menology.yearList.sort();
    ScreeningYear();
    ShowDefaultMonthInfo(Menology.year, Menology.month)
};
$(function() {
    ScreeningMenology();
    var ClickTime = new Date().getTime();
    $(".plan-bar-left a.pre").on("click", function() {
        var t = new Date().getTime();
        if (t - ClickTime > 200) {
            prePage();
            ClickTime = t
        }
    });
    $(".plan-bar-left a.next").on("click", function() {
        var t = new Date().getTime();
        if (t - ClickTime > 200) {
            nextPage();
            ClickTime = t
        }
    });
    setMonthPos();
    $(".plan-month-list ul li").on("click", function() {
        var index = $(this).index() + 1;
        Menology.month = index;
        showMonthPos()
    });
    $(".my-plan-years .pre_year").on("click", function() {
        var obj = $(".my-plan-years b");
        var year = parseInt(obj.text()),
            _year = parseInt(obj.attr("current-year"));
        if (year > _year) {
            year--;
            obj.html(year);
            Menology.year = year;
            Menology.month = 1;
            ScreeningYear();
            ShowDefaultMonthInfo(year, 1);
            if (year == _year) {
                Menology.month = Menology.monthCurrent;
                showMonthPos()
            } else {
                $(".plan-month-list ul li").removeAttr("class").eq(0).addClass("cur");
                $(".plan-month-list ul").css("left", "0px")
            }
        }
    });
    $(".my-plan-years .next_year").on("click", function() {
        var obj = $(".my-plan-years b");
        var year = parseInt(obj.text()),
            _year = parseInt(obj.attr("max-year"));
        if (year < _year) {
            year++;
            obj.html(year);
            Menology.year = year;
            Menology.month = 1;
            ScreeningYear();
            ShowDefaultMonthInfo(year, 1);
            $(".plan-month-list ul li").removeAttr("class").eq(0).addClass("cur");
            $(".plan-month-list ul").css("left", "0px")
        }
    });
    $(".my-plan-content").on("mouseenter", function() {
        if ($(this).find(".empty").length > 0) {
            $(this).find(".plan-check-case").hide()
        }
    })
});

function ScreeningYear() {
    var year = Menology.year;
    for (var i = 1; i <= 12; i++) {
        ScreningMonth(year, i)
    }
};

function ScreningMonth(year, month) {
    var type1 = 0,
        type2 = 0,
        _month = parseInt(month) < 10 ? "0" + month : month;
    for (var i = 0; i < Menology.data.length; i++) {
        var data = Menology.data[i];
        if (data.service_time.indexOf(year + "-" + _month) >= 0) {
            if (data.type == 1) {
                type1++
            };
            if (data.type == 2) {
                type2++
            }
        }
    };
    var obj = $(".plan-month-list li").eq(month - 1);
    obj.find("em").html(type1);
    obj.find("b").html(type2)
};

function ShowDefaultMonthInfo(year, month) {
    var _month = parseInt(month) < 10 ? "0" + month : month,
        planArr = [];
    for (var i = 0; i < Menology.data.length; i++) {
        var data = Menology.data[i];
        if (data.service_time.indexOf(year + "-" + _month) >= 0) {
            if (planArr.length == 0) {
                planArr.push({
                    name: data.name,
                    type: data.type,
                    count: 1,
                    pid: data.pid
                })
            } else {
                var j = planArr.length - 1;
                if (planArr[j].name == data.name) {
                    planArr[j].count++
                } else {
                    planArr.push({
                        name: data.name,
                        type: data.type,
                        count: 1,
                        pid: data.pid
                    })
                }
            }
        }
    };
    ShowDefaultMonthResult(planArr)
};

function ShowDefaultMonthResult(planArr) {
    var nodeLi = "",
        str = "零一二三四五六七八九十",
        pids = [];
    if (planArr.length == 0) {
        nodeLi = "<li class='empty'>暂无计划</li>";
        $(".plan-check-case").hide()
    } else {
        $(".plan-check-case").show();
        for (var i = 0; i < planArr.length; i++) {
            var val = planArr[i];
            if (val.count > 0) {
                nodeLi += "<li class='pid" + val.pid + "'>" + val.name + "<b><img src='http://img.chemayi.com/version63/member/icon" + val.type + ".png' /></b></li>"
            }
            pids.push(val.pid)
        }
    };
    $(".my-plan-content ul").html(nodeLi);
    if (pids.length > 0) {
        $("#view_pro").attr("href", "http://" + document.domain.replace("member", "www") + "/carmaintainplan/project/pids-" + pids.join(",") + ".html")
    } else {
        $("#view_pro").removeAttr("href")
    }
};

function setMonthPos() {
    var obj = $(".plan-month-list ul"),
        width = obj.find("li").outerWidth();
    var count = Menology.month >= 4 ? Menology.month - 4 : 0;
    count = Menology.month <= 10 ? count : 6;
    obj.css({
        "left": 0 - count * width + "px"
    });
    obj.find("li").removeClass("cur").eq(Menology.month - 1).addClass("cur");
    for (var i = Menology.monthCurrent; i < 12; i++) {
        obj.find("li").eq(i).addClass("notyet")
    };
    $(".my-plan-years b").attr("current-year", Menology.yearList[0]).attr("max-year", Menology.yearList[Menology.yearList.length - 1])
};

function showMonthPos() {
    var obj = $(".plan-month-list ul"),
        width = obj.find("li").outerWidth();
    var count = Menology.month >= 4 ? Menology.month - 4 : 0;
    count = Menology.month <= 10 ? count : 6;
    obj.css({
        "left": 0 - count * width + "px"
    });
    obj.find("li").removeClass("cur").eq(Menology.month - 1).addClass("cur");
    if (Menology.year == Menology.yearCurrent) {
        obj.find("li").eq(Menology.monthCurrent - 1).addClass("cur");
        for (var i = Menology.monthCurrent; i < 12; i++) {
            obj.find("li").eq(i).addClass("notyet")
        }
    };
    ShowDefaultMonthInfo(Menology.year, Menology.month)
};

function prePage() {
    var obj = $(".plan-month-list ul"),
        width = obj.find("li").outerWidth(),
        left = parseInt(obj.css("left"));
    if (left < 0) {
        obj.css("left", left + width + "px")
    }
};

function nextPage() {
    var obj = $(".plan-month-list ul"),
        width = obj.find("li").outerWidth(),
        left = parseInt(obj.css("left"));
    if (left > 0 - 6 * width) {
        obj.css("left", left - width + "px")
    }
};