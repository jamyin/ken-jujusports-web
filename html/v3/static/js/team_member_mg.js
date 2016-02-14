$(function() {

	$("#addUpload").uploadify({
		'uploader' : '/static/plugins/uploadify/uploadify.swf',
		'script' : "/file/upload.htm",
		'cancelImg' : '/static/plugins/uploadify/cancel.png',
		'queueID' : 'fileQueue',
		'auto' : true,
		'multi' : true,
		'width' : 130,
		'height' : 30,
		'buttonText' : 'select',
		'buttonImg' : '/static/plugins/uploadify/change.png',
		'simUploadLimit' : 1,
		'queueSizeLimit' : 1,
		'sizeLimit':1024*1024*10,
		'fileDesc' : 'pictures',
        'fileExt': '*.gif;*.png;*.jpg',
		onComplete : function(event, queueID, fileObj, response, data) {
			var dataObj = eval("(" + response + ")");
			if(dataObj.status==200){
				parent.layer.msg('头像上传成功', {
					shade : [ 0.9, '#000' ],
					icon : 1,
					time : 800
				// 2秒关闭（如果不配置，默认是3秒）
				}, function() {
					$("#img_add").attr("src", dataObj.filePath);
					$('#pic_add').attr("value", dataObj.filePath);
				});
			}else{
				layer.msg("文件:" + fileObj.name + "失败！请上传10M内的指定格式的图片");
			}
		},
		onSelect : function() {
		},
		onError : function(event, queueID, fileObj) {
			layer.msg("文件:" + fileObj.name + "上传失败");
		}
	});

	$("#uploadObj").uploadify({
		'uploader' : '/static/plugins/uploadify/uploadify.swf',
		'script' : "/file/upload.htm",
		'cancelImg' : '/static/plugins/uploadify/cancel.png',
		'queueID' : 'fileQueue',
		'auto' : true,
		'multi' : true,
		'width' : 130,
		'height' : 30,
		'sizeLimit':1024*1024*10,
		'buttonText' : 'select',
		'buttonImg' : '/static/plugins/uploadify/change.png',
		'simUploadLimit' : 1,
		'queueSizeLimit' : 1,
		'fileDesc' : 'pictures',
        'fileExt': '*.gif;*.png;*.jpg',
		onComplete : function(event, queueID, fileObj, response, data) {
			var dataObj = eval("(" + response + ")");
			if(dataObj.status==200){
				parent.layer.msg('头像上传成功', {
					shade : [ 0.9, '#000' ],
					icon : 1,
					time : 800
				// 2秒关闭（如果不配置，默认是3秒）
				}, function() {
					$("#img_modify").attr("src", dataObj.filePath);
					$('#pic_modify').attr("value", dataObj.filePath);
				});
			}else{
				layer.msg("文件:" + fileObj.name + "失败！请上传10M内的指定格式的图片");
			}
		},
		onSelect : function() {
		},
		onError : function(event, queueID, fileObj) {
			layer.msg("文件:" + fileObj.name + "上传失败");
		}
	});
});

function t_modify() {
	var ajaxParams = $("#member_modify_form").serialize();
	var jsId = $(".js-id").val();
	if(jsId==null || jsId==""){
		layer.msg('无效数据无法编辑', {
			shade : [ 0.9, '#000' ],
			icon : 4,
			time : 800
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
		});		
		return false;
	}
	// var val_payPlatform = $('#wrap input[name="payMethod"]:checked ').val();
	
			$.ajax({
				type : "POST",
				url : "/team/saveOrUpdate.htm",
				data : ajaxParams,
				datatype : "json",// "xml", "html", "script", "json", "jsonp",
									// "text".
				beforeSend : function() {
					$("#msg").html("logining");
				},
				success : function(data) {// 成功返回之后调用的函数
					var jsondata = data;// eval('(' + data + ')');
					if (data.status == 200) {
						layer.msg(
										data.message,
										{
											shade : [ 0.9, '#000' ],
											icon : 1,
											time : 1500
										// 2秒关闭（如果不配置，默认是3秒）
										},
										function() {
											$(".youth-team-member").css(
													"display", "block");
											$(".member-add").css("display",
													"none");
											var liObj = "";
											//liObj += '<li class="team-member-li">';
											liObj += '<p class="col1">';
											//liObj += '<input type="checkbox" name="memberIds" value="" />';
											liObj += '<input class="col_i" type="checkbox" name="memberIds" value='+data.data.id+' />';
											liObj += '<input class="col_first" type="hidden" value='+data.data.isFirst+' />';
											liObj += '<textarea class="col_described" style="display:none;">'+data.data.described+'</textarea>';											
											liObj += '</p>';
											if (data.data.pic == null || data.data.pic == '') {
												liObj += '<p class="col2"><img class="member-pic" src="/static/img/topimg.jpg" style="width:48px;height:48px;" /></p>';
											}else {
												liObj += '<p class="col2"><img class="member-pic" src='+data.data.pic+' style="width:48px;height:48px;" /></p>';
											}
											liObj += '<p class="col3" style="overflow:hidden;text-overflow:ellipsis;">'
													+ data.data.name + '</p>';
											liObj += '<p class="col4" style="overflow:hidden;text-overflow:ellipsis;">'
													+ data.data.number + '</p>';
											liObj += '<p class="col5">'
													+ data.data.position
													+ '</p>';
											if (data.data.isFirst == 1) {
												liObj += '<p class="col6"><i class="onplay"></i></p>';
											} else {
												liObj += '<p class="col6"><i class="alternates"></i></p>';
											}
											//liObj += '</li>';
											$("#"+jsId).html(liObj);
											$(".js-id").val('');
											$(".js-name").val('');
											$(".js-no").val('');
											$(".js-position").val('');
											$(".js-member-pic").attr("src","/static/img/topimg.jpg");
											$("#js-described").val('');
										});
					} else {
						layer.msg(data.message, {
							shade : [ 0.9, '#000' ],
							icon : 6,
							time : 1500
						// 2秒关闭（如果不配置，默认是3秒）
						}, function() {

						});
					}
				},
				complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

				},
				error : function() {// 调用出错执行的函数
				}
			});
};

