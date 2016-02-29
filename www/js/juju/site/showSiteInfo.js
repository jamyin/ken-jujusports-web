requirejs.config({
	baseUrl: '../js',
	paths:{
		jquery: '/js/juju/jquery-2.1.3.min',
		jqueryForm:'/ant/js/jquery.form',
		jqueryUpload:'/ant/js/jquery.upload',
		sportTypeJQ:'/js/juju/site/sportType_',
		serviceTypeJQ:'/js/juju/site/serviceType',
		//layerJQ:'/js/juju/layer/layer.min'
		layerJQ:'/js/juju/layer-1.9/layer',		
	}
});
/*
 * 回显场馆信息
 */
requirejs(['jquery','jqueryForm','jqueryUpload','sportTypeJQ','serviceTypeJQ'], function($) {
	/*
	 * 模拟城市（动态从数据库获取选项内容）
	 */
	$("#checkall").click(function(){
		if(this.checked){
			$("input[name='venueType']").each(function(){this.checked=true;});
		}else{
			$("input[name='venueType']").each(function(){this.checked=false;});
		}
	});

	jQuery.ajax({
		url:'/address/listByParentId.do',
		type: 'POST',
		dataType :'json',
		data : {parentId:1},
		success : function(data){
			var jsonData=data.data;//eval("("+data+")");
			//console.log(jsonData);
			//console.log("=province="+data);				
			$("#provinceid").html('');
			$("#provinceid").append("<option value=\'-1\'>请选择</option>");    			
			for(var i=0;i<jsonData.length;i++){
				opt = "<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>";
				$("#provinceid").append(opt);  
				//console.log(opt);						 
			}
		}			
	});	

	$("#provinceid").change(function(){
		$("#countryid").html('');
		$("#countryid").append("<option value=\'-1\'>请选择</option>"); 
		
		var provinceid=$("#provinceid").find("option:selected").val();			
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:provinceid},
			//data :{cityid:cityTxt,countryid:disTxt,venueType:sportTxt},
			success : function(data){
				$("#cityid").html('');
				$("#cityid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data.data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
					$("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});

	$("#cityid").change(function(){
		var cityid=$("#cityid").find("option:selected").val();			
		jQuery.ajax({
			url:'/address/listByParentId.do',
			type: 'POST',
			dataType :'json',
			data : {parentId:cityid},
			success : function(data){
				$("#countryid").html('');
				$("#countryid").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = data.data;//eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
					$("#countryid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
		});
	});


	/*jQuery.ajax({
		url: '/stadium/showVenuesInfo.do',
		type: 'POST',  
		dataType: 'json',    	
		error: errFun,  //错误执行方法
		success: succFun //成功执行方法    				
	});
	function succFun(data){
		//console.log(data.data);
		var jsonData = data.data;
		//alert(data.message);
		if(jsonData.message == "用户没有登陆或登陆失效！"){
			alert(jsonData.message);
		}
		if(jsonData != null){
			//var jsonData = eval("("+data+")");

			//console.log('=showVenuesInfo='+jsonData);
			//console.log('=showVenuesInfo='+jsonData.venueImg);
			//alert(jsonData.nickName);
			$("#nickName").val(jsonData.nickName);
			$("#xLocation").val(jsonData.xlocation);
			$("#yLocation").val(jsonData.ylocation);
			$("#maxNum").val(jsonData.maxNum);
			//$("#nickName").val(jsonData.nickName);
			var provinceid = jsonData.provinceid;
			var cityid = jsonData.cityid;
			var countryid = jsonData.countryid;
			$("#provinceid").val(provinceid);						
			jQuery.ajax({
				url:'/address/listByParentId.do',
				type: 'POST',
				dataType :'json',
				data : {parentId:provinceid},
				//data :{cityid:cityTxt,countryid:disTxt,venueType:sportTxt},
				success : function(data){
					$("#cityid").html('');
					$("#cityid").append("<option value=\'-1\'>请选择</option>");  
					var jsonData = data.data;//eval("("+data+")");
					for(var i=0;i<jsonData.length;i++){																		
						$("#cityid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");   									
						//alert(jsonData[i].id+jsonData[i].name);									
					}
					$("#cityid").val(cityid);
				}
			});	
			//$("#selIndustyType option[value='cityid']").attr("selected", "selected"); 
			//alert(cityid);

			//$("#cityid option").eq(cityid).prop("selected",true);
			//var cityid=$("#cityid").find("option:selected").val();	
			//alert(cityid);			
			jQuery.ajax({
				url:'/address/listByParentId.do',
				type: 'POST',
				dataType :'json',
				data : {parentId:cityid},
				success : function(data){
					$("#countryid").html('');
					$("#countryid").append("<option value=\'-1\'>请选择</option>");  
					var jsonData = data.data;//eval("("+data+")");
					//console.log(jsonData);
					for(var i=0;i<jsonData.length;i++){
						$("#countryid").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
					$("#countryid").val(countryid);
				}
			});	
			//alert(countryid);						
			$("#address").val(jsonData.address);
			$("#contacts").val(jsonData.contacts);
			$("#mobileNo").val(jsonData.mobileNo);
			$("#descs").val(jsonData.descs);
			//	$("#chargeType").attr(jsonData.chargeType);
			//	$("#stadiumType").attr(jsonData.venueType);
			//	$("#otherService").attr(jsonData.otherServices);

			//	$("#venueImg").val(jsonData.venueImg);
			$("#userImageS").attr('src',jsonData.venueImg);
			//	alert(jsonData.venueImg);
			$("#hfThumbnail").val(jsonData.venueImg);

			var chargeType = jsonData.chargeType;
			$("input[type=radio][name=chargeType]").each(function() {
				if ($(this).val() == chargeType) {
					$(this).attr("checked", "checked");
				} 
			});

			回显运动类型
			var venueType = jsonData.sportTypeList;
			//console.log('=venueType='+venueType);

			$.each(venueType, function(index,value) {
				var sportName = value['sportName'];
				var id = value['id'];
				$("[name = venueType]:checkbox").each(function () {
					if($(this).val()==id){
						//alert($(this).val() + " " +id);
						$(this).attr("checked","checked");
					} 
					//alert($(this).val() + " " +sportName);
				});
			}); 
			回显外加服务类型
			var serviceType = jsonData.serviceTypeList;
			//console.log('=serviceType='+serviceType);

			$.each(serviceType, function(index,value) {
				var serviceName = value['serviceName'];
				var id = value['id'];
				$("[name = otherServices]:checkbox").each(function () {
					if($(this).val()==id){
						$(this).attr("checked","checked");
					} 
				});
			});	
			window.parent.iFrameHeight();
			//window.opener.location.reload();						
		}
	}
	function errFun(){
		alert("系统错误！");
		//layer.tips('系统错误！', '#sub');
	}	*/

	/*
	 * 全选/取消全选
	 */
	$("#checkall").click(function(){
		if(this.checked){
			$("input[name='venueType']").each(function(){this.checked=true;});
		}else{
			$("input[name='venueType']").each(function(){this.checked=false;});
		}
	});
	/* $("#checkall").click(function() {
	alert('yin');
    $("input[name='venueType']").prop("checked", this.checked);
});

$("input[name='venueType']").click(function() {
	alert('jam');
var $subs = $("input[name='venueType']");
$("#checkall").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
}); */


	$("#checkAllService").click(function(){
		if(this.checked){
			$("input[name='otherServices']").each(function(){this.checked=true;});
		}else{
			$("input[name='otherServices']").each(function(){this.checked=false;});
		}
	});
}); 

//运动类型全选 
//子复选框的事件  
function setSelectAll(){  
	//当没有选中某个子复选框时，checkall取消选中  
	if (!$("#venueType").checked) {  
		$("#checkall").prop("checked", false);  
	} else{
		$("#checkall").prop("checked", true);  
	} 

	var chsub = $("input[type='checkbox'][id='venueType']").length; //获取venueType的个数  
	//alert('chsub = ' + chsub);
	var checkedsub = $("input[type='checkbox'][id='venueType']:checked").length; //获取选中的venueType的个数  
	//alert('checkedsub = ' + checkedsub);
	if (checkedsub == chsub) {  
		//alert($("#checkall"));
		$("#checkall").prop("checked", true); 
	}else{
		$("#checkall").prop("checked", false); 
	}
} 

//服务类型全选
function setServiceSelectAll(){  
	//当没有选中某个子复选框时，checkall取消选中  
	if (!$("#otherServices").checked) {  
		$("#checkAllService").prop("checked", false);  
	} else{
		$("#checkAllService").prop("checked", true);  
	} 

	var chsub = $("input[type='checkbox'][id='otherServices']").length; //获取venueType的个数  
	//alert('chsub = ' + chsub);
	var checkedsub = $("input[type='checkbox'][id='otherServices']:checked").length; //获取选中的venueType的个数  
	//alert('checkedsub = ' + checkedsub);
	if (checkedsub == chsub) {  
		//alert($("#checkall"));
		$("#checkAllService").prop("checked", true); 
	}else{
		$("#checkAllService").prop("checked", false); 
	}
} 



/*
 * 图片上传
 */
requirejs(['jquery','jqueryForm','jqueryUpload'], function($) {
	$(".upload").upload({
		uploadData: { id: "12233" },
		successFn: "success",
		deleteData: { id: function () { return "asdfasdf" } }
	});
});


//上传成功后执行该函数
function success(response, statusText, xhr, $this) {
	//比如插入编辑器
	//alert(response.Data.RelativePath + $this.attr("value"))
}
/*
 * 新增或修改场馆信息
 */
requirejs(['jquery','sportTypeJQ','serviceTypeJQ','layerJQ'], function($) {			 
	$("#sub").click(function(){	
		var dataParams =  $("#siteinfo").serialize();
		/* var nickName = $("#nickName").val();
		if (nickName == null || nickName.value == ""
				|| nickName.length == 0) {
			//alert("邮箱/手机名为空！");
			layer.tips('请输入场馆名称！', '#nickName');
			return false;
		}
		alert($("input[type='checkbox'][name='venueType']:checked").attr("checked"));
		if(!$("input[type='checkbox'][name='venueType']:checked").attr("checked")){
		layer.tips('请输入运动类型！', '#sub');
		return false;
		} */
		if($.trim($("#nickName").val()) ==''){
			//alert($.trim($("#nickName").val()));
			//layer.tips('场地名字为空！', '#nickName'  , this, {guide: 3, time: 2});	
			layer.tips('场馆名字为空！', '#nickName');
			return false;
		}

		var nameLen= $("#nickName").val().length;
		if(nameLen > 20){
			layer.tips('场馆名称超过20字！', '#nickName');	
			return false;
		}

		var len= $("#descs").val().length;
		if(len > 2000){
			layer.tips('场地描述超过2000字！', '#descs');	
			return false;
		}

		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
		var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
		var str = $("#mobileNo").val();
		if (!phone_reg.test(str) && !tel_reg.test(str)) {		
			layer.tips('电话号码格式不对！', '#mobileNo');	
			return false;
		}
		jQuery.ajax({
			url:'/stadium/addOrUpdateStadiumInfo.do',
			type: 'POST',
			dataType :'json',
			data : dataParams,
			success : function(data){
				var jsonData=data.data;//eval("("+data+")");
				//console.log(jsonData);
				var message = data.message;
				layer.tips(message, '#sub');		
			},
			error :function(){	
				//alert('修改场馆信息失败！');
				layer.tips('修改场馆信息失败！', '#sub');
			}			
		});	
	});	
});

var checkNickName = function() {
	if($.trim($("#nickName").val()) ==''){
		layer.tips('场地名字为空！', '#nickName');	
		return false;
	}

	var nameLen= $("#nickName").val().length;
	if(nameLen > 20){
		layer.tips('场馆名称超过20字！', '#nickName');	
		return false;
	}

}

var checkDescsLen = function() {
	var len= $("#descs").val().length;
	//alert(len);
	if(len > 2000){
		layer.tips('场地描述超过2000字！', '#descs');	
		return false;
	}

}
var checkVenueTel = function() {
	var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
	//var tel_reg =/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;	
	var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
	var str = $("#mobileNo").val();
	if (!phone_reg.test(str) && !tel_reg.test(str)) {		
		layer.tips('电话号码格式不对！', '#mobileNo');	
		return false;
	}
}


