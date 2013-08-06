function views(_args) {
	var win = Ti.UI.createWindow({
		barColor:'#0f0f0f',
		title:_args.title,
		backgroundColor:'#fff'
	});
	
	var isMobileWeb = Titanium.Platform.osname == 'mobileweb';
	
	//create table view data object
	var data = [
		{title:'Scroll Views', hasChild:true, test:'ui/common/baseui/scroll_views'},
		{title:'Web Views', hasChild:true, test:'ui/common/baseui/web_views'},
		{title:'Alert Dialog', hasChild:true, test:'ui/common/baseui/alert'},
		{title:'Options Dialog', hasChild:true, test:'ui/common/baseui/options_dialog'},
		{title:'Email Dialog', hasChild:true, test:'ui/common/baseui/email_dialog'},
		{title:'Map View', hasChild:!isMobileWeb, test:'ui/common/baseui/map_view', touchEnabled:!isMobileWeb, color:isMobileWeb?"#aaa":"#000"}
	];
	
	if (Titanium.Platform.name == 'iPhone OS')
	{
		data.push({title:'Map View with Routing', hasChild:true, test:'ui/handheld/ios/baseui/map_view2'});
		data.push({title:'Events', hasChild:true, test:'ui/handheld/ios/baseui/view_events'});
		data.push({title:'Coverflow View', hasChild:true, test:'ui/handheld/ios/baseui/coverflow'});
		data.push({title:'Dashboard View', hasChild:true, test:'ui/handheld/ios/baseui/dashboard'});
		data.push({title:'Mixing Views', hasChild:true, test:'ui/handheld/ios/baseui/mixing_views_1'});
		data.push({title:'Gradient', hasChild:true, test:'ui/handheld/ios/baseui/gradient'});
		data.push({title:'Hide/Show', hasChild:true, test:'ui/handheld/ios/baseui/view_hide_show'});
		
		Ti.include("/etc/version.js");
	
		if (isiOS4Plus())
		{
			data.push({title:'Hi-Res Image', wintitle:"Fence", hasChild:true, test:'ui/handheld/ios/baseui/hi_res_image'});
		}
	}
	
	// create table view
	for (var i = 0; i < data.length; i++ ) {
		var d = data[i];
		if (i == 2) {
			d.color='#00cc00'
		}
		// On Android, if touchEnabled is not set explicitly, its value is undefined.
		else if (d.touchEnabled !== false) {
			d.color = '#000';
		}
		d.font = {fontWeight:'bold'};
	};
	var tableview = Titanium.UI.createTableView({
		data:data
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.test)
		{
			var ExampleWindow = require(e.rowData.test);
			win = new ExampleWindow({title: e.rowData.title, containingTab: _args.containingTab, tabGroup: _args.tabGroup});
			_args.containingTab.open(win, {animated:true});
		}
	});
	
	// add table view to the window
	win.add(tableview);
	return win;
};

module.exports = views;