function custom_fonts(_args) {
	var win = Ti.UI.createWindow({
barColor:'#0f0f0f',
		title:_args.title
	});
	
	var label = Ti.UI.createLabel({
		text:"Appcelerator\nFTW!",
		font:{fontSize:54,fontFamily:"Comic Zine OT"},
		width:"auto",
		textAlign:"center"
	});
	
	win.add(label);
	return win;
}

module.exports = custom_fonts;