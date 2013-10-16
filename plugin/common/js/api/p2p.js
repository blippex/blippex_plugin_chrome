blippex.define('blippex.api.p2p', {
	interval: null,
	
	manager: null,
	
  init: function(){
		if (blippex.browser.settings.get('p2p') && blippex.libs.disabled.isEnabled()){
			this._register();
			this.interval = setInterval(function(){
				blippex.api.p2p._register();
			}, blippex.config.announce);
		}
  },
	
	shutdown: function(){
		blippex.api.p2p.manager.destroy();
		clearInterval(this.interval);
	},
	
	toggle: function(){
		if (blippex.browser.settings.get('p2p') && blippex.libs.disabled.isEnabled()){
			//TODO observer
			blippex.api.p2p.init();
		} else {
			//TODO observer
			blippex.api.p2p.shutdown();
		}
	},
	
  _register: function(){
		var request = {
			'url':	    blippex.config.api.p2p,
      'callback': blippex.api.p2p._onPeerRegisteredCallback,
			'errback':	blippex.api.p2p._onError
		}
		if (blippex.browser.settings.get('peerid')) {
			request.data = {
				'key': blippex.browser.settings.get('peerid')
			}
		}
		new blippex.browser.xhr(request);
  },
	
  _onPeerRegisteredCallback: function(xhr){
    var json = JSON.parse(xhr.responseText);
    if (json.status === 'success') {
			blippex.browser.debug.log('p2p: starting peer registration');
			blippex.browser.settings.set('peerid', json.data.key);
			blippex.api.p2p.manager && blippex.api.p2p.manager.destroy();
			blippex.api.p2p.manager = new blippex.p2p.manager({
				'id':			json.data.key,
				'peers':	json.data.peers
			});
    } else {
				blippex.api.p2p._onError();
		}
  },
	_onError: function(){
		setTimeout(function(){
			blippex.api.p2p._register();
		}, 15 * 1000);
	}
});