function fb_photo_query(_args) {
	/*globals Ti, Titanium, JSON, alert */
	var platformName = Titanium.Platform.osname;
	var facebook;
	if (platformName == 'android' || platformName == 'iphone' || platformName == 'ipad') {
		facebook = require('facebook');
	} else {
		facebook = Titanium.Facebook;
	}

	var win = Ti.UI.createWindow({
		barColor : '#0f0f0f',
		title : _args.title,
		backgroundColor : '#fff'
	});
	//
	// Login Button
	//
	facebook.appid = "199171466912517";
	facebook.permissions = ['publish_stream', 'read_stream', 'user_photos'];

	function runQuery() {
		var tableView = Ti.UI.createTableView({
			minRowHeight : 58
		});
		win.add(tableView);

		// run query, populate table view and open window
		var query = 'SELECT pid, src, src_big FROM photo WHERE aid = "' + _args.aid + '"';
		facebook.request('fql.query', {
			query : query
		}, function(r) {
			if (!r.success) {
				if (r.error) {
					alert(r.error);
				} else {
					alert("call was unsuccessful");
				}
				return;
			}
			var results = JSON.parse(r.result);
			var data = [];

			for (var c = 0; c < results.length; c++) {
				var row = results[c];

				var albumRow = Ti.UI.createTableViewRow({
					height : 'auto',
					selectedBackgroundColor : '#fff',
					backgroundColor : '#fff'
				});
				var imageView;
				imageView = Ti.UI.createImageView({
					image : row.src === null ? '/images/custom_tableview/user.png' : row.src,
					left : 10,
					width : 50,
					height : 50
				});
				albumRow.add(imageView);

				albumRow.pid = row.pid;

				data[c] = albumRow;
			}

			tableView.setData(data, {
				animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN
			});

			win.open({
				modal : true
			});
		});
	}

	if (!facebook.loggedIn) {
		Ti.UI.createAlertDialog({
			title : 'Facebook',
			message : 'Login to view photos'
		}).show();
	} else {
		runQuery();
	}

	return win;
};

module.exports = fb_photo_query;
