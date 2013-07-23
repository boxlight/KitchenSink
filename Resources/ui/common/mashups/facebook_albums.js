function fb_album_query(_args) {
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
		var queries = {
			albums : 'SELECT aid, object_id, cover_pid, name, created FROM album WHERE owner = me()',
			covers : 'SELECT aid, src FROM photo WHERE pid in (SELECT cover_pid FROM #albums)'
		};
		Ti.API.info('user id ' + facebook.uid);
		facebook.request('fql.multiquery', {
			queries : queries
		}, function(r) {
			if (!r.success) {
				if (r.error) {
					alert(r.error);
				} else {
					alert("call was unsuccessful");
				}
				return;
			}
			var rawResults = JSON.parse(r.result);
			var results = [];

			for (var i in rawResults) {
				if (rawResults[i].name == 'albums') {
					for (var j in rawResults[i].fql_result_set) {
						results.push({
							id : rawResults[i].fql_result_set[j].aid,
							name : rawResults[i].fql_result_set[j].name
						});
					}
					break;
				}
			}

			for (var i in rawResults) {
				if (rawResults[i].name == 'covers') {
					for (var j in rawResults[i].fql_result_set) {
						var id = rawResults[i].fql_result_set[j].aid;
						for (var k in results) {
							if (results[k].id == id) {
								results[k].cover = rawResults[i].fql_result_set[j].src;
								break;
							}
						}
					}
					break;
				}
			}

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
					image : row.cover === null ? '/images/custom_tableview/user.png' : row.cover,
					left : 10,
					width : 50,
					height : 50
				});
				albumRow.add(imageView);

				var nameLabel = Ti.UI.createLabel({
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
				albumRow.add(nameLabel);

				albumRow.aid = row.id;

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
			message : 'Login to view albums'
		}).show();
	} else {
		runQuery();
	}

	return win;
};

module.exports = fb_album_query;
