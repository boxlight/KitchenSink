function fb_query(_args) {
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
	facebook.permissions = ['publish_stream', 'read_stream'];

	function runQuery() {
		var tableView = Ti.UI.createTableView({
			minRowHeight : 58
		});
		win.add(tableView);

		// run query, populate table view and open window
		var query = "SELECT uid, name, pic_square FROM user ";
		query += "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + facebook.uid + ")";
		query += "order by last_name";
		Ti.API.info('user id ' + facebook.uid);
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
			var result = JSON.parse(r.result);
			var data = [];
			for (var c = 0; c < result.length; c++) {
				var row = result[c];

				var tvRow = Ti.UI.createTableViewRow({
					height : 'auto',
					selectedBackgroundColor : '#fff',
					backgroundColor : '#fff'
				});
				var imageView;
				imageView = Ti.UI.createImageView({
					image : row.pic_square === null ? '/images/custom_tableview/user.png' : row.pic_square,
					left : 10,
					width : 50,
					height : 50
				});

				tvRow.add(imageView);

				var userLabel = Ti.UI.createLabel({
					font : {
						fontSize : 16,
						fontWeight : 'bold'
					},
					left : 70,
					top : 5,
					right : 5,
					height : 20,
					color : '#576996',
					text : row.name
				});
				tvRow.add(userLabel);

				tvRow.uid = row.uid;

				data[c] = tvRow;
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
			message : 'Login to view friends'
		}).show();
	} else {
		runQuery();
	}

	return win;
};

module.exports = fb_query;
