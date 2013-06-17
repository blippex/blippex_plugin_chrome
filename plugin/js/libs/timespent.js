/*
 ** @version 1.0
 ** Used to calculate the time user is spending to view active tab
 */
blippex.define('blippex.libs.timespent', {
	interval: 1000,
	cache: {},
	timer: null,
	init: function(){
		blippex.libs.timespent.restoreSession();
		blippex.libs.timespent.timer = window.setInterval(function(){
			blippex.libs.timespent.capture();
		}, blippex.libs.timespent.interval)
	},
	
	capture: function(){
		chrome.tabs.getSelected(null, function (activeTab){
			if (activeTab && blippex.core.tabs[activeTab.id]){
				if (activeTab.status == 'complete'){
					var tabId = activeTab.id;
					chrome.windows.getCurrent(function(activeWindow){
						if (activeWindow.focused){
							blippex.core.tabs[tabId].timespent++;
							var value = '%s|%s|%s'.replace('%s', blippex.core.tabs[tabId].timestamp)
																		.replace('%s', blippex.core.tabs[tabId].url)
																		.replace('%s', blippex.core.tabs[tabId].timespent)
							blippex.libs.timespent.update({'tabId': tabId, 'value': value});
						}
					});
				}
			}
		});
	},
	
	upload: function(oArgs){
		var tabId = oArgs.tabId;
		if (blippex.core.tabs[tabId]
				&& blippex.core.tabs[tabId].status == blippex.config.status.ok
				&& blippex.core.tabs[tabId].timespent > blippex.config.values.timeout){
					blippex.api.upload.sendTime({
						'timestamp':	blippex.core.tabs[tabId].timestamp,
						'url':				blippex.core.tabs[tabId].url,
						'timespent':	blippex.core.tabs[tabId].timespent
					});
		}
		blippex.libs.timespent.remove(oArgs);
	},
	
	remove: function(oArgs){
		delete blippex.libs.timespent.cache[(oArgs.tabId + '_ts')];
		blippex.browser.settings.set('timespentvalues', blippex.libs.timespent.cache);
	},
	
	update: function(oArgs){
		blippex.libs.timespent.cache[oArgs.tabId + '_ts'] = oArgs.value;
		blippex.browser.settings.set('timespentvalues', blippex.libs.timespent.cache);
	},
	
	restoreSession: function(){
		var localCache = blippex.browser.settings.get('timespentvalues');
		blippex.browser.settings.set('timespentvalues', '');
		for (var key in localCache){
			if (/_ts$/i.test(key)){
				var aItem = (localCache[key]+'').split('|');
				if (aItem.length > 1 && aItem[2] > blippex.config.values.timeout){
					blippex.api.upload.sendTime({
						'timestamp':	aItem[0],
						'url':				aItem[1],
						'timespent':	aItem[2]
					});
				}
			}
		}
	}
});
