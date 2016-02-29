$(document).ready(function() {
	queryby();
	setOptions();

	$("#query").click(function(){
		queryby();
	});

	$("#pageSelect").change(function(){
		$("#pageSize").val($(this).val());
		$("#currPage").val(1);
		$("#items_per_page").val($(this).val());
		queryby();
		setOptions();
	});

	//页面加载时显示我创建的战队			
	$.ajax({
		async : false, //async异步 false
		type : "Post", //提交数据的类型 POST GET
		url : "/user/team/list.do",//提交的网址
		data :null,//提交的数据
		datatype : "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
		success : function(data) {//成功返回之后调用的函数
			//console.log(data);
			if(data != null){
				var jsondata = data.data;
				//console.log(jsondata.length);
				if(jsondata !=null){
					//alert(jsondata.length);
				for(var i = 0;i <jsondata.length;i++){
					//alert(jsondata[i].sportName);
					//console.log(jsondata[i].sportName);

					$("#myCreateTeam").append("<div onclick=\"findTeam('"+jsondata[i].id+"','myteam')\" style='cursor:pointer;' id ='"+jsondata[i].id + "' name='"+jsondata[i].id + "' class='block'><div style='height:100px; width:100%;'><div style='float:left; margin-right:4px;'><img onerror=this.src='/images/mycrops.png' src='"+jsondata[i].thumbnail + "' width='94' height='100'/></div><div style='float:left; '><p style='width:126px; white-space: nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:20px;'>战队:<span style='  font-size:14px;' id = 'teamName' name = 'teamName'>"+jsondata[i].teamName+"</span></p><p style=' font-size:12px; line-height:20px;'>战队类型:<span style=' font-size:12px;' id = 'teamType' name = 'teamType'>"+jsondata[i].sportName+"</span></p><p style=' font-size:12px;line-height:20px;'>战队人数:<span style=' font-size:12px;' id = 'teamNum' name = 'teamNum'>"+jsondata[i].joinNum+"/"+jsondata[i].maxNum+"</span></p><p style=' font-size:12px;line-height:20px;'>联系电话:<span style=' font-size:12px;' id = 'teamTel' name = 'teamTel'>"+jsondata[i].contact+"</span></p></div></div><div style='font-size:12px;    height:50px; width:97%;overflow:hidden; margin:0 auto; margin-top:10px; '>"+jsondata[i].warDesc+"</div></div>"); 
					var teamId = jsondata[i].id;
					//alert(teamId);

				}	
				}
			}
			//alert(data.message);
			//layer.tips(data.message, '#confirm');	
			window.parent.iFrameHeight();
			//layer.iframeAuto(index);
		}
	});	

	//页面加载时显示我已经加入的战队			
	$.ajax({
		async : false, //async异步 false
		type : "Post", //提交数据的类型 POST GET
		url : "/user/team/joinlist.do",//提交的网址
		data :null,//提交的数据
		datatype : "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
		success : function(data) {//成功返回之后调用的函数
			//console.log(data);
			if(data != null){
				var jsondata = data.data;
				//console.log(jsondata.length);
				if(jsondata != null){
					for(var i = 0;i <jsondata.length;i++){
						//alert(jsondata[i].sportName);
						//console.log(jsondata[i].sportName);
						$("#myJoinTeam").append("<div onclick=\"findTeam('"+jsondata[i].id+"','jointeam')\" style='cursor:pointer;' id ='"+jsondata[i].id + "' name='"+jsondata[i].id + "' class='block'><div style='height:100px; width:100%;'><div style='float:left; margin-right:4px;'><img onerror=this.src='/images/mycrops.png' src='"+jsondata[i].thumbnail + "' width='94' height='100'/></div><div style='float:left; '><p style='width:126px; white-space: nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:20px;'>战队:<span style='  font-size:14px;' id = 'teamName' name = 'teamName'>"+jsondata[i].teamName+"</span></p><p style=' font-size:12px; line-height:20px;'>战队类型:<span style=' font-size:12px;' id = 'teamType' name = 'teamType'>"+jsondata[i].sportName+"</span></p><p style=' font-size:12px;line-height:20px;'>战队人数:<span style=' font-size:12px;' id = 'teamNum' name = 'teamNum'>"+jsondata[i].joinNum+"/"+jsondata[i].maxNum+"</span></p><p style=' font-size:12px;line-height:20px;'>联系电话:<span style=' font-size:12px;' id = 'teamTel' name = 'teamTel'>"+jsondata[i].contact+"</span></p></div></div><div style='font-size:12px;    height:50px; width:97%;overflow:hidden; margin:0 auto; margin-top:10px; '>"+jsondata[i].warDesc+"</div></div>"); 				
					}	
				}
			}				
			//alert(data.message);
			//layer.tips(data.message, '#confirm');	
			window.parent.iFrameHeight();
			//layer.iframeAuto(index);
		}
	});	

	//页面加载时显示我可以加入的战队			
	/* $.ajax({
			async : false, //async异步 false
			type : "Post", //提交数据的类型 POST GET
			url : "/user/team/findTeams.do",//提交的网址
			data :null,//提交的数据
			datatype : "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
			success : function(data) {//成功返回之后调用的函数
				//console.log(data);
				var jsondata = data.data;
				//console.log(jsondata.length);
				//for(var i = 0;i <jsondata.length;i++){
				//alert(jsondata[i].sportName);
				//console.log(jsondata[i].sportName);
				//$("#myJoinTeam").append("<div onclick=\"findTeam('"+jsondata[i].id+"')\" style='cursor:pointer;' id ='"+jsondata[i].id + "' name='"+jsondata[i].id + "' class='block'><div style='height:100px; width:100%;'><div style='float:left; margin-right:4px;'><img src='"+jsondata[i].thumbnail + "' width='94' height='100'/></div><div style='float:left; '><p style='width:126px; white-space: nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:20px;'>战队:<span style='  font-size:14px;' id = 'teamName' name = 'teamName'>"+jsondata[i].teamName+"</span></p><p style=' font-size:12px; line-height:20px;'>战队类型:<span style=' font-size:12px;' id = 'teamType' name = 'teamType'>"+jsondata[i].sportName+"</span></p><p style=' font-size:12px;line-height:20px;'>战队人数:<span style=' font-size:12px;' id = 'teamNum' name = 'teamNum'>"+jsondata[i].joinNum+"/"+jsondata[i].maxNum+"</span></p><p style=' font-size:12px;line-height:20px;'>联系电话:<span style=' font-size:12px;' id = 'teamTel' name = 'teamTel'>"+jsondata[i].contact+"</span></p></div></div><div style='font-size:12px;    height:50px; width:97%;overflow:hidden; margin:0 auto; margin-top:10px; '>"+jsondata[i].warDesc+"</div></div>"); 				
				}				
				//alert(data.message);
				//layer.tips(data.message, '#confirm');				
			//}
			});	 */
	//根据用户名或类型模糊查找战队
	/* $('#findTeam').click(function() {
		var  teaminfo = $("#teaminfo").val();
			$.ajax({
			async : false, //async异步 false
			type : "Post", //提交数据的类型 POST GET
			url : "/SMS/findTeam.do",//提交的网址
			data : {
				"validateCode" : validateCode
			},//提交的数据
			datatype : "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
			success : function(data) {//成功返回之后调用的函数
				//alert(data.message);
				layer.tips(data.message, '#confirm');
				//console.log(data);
				//var jsondata = eval("(" + data + ")").message;
				//alert("jsondata=" + jsondata);
			}
		});
	}); */
});

