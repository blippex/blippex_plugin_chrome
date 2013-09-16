blippex.define('blippex.p2p.manager', function(oArgs){
	var _id = oArgs.id;
	var _peers = oArgs.peers;
	var _callback = oArgs.callback;
	
	var _this = this;
	
	var peer = null;

	/*
	 *	Create new peer
	 *	Remote peers should be notified automatically, also it works correctly even in case browser is closing, etc
	 *	@author blippex
	 *	@private
	 */
	var init = function(){
		blippex.browser.debug.log('p2p: creating new peer ' + _id);
		
		peer = new Peer(_id, blippex.config.p2p);
		
		/* create peer */
		peer.on('open', function(__id){
			/* try to connect to known peers, keep connections internally */
			_peers.forEach(function(peer_id){
				//
				var conn = peer.connect(peer_id, {
					'reliable': true,
					'serialization': 'json'
				});
				
				conn.on('data', function(data){
					blippex.browser.debug.log('p2p: got data');
					_this.forward(data);
				});
				
				conn.on('close', function(data){
					blippex.browser.debug.log('p2p: remote peer closed connection, active connections: ' + getPeersCount());
					//TODO check how many active connections we have, recreate the manager?
				});

			});
		});
		
		peer.on('connection' ,function(conn, meta){
			blippex.browser.debug.log('p2p: new peer connected, active connections: ' + getPeersCount());
			
			conn.on('data', function(data){
				blippex.browser.debug.log('p2p: got data');
				_this.forward(data);
			});
			
			//TODO conn.on
			
		});
		
		peer.on('error' ,function(err){
			//TODO do something :)
		});
	}
	
	/*
	 *	Forward the data
	 *	Forward data or upload
	 *	@public
	 *	@author blippex
	 */
	this.forward = function(data){
		var conn = _this.getConnection();
		if (conn && shouldForward()){
			blippex.browser.debug.log('p2p: forwarding data to peer');
		} else {
			blippex.browser.debug.log('p2p: uploading the data to api server');
			blippex.api.upload.upload(data);
		}
	}
	
	
	/*
	 *	Get random connection
	 *	Forward possible to active connection only
	 *	@type Peer
	 *	@returns {Peer} returns remote connection object, some of known peers
	 *	@author blippex
	 *	@public
	 */
	this.getConnection = function(){
		var cons = [];
		for (var _peer_id in peer.connections){
			if (_peer_id !== peer.id) {//skip itself
				cons.push(_peer_id);
			}
		}
		return cons.length ? peer.connections[cons[Math.floor(Math.random() * cons.length)]].peerjs : null;
	},
	
	/*
	 *	Get current peer
	 *	@type Peer
	 *	@returns {Peer} return active peer
	 *	@author blippex
	 *	@public
	 */
	this.getPeer = function(){
		return peer;
	}
	
	/*
	 *	Destroy current peer, close all active connections
	 *	Remote peers should be notified automatically, also it works correctly even in case browser is closing, etc
	 *	@author blippex
	 *	@public
	 */
	this.destroy = function(){
		blippex.browser.debug.log('p2p: destroying active peer ' + peer.id);
		for (var peerId in peer.connections){
			peer.connections[peerId].peerjs.close();
		}
		//peer.disconnect();
		peer.destroy();
	}
	
	
	/*
	 *	Get forward flag
	 *	Forward the data if flag is true
	 *	@author blippex
	 *	@type Boolean
	 *	@private
	 *	@returns {Boolean} returns whether data should be forwarded or uploaded instead
	 */
	var shouldForward = function(){
		return Math.round(Math.random()) == 1;
	}
	
	var getPeersCount = function(){
		return Object.keys(peer.connections || {}).length;
	}

	/*
	 *	Make it work()
	 *	Start the manager, call the costructor
	 *	@public
	 */	
	init();
});