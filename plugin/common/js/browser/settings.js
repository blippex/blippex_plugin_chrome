/*
 **	@author blippex
 **	@version 1.0
 **	TODO provide listeners functionality
 */
blippex.define('blippex.browser.settings', {
  /* array of listener handlers such as geolocation listener */
  _listeners: [],
  /*
   ** initializes settings with default values
   ** @author blippex
   */
  _init: function(){
    blippex.browser.debug.log('Setting default values...');
    for (key in blippex.config.settings){
      blippex.base.settings.init(key, blippex.config.settings[key])
    }
  },
  /*
   ** return settings value by key
   ** @author blippex
   ** @param {String} key settings key
   ** @returns {Misc} settings value
   */
  get: function(key, def){
    return blippex.base.settings.get(key, def || blippex.config.settings[key]);
  },
  /*
   ** update the setting
   ** @author blippex
   ** @param {String} key settings key
   ** @param {String} value settings value
   */
  set: function(key,value){
    blippex.base.settings.set(key, value);
  },
  /*
   **   Dump settings into single hash object
   **   Used as a hack for further passing to custom options page in SAFARI plugin
   **   @author blippex
   */
  _dumpSettings: function(){
    var settingsPack = {};
    for (var key in blippex.config.settings){
      settingsPack[key] = this.get(key);
    }
    return settingsPack;
  },
  /*
   **   Save settings object
   **   Used as a hack for storing of the settings retrieved from cusrom options page (html) in SAFARI plugin
   **   @author blippex
   */
  _saveSettings: function(settingsPack){
    for (var key in settingsPack) {
      this.set(key, settingsPack[key])
    }
  }
});