function doLinkTo(page_Number){
	$("#currPage").val((page_Number+1));
	queryby();
}
//页面加载时显示我可以加入的战队		
function queryby(){
	var dataParams =  $("#_queryForm").serialize();
	$("#join_team").html("");
	$("#team_member").html("");
	$.ajax({
		async : false, //async异步 false
		type : "Post", //提交数据的类型 POST GET
		url : "/user/team/findTeams.do",//提交的网址
		data :dataParams,//提交的数据
		datatype : "JSON",//"xml", "html", "script", "json", "jsonp", "text".//返回数据的格式
		success : function(data) {//成功返回之后调用的函数
			//console.log(data);
			if(data != null){
				var jsondata = data.data;
				var res = jsondata.results;

				//console.log(res.length);
				//console.log(jsondata.length);
				//for(var i = 0;i <jsondata.length;i++){
				//alert(jsondata[i].sportName);
				//console.log(jsondata[i].sportName);
				//$("#join_team").append("<div onclick=\"findTeam('"+jsondata[i].id+"')\" style='cursor:pointer;' id ='"+jsondata[i].id + "' name='"+jsondata[i].id + "' class='block'><div style='height:100px; width:100%;'><div style='float:left; margin-right:4px;'><img src='"+jsondata[i].thumbnail + "' width='94' height='100'/></div><div style='float:left; '><p style='width:126px; white-space: nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:20px;'>战队:<span style='  font-size:14px;' id = 'teamName' name = 'teamName'>"+jsondata[i].teamName+"</span></p><p style=' font-size:12px; line-height:20px;'>战队类型:<span style=' font-size:12px;' id = 'teamType' name = 'teamType'>"+jsondata[i].sportName+"</span></p><p style=' font-size:12px;line-height:20px;'>战队人数:<span style=' font-size:12px;' id = 'teamNum' name = 'teamNum'>"+jsondata[i].joinNum+"/"+jsondata[i].maxNum+"</span></p><p style=' font-size:12px;line-height:20px;'>联系电话:<span style=' font-size:12px;' id = 'teamTel' name = 'teamTel'>"+jsondata[i].contact+"</span></p></div></div><div style='font-size:12px;    height:50px; width:97%;overflow:hidden; margin:0 auto; margin-top:10px; '>"+jsondata[i].warDesc+"</div></div>"); 						$("#join_team").append("")				
				//联系电话为空时输出空字符窜
				for(var i = 0;i <res.length;i++){
					var teamName = res[i].teamName;
					if(teamName == null){
						teamName = '';
					}
					var sportName = res[i].sportName;
					if(sportName == null){
						sportName = '';
					}
					var tel = res[i].telephone;
					if(tel == null){
						tel = '';
					}
					var joinNum = res[i].joinNum;
					if(joinNum == null){
						joinNum = 0;
					}
					var maxNum = res[i].maxNum;
					if(maxNum == null){
						maxNum = 0;
					}
					var userAccountId = res[i].userAccountId;
					if(userAccountId != null){
					$("#join_team").append("<div class=\"list\" style=\"height:100px; width:100%; height:100%;overflow:hidden; margin-bottom:15px;\">\
							<div style=\"float:left; margin-right:4px;margin-top:5px;\">\
							<img onerror=this.src='/images/mycrops.png' src='"+res[i].thumbnail + "' width=\"60\"\
							height=\"60\" />\
							</div>\
							<div style=\"float:left; \">\
							\ <p style=\"width:126px; white-space:nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:20px;\">\
							战队:<span style=\"  font-size:10px;\">\
							"+ teamName + "\
							</span>\
							</p>\
							<p style=\" font-size:10px; line-height:15px;\">\
							战队类型:\
							<span style=\" font-size:10px;\"> "+ sportName + "\</span>\
							</p>\
							<p style=\" font-size:10px;line-height:15px;\">\
							战队人数:<span style=\" font-size:10px;\">\
							"+ joinNum + "/"+ maxNum + "\
							</span>\
							</p>\
							<p style=\" font-size:10px;line-height:15px;\">\
							联系电话:<span style=\" font-size:10px;\">\
							"+tel + "\
							</span>\
							</p>\
							</div>\
							<div style=\"clear:both;\"></div>\
							<div onclick=\"joinTeam('"+res[i].id+"','"+res[i].sportId+"')\"  id ='"+res[i].id + "' name='"+res[i].id + "' style=\"width:100%;background-color:rgb(207,0,57);margin-top:5px; height:25px; line-height:25px; color:#fff; text-align:center;cursor:pointer;\">\
							加入战队\
							</div>\
							</div>"
					);
					}
					
				}	
			}
			window.parent.iFrameHeight();
			//layer.iframeAuto(index);
		}
	//layer.tips(data.message, '#confirm');				
	//}
	});
}

