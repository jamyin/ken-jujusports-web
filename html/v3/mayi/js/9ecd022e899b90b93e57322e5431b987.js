SiteStorge = {
    idArr: [],
    totalArr: [],
    monthArr: [],
    levelArr: [],
    objArr: []
};

function WebSite(MapId) {
    this.init = function() {
        this.map = new BMap.Map(MapId);
        var center_point = new BMap.Point(120.169645, 30.280454);
        this.map.centerAndZoom(center_point, 12);
        this.map.enableScrollWheelZoom(true);
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.OverviewMapControl());
        this.map.addControl(new BMap.CopyrightControl());
        this.map.setCurrentCity("杭州")
    };
    this.opts = {
        width: 730,
        height: 140,
        enableMessage: false
    };
    this.getmark = function(obj) {
        var point = new BMap.Point(obj.pointx, obj.pointy);
        var _size = (obj.isbusy == 0 && obj.shop_type == 1) ? -38 : (obj.isbusy == 0) ? 0 : -76;
        var size = new BMap.Size(0, _size);
        var myIcon = new BMap.Icon("http://img.chemayi.com/index/map63.png", new BMap.Size(25, 38), {
            imageOffset: size
        });
        var marker = new BMap.Marker(point, {
            icon: myIcon
        });
        this.marker = marker;
        return marker
    };
    this.set_website = function(obj) {
        this.getmark(obj);
        this.map.addOverlay(this.marker);
        this.bindEvent(obj)
    };
    this.window_str = function(obj) {
        var str = "<div class='website-map' style='margin-top: 5px;'>" + "<div class='website-list-row'>" + "<div class='website-list-pic'>" + "<img src='" + obj.imgsrc + "' alt='" + obj.name + "' width='143px' height='90px'>" + "</div>" + "<div class='website-list-info'>" + "<div class='info-top'>" + "<span class='no'>车蚂蚁NO." + obj.id + "</span>" + "</div>" + "<div class='info-top'>" + "<span class='name'>" + obj.name + "</span>" + "</div>" + "<div class='info-top'>" + "<span class='level level" + parseInt(obj.level) + "'></span>" + "</div>" + "<div class='info-addr'>地址：" + obj.addr + "</div>" + "<div class='info-tel'>电话：400-0571-137</div>" + "</div>" + "<div class='website-list-deal'>" + "<span>总成交量<br><em>" + obj.count_all + "</em><i>笔</i></span>" + "<span>本月成交量<br><em>" + obj.count_month + "</em><i>笔</i></span>" + "</div>" + "</div>" + "</div>";
        return str
    };
    this.bindEvent = function(obj) {
        var infoWindow = new BMap.InfoWindow(this.window_str(obj), this.opts);
        this.marker.addEventListener("click", function() {
            this.openInfoWindow(infoWindow)
        })
    };
    this.liclick = function(obj) {
        this.set_website(obj);
        var marker = this.marker;
        marker.openInfoWindow(new BMap.InfoWindow(this.window_str(obj), this.opts))
    }
}

function getDataShort(data) {
    var all_str = "";
    var json = $.parseJSON(data);
    for (var i in json) {
        var obj = json[i];
        var config = " bizid='" + obj.supplier_id + "' bizname='" + obj.supplier_name + "' bizpic='" + obj.list_imginfo.img_path + "' bizaddr='" + obj.addr + "' bizmobile='" + obj.mobile + "' biztel='400-0571-137' bizlevel='" + obj.total_score + "' bizcount_all='" + obj.total_success + "' bizcount_month='" + obj.month_success + "' bizcomment_num='" + 　obj.comment_num + "' bizpointx='" + obj.location_x + "' bizpointy='" + obj.location_y + "' bizisbusy='" + obj.is_del + "' shop_type='" + obj.shop_type + "'";
        all_str += "<li>" + "<div class='website-li-name'>" + obj.supplier_name + "</div>" + "<div class='website-li-ping'>" + "<span>评价：</span>" + " <span class='level level" + parseInt(obj.total_score) + "'></span>" + "<span><em>" + obj.total_score + "</em>分</span>" + " </div>" + "<div class='website-li-addr'>" + obj.addr + "</div>" + " <div class='website-li-count'>" + "	<span>本月<em>" + obj.month_success + "</em>笔</span>" + "</div>" + " <div class='website-li-btn'>" + "	<a class='pub-btn-small-orange choose-this-one' bizname=" + obj.supplier_name + " bizid=" + obj.supplier_id + ">选择</a>" + "    <a target='_blank' class='view-this-info' " + config + " href='" + urlCmy('supplier', 'detaile', 'supplierId=' + obj.supplier_id) + "' >查看 >></a>" + "</div>" + " </li>"
    }
    $(".select-website-list-box").html(all_str);
    $(".select-website-info .turnback").live('click', function() {
        $(this).parents(".select-website-content").css("margin-left", "0px")
    });
    $(".select-website-list-box li").live('mouseenter', function() {
        var obj = $(this).find(".view-this-info");
        var _obj = {
            id: obj.attr("bizid"),
            name: obj.attr("bizname"),
            addr: obj.attr("bizaddr"),
            tel: obj.attr("biztel"),
            mobile: obj.attr("bizmobile"),
            pointx: obj.attr("bizpointx"),
            pointy: obj.attr("bizpointy"),
            imgsrc: obj.attr("bizpic"),
            level: obj.attr("bizlevel"),
            count_all: obj.attr("bizcount_all"),
            count_month: obj.attr("bizcount_month"),
            isbusy: 　obj.attr("bizisbusy")
        };
        website.liclick(_obj)
    })
}