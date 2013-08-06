function facebook_test(_args) {
	var self = Ti.UI.createWindow({
		barColor : '#0f0f0f',
		title : _args.title,
		backgroundColor : '#fff'
	});
	//create table view data object
	var data = [
		{
			title : 'Login/Logout',
			hasChild : true,
			test : 'ui/common/mashups/facebook_login_logout'
		},
		{
			title : 'Friends',
			hasChild : true,
			test : 'ui/common/mashups/facebook_query'
		},
		{
			title : 'Publish Stream',
			hasChild : true,
			test : 'ui/common/mashups/facebook_publish_stream'
		}
	];
	
	var osname = Ti.Platform.osname;
	var albumsWin = {
		title : 'Albums',
		hasChild : true
	};
	if (osname === 'iphone' || osname === 'ipad') {
		albumsWin.test = 'ui/common/mashups/facebook_albums';
	} else {
		albumsWin.test = 'ui/common/mashups/facebook_albums_android';	
	}
	
	data.push(albumsWin);
	
	// create table view
	for (var i = 0; i < data.length; i++) {
		data[i].color = '#000';
		data[i].font = {
			fontWeight : 'bold'
		}
	};

	var tableview = Titanium.UI.createTableView({
		data : data
	});

	// create table view event listener
	tableview.addEventListener('click', function(e) {
		if (e.rowData.test) {
			var ExampleWindow = require(e.rowData.test), win = new ExampleWindow({
				title : e.rowData.title,
				containingTab: self.containingTab
			});
			_args.containingTab.open(win, {
				animated : true
			});
		}
	});

	// add table view to the window
	self.add(tableview);
	return self;
};

module.exports = facebook_test;
