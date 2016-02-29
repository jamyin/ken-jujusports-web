//ajax分页   图片 
	function pageInfo(result){
		var appendText =""
		var show_num = 7;
		if(result!= null && result.total>0){
			appendText += "<div class=\"pagenav herald\">";
			if(result.currPage>1){
				appendText += "<a href=\"javascript:gotoPage("+1+")\">首页</a>";
			}else{
				appendText += "<a href=\"javascript:;\">首页</a>";
			}
		 	if((result.currPage - 1) >0){
				appendText += "<a href=\"javascript:gotoPage("+(result.currPage - 1)+")\">上一页</a>";
			}else{
				appendText += "<a href=\"javascript:;\">上一页</a>";
			}
			//小于7
			if(result.totalPage < show_num){
				for (var i = 0; i < result.totalPage; i++) {
					if((i+1)==result.currPage){
						appendText +="<a class=\"cur\" href=\"javascript:gotoPage("+(i+1)+")\">"+(i+1)+"</a>"
					}else{
						appendText +="<a href=\"javascript:gotoPage("+(i+1)+")\">"+(i+1)+"</a>"
					}
				}	
			}else{
			 if(result.currPage<=((show_num+1)/2)){
					for (var i = 0; i < (result.currPage-1); i++) {
						appendText +="<a href=\"javascript:gotoPage("+(i+1)+")\">"+(i+1)+"</a>"
					}
					appendText +="<a class=\"cur\" href=\"javascript:gotoPage("+result.currPage+")\">"+result.currPage+"</a>"
					for (var i = 0; i < (show_num-result.currPage); i++) {
						appendText +="<a href=\"javascript:gotoPage("+(result.currPage+(i+1))+")\">"+(result.currPage+(i+1))+"</a>"
					}
				}else{
					if((result.totalPage-result.currPage) < ((show_num-1)/2)){
						for (var i = (result.totalPage-show_num+1); i <= result.totalPage; i++) {
							if(i == result.currPage){
								appendText +="<a class=\"cur\">"+i+"</a>"
							}else{
								appendText +="<a href=\"javascript:gotoPage("+i+")\">"+i+"</a>"
							}
						}
					}else{
						for (var i =((show_num-1)/2); i >0 ; i--) {
							appendText +="<a href=\"javascript:gotoPage("+(result.currPage - i)+")\">"+(result.currPage - i)+"</a>"
						}
						appendText +="<a class=\"cur\">"+result.currPage+"</a>";
					    for (var i = 1; i <= ((show_num-1)/2); i++) {
							appendText +="<a href=\"javascript:gotoPage("+(result.currPage + i)+")\">"+(result.currPage + i)+"</a>"
						} 
					}
				} 
			}
			
			if((result.currPage + 1) <= result.totalPage){
				appendText +="<a href=\"javascript:gotoPage("+(result.currPage + 1)+")\">下一页</a>";
			}else{
				appendText +="<a href=\"javascript:;\">下一页</a>"
			}
			if(result.currPage<=result.totalPage){
				appendText +="<a href=\"javascript:gotoPage("+result.totalPage+")\">末页</a>";
			}else{
				appendText +="<a href=\"javascript:;\">末页</a>"
			}
		}
		return appendText;
	}
	
	//ajax分页   视频 
	function pageInfoVid(result){
		var appendText =""
		var show_num = 7;
		if(result!= null && result.total>0){
			appendText += "<div class=\"pagenav herald\">";
			if(result.currPage>1){
				appendText += "<a href=\"javascript:gotoPageVideo("+1+")\">首页</a>";
			}else{
				appendText += "<a href=\"javascript:;\">首页</a>";
			}
		 	if((result.currPage - 1) >0){
				appendText += "<a href=\"javascript:gotoPageVideo("+(result.currPage - 1)+")\">上一页</a>";
			}else{
				appendText += "<a href=\"javascript:;\">上一页</a>";
			}
			//小于7
			if(result.totalPage < show_num){
				for (var i = 0; i < result.totalPage; i++) {
					if((i+1)==result.currPage){
						appendText +="<a class=\"cur\" href=\"javascript:gotoPageVideo("+(i+1)+")\">"+(i+1)+"</a>"
					}else{
						appendText +="<a href=\"javascript:gotoPageVideo("+(i+1)+")\">"+(i+1)+"</a>"
					}
				}	
			}else{
			 if(result.currPage<=((show_num+1)/2)){
					for (var i = 0; i < (result.currPage-1); i++) {
						appendText +="<a href=\"javascript:gotoPageVideo("+(i+1)+")\">"+(i+1)+"</a>"
					}
					appendText +="<a class=\"cur\" href=\"javascript:gotoPageVideo("+result.currPage+")\">"+result.currPage+"</a>"
					for (var i = 0; i < (show_num-result.currPage); i++) {
						appendText +="<a href=\"javascript:gotoPageVideo("+(result.currPage+(i+1))+")\">"+(result.currPage+(i+1))+"</a>"
					}
				}else{
					if((result.totalPage-result.currPage) < ((show_num-1)/2)){
						for (var i = (result.totalPage-show_num+1); i <= result.totalPage; i++) {
							if(i == result.currPage){
								appendText +="<a class=\"cur\">"+i+"</a>"
							}else{
								appendText +="<a href=\"javascript:gotoPageVideo("+i+")\">"+i+"</a>"
							}
						}
					}else{
						for (var i =((show_num-1)/2); i >0 ; i--) {
							appendText +="<a href=\"javascript:gotoPageVideo("+(result.currPage - i)+")\">"+(result.currPage - i)+"</a>"
						}
						appendText +="<a class=\"cur\">"+result.currPage+"</a>";
					    for (var i = 1; i <= ((show_num-1)/2); i++) {
							appendText +="<a href=\"javascript:gotoPageVideo("+(result.currPage + i)+")\">"+(result.currPage + i)+"</a>"
						} 
					}
				} 
			}
			
			if((result.currPage + 1) <= result.totalPage){
				appendText +="<a href=\"javascript:gotoPageVideo("+(result.currPage + 1)+")\">下一页</a>";
			}else{
				appendText +="<a href=\"javascript:;\">下一页</a>"
			}
			if(result.currPage<=result.totalPage){
				appendText +="<a href=\"javascript:gotoPageVideo("+result.totalPage+")\">末页</a>";
			}else{
				appendText +="<a href=\"javascript:;\">末页</a>"
			}
		}
		return appendText;
	}