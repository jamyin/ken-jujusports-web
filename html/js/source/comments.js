requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: '/js/juju/jquery-2.1.3.min',
		jquerys:'/js/juju/layer/layer.min'
    }
});
requirejs(['jquery','jquerys'], function($) {
		var ownerAccountId = $("#ownerAccountId").val();
		var pageSize =$("#pageSize").val();
		var currPage = $("#currPage").val();
		
		
		jQuery.ajax({
			url: '/api/message/findMessByOwner.do',  
                type: 'POST',
                dataType: 'json', 
				data:{msgToId:ownerAccountId,pageSize:pageSize,currPage:currPage},
                success: function(data){
						var myObject = data.data;
						console.log(myObject);
						var Obj = myObject.results;
						var a='';
						for(var i =0;i<Obj.length;i++){ 
							a+="<p><img src=\""+Obj[i].userImg+"\"/><img src=\"/images/xing"+Obj[i].msgScore+".png\"/></br>"+Obj[i].userAccount+":"+Obj[i].msgContent+"</p>";
						}
						$("#pinlunDiv").html(a);
						var b="<a href=\"javascript:void(0)\" onClick=\"findMore()\">共有"+myObject.total+"条,点击加载更多</a>";
						$("#jiazai").html('');
						$("#jiazai").html(b);
						$("#currPage").val(myObject.currPage);
			    }
		});
});	

requirejs(['jquery','jquerys'], function($) {

		 $("#subBtn").click(function(){
			 var ownerAccountId = $("#ownerAccountId").val();
			var stars2 = $("#stars2-input").val();
			console.log("================"+stars2);
			var contents = $("#contents").val();
			if(contents.length>140){
				alert('评论字数不能超过140字');
				return false;
			}else{
				jQuery.ajax({
				url: '/api/message/insert.do',  
                type: 'POST',
                dataType: 'json', 
				data:{msgToId:ownerAccountId,msgContent:contents,msgScore:stars2},
                success: function(data){
					console.log(data);
					var myObject = data.message;
					if(myObject==401){
						alert('用户未登录!');
					}else if(myObject==402){
						alert('登录用户不是普通用户');
					}else if(myObject==200){
						location.href="/stadium/"+ownerAccountId+".do";
					}
				}
				});	
			}
			 
		 });
});



