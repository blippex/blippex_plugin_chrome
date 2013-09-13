blippex.define('blippex.api.p2p', {
  id: null,
	peers: [],
	peer: null,
	interval: null,
	
  init: function(){
    this._register();
		this.interval = setInterval(function(){
			blippex.api.p2p._register();
		}, blippex.config.announce);
  },
	
  _register: function(){
		var request = {
			'url':	    blippex.config.api.p2p,
      'callback': blippex.api.p2p._onPeerRegistered
		}
		if (blippex.browser.settings.get('peerid')) {
			request.data = {
				'key': blippex.browser.settings.get('peerid')
			}
		}
		new blippex.browser.xhr(request);
  },
	
  _onPeerRegistered: function(xhr){
    var json = JSON.parse(xhr.responseText);
    if (json.status === 'success') {
			blippex.browser.debug.log('p2p: peer registered ' + json.data.key + ' known peers: ' + json.data.peers.length);
			blippex.browser.settings.set('peerid', json.data.key);
      blippex.api.p2p.id = json.data.key;
      blippex.api.p2p.peers = json.data.peers;
			blippex.api.p2p._setupHandlers();
    }
  },
	_setupHandlers: function(){
		try {
			blippex.api.p2p.peer.destroy();
		} catch(e) {}
		blippex.api.p2p.peer = new Peer(blippex.api.p2p.id, blippex.config.p2p);
		blippex.browser.debug.log('p2p: peer created ' + blippex.api.p2p.peer.id);
		blippex.api.p2p.peer.on('connection', function(conn) {
			blippex.browser.debug.log('p2p: peer connected');
			conn.on('data', function(data){
				blippex.browser.debug.log(data);
				blippex.browser.debug.log('p2p: received data from peer');
				if (data.count < 1){
					data.count++;
					blippex.browser.debug.log('p2p: forwarding data to yet another peer');
					blippex.api.p2p.forward(data);
				} else {
					blippex.browser.debug.log('p2p: well, seems its anonymous now, uploading the data to api server');
					blippex.api.upload.upload(data);
				}
			});
		});
	},
	
	forward: function(data){
		blippex.browser.debug.log('p2p: trying to connect to random peer');
		var target = this.peers[Math.floor(Math.random() * this.peers.length)];
		//target = "3704b1c642160bd0b06a05474f9280226aa0f5d9cce9bc2d33130e9e134610aa";//blippex.api.p2p.peer.id;
		var conn = this.peer.connect(target, {
			'reliable': true,
			'serialization': 'json'
		});
		conn.on('open', function(){
			blippex.browser.debug.log('p2p: sending data to peer');
			conn.send(data);
		});
		conn.on('error', function(err){
			blippex.browser.debug.log('p2p: error opening connection ' + err);
		});
	}
});