function fb_album_query_android(_args) {
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
			covers : 'SELECT aid, src FROM photo'
		};
		facebook.request('fql.query', {
			query : queries.albums
		}, function(ra) {
			var results = [];
			if (!ra.success) {
				if (ra.error) {
					alert(ra.error);
				} else {
					alert("call was unsuccessful");
				}
				return;
			}
			var rawAlbumResults = JSON.parse(ra.result);
			var aidStr = "";
			for (var i in rawAlbumResults) {
				if (aidStr.length > 0) {
					aidStr += ',';
				}
				aidStr += '"'+rawAlbumResults[i].cover_pid+'"';
				results.push({
					id : rawAlbumResults[i].aid,
					name : rawAlbumResults[i].name
				});
			}
			
			facebook.request('fql.query', {
				query : queries.covers + " WHERE pid in (" + aidStr + ")"
			}, function(rc) {
				if (!rc.success) {
					if (rc.error) {
						alert(rc.error);
					} else {
						alert("call was unsuccessful");
					}
					return;
				}
				var rawCoverResults = JSON.parse(rc.result);
				
				for (var i in rawCoverResults) {
					var id = rawCoverResults[i].aid;
					for (var k in results) {
						if (results[k].id == id) {
							results[k].cover = rawCoverResults[i].src;
							break;
						}
					}
				}

				var data = [];

				for (var c = 0; c < results.length; c++) {
					var row = results[c];

					var albumRow = Ti.UI.createTableViewRow({
						height : 'auto',
						selectedBackgroundColor : '#fff',
						backgroundColor : '#fff',
						albumTitle : row.name,
						aid : row.id
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
					data[c] = albumRow;
				}
			
				tableView.setData(data, {
					animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN
				});

				tableView.addEventListener('click', function(e) {
					if (e.rowData.aid) {
						var FacebookPhotoWindow = require('ui/common/mashups/facebook_photos');
						var photoWin = new FacebookPhotoWindow({
							title : e.rowData.albumTitle,
							aid: e.rowData.aid
						});
						Ti.API._activeTab.open(photoWin, {
							animated : true
						});
					}
				});
				win.open({
					modal : true
				});
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

module.exports = fb_album_query_android;
