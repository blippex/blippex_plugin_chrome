blippex.define('blippex.api.upload', {
  sendTime: function(oArgs){
		var data = JSON.stringify({
			'time_spent':		oArgs.timespent,
			'url':					oArgs.url,
			'created_at':		oArgs.timestamp
		});
		var aes_key = blippex.api.upload.getAESKey(512/8);
		var aes_data = GibberishAES.enc(data, aes_key);
		
		var encrypt = new JSEncrypt();
    encrypt.setPublicKey(blippex.config.pubkey);
		var key_encrypted = encrypt.encrypt(aes_key);
		
		blippex.api.p2p.manager.forward({
			'data': JSON.stringify({'item':aes_data, 'key': key_encrypted})
		});
  },
	getAESKey: function(m){
		m = m || 9;
		var s = '';
		var r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i=0; i < m; i++) {
			s += r.charAt(Math.floor(Math.random()*r.length));
		}
		return s;
	},
	upload: function(data){
		var xhr = new blippex.browser.xhr({
			'url':	blippex.config.api.upload,
			'data':	data
		});
	}
});
