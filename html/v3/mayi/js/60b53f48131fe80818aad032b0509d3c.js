$(document).ready(function() {
    $("#login_user").validatebox({
        required: true,
        validType: ['checkUser'],
        missingMessage: '必须输入用户名'
    });
    $.extend($.fn.validatebox.defaults.rules, {
        checkUser: {
            validator: function(value, param) {
                var reg = /^([0-9]{11})|(\w@\w*\.\w)|([\u4E00-\u9FA5a-zA-Z0-9]{2,16})$/;
                if (reg.test(value)) return true;
                else {
                    $.fn.validatebox.defaults.rules.checkUser.message = "可以使用注册用户名和已经认证的手机号码或邮箱登录";
                    return false
                }
            },
            message: ''
        }
    });
    $("#login_pwd").validatebox({
        required: true,
        validType: ['checkPwd'],
        missingMessage: '必须输入密码'
    });
    $.extend($.fn.validatebox.defaults.rules, {
        checkPwd: {
            validator: function(value, param) {
                var reg = /^\w{6,16}$/;
                if (reg.test(value)) return true;
                else {
                    $.fn.validatebox.defaults.rules.checkPwd.message = "密码长度为6-16";
                    return false
                }
            },
            message: ''
        }
    });
    $("#member_login_form").form({
        url: "/login.php?act=doLogin",
        onSubmit: function(param) {
            if (!$(this).form('validate')) return false;
            $.messager.progress();
            if ($("#save_cookie_2weeks").attr("checked") == undefined) param.cookie_time = "";
            else if ($("#save_cookie_2weeks").attr("checked") == "checked") param.cookie_time = "14";
            else param.cookie_time = ""
        },
        success: function(data) {
            $.messager.progress("close");
            data = eval("(" + data + ")");
            if (data.result == "ok") window.location.href = data.href;
            else {
                if (data.msg != undefined) $.messager.alert('登录失败', data.msg, '登录失败');
                else $.messager.alert('登录失败', '请重新登录', '登录失败')
            }
            return false
        }
    });
    $("#login_form_submit").click(function() {
        $("#member_login_form").submit()
    });
    $('#login_pwd').keyup(function(event) {
        var keycode = event.keyCode;
        if (keycode == 13) {
            $("#member_login_form").submit()
        }
    });
    $("#reload_v_c").click(function() {
        $("#verify_code").hide();
        $("#load_img").show();
        var urlStr = urlCmyR('login', 'verifyCode', 'd=' + numRand());
        $("#verify_code").attr("src", urlStr);
        $("#load_img").hide();
        $("#verify_code").show()
    });
    $("#find_type_form").form({
        url: $(this).attr("actionUrl"),
        onSubmit: function(param) {
            if ($("#find_by_mobile").val() == "" && $("#find_by_email").val() == "") {
                $("#find_by_mobile").parents(".find_psw_info_row").find(".sp4").show().find("em").html("必须输入一种类型来找回密码！");
                return false
            }
            if ($("#verifycode").val() == "") {
                $("#verifycode").parents(".find_psw_info_row").find(".sp4").show().find("em").html("验证码不能为空！");
                return false
            }
            var check_input = true;
            $(".sp3 input").each(function() {
                if ($(this).parents(".find_psw_info_row").find(".sp4").find("em").html() != "") check_input = false
            });
            if (check_input == false) return false;
            param.findtype = $("#find_by_mobile").val() == "" ? $("#find_by_email").val() : $("#find_by_mobile").val();
            param.verifycode = $("#verifycode").val();
            $.messager.progress()
        },
        success: function(data) {
            $.messager.progress("close");
            data = eval("(" + data + ")");
            if (data.result == "fail") {
                $.messager.alert('Waring', data.msg, 'Waring')
            }
            if (data.result == "ok" && data.url != "") {
                window.location.href = data.url
            }
        }
    });
    $("#find_type_submit").click(function() {
        $("#find_type_form").submit()
    });
    if ($(".find_psw_content").length > 0) $(".find_psw_content").RadioHit();
    $(".find_psw_info_row input[type=radio]").click(function() {
        $(".find_psw_info_row").find(".sp4").hide();
        $(".find_psw_info_row").find("input").attr("value", "")
    });
    $(".sp3 input").focus(function() {
        if ($(this).parents(".find_psw_info_row").find(".sp1 input").attr("checked") != "checked" && $(this).attr("thereg") != "verifycode") {
            $(this).blur()
        }
    });
    $(".sp3 input").blur(function() {
        if ($(this).parents(".find_psw_info_row").find(".sp1 input").attr("checked") == "checked" || $(this).attr("thereg") == "verifycode") {
            var val = $(this).val();
            var thereg = $(this).attr("thereg");
            var missMsg = thereg == "phone" ? "手机号码不能为空！" : (thereg == "email" ? "电子邮箱不能为空！" : "验证码不能为空！");
            if (val == "") {
                $(this).parents(".find_psw_info_row").find(".sp4").show().find("em").html(missMsg);
                return
            }
            switch (thereg) {
                case "phone":
                    var reg = /^1[34578]\d{9}$/;
                    if (!reg.test(val)) {
                        $(this).parents(".find_psw_info_row").find(".sp4").show().find("em").html("手机号码格式错误！");
                        return
                    } else {
                        $(this).parents(".find_psw_info_row").find(".sp4").hide().find("em").html("")
                    }
                    break;
                case "email":
                    var reg = /^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/;
                    if (!reg.test(val)) {
                        $(this).parents(".find_psw_info_row").find(".sp4").show().find("em").html("电子邮箱格式错误！");
                        return
                    } else {
                        $(this).parents(".find_psw_info_row").find(".sp4").hide().find("em").html("")
                    }
                    break;
                case "verifycode":
                    var reg = /^[0-9]{4}$/;
                    if (!reg.test(val)) {
                        $(this).parents(".find_psw_info_row").find(".sp4").show().find("em").html("验证码格式错误！");
                        return
                    } else {
                        $(this).parents(".find_psw_info_row").find(".sp4").hide().find("em").html("")
                    }
                    break
            }
        }
    })
});

function numRand() {
    var x = 999999;
    var y = 100000;
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand
}