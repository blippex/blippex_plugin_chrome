/*
 ** @version 1.0
 ** Used to calculate the time user is spending to view active tab
 */
blippex.define('blippex.api.upload', {
  sendTime: function(oArgs){
		var xhr = new blippex.browser.xhr({
			'url':	blippex.config.api.upload,
			'data':	{
				'time_spent':		oArgs.timespent,
				'url':					oArgs.url,
				'created_at':		oArgs.timestamp
			}
		});
  }
});
