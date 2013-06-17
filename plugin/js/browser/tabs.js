blippex.define('blippex.browser.tabs', {
  'check': function(oArgs){
		var url = (oArgs.url || '');
		var status = blippex.config.status.ok;
		if (url.indexOf("127.0.0.1") > -1) {
			status = blippex.config.status.skip;
		} else if (url.indexOf("http:") !== 0){
			status = blippex.config.status.skip
		}
		return status;
	}
});