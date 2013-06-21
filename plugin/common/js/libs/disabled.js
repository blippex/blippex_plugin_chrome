blippex.define('blippex.libs.disabled', {
	/* initialize the lib, just set timer if needed */
	init: function(){
		blippex.libs.disabled.isEnabled();
	},
	isEnabled: function(){
		var isEnabled = true;
    if (blippex.browser.settings.get('timedisabled', 0) > 0) {
			var timeLeft = ((new Date().getTime()) - blippex.browser.settings.get('timedisabled'));
      if (timeLeft < (blippex.config.values.disabled)) {
				blippex.libs.disabled._setTimeout(blippex.config.values.disabled - timeLeft);
        isEnabled = false;
      } else {
        blippex.browser.settings.set('timedisabled', 0);
				blippex.libs.disabled._clearTimeout();
				isEnabled = true;
      }
    }
		return isEnabled;
	},
	toggle: function(){
		blippex.libs.disabled.isEnabled() ? blippex.libs.disabled.set() : blippex.libs.disabled.unset();
	},
	set: function(){
		blippex.browser.settings.set('timedisabled', new Date().getTime());
		blippex.core.changeIcon();
		blippex.libs.disabled._setTimeout(blippex.config.values.disabled);
	},
	unset: function(){
		blippex.browser.settings.set('timedisabled', 0);
		blippex.core.changeIcon();
		blippex.libs.disabled._clearTimeout();
	},
	_setTimeout: function(timeLeft){
		blippex.libs.disabled._clearTimeout();
		blippex.libs.disabled.timeout = window.setTimeout(function(){
			blippex.libs.disabled.onTimeout();
		}, Math.abs(timeLeft));
	},
	_clearTimeout: function(){
		blippex.libs.disabled.timeout && window.clearTimeout(blippex.libs.disabled.timeout);
	},
	onTimeout: function(){
		blippex.core.changeIcon();
	}
});