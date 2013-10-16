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
		document.querySelector('footer').style.display = _blippex.browser.settings.get('_settings', false) ? '' : 'none';
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
		_blippex.browser.settings.set('_settings', footer.style.display === 'none');
		footer.style.display = footer.style.display === 'none' ? '' : 'none';
	},
	onP2P: function(value){
		_blippex.browser.settings.set('p2p', value);
		_blippex.api.p2p.toggle();
	},
	onHide: function(id){
		window.close();
	}
});

document.addEventListener('DOMContentLoaded', function () {
	blippex.popup._init()
});
