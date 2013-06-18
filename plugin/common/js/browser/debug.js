/*
 **	@author blippex
 **	@version 1.0
 */
blippex.define('blippex.browser.debug', {
  /*
   ** Get debug status
   ** @author blippex
   */
  isActive: function(){
    return blippex.config.plugin.debugmode == true;
  },
  /*
   ** Log to error console
   ** @author arhify
   */
  log: function(message){
    if (blippex.browser.debug.isActive()){
      blippex.base.console.log(message);
    }
  }
});
