function pageselectCallback(page_id, jq){
	$('#Searchresult').text("显示搜索结果 "+((page_id*10)+1)+"-"+((page_id*10)+10));
}

$(function(){
	//创建分页元素
	$("#Pagination").pagination(1, {
		num_edge_entries: 2,
		num_display_entries: 8,
		callback: pageselectCallback  //回调函数
	});  	
});

function setOptions(){
	var opt = {callback: pageselectCallback};
	// 收集选项从文本字段,字段的命名就像他们的选择同行
	$("#_pageOpt input").each(function(){
		opt[this.name] = this.className.match(/numeric/)?parseInt(this.value):this.value;
	});
	// 提取maxitems
	var maxitems = opt.maxitems;
	delete opt.maxitems;
	// 避免在这个演示注射html
	var htmlspecialchars ={ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}
	$.each(htmlspecialchars, function(k,v){
		opt.prev_text = opt.prev_text.replace(k,v);
		opt.next_text = opt.next_text.replace(k,v);
	})
	$("#Pagination").pagination(maxitems, opt);		
}