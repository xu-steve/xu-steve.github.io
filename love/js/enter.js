
//重写alert
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
//重写confirm 不显示ip地址  
var wConfirm = window.confirm;  
window.confirm = function (message) {  
    try {  
        var iframe = document.createElement("IFRAME");  
        iframe.style.display = "none";  
        iframe.setAttribute("src", 'data:text/plain,');  
        document.documentElement.appendChild(iframe);  
        var alertFrame = window.frames[0];  
        var iwindow = alertFrame.window;  
        if (iwindow == undefined) {  
            iwindow = alertFrame.contentWindow;  
        }  
        var result = iwindow.confirm(message);  
        iframe.parentNode.removeChild(iframe);  
        return result;  
    }  
    catch (exc) {  
        return wConfirm(message);  
    }  
}


$(document).ready(function() {
	


	 
	$("#Submit").click(function(){
		// alert(1);
		var contactName = $("#name").val();
		var contactPhone = $("#phone").val();
        var reg = /(1[3-9]\d{9}$)/;
	
		if(contactName ==""||contactPhone ==""){
			alert("请输入姓名与电话。")
            
            
			
			// alert(1)
		}else if(!reg.test(contactPhone)){
            	alert("请输入正确格式的手机号码！");
            return false;
         }else{
			// alert(2);	alert(contactName);
			alert("提交成功！");
			join(contactName,contactPhone)
			}
		
		
	})
 });
  function join(contactName,contactPhone) {
 	 
    	 $.ajax({
  
          url: "http://manage.goodych.com/web/news/add?",//地址
          async: false,//同步
          type: "POST",//发送POST方法请求
          data: {//传参
 		  "types":2,
          "name":contactName,
 		  "phone":contactPhone,
          "demand":"商家入驻"
 			  
          },
          //成功，返回值
          success: function (result) {
  			// console.log(result);
 //  		
 				
 				
  			
          
  
          },
          //失败，返回错误信息
          error: function (msg) {
              console.log(msg);
          },
          dataType: "JSON"
      });
    }