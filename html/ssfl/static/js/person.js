$(function() {
	
	//点击编辑按钮时回显值
	$("#edit").on('click', function(){
		//debugger;
		//显示省
		//var pchoose = "<option value=''>请选择</option>";
		$.ajax({
			url:'/address/findAddress.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:{level:1},
			success:function(data){
				//console.log(data.data);
				//var innerHtml  = pchoose;
				var provinceHidd = 	$("#provinceHidd").val();
				var innerHtml  = "";
				for(var i=0;i < data.data.length;i++){
					if(provinceHidd == data.data[i].id){
						innerHtml += "<option  selected ='selected' value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
					}else{
						innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
					}
					//innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
				}
				$("#province").html(innerHtml);
				//显示市
				var areaHidd = 	$("#areaHidd").val();
				var province = 	$("#province").val();
				$.ajax({
					url:'/address/findAddress.htm',
					type: 'POST',  
					dataType: 'json',
					async:false,
					data:{level:2,parentId:province},
					success:function(data){
						//console.log(data.data);
						//var innerHtml  = pchoose;
						var innerHtml  = "";
						for(var i=0;i < data.data.length;i++){
							if(areaHidd ==data.data[i].id){
								innerHtml += "<option selected ='selected' value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
							}else{
								innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
							}
							//innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
						}
						$("#area").html(innerHtml);
						var locationHidd = 	$("#locationHidd").val();
						var area = 	$("#area").val();
						//显示区
						$.ajax({
							url:'/address/findAddress.htm',
							type: 'POST',  
							dataType: 'json',
							async:false,
							data:{level:3,parentId:area},
							success:function(data){
								//console.log(data.data);
								//var innerHtml  = pchoose;
								var innerHtml  = "";
								for(var i=0;i < data.data.length;i++){
									if(locationHidd ==data.data[i].id){
										innerHtml += "<option selected ='selected' value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
									}else{
										innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
									}
									//innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
								}
								$("#location").html(innerHtml);
							}
						})
					}
				})
			}
		})
	});
	
	
	
	//选择省份时  --市区级联
	$("#province").change(function(){ 
		var province = 	$("#province").val();
		var choose = "";
		$("#area").html(choose);
		$("#location").html(choose);
		$.ajax({
			url:'/address/findAddress.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:{level:2,parentId:province},
			success:function(data){
				//console.log(data.data);
				var innerHtml  = choose;
				for(var i=0;i < data.data.length;i++){
					innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
				}
				$("#area").html(innerHtml);
				var area = 	$("#area").val();
				$.ajax({
					url:'/address/findAddress.htm',
					type: 'POST',  
					dataType: 'json',
					async:false,
					data:{level:3,parentId:area},
					success:function(data){
						var innerHtml  = choose;
						for(var i=0;i < data.data.length;i++){
							innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
						}
						$("#location").html(innerHtml);
					}
				})
			}
		})
		
	});
	
	//省市县级联查询  --查询地区
	$("#area").change(function(){ 
		var level = 3;
		var area = 	$("#area").val();
		//console.log("parentId="+parentId);
		var choose = "";
		$("#location").html(choose);
		$.ajax({
			url:'/address/findAddress.htm',
			type: 'POST',  
			dataType: 'json',
			async:false,
			data:{level:level,parentId:area},
			success:function(data){
				var innerHtml  = choose;
				for(var i=0;i < data.data.length;i++){
					innerHtml += "<option value='"+ data.data[i].id +"' title='"+ data.data[i].name +"'>"+data.data[i].name+"</option>";
				}
				$("#location").html(innerHtml);
			}
		})
	});
	init();  //初始化
});

//初始化
function init() {
    //初始化图片上传
    var btnImg = $("#user-flag");
    var img = $("#imgShow");
    var hidImgName = $("#hidImgName");
 //   document.getElementById("btnDeleteImg").onclick = function() { DelImg(img, hidImgName); };
    g_AjxUploadImg(btnImg, img[0], hidImgName);
}
//图片上传
function g_AjxUploadImg(btn, img, hidPut) {
    var button = btn, interval;
    new AjaxUpload(button, {
        action: '/file/upload.htm',
        data: {},
        name: 'myfile',
        onSubmit: function(file, ext) {
            if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF)$/.test(ext))) {
                layer.msg("您上传的图片格式不对，请重新选择！");
                return false;
            }
        },
        onComplete: function(file, response) {
            var reg = /<[^>]*>/g;
        	var result =response;
        	var data = JSON.parse(result.replace(reg,""))
        	var imgurl =data.filePath;
            flagValue = response;
            if (flagValue == "1") {
                layer.msg("您上传的图片格式不对，请重新选择！");
            }
            else if (flagValue == "2") {
                layer.msg("您上传的图片大于200K，请重新选择！");
            }
            else if (flagValue == "3") {
                layer.msg("图片上传失败！");
            }
            else {
            	//console.log(imgurl);
                hidPut.value = imgurl;
                $("#hidImgName").val(imgurl);
                //img.src = g_AjxTempDir + data.data;
                img.src =  imgurl;
            }
        }
    });
}
