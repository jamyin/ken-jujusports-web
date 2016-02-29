/**
 * 事件类型判断，不同设备事件类型不同
 */
var EVENT_TYPE = "click";
if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)) {
	EVENT_TYPE = "touchend";
}

/**
 * 根据请求参数获取ajax请求数据
 * @param {Object} param 请求参数对象
 * @param {Object} successCallBack 成功回调函数
 * @param {Object} errorCallback  失败回调函数
 */
function getAjaxData(param, successCallBack, errorCallback) {
	$.ajax({
		type: param.type || "POST",
		url: param.url,
		data: param.data,
		dataType: "json",
		async: false,
		success: function(rep) {
			successCallBack(rep);
		},
		error: function(rep) {
			errorCallback(rep);
			alert('系统错误！');
		}
	});
}