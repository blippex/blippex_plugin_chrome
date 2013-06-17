/*
 **	Class with browser related definitions used by core framework
 **	@author blippex
 **	@version 1.0
 */
blippex.define('blippex.base', {
  'browser':  {
    'name': 'chrome',
    'online': function(){
      return navigator.onLine
    }
  },
  'console': {
    'log': function(arg){
      console.log(arg);
    }
  },
  'xhr':  function(){
    return new XMLHttpRequest();
  },
  'settings': {
    /* helper method for firefox browsers */
    '_getMethod': function(){
      
    },
    /* for firefox it should do nothing since all settings are initialized via prefs.js */
    'init': function(key, value){
      if (!(key in localStorage)){
        localStorage[key] = ['string', 'number'].indexOf((typeof value).toLowerCase()) > -1 ? value : JSON.stringify(value);
      }
    },
    /* for firefox browser def is ignored since prefs.js sets default value */
    'get': function(key, def){
      var oReturnValue = false;
      try {
        oReturnValue = (key in localStorage) ? JSON.parse(localStorage[key]) : def;
      } catch (e) {
        oReturnValue = (key in localStorage) ? localStorage[key] : def;
      }
      return oReturnValue;
    },
    'set': function(key, value){
      localStorage[key] = ['string', 'number'].indexOf((typeof value).toLowerCase()) > -1 ? value : JSON.stringify(value);
    }
  }
});