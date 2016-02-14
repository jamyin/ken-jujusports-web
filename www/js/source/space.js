requirejs.config({
    baseUrl: '../js',
    paths: {
        jquery: 'module/jquery-1.11.1.min'
    }
});

/*
 * 模拟复选框
 */
requirejs(['jquery'], function($) {
		  jQuery.ajax({
				url: '/sportType/list.do',  
                type: 'POST',  
                dataType: 'json',    
                success: function(data){
					$("#ul1").html('');
					var c = "<ul><li onclick=\"sel('sel_text', this, 'ul1', 'sel_img1_1', '/images/hui1.png', 'sel_img1_2','-1','')\" onmouseover=\"    this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">选择体育项目</li>";
   
					var jsonData=data.data;//eval("("+data+")");
					console.log(jsonData);
					 for(var i=0;i<jsonData.length;i++){
						c+="<li onclick=\"sel('sel_text', this, 'ul1', 'sel_img1_1', '/images/hui1.png', 'sel_img1_2','"+jsonData[i].id+"','')\" onmouseover=\"    this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">"+jsonData[i].sportName+"</li>";
						// $("#sportEventSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].sportName+"</option>");
					}
					c+="</ul>";
					$("#ul1").html(c);    
				},error :function(){
					alert('error');
				} 
			});
		  
		  var countryId = $("#countryId").val();
			jQuery.ajax({
				url:'/address/list.do',
				type: 'POST',
				dataType :'json',
				data : {level:3,parentId:countryId},
				success : function(data){
					var d="<ul><li onclick=\"sel('sel_text1', this, 'ul2', 'sel_img2_1', '/images/hui2.png', 'sel_img2_2','-1','')\" onmouseover=\"this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">选择地区</li>";
						var jsonData = data.data;//eval("("+data+")");
						 for(var i=0;i<jsonData.length;i++){
							 d+="<li onclick=\"sel('sel_text1', this, 'ul2', 'sel_img2_1', '/images/hui2.png', 'sel_img2_2','"+jsonData[i].id+"','"+jsonData[i].name+"')\" onmouseover=\"this.style.backgroundColor = '#cf0039'; this.style.color = '#ffffff'\"onmouseout=\"this.style.backgroundColor = 'rgb(250,247,247)'; this.style.color = ''\">"+jsonData[i].name+"</li>";
							 //$("#districtSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
					}
					d+="</ul>";
					$("#ul2").html(d);
				}
				
			});	  
});

/*requirejs(['jquery'], function($) {
	$("#sportEventSel").change(function(){
		var sportTxt=$("#citySel").find("option:selected").val();
		jQuery.ajax({
			url:'/address/list.do',
			type: 'POST',
			dataType :'json',
			data : {level:3,parentId:sportTxt},
			success : function(data){
				$("#districtSel").html('');	
				$("#districtSel").append("<option value=\'-1\'>请选择</option>");  
				$("#spaceSel").html('');				
				$("#spaceSel").append("<option value=\'-1\'>请选择</option>");		
					var jsonData = data;//eval("("+data+")");
					 for(var i=0;i<jsonData.length;i++){
						 $("#districtSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
			
		});
	});

});	*/




/*
 * 模拟城市选择
 */
 
/*requirejs(['jquery'], function($) {
	$("#citySel").change(function(){
		var sportTxt=$("#citySel").find("option:selected").val();
		jQuery.ajax({
			url:'/address/list.do',
			type: 'POST',
			dataType :'json',
			data : {level:3,parentId:sportTxt},
			success : function(data){
				$("#districtSel").html('');
				$("#districtSel").append("<option value=\'-1\'>请选择</option>");    
					var jsonData = data;//eval("("+data+")");
					 for(var i=0;i<jsonData.length;i++){
						 $("#districtSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].name+"</option>");    
				}
			}
			
		});
	});

});	
requirejs(['jquery'], function($) {
	$("#districtSel").change(function(){
		var disTxt=$("#districtSel").find("option:selected").val();
		var cityTxt=$("#citySel").find("option:selected").val();
		var sportTxt=$("#sportEventSel").find("option:selected").val();		
		alert(cityTxt);
		jQuery.ajax({
			url:'/stadium/findStadByAdd.do',
			type:'POST',
			dataType :'json',
			data :{cityid:cityTxt,countryid:disTxt,venueType:sportTxt},
			success : function(data){
				$("#spaceSel").html('');
				$("#spaceSel").append("<option value=\'-1\'>请选择</option>");  
				var jsonData = eval("("+data+")");
				for(var i=0;i<jsonData.length;i++){
					$("#spaceSel").append("<option value=\'"+jsonData[i].id+"\'>"+jsonData[i].nickName+"</option>");    
				}
			}
		});
	});
});*/

requirejs(['jquery'], function($) {
	$("#spaceSearchBtn").click(function(){
		var Txt = $("#spaceSearchTxt").val();
		if(Txt==null){
			alert('信息不能为空!');
		}else{
		jQuery.ajax({
			url:'/stadium/findStadByName.do',
			type:'POST',
			dataType :'json',
			data :{nickName:Txt},
			success : function(data){
				if(data==200){
				location.href="/app/space.html";	
				}
				
				else{
					alert("查询场馆失败")
				}
			}
		});
		}
	});
});	

requirejs(['jquery'], function($) {
	$("#query").click(function(){
		var spaceTxt=$("#spaceSel").find("option:selected").val();	
		location.href="/stadium/"+spaceTxt+".do";
	});
});	


