function piclist(id,teamId){
	 var spostForm = document.createElement("form");
	 spostForm.action = "/album/picList.htm";        
	 spostForm.method = "post";        
	 spostForm.style.display = "none";
	 
	 var input_team = document.createElement("input");
	 input_team.type = 'hidden';
	 input_team.name = 'teamId';
	 input_team.value = teamId;
	 
	 var input_id= document.createElement("input");
	 input_team.type = 'hidden';
	 input_team.name = 'id';
	 input_id.value = id;
	 
	 spostForm.appendChild(input_team);
	 spostForm.appendChild(input_id);
	 
	 document.body.appendChild(spostForm);
	 spostForm.submit();
	//location.href = '/album/picList.htm?id='+id;
}