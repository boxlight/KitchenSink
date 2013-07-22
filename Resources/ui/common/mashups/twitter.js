function getTweets() {
	// set up a twitter screen name.
	var screen_name = 'appcelerator';
	win = Ti.UI.createWindow({
		barColor : '#0f0f0f',
		title : 'Twitter',
		backgroundColor : '#fff'
	});

	var data = [];

	var Codebird = require('libs/codebird');
	var codebird = new Codebird();
	codebird.setConsumerKey('opI8mBMt8y3a0WGFAhKg', 'Z7mzW9k9KNuv2hUQixQn09BYtRPELWI8zgB5vOEwU8');
	var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);

	function fetchTwitter() {
		codebird.__call('search_tweets', "q=" + Ti.Network.encodeURIComponent("#awesome"), function(reply) {
			if (!reply || !reply.statuses) {
				return;
			}
			var c = 0;
			for (var i in reply.statuses) {
				if (reply.statuses[i].text) {
					var tweet = reply.statuses[i].text;
					var user = reply.statuses[i].user.screen_name;
					var avatar = reply.statuses[i].user.profile_image_url;
					var created_at = reply.statuses[i].created_at;
					var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

					var row = Ti.UI.createTableViewRow({
						hasChild : true,
						height : '120dp',
						backgroundColor : bgcolor
					});
					var post_view = Ti.UI.createView({
						height : '120dp',
						layout : 'vertical',
						left : 5,
						top : 5,
						bottom : 5,
						right : 5,
					});
					var av = Ti.UI.createImageView({
						image : avatar,
						left : 0,
						top : 0,
						height : 48,
						width : 48
					});
					post_view.add(av);
					var user_label = Ti.UI.createLabel({
						text : user,
						left : 54,
						width : 120,
						top : -48,
						bottom : 2,
						height : 18,
						textAlign : 'left',
						color : '#444444',
						font : {
							fontFamily : 'Trebuchet MS',
							fontSize : 14,
							fontWeight : 'bold'
						}
					});
					// Add the username to the view
					post_view.add(user_label);

					var date_label = Ti.UI.createLabel({
						text : created_at,
						right : 0,
						top : -18,
						bottom : 2,
						height : 14,
						textAlign : 'right',
						width : 110,
						color : '#444444',
						font : {
							fontFamily : 'Trebuchet MS',
							fontSize : 12
						}
					});
					// Add the date to the view
					post_view.add(date_label);

					var tweet_text = Ti.UI.createLabel({
						text : tweet,
						left : 54,
						top : 4,
						bottom : 2,
						height : 'auto',
						width : 230,
						textAlign : 'left',
						color : '#000',
						font : {
							fontSize : 14
						}
					});
					// Add the tweet to the view
					post_view.add(tweet_text);
					// Add the vertical layout view to the row
					row.add(post_view);
					row.className = 'item' + c;

					data.push(row);
					c++;
				}
			}

			// Create the tableView and add it to the window.
			var tableview = Titanium.UI.createTableView({
				data : data,
				minRowHeight : 58
			});
			//Ti.UI.currentWindow.add(tableview);
			win.add(tableview);

		}, true);
	}


	win.addEventListener('open', function() {
		if (bearerToken == null) {
			codebird.__call('oauth2_token', {}, function(reply) {
				var bearer_token = reply.access_token;
				codebird.setBearerToken(bearer_token);
				Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
				fetchTwitter();
			});
		} else {
			Ti.API.info("We do have a bearer token...");
			codebird.setBearerToken(bearerToken);
			fetchTwitter();
		}
	});

	return win;
};

module.exports = getTweets;
