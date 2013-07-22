function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
barColor:'#0f0f0f',
		title:title,
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
barColor:'#0f0f0f',
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});
	
	return self;
};

module.exports = ApplicationWindow;
