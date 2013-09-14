blippex.define('blippex.api.p2p', {
  id: null,
	peers: [],
	peer: null,
	interval: null,
	
	manager: null,
	
  init: function(){
    this._register();
		this.interval = setInterval(function(){
			blippex.api.p2p._register();
		}, blippex.config.announce);
  },
	
  _register: function(){
		var request = {
			'url':	    blippex.config.api.p2p,
      'callback': blippex.api.p2p._onPeerRegisteredCallback
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
    }
  }	
});