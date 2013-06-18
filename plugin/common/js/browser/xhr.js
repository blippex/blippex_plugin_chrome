/*
 **     Class for XHR managing
 **     @author archify
 **     @version 1.0
 */
blippex.define('blippex.browser.xhr', function(oArgs){
  var type, data, callback, errback, url;
  /*
   ** initializes XHR arguments
   */
  this.prepareArguments = function(oArgs){
    type = oArgs.type || "POST";
    data = oArgs.data || null;
    callback = oArgs.callback || function(){};
    errback = oArgs.callback || function(){};
    url = oArgs.url;
  },
  /*
   ** @constructor
  */
  this.prepareArguments(oArgs);
	var fd = new FormData;
  for (var key in data){
    fd.append(key, data[key])
  }
  this._xhr = blippex.base.xhr();
  this._xhr.open(type, url, true);
  this._xhr.onreadystatechange = function(){
    if (this.readyState == 4) {
      if (this.status == 200){
        callback(this);
      } else {
        errback(this);
      }
    }
  }
  this._xhr.send(fd);
});