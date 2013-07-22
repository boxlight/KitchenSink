function DojoMobile(_args) {
	var self = Ti.UI.createWindow({
barColor:'#0f0f0f',
		title:_args.title,
		backgroundColor:'#fff'
	});
	
	var wview = Ti.UI.createWebView({
		url:'http://demos.dojotoolkit.org/demos/mobileGallery/demo-iphone.html'
	});
	
	self.add(wview);
	
	return self;
};

module.exports = DojoMobile;
