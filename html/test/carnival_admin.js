$(function () {
	checkLogin();
	loadTeamList();
	setOptions();
	$('.btns').on('click',function(){
		$("#currPage").val(1);
		loadTeamList();
		setOptions();
	});
	$('#submitFrom').on('click',function(){
		var id=$('#carId').val();
		var space = $('#space').val();
		var startTime = $('#startTime').val();
		$.post("/carnival/updateCarnivalStatus.do", {id:id,space:space,staTime:startTime},
				function(data){
			layer.msg(data.message);
			location.reload();
		});
	})

	$('.btnes').on('click',function(){
		var id=$('#carId').val();
		var againstCamp=$('#against_camp').val();
		var againstRoundb=$('#against_roundb').val();
		var againstRoundc=$('#against_roundc').val();
		var againstRoundd=$('#against_roundd').val();
		var againstOrder=$('#against_order').val();

        //alert(id + "=="+ againstCamp + "=="+ againstRoundb+ "=="+againstRoundc + "=="+ againstRoundd+ "=="+againstOrder);
		$.post("/carnival/updateInfo.do", {id:id,againstCamp:againstCamp,againstRoundb:againstRoundb,againstRoundc:againstRoundc,againstRoundd:againstRoundd,againstOrder:againstOrder},
				function(data){
			layer.msg(data.message)
			location.reload();
		});
	})
});

function checkLogin(){
	$.ajax({
		url: "/carnival/checkLogin.do",
		type: 'POST',
		dataType: 'json',
		success: function (data) {
			if(data.status == 500){
				window.location.href="carnival_login.html";
			}
		}
	});
}

function getCraId(id){
	$("#carId").val(id);
}
function showInfo(id){
	var id=$('#carId').val();
	$.post("/carnival/showInfo.do", {id:id},
			function(data){
		console.log(data.data);
		var againstCamp = data.data.againstCamp;
		var againstRoundb = data.data.againstRoundb;
		var againstRoundc = data.data.againstRoundc;
		var againstRoundd = data.data.againstRoundd;
		var againstOrder = data.data.againstOrder;
		//alert("jam"+id + "=="+ againstCamp + "=="+ againstRoundb+ "=="+againstRoundc + "=="+ againstRoundd+ "=="+againstOrder);
		if(data.data != null){
			$("#against_camp").val(againstCamp);
			$("#against_roundb").val(againstRoundb);
			$("#against_roundc").val(againstRoundc);
			$("#against_roundd").val(againstRoundd);
			$("#against_order").val(againstOrder);
			
		}
	});
}


function doLinkTo(page_Number){
	$("#currPage").val((page_Number+1));
	loadTeamList();
}

