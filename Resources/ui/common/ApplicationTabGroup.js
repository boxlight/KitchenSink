// Keep a reference to this window so it does not get collected on Android.
var messageWin;
function ApplicationTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup(),
		BaseUIWindow = require('ui/common/BaseUIWindow'),
		ControlsWindow = require('ui/common/ControlsWindow'),
		WelcomeWindow = require('ui/common/WelcomeWindow'),
		PhoneWindow = require('ui/common/PhoneWindow'),
		MashupsWindow = require('ui/common/MashupsWindow');
		//MessageWindow = require('ui/common/MessageWindow');
	
	//create app tabs
	var baseUIWin = new BaseUIWindow(L('base_ui_title')),
		controlsWin = new ControlsWindow(L('controls_win_title')),
		phoneWin = new PhoneWindow(L('phone_win_title')),
		welcomeWin = new WelcomeWindow(L('welcome_win_title')),
		mashupsWin = new MashupsWindow(L('mashups_win_title'));
		//messageWin = new MessageWindow();
	
	var welcomeTab = Ti.UI.createTab({
		title:L('welcome_win_title'),
		icon:'/images/tabs/KS_nav_welcome.png',
		window:welcomeWin
	});
	welcomeWin.containingTab = welcomeTab;
	self.addTab(welcomeTab);
	
	var baseUITab = Ti.UI.createTab({
		title: L('base_ui_title'),
		icon: '/images/tabs/KS_nav_ui.png',
		window: baseUIWin
	});
	baseUIWin.containingTab = baseUITab;
	self.addTab(baseUITab);
	
	// var controlsTab = Ti.UI.createTab({
		// title: L('controls_win_title'),
		// icon: '/images/tabs/KS_nav_views.png',
		// window: controlsWin
	// });
	// controlsWin.containingTab = controlsTab;
	// self.addTab(controlsTab);
	
	var phoneTab = Ti.UI.createTab({
		title:L('phone_win_title'),
		icon:'/images/tabs/KS_nav_phone.png',
		window:phoneWin
	});
	phoneWin.containingTab = phoneTab;
	self.addTab(phoneTab);
	
	var mashupsTab = Ti.UI.createTab({
		title:L('mashups_win_title'),
		icon:'/images/tabs/KS_nav_mashup.png',
		window:mashupsWin
	});
	mashupsWin.containingTab = mashupsTab;
	self.addTab(mashupsTab);
	
	self.setActiveTab(0);
	
	var messageLabel = Titanium.UI.createLabel({
		id:'messagelabel',
		text:'',
		color:'#fff',
		width:250,
		height:'auto',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center'
	});
	
	self.addEventListener('close', function(e) {
		if (e.source == self){
			if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
				self.open();
			}
		}
	});
	
	self.addEventListener('open',function(e) {
		if (e.source == self){
			Titanium.UI.setBackgroundColor('#fff');
		}
	});
	
	self.addEventListener('focus', function(e) {
		// On iOS, the "More..." tab is actually a tab container, not a tab. When it is clicked, e.tab is undefined.
		if (!e.tab) {
			return;
		}
		
		//containingTabWorkaround
		self._activeTab = e.tab
		Ti.API._activeTab = self._activeTab;
	}); 
	
	self.addEventListener('blur', function(e) {
		Titanium.API.info('tab blur - new index ' + e.index + ' old index ' + e.previousIndex);
	});
	self.model = Ti.Platform.model;
	
	return self;
};

module.exports = ApplicationTabGroup;