//查询战队成员信息
function findTeam(teamId,teamType){	
	$("#join_team").html("");
	$("#team_member").html("");
	jQuery.ajax({
		url : "/user/team/showMembersInfo.do",//提交的网址
		type: 'POST',
		dataType :'json',
		data : {"id" : teamId},//提交的数据
		success : function(data){
			if(data != null){
				var jsonData=data.data;
				//console.log(jsonData.length);
				var objHtml = "";
				for(var i = 0;i <jsonData.length;i++){
					objHtml += "<div style='height:100px; width:100%; height:100%; overflow:hidden;'>";
					objHtml +="<div style='float:left; margin-right:4px;margin-top:5px;'><img onerror=this.src='/images/default.png' src='"+jsonData[i].userImage + "' width='60' height='60'></div>";
					objHtml +="<div style='float:left; '>";
					objHtml +="<p style='width:126px; white-space: nowrap;overflow:hidden;text-overflow:ellipsis; font-size:12px;line-height:22px;'>";
					objHtml +="昵称:<span style='font-size:10px;'>";
					//昵称为空时输出空字符窜
					if(jsonData[i].nickName == null){
						objHtml += "";
					}else{
						objHtml += jsonData[i].nickName;	
					}
					objHtml +="</span></p>";
					objHtml +="<p style=' font-size:10px; line-height:22px;'>";
					objHtml +="职称:";
					objHtml +="<span style=' font-size:10px;'>";
					if(jsonData[i].teamPosition == 1){
						objHtml +="队长";	
					}else if(jsonData[i].teamPosition == 2){
						objHtml +="副队长";	
					}else{
						objHtml +="普通队员";		
					}
					objHtml +="</span>";
					objHtml +="</p>";
					objHtml +="</div>";
					objHtml +="<div style='clear:both;'></div>";
					objHtml +="</div>";
				}
				if(teamType=="myteam"){
					$("#team_member").html(objHtml);	
				}else{
					$("#join_team").html(objHtml);
				}

			}
			window.parent.iFrameHeight();
			//layer.iframeAuto(index);
		}
	});
}

