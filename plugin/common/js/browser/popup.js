/*
 **	@class blippexPopup
 ** @version 1.0
 */
var background = chrome.extension.getBackgroundPage();
var _blippex = background.blippex;

blippex.define('blippex.popup', {
	_init: function() {
		blippex.popup.initHandlers();
		blippex.popup.popupRenderer();
	},
	initHandlers: function(){
		blippex.popup.addEventListener('blippex-settings', function(){ blippex.popup.onSettings()}, 'click');
		blippex.popup.addEventListener('blippex-input-value', function(event){if (event.keyCode == 13) {blippex.popup.onSearch();}}, 'keydown');
		blippex.popup.addEventListener('blippex-input-enable', function(){blippex.popup.onEnable()});
		blippex.popup.addEventListener('blippex-form', function(){return false;}, 'submit');
		blippex.popup.addEventListener('blippex-input-submit', function(){blippex.popup.onSearch()});
		blippex.popup.addEventListener('blippex-checkbox-https', function(){blippex.popup.onHttps(this.checked)});
		blippex.popup.addEventListener('blippex-checkbox-google', function(){blippex.popup.onGoogle(this.checked)});
		blippex.popup.addEventListener('blippex-checkbox-p2p', function(){blippex.popup.onP2P(this.checked)});
	},
	addEventListener: function(id, handler, event){
    event = event || 'click';
		document.getElementById(id).parentNode.replaceChild(document.getElementById(id).cloneNode(true), document.getElementById(id));
		document.getElementById(id).addEventListener(event, handler);
	},
	popupRenderer: function(){
		document.getElementById('blippex-checkbox-https').checked = _blippex.browser.settings.get('https', true);
		document.getElementById('blippex-checkbox-google').checked = _blippex.browser.settings.get('google', true);
		document.getElementById('blippex-checkbox-p2p').checked = _blippex.browser.settings.get('p2p', true);
		document.getElementById('blippex-input-enable').innerText = _blippex.libs.disabled.isEnabled() ? "Deactivate for 30min" : "Reactivate"
	},
	onEnable: function(){
		_blippex.libs.disabled.toggle();
		blippex.popup.onHide();
	},
	onHttps: function(value){
		_blippex.browser.settings.set('https', value);
	},
	onGoogle: function(value){
		_blippex.browser.settings.set('google', value);
	},
	onSearch: function(){
		var _query = document.getElementById('blippex-input-value');
		if (_query && _query.value.length){
			_blippex.browser.tabs.add('https://www.blippex.org/?q='+encodeURIComponent(_query.value));
			blippex.popup.onHide();
		}
	},
	onSettings: function(){
		var footer = document.querySelector('footer');
		switch (footer.style.display) {
			case 'none':
				footer.style.display = '';
				break;
			default:
				footer.style.display = 'none';
		}
	},
	onP2P: function(value){
		_blippex.browser.settings.set('p2p', value);
	},
	onHide: function(id){
		window.close();
	}
});

document.addEventListener('DOMContentLoaded', function () {
	blippex.popup._init()
});
