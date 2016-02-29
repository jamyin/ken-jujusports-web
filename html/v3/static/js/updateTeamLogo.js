$(function(){
	//上传
	$("#team_logo_file").on("change",function(){
		$("#team_logo").click();
	});
	
	$("#team_logo").upload({
        uploadData: { id: "10010" },
        successFn: "success",
        deleteData: { id: function () { 
        	return "yin" } }
	});
	//上传成功后执行该函数
	function success(response, statusText, xhr, $this) {
	    //比如插入编辑器
	    //alert(response.Data.RelativePath + $this.attr("value"))
		//console.log("response="+response+"statusText="+statusText+"xhr="+xhr+"$this="+$this);
	}
	//更新队徽
	$("#save_teamLogo").on('click', function(){
		//检查上传teamLogo是否为空
		var logo =  $("#team_logo_img").attr("src");
		if(logo ==="/static/img/preview.png" || logo ==null){
			layer.msg("请选择要上传的图片!");
			return;
		}
		var id = $('[name=id]').val();
		$.ajax({
			url:"/team/edit.htm",//提交的网址
			type: 'POST',  
			dataType: 'json', 
			async: false,
			data:{"logo":logo,"id":id},//提交的数据
			success: function(data){
				console.log(data.data);
				layer.msg("上传球队队徽成功！");
				
			},error :function(){
				layer.msg("系统错误！", 1, 1);
			}
		});
	});
	
	//取消
	$("#cancel_teamLogo").on('click', function(){
		$("#team_logo_img").attr("src","/static/img/preview.png");

	});
	
});