function loadTeamList(){
	var teamName = $("#teamName").val();
	var groups = $("#groups").val();
	var auditStatus = $("#auditStatus").val();
	var pageSize = $("#pageSize").val();
	var currPage = $("#currPage").val();
	$.ajax({
		url: "/carnival/againstTeamPageList.do",
		data: {teamName:teamName,groups:groups,auditStatus:auditStatus,pageSize:pageSize,currPage:currPage},
		type: 'POST',
		async: false,  //同步
		dataType: 'json',
		success: function (data) {
			//console.log(data.data);
			var total = data.data.total;
			var teamList = $("#teamList");
			teamList.empty();
			$.each(data.data.results, function(index, item) {
				var objHtml = "";
				var order = index + 1;
				var groups = item['groups'];
				var groupsName = '';
				switch (groups) {
				case 1:
					groupsName = '初中女子';
					break;
				case 2:
					groupsName = '初中男子';
					break;
				case 3:
					groupsName = '高中女子';
					break;
				case 4:
					groupsName = '高中男子';
					break;
				default:
					groupsName = '未知分组';
				}

				var teamName = item['teamName'];

				var childSex = item['childSex'];
				var sex = '';
				if(childSex == 0){
					sex = '男';
				}else if(childSex == 1){
					sex = '女';
				}

				var birthday = new Date(parseInt(item['childBirthday'])).toLocaleString();

				var auditStatus = item['auditStatus'];
				var auditStat= '';
				switch (auditStatus) {
				case 0:
					auditStat = '审核中';
					break;
				case 1:
					auditStat = '审核通过';
					break;
				default:
					auditStat = '未审核';
				}

//				if(index==0){
//				$("#container_block_l").html("<img src=/"+item['pic']+" style='width:716px; height:426px;'>");
//				}
				if(index%4 == 0){
					objHtml+="<tr class=\"success\">";
					objHtml+="<td>"+order+"</td>";
					objHtml+="<td>"+groupsName+"</td>";
					objHtml+="<td>"+teamName+"</td>";
					objHtml+="<td>"+item['childName']+"</td>";
					objHtml+="<td>"+sex+"</td>";
					objHtml+="<td>"+item['childSchool']+"</td>";
					objHtml+="<td>"+birthday+"</td>";
					objHtml+="<td>"+item['childStudentCard']+"</td>";
					objHtml+="<td>"+item['childIdCard']+"</td>";
					objHtml+="<td>"+item['father']+"</td>";
					objHtml+="<td>"+item['mother']+"</td>";
					objHtml+="<td>"+item['contact']+"</td>";
					objHtml+="<td>"+item['address']+"</td>";
					if(auditStatus ==0){
						objHtml+="<td><h5 style=\"color:#FF0000\">"+auditStat+"</h5></td>";
					}else{
						objHtml+="<td>"+auditStat+"</td>";
					}
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModal\">审核通过</button></td>";
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"'),showInfo('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModel\">修改</button></td>";
					objHtml+="</tr>";
				}else if(index%4 == 1){
					objHtml+="<tr class=\"info\">";
					objHtml+="<td>"+order+"</td>";
					objHtml+="<td>"+groupsName+"</td>";
					objHtml+="<td>"+teamName+"</td>";
					objHtml+="<td>"+item['childName']+"</td>";
					objHtml+="<td>"+sex+"</td>";
					objHtml+="<td>"+item['childSchool']+"</td>";
					objHtml+="<td>"+birthday+"</td>";
					objHtml+="<td>"+item['childStudentCard']+"</td>";
					objHtml+="<td>"+item['childIdCard']+"</td>";
					objHtml+="<td>"+item['father']+"</td>";
					objHtml+="<td>"+item['mother']+"</td>";
					objHtml+="<td>"+item['contact']+"</td>";
					objHtml+="<td>"+item['address']+"</td>";
					if(auditStatus ==0){
						objHtml+="<td><h5 style=\"color:#FF0000\">"+auditStat+"</h5></td>";
					}else{
						objHtml+="<td>"+auditStat+"</td>";
					}
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModal\">审核通过</button></td>";
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"'),showInfo('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModel\">修改</button></td>";
					objHtml+="</tr>";
				}else if(index%4 == 2){
					objHtml+="<tr class=\"error\">";
					objHtml+="<td>"+order+"</td>";
					objHtml+="<td>"+groupsName+"</td>";
					objHtml+="<td>"+teamName+"</td>";
					objHtml+="<td>"+item['childName']+"</td>";
					objHtml+="<td>"+sex+"</td>";
					objHtml+="<td>"+item['childSchool']+"</td>";
					objHtml+="<td>"+birthday+"</td>";
					objHtml+="<td>"+item['childStudentCard']+"</td>";
					objHtml+="<td>"+item['childIdCard']+"</td>";
					objHtml+="<td>"+item['father']+"</td>";
					objHtml+="<td>"+item['mother']+"</td>";
					objHtml+="<td>"+item['contact']+"</td>";
					objHtml+="<td>"+item['address']+"</td>";
					if(auditStatus ==0){
						objHtml+="<td><h5 style=\"color:#FF0000\">"+auditStat+"</h5></td>";
					}else{
						objHtml+="<td>"+auditStat+"</td>";
					}
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModal\">审核通过</button></td>";
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"'),showInfo('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModel\">修改</button></td>";
					objHtml+="</tr>";
				}else if(index%4 == 3){
					objHtml+="<tr class=\"warning\">";
					objHtml+="<td>"+order+"</td>";
					objHtml+="<td>"+groupsName+"</td>";
					objHtml+="<td>"+teamName+"</td>";
					objHtml+="<td>"+item['childName']+"</td>";
					objHtml+="<td>"+sex+"</td>";
					objHtml+="<td>"+item['childSchool']+"</td>";
					objHtml+="<td>"+birthday+"</td>";
					objHtml+="<td>"+item['childStudentCard']+"</td>";
					objHtml+="<td>"+item['childIdCard']+"</td>";
					objHtml+="<td>"+item['father']+"</td>";
					objHtml+="<td>"+item['mother']+"</td>";
					objHtml+="<td>"+item['contact']+"</td>";
					objHtml+="<td>"+item['address']+"</td>";
					if(auditStatus ==0){
						objHtml+="<td><h5 style=\"color:#FF0000\">"+auditStat+"</h5></td>";
					}else{
						objHtml+="<td>"+auditStat+"</td>";
					}
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModal\">审核通过</button></td>";
					objHtml+="<td><button id=\"sub\" type=\"button\" onclick=\"getCraId('"+item['id']+"'),showInfo('"+item['id']+"')\" data-toggle=\"modal\" data-target=\"#myModel\">修改</button></td>";
					objHtml+="</tr>";
				}
				teamList.append(objHtml);
			});
			//console.log($("#maxitems")+"total"+total);
			$("#maxitems").val(total);
		}
	});
}
