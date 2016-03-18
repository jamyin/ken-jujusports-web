$(function() {
	$.ajax({
		url : '/login/load.htm',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if (data.success == false) {
				layer.msg(data.msg)
				return;
			}
			layer.msg(data.msg, {
				shade : [ 0.9, '#000' ],
				icon : 6,
				time : 2000
			// 2秒关闭（如果不配置，默认是3秒）
			}, function() {
			});
		}
	});
});
