function hires_img(_args) {
	var win = Ti.UI.createWindow({
barColor:'#0f0f0f',
		title:_args.title
	});
	win.backgroundImage = "/images/fence.jpg";
	return win;
};

module.exports = hires_img;