//$(document).ready(function() {
$(function(){
	//$("#_saveForm").validate();
	loadSaveBind();
});

function checkValid(){
	
};

/*function checkCardNo(){
//var checkCardNo = function(){
	var cardNo = $("#cardNo").val() ;
	var cardNo_reg = /^\d{12}$/;
	if (!cardNo_reg.test(cardNo)){
				layer.tips('请输入12位数字卡号！', '#cardNo');	
				return false;
	}
};*/
function checkCardName(){
	var cardName = $("#cardName").val() ;
	if(cardName == null ||cardName == ''){
				layer.tips('请输入姓名！', '#cardName');	
				return false;
			}
};
function checkCardId(){
	var cardId = $("#cardId").val() ;
/* 	if(cardId == null ||cardId == ''){
				layer.tips('请输入身份证！', '#cardId');	
				return false;
	} */
	//身份证正则表达式(15位)   
	var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;   
	//身份证正则表达式(18位)   
	var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
	//15位和18位身份证号码的正则表达式（18位带X判断，x实际值为10，根据前面的数计算得出）
	var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if (!isIDCard1.test(cardId) && !isIDCard2.test(cardId)) {		
			layer.tips('身份证格式不对！', '#cardId');	
			return false;
		}
};
function checkTelephone(){
		var telephone = $("#telephone").val() ;
		var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
		var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
		if (!phone_reg.test(telephone) && !tel_reg.test(telephone)) {		
			layer.tips('电话号码格式不对！', '#telephone');	
			return false;
		}
};
function checkContact(){
	var contact = $("#contact").val() ;
	if(contact == null ||contact == ''){
				layer.tips('请输入紧急联系人！', '#contact');	
				return false;
			}
};
function checkAddress(){
	var address = $("#address").val() ;
	if(address == null ||address == ''){
				layer.tips('请输入地址！', '#address');	
				return false;
			}
};
function checkAge(){   
	var age = $("#age").val() ;
	var age_reg = /^([1-9]\d?|100)$/ ;
		if (!age_reg.test(age)){
				layer.tips('年龄格式不对！', '#age');	
				return false;
			}
	
};

function loadSaveBind(){
	 $("#saveBind").click(function(){
		 	var jsonData = $("#_saveForm").serialize();

	/*			var cardNo = $("#cardNo").val() ;
				var cardNo_reg = /^\d{12}$/;
				if (!cardNo_reg.test(cardNo)){
							layer.tips('请输入12位数字卡号！', '#cardNo');	
							return false;
						}*/

				var cardName = $("#cardName").val() ;
				if(cardName == null ||cardName == ''){
							layer.tips('请输入姓名！', '#cardName');	
							return false;
						}


				var cardId = $("#cardId").val() ;
				//身份证正则表达式(15位)   
				isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;   
				//身份证正则表达式(18位)   
				isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
				if (!isIDCard1.test(cardId) && !isIDCard2.test(cardId)) {		
						layer.tips('身份证格式不对！', '#cardId');	
						return false;
					}

					var telephone = $("#telephone").val() ;
					var phone_reg = /^(((13[0-9]{1})|147|(15[0-3]{1})|(15[5-9]{1})|(18[0-3]{1})|(18[5-9]{1}))+\d{8})$/;	
					var tel_reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
					if (!phone_reg.test(telephone) && !tel_reg.test(telephone)) {		
						layer.tips('电话号码格式不对！', '#telephone');	
						return false;
					}

				var contact = $("#contact").val() ;
				if(contact == null ||contact == ''){
							layer.tips('请输入紧急联系人！', '#contact');	
							return false;
						}

				var age = $("#age").val() ;
				var age_reg = /^([1-9]\d?|100)$/ ;
					if (!age_reg.test(age)){
							layer.tips('年龄格式不对！', '#age');	
							return false;
						}
						
				var address = $("#address").val() ;
				if(address == null ||address == ''){
							layer.tips('请输入地址！', '#address');	
							return false;
						}

				$.ajax({
			        url: "/api/saveCard.do",
			        data: jsonData,
			        type: 'POST',
			        dataType: 'json',
			        success: function (data) {
			        	console.log(data);
			        	if(data.status == 200){
			        		window.location.href = "/app/card/true.html";	
			        	}else{
			        		layer.msg(data.message, {icon: 4});
			        		//layer.alert(data.message);//alert("系统错误！");
			        		//alert("=============");
			        	}
			        	
			        }
				});
	});
};