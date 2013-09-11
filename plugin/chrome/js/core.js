blippex.define('blippex.core', {
	tabs: {},
	
	icons: {
		'active': {
			'icon':  'chrome/images/toolbar.png'
		},
		'inactive': {
			'icon':  'chrome/images/toolbar_disabled.png'
		}
	},
	
	init: function() {
		blippex.core.addListeners();
		blippex.api.p2p.init();
		blippex.libs.timespent.init();
		blippex.libs.disabled.init();
		blippex.browser.settings._init();
		blippex.api.search.init();
		blippex.core.changeIcon();
	},
	
	changeIcon: function() {
		chrome.browserAction.setIcon({'path': blippex.core.icons[blippex.libs.disabled.isEnabled() ? 'active' : 'inactive'].icon});
  },
	
	addListeners: function() {
		chrome.extension.onMessage.addListener(
			function(request, sender, sendResponse) {
				if (sender && sender.tab){
					switch (request.action) {
						case 'pageLoaded':
							blippex.core.onLoad({
								'tab':	sender.tab
							})
							break;
						case 'onUnload':
							blippex.core.onUnload({
								'tab':	sender.tab
							})
					}
				}
			}
		);
		
    chrome.tabs.onRemoved.addListener(function(tabId){
			blippex.libs.timespent.upload({
				'tabId':	tabId
			});
			blippex.core.tabs[tabId] = blippex.config.status.uploaded;
    });
	},
	
	onLoad: function(oArgs){
		blippex.libs.timespent.upload({
			'tabId':	oArgs.tab.id
		});
		blippex.core.tabs[oArgs.tab.id] = {
			'status':			blippex.browser.tabs.check({'url':	oArgs.tab.url}),
			'timespent':	0,
			'timestamp':	blippex.libs.misc.formatDate(),
			'url':				oArgs.tab.url
		}
	},
	
	onUnload: function(oArgs){
		blippex.libs.timespent.upload({
			'tabId':	oArgs.tab.id
		});
		blippex.core.tabs[oArgs.tab.id] = blippex.config.status.uploaded;
		
	}
});