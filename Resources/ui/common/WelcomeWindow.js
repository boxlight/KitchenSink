function WelcomeWindow(title) {
	var self = Ti.UI.createWindow({
		title:'',
		barImage:'images/boxlight/bl-nav-bar.png',
		backgroundColor:'white',
		barColor:'#0f0f0f'
	});
	
	var webview = Ti.UI.createWebView({
		backgroundColor:'white',
		url:'html/welcome.html'
	});
		
	self.add(webview);
	
	return self;
};

module.exports = WelcomeWindow;
