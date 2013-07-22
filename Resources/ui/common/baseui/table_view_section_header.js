	//
	//  This is a test that is meant to verify that a row object can have a header
	//  and the table view has no table view header - the header should be displayed
function tv_section_header(_args) {
	var win = Titanium.UI.createWindow({
barColor:'#0f0f0f',
		title:_args.title
	});
	
	var inputData = [
		{title:'row 1', header:'Header 1'},
		{title:'row 2'},
		{title:'row 3'},
		{title:'row 4', header:'Header 2'},
		{title:'row 5'}
	];
	var tableView = Titanium.UI.createTableView();
	if (Ti.Platform.osname !== 'mobileweb') {
		tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
	}
	tableView.data = inputData;
	win.add(tableView);
	return win;
};

module.exports = tv_section_header;