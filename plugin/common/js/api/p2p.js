blippex.define('blippex.api.p2p', {
  id: null,
	peers: [],
	peer: null,
	
  init: function(){
    this._register();
  },
	
  _register: function(){
		var xhr = new blippex.browser.xhr({
			'url':	    blippex.config.api.p2p,
      'callback': blippex.api.p2p._onPeerRegistered
		});
  },
	
  _onPeerRegistered: function(xhr){
    var json = JSON.parse(xhr.responseText);
    if (json.status === 'success') {
      blippex.api.p2p.id = json.data.key;
      blippex.api.p2p.peers = json.data.peers;
			blippex.api.p2p._setupHandlers();
    }
  },
	_setupHandlers: function(){
		blippex.api.p2p.peer = new Peer(blippex.api.p2p.id, blippex.config.p2p);
		blippex.api.p2p.peer.on('connection', function(conn) {
			conn.on('data', function(data){
				console.log(data);
			});
		});
	},
	
	forward: function(data){
		var conn = this.peer.connect(this.peers[Math.floor(Math.random() * this.peers.length)]);
		conn.on('open', function(){
			conn.send('hi!');
		}); 
	}
});