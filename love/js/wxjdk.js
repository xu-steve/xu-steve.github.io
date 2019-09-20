
 $(document).ready(function() {


var url = window.location.href;
var wxtitle = $("#wxTitle").val();
var wxdesc  = $("#wxdesc").val();

// alert(wxdesc);

	wxfen(url,wxtitle,wxdesc);

function wxfen(url,wxtitle,wxdesc){
	// alert(wxtitle);
	 $.ajax({
	url: "http://manage.goodych.com/web/news/jsapiTticket?url="+encodeURIComponent(url),//地址
	async: true,//同步
	type: "POST",//发送POST方法请求
	//成功，返回值
	success: function (result) {
	// console.log(result);
	
	  wx.config({
	      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	      appId: result.data.appId, // 必填，公众号的唯一标识
	      timestamp: result.data.timestamp, // 必填，生成签名的时间戳
	      nonceStr: result.data.noncestr, // 必填，生成签名的随机串
	      signature:  result.data.signature,// 必填，签名
	      jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
	  });
	  
	 
		wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
		
		 // 分享给朋友和QQ
			wx.updateAppMessageShareData({ 
				title:wxtitle, // 分享标题
				desc:wxdesc, // 分享描述
				link:url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://www.goodych.com/wechart/images/wxlogo.jpg', // 分享图标
				success: function () {
					
					// alert(1);
				  // 设置成功
				}
			});
			
			//分享给朋友圈及空间
			wx.updateTimelineShareData({ 
				title: wxtitle, // 分享标题
				link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://www.goodych.com/wechart/images/wxlogo.jpg', // 分享图标
				success: function () {
				  // 设置成功
				}
			});
			// 分享获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
			wx.onMenuShareAppMessage({
					title:wxtitle, // 分享标题
					desc: wxdesc, // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'http://www.goodych.com/wechart/images/wxlogo.jpg', // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
					// 用户点击了分享后执行的回调函数
					}
			});
			
			// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
			wx.onMenuShareTimeline({
				title: wxtitle, // 分享标题
				link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://www.goodych.com/wechart/images/wxlogo.jpg', // 分享图标
				success: function () {
				// 用户点击了分享后执行的回调函数
				}
			
			});
			
			
				wx.error(function(res){
					// alert(res.errMsg);
				})
			
		});

	

	  
	  
		}
		
	});
}




  });