function t_save_add() {
	var ajaxParams = $("#member_add_form").serialize();
	var name =  $("#namesave").val();
	if (name == null || name == '') {
		layer.msg("姓名不能为空，请输入姓名~", {
			shade : [ 0.9, '#000' ],
			icon : 5,
			time : 2000
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
		});
		return false;
	}
	if (name != null && name != '') {
		$.ajax({
			type : "POST",
			url : "/team/saveOrUpdate.htm",
			data : ajaxParams,
			datatype : "json",// "xml", "html", "script", "json", "jsonp",
								// "text".
			beforeSend : function() {
				$("#msg").html("logining");
			},
			success : function(data) {// 成功返回之后调用的函数
				var jsondata = data;// eval('(' + data + ')');
				if (data.status == 200) {
					layer.msg(
									data.message,
									{
										shade : [ 0.9, '#000' ],
										icon : 1,
										time : 1500
									// 2秒关闭（如果不配置，默认是3秒）
									},
									function() {
										$(".youth-team-member").css(
												"display", "block");
										$(".member-add").css("display",
												"none");
										var liObj = "";
										liObj += '<li id='+data.data.id+' class="team-member-li">';
										liObj += '<p class="col1">';
										liObj += '<input class="col_i" type="checkbox" name="memberIds" value='+data.data.id+' />';
										liObj += '<input class="col_first" type="hidden" value='+data.data.isFirst+' />';
										liObj += '<textarea class="col_described" style="display:none;">'+data.data.described+'</textarea>';
										liObj += '</p>';
										if (data.data.pic == null || data.data.pic == '') {
											liObj += '<p class="col2"><img class="member-pic" src="/static/img/topimg.jpg" style="width:48px;height:48px;" /></p>';
										}else {
											liObj += '<p class="col2"><img class="member-pic" src='+data.data.pic+' style="width:48px;height:48px;" /></p>';
										}										
										liObj += '<p class="col3" style="overflow:hidden;text-overflow:ellipsis;">'
												+ data.data.name + '</p>';
										liObj += '<p class="col4" style="overflow:hidden;text-overflow:ellipsis;">'
												+ data.data.number + '</p>';
										liObj += '<p class="col5">'
												+ data.data.position
												+ '</p>';
										if (data.data.isFirst == 1) {
											liObj += '<p class="col6"><i class="onplay"></i></p>';
										} else {
											liObj += '<p class="col6"><i class="alternates"></i></p>';
										}
										liObj += '</li>';
										$(".team-member-ul").append(liObj);
									});
				} else {
					layer.msg(data.message, {
						shade : [ 0.9, '#000' ],
						icon : 6,
						time : 1500
					// 2秒关闭（如果不配置，默认是3秒）
					}, function() {
					});
				}
			},
			complete : function(XMLHttpRequest, textStatus) {// 调用执行后调用的函数

			},
			error : function() {// 调用出错执行的函数
			}
		});
	}
	
};

// 删除队伍信息
function t_delete_list() {
	$("input[name='memberIds']").each(function() {
		if($(this).prop("checked")){
			var memberId = $(this).val();
			$.ajax({
				url:"/team/delete.htm",//提交的网址
				type: 'POST', 
				async:false,
				dataType: 'json',  
				data:{"memberId":memberId},//提交的数据
				success: function(data){
					$(".js-id").val('');
					$(".js-name").val('');
					$(".js-no").val('');
					$(".js-position").val('');
					$(".js-member-pic").attr("src","/static/img/topimg.jpg");
					$("#js-described").val('');
					layer.msg(data.message, {
						shade : [ 0.9, '#000' ],
						icon : 1,
						time : 1000
					// 2秒关闭（如果不配置，默认是3秒） 
					}, function() {

					});
				},error :function(){
				}
			});			
			$(this).parent().parent().remove();
		}
	});
};

function changeModifyFirst(_thisObj) {
	$("#isFirst_modify").val($(_thisObj).val());
}

function changeFirst(_thisObj) {
	$("#isFirst").val($(_thisObj).val());
}

function changeServe($this){
	$("#serve-info-img-src").attr("src",$($this).attr("data-src"));
	$("#serve-key").html($($this).attr("data-key"));
	$("#lineup").val($($this).attr("data-key"));
	var ajaxParams = $("#line_form").serialize();
	$.ajax({
		url:"/team/changeLine.htm",//提交的网址
		type: 'POST', 
		async:false,
		dataType: 'json',  
		data : ajaxParams,
		success: function(data){
			layer.msg(data.message, {
				shade : [ 0.6, '#000' ],
				icon : 1,
				time : 500
			// 2秒关闭（如果不配置，默认是3秒）
			}, function() {

			});
		},error :function(){
		}
	});			
	
}
