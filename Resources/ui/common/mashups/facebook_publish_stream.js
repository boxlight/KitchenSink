function fb_pub_stream(_args) {
	/*globals Titanium, Ti, alert, require, setTimeout, setInterval, JSON*/
	var platformName = Titanium.Platform.osname;
	var facebook;
	if (platformName == 'android' || platformName == 'iphone' || platformName == 'ipad') {
		facebook = require('facebook');
	} else {
		facebook = Titanium.Facebook;
	}

	var win = Ti.UI.createWindow({
		barColor:'#0f0f0f',
		title:_args.title,
		backroundColor:'#fff'
	});
	facebook.appid = "199171466912517";
	facebook.permissions = ['publish_stream', 'read_stream'];
	
	function showRequestResult(e) {
		var s = '';
		if (e.success) {
			s = "SUCCESS";
			if (e.result) {
				s += "; " + e.result;
			}
			if (e.data) {
				s += "; " + e.data;
			}
			if (!e.result && !e.data) {
				s = '"success", but no data from FB.  I am guessing you cancelled the dialog.';
			}
		} else if (e.cancelled) {
			s = "CANCELLED";
		} else {
			s = "FAIL";
			if (e.error) {
				s += "; " + e.error;
			}
		}
		alert(s);
	}
	
	var login = facebook.createLoginButton({
		top: 10
	});
	login.style = facebook.BUTTON_STYLE_NORMAL;
	win.add(login);
	
	var actionsView = Ti.UI.createView({
		top: 55, left: 0, right: 0, visible: facebook.loggedIn, height: 'auto'
	});
	
	facebook.addEventListener('login', function(e) {
		if (e.success) {
			actionsView.show();
		}
		if (e.error) {
			alert(e.error);
		}
	});
	
	facebook.addEventListener('logout', function(e){
		Ti.API.info('logout event');
		actionsView.hide();
	});
	
	var statusText = Ti.UI.createTextField({
		top: 0, left: 10, right: 10, height: 40,
		hintText: 'Enter your FB status'
	});
	actionsView.add(statusText);
	var statusBtn = Ti.UI.createButton({
		title: 'Publish status with GRAPH API',
		top: 45, left: 10, right: 10, height: 40
	});
	statusBtn.addEventListener('click', function() {
		var text = statusText.value;
		if( (text === '')){
			Ti.UI.createAlertDialog({ tile:'ERROR', message:'No text to Publish !! '}).show();
		}else {
			facebook.requestWithGraphPath('me/feed', {message: text}, "POST", showRequestResult);
		}	
	});
	actionsView.add(statusBtn);
	
	var wall = Ti.UI.createButton({
		title: 'Publish wall post with GRAPH API',
		top: 90, left: 10, right: 10, height: 40
	});
	wall.addEventListener('click', function() {
		var data = {
			link: "https://www.facebook.com/BoxlightMedia?fref=ts"
		};
		facebook.requestWithGraphPath('me/feed', data, 'POST', showRequestResult);
	});
	actionsView.add(wall);
	
	var wallDialog = Ti.UI.createButton({
		title: 'Publish wall post with DIALOG',
		top: 135, left: 10, right: 10, height: 40
	});
	var iter = 0;
	wallDialog.addEventListener('click', function() {
		iter++;
		var data = {
			link: "https://www.facebook.com/BoxlightMedia?fref=ts"
		};
		facebook.dialog("feed", data, showRequestResult);
	});
	actionsView.add(wallDialog);
	
	// iOS BUG: Android does some kind of layout magic here which:
	// 1. Positions the text correctly so that it doesn't overlap with other UI elements
	// 2. Possibly even SIZES the text.
	if (Titanium.Platform.name == 'android') {
		var description = "FYI, the 'Publish wall post with GRAPH API' button will publish a post with a link to the Mozilla MDN JavaScript page, saying 'Best online Javascript reference'.\n\nDo the 'Publish wall post with DIALOG' option more than once, and be sure the 'iteration n' gets incremented each time.  This proves that cached post data is *not* being re-used, which is important.";
		actionsView.add(Ti.UI.createLabel({bottom: 10, text: description}));
	}
	
	win.add(actionsView);
	return win;
};

module.exports = fb_pub_stream;
