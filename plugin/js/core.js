blippex.define('blippex.core', {
	tabs: {},
	init: function() {
		blippex.core.addListeners();
		blippex.libs.timespent.init();
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