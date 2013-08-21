function WelcomeWindow(title) {
	var self = Ti.UI.createWindow({
		title : '',
		barImage : 'images/boxlight/bl-nav-bar.png',
		backgroundColor : 'white',
		barColor : '#0f0f0f'
	});
	if (Ti.Platform.osname === 'iphone') {
		var webview = Ti.UI.createWebView({
			backgroundColor : 'white',
			url : '/html/welcome.html'
		});
		self.add(webview);
	} else {
		var lblWelcome = Ti.UI.createLabel({
			width : 'auto',
			height : 'auto',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			color : '#595959',
			font : {
				fontSize : 13
			},
			text : 'Welcome, this demo demonstrates all the available native functionality BOXLIGHT can include in your next Hybrid Mobile App.',
			left : 20,
			right : 20,
			top : 75
		});
		var lblAppDemo = Ti.UI.createLabel({
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			color : '#595959',
			font : {
				fontSize : 19
			},
			text : 'HYBRID APP DEMO.',
			left : 20,
			right : 20,
			top : 150
		});
		var imgTxtChalkboard = Ti.UI.createImageView({
			image : '/images/boxlight/txt-chalkboard.png',
			top : 200
		});
		var imgTxtArrowDown = Ti.UI.createImageView({
			image : '/images/boxlight/arrow-down.png',
			top : 250
		});
		self.add(lblWelcome);
		self.add(lblAppDemo);
		self.add(imgTxtChalkboard);
		self.add(imgTxtArrowDown);
	}
	return self;
};
module.exports = WelcomeWindow;
