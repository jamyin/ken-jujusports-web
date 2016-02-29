requirejs.config({
	baseUrl : '../js',
	paths : {
		jquery : '/js/juju/jquery-2.1.3.min',
		jquerys : '/js/module/ajaxfileupload'
	}
});
requirejs([ 'jquery' ],function($) {

			//$("#ranPicDiv").html('<input type=\"text\" id=\"randomPic\"/><img id='checkImg' src=\"/umanages/drawRandom.do\" /><a id=\"change\">换一张</a>');
			
			$("#change").click(function() {
				var imageUrl = '/umanages/drawRandom.do'; //你的生成图片的页面
				$("#checkImg").attr("src",imageUrl + '?' + Math.random());				
				//$("#checkImg").src = "/umanages/drawRandom.do";
				//$("#ranPicDiv").html('');
			});

			$("#query1").click(function() {
				var disTxt = $("#complaintSel").find("option:selected").val();
				if (disTxt == '-1') {
					alert('下拉框选择错误');
				}
				var content = $("#contents").val();
				var randomPic = $("#randomPic").val();
				var userImage = $("#hfThumbnail").val();
				if (randomPic == '') {
					alert('验证码不能为空!');
				}
				if (content != null && content != '') {
					jQuery.ajax({
						url : '/complaint/insertComplaint.do',
						type : 'POST',
						dataType : 'json',
						data : {
							msgContent : content,
							msgType : disTxt,
							randomPic : randomPic,
							attachment : userImage
						},
						success : function(data) {
							console.log(data);
							if (data.message == 404) {
								alert('用户未登录');
							} else if (data.status == 200) {
								alert('发表成功!');
								location.href = "/app/site/complain.html";
							}else if (data.message==405){
								alert('用户类型登录错误');
							}else if(data.message==401){
								alert('验证码错误');
							}else if(data.message==406){
								alert('取不到用户');
							}
						}

					});

				} else {
					alert('信息不能为空!');
				}

			});
		});

/*requirejs([ 'jquery', 'jquerys' ], function($) {
	$('#query').click(function() {
		var imageName = $("#file").val();
		if (!/\.(gif|jpg|jpeg|bmp|png)$/.test(imageName)) {
			alert("图片类型必须是.gif,jpeg,jpg,bmp,png中的一种");
			return false;
		}
		$.ajaxFileUpload({
			type : "post",
			url : '/api/upload.do', // 用于文件上传的服务器端请求地址
			secureuri : false,// 一般设置为false
			fileElementId : 'file', // 文件上传空间的id属性 <input type="file" id="file"
									// name="file" />
			dataType : 'json',// 返回值类型 一般设置为json
			success : function(data, status) {// 成功返回之后调用的函数
				var message = data.message;
				var msg = message.split(' ');
				var info = msg[0];
				var imgurl = msg[msg.length - 1];
				var filePath = "/" + imgurl;
				if (message == '405' || message == '406') {
					alert('上传失败！');
				}
				if (info == '200') {
					$("#userImage").val(imgurl);
					$("#img").attr("src", imgurl);
					alert('上传成功!');
				}
			},
			error : function(data, status) {
				alert('上传异常！');
			}
		});
	});
});
*/