//加入战队
function joinTeam(teamId,sportId){
	if(confirm('是否需要加入？')){
		//alert(sportId);	
		jQuery.ajax({
			url : "/user/team/join.do",//提交的网址
			type: 'POST',
			dataType :'json',
			async:false,
			data : {"teamId" : teamId,"sportId" : sportId},//提交的数据
			success : function(data){
				var status = data.status;
				if(status==200){
					//layer.alert(data.message, {icon: 1});  //icon: 1 显示对勾
				/*	layer.confirm(data.message, {icon: 1},function(){
						//var user_ifr = parent.window.document.getElementById("user_ifr");
						//$(user_ifr).attr("src","myJoinCrops.html");
					    //layer.close(index);
						 window.location.href = "myJoinCorps.html"; 
					}); */    
					
					layer.alert(data.message, {icon: 1});  //icon: 1 显示对勾
					 //layer.msg(data.message, {icon: 1});
					 window.location.href = "myJoinCorps.html"; 
				}else{
					layer.alert(data.message, {icon: 2});  //icon: 2显示叉叉
					//layer.msg(data.message, {icon: 2});
				}
				//alert(data.message);
				//layer.msg(data.message, 1, 1);
				//window.location.reload();
				//parent.location.reload();
				//window.parent.iFrameHeight();
				//layer.iframeAuto(index);
				
			}
		});
	}

}