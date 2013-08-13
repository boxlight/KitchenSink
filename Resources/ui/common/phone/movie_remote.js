function movie_remote(_args) {
	var win = Titanium.UI.createWindow({
barColor:'#0f0f0f',
		title:_args.title
	});
	
	var contentURL = 'http://dev2.boxlightmedia.com/kitchen-sink/video.mov';
	if (Ti.Platform.name == 'android') {
		contentURL = 'http://dev2.boxlightmedia.com/kitchen-sink/video.mp4';
	}
	var activeMovie = Titanium.Media.createVideoPlayer({
		url: contentURL,
		backgroundColor:'#111',
		mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT, // See TIMOB-2802, which may change this property name
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
	});
	
	win.add(activeMovie);
	var windowClosed = false;
	
	activeMovie.addEventListener('complete',function()
	{
		if (!windowClosed)
		{
			var dlg = Titanium.UI.createAlertDialog({title:'Movie', message:'Completed!'});
			if (Ti.Platform.name === "android") {
				win.close();
				dlg.show();
			} else {
				dlg.show();
				win.close();
			}
		}
	});
	
	activeMovie.play();
	
	win.addEventListener('close', function() 
	{
		if (!windowClosed)
		{
			windowClosed = true;
			activeMovie.stop();
		}
	});
	
	return win;
};

module.exports = movie_remote;
