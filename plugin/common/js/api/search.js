blippex.define('blippex.api.search', {
	xhrs: {},
	embed: {
		'google': {
			id: "res",
			position: "start"
		}
	},
	template: {
		'main': '<section id="blippex">\
				<div class="term">\
					<strong>%SEARCH%</strong>\
					<a href="%QUERY%" class="logo" title="Blippex" target="_blank">\
						More on <img src="data:image/png;base64,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" alt="Blippex">\
						<span class="close" onClick="return false;" id="blippex-button-close" style="font-size:larger">&times;</span>\
					</a>\
				</div>\
				<ul class="results">\
					%RESULTS%\
				</ul>\
			</section>',
		'item': '<li>\
					<a href="%URL%" title="%URL_TITLE%" target="_blank">\
						<img src="%FAVICON%" alt="">\
						<h2>\
							%TITLE%\
						</h2>\
					</a>\
				</li>',
		'searching': '<li>\
					<a href="#" onClick="return false">\
						<h2>\
							Searching...\
						</h2>\
					</a>\
				</li>',
		'noresults': '<li>\
					<span>\
						<h2>\
							Nothing found on Blippex :(\
						</h2>\
					</span>\
				</li>',
		'empty': 'data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABA'
	},
	init: function() {
		chrome.extension.onMessage.addListener(

		function(request, sender, sendResponse) {
			switch (request.action) {
			case 'search':
				blippex.api.search.search({
					'tab': sender.tab,
					'engine': request.engine,
					'query': request.query
				})
				break;
			case 'disable_overlay':
				blippex.browser.settings.set(request.engine, false);
				break;
			default:
			}
		});
	},
	search: function(oArgs) {
		if (blippex.browser.settings.get('google')) {
			if (blippex.api.search.xhrs[oArgs.tab.id]) {
				blippex.api.search.xhrs[oArgs.tab.id].xhr.abort();
			}
			var http = blippex.base.xhr();
			blippex.api.search.xhrs[oArgs.tab.id] = {
				'xhr': http,
				'timeout': null
			}
			var renderedTemplate = blippex.api.search.render(blippex.api.search.template.main, {
				'SEARCH': oArgs.query,
				'RESULTS': blippex.api.search.template.searching,
				'QUERY': 'https://www.blippex.org/?q=' + encodeURIComponent(oArgs.query)
			});
			chrome.tabs.sendMessage(oArgs.tab.id, {
				'type': 'search',
				'where': blippex.api.search.embed[oArgs.engine],
				'tpl': renderedTemplate,
				'engine': oArgs.engine
			});
			http.open("GET", blippex.config.api.search + encodeURIComponent(oArgs.query), true);
			http.onreadystatechange = function() {
				if (http.readyState == 4 && http.status == 200) {
					var isJson = true;
					try {
						response = JSON.parse(http.responseText);
					} catch (e) {
						isJson = false;
					}
					var renderedTemplate = '';
					if (isJson) {
						renderedTemplate = blippex.api.search.template.main.replace('%SEARCH%', oArgs.query);
						var numOfResults = response.hits_displayed || 0;
						var results = [];
						for (i = 0;i<numOfResults;i++) {
							if (response.results[i].title != response.results[i].url && results.length < 3) {
								results.push(response.results[i]);
							}
						}
						if (results.length > 0) {
							var items = '';
							for (i = 0; i < results.length; i++) {
								items += blippex.api.search.render(blippex.api.search.template.item, {
									'URL_TITLE':	results[i].title,
									'TITLE': results[i].title,
									'URL': results[i].url,
									'FAVICON': 'https://getfavicon.appspot.com/%DOMAIN%?defaulticon=https://blippex.org/css/img/default-favicon.png'
													.replace('%DOMAIN%', (results[i].url.match(/https?:\/\/[^/]+/i) || [''])[0])
								});
							}
							renderedTemplate = blippex.api.search.render(renderedTemplate, {
								'RESULTS': items,
								'QUERY': 'https://www.blippex.org/?q=' + encodeURIComponent(oArgs.query)
							});
						} else {
							renderedTemplate = blippex.api.search.render(renderedTemplate, {
								'RESULTS': blippex.api.search.template.noresults,
								'QUERY': 'https://www.blippex.org/?q=' + encodeURIComponent(oArgs.query)
							});
						}
						chrome.tabs.sendMessage(oArgs.tab.id, {
							'type': 'search',
							'where': blippex.api.search.embed[oArgs.engine],
							'tpl': renderedTemplate,
							'engine': oArgs.engine
						});
					}
					blippex.api.search.xhrs[oArgs.tab.id] = null;
				}
			}
			http.send();

		}
	},
	render: function(tpl, oArgs) {
		for (var key in oArgs) {
			tpl = tpl.replace('%' + key + '%', oArgs[key]);
		}
		return tpl;
	}
})