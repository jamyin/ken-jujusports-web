$(document).ready(function() {
	loadUserInfo();
});

function loadUserInfo(){
	var postUrl = "/umanages/loadInfo.do";
    $.ajax({
        url: postUrl,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
        	if(data.status == 200){
        		var jsonData = data.data;
    			$('#islogout').css("display","none");
    			$('#islogin').css("display","block");
    			$("#showName").html(jsonData.userAccount);
        	}else{
        		$('#islogout').css("display","block");
    			$('#islogin').css("display","none");
        	}
			//$('#showName').html("你好！");
        }
    });
};

//点击用户名称 进入用户管理后台
function userManage(){
	window.location.href = "/umanages/umanages.do";
};

//退出功能
function loginOut(){
	window.location.href = "/umanages/loginout.do";
};

