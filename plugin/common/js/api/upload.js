blippex.define('blippex.api.upload', {
  sendTime: function(oArgs){
		var encrypt = new JSEncrypt();
		var data = JSON.stringify({
			'time_spent':		oArgs.timespent,
			'url':					oArgs.url,
			'created_at':		oArgs.timestamp
		});
    encrypt.setPublicKey(blippex.config.pubkey);
		blippex.api.p2p.forward({
			'data': encrypt.encrypt(data),
			'count':1
		})

  },
	upload: function(data){
		var xhr = new blippex.browser.xhr({
			'url':	blippex.config.api.upload,
			'data':	data
		});
	}
});
