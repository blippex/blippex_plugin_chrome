var blippex = {
   init: function(){
      this.setListeners();
      this.onLoad();
   },
   
   setListeners: function(){
      window.addEventListener('unload', function(event){
         if ((event.target instanceof HTMLDocument) && (event.target.defaultView == event.target.defaultView.parent)){
            chrome.extension.sendMessage({
               'action': 'onUnload'
            });
         }
      }, true);
   },
   
   onLoad: function(){
      chrome.extension.sendMessage({
         'action': 'pageLoaded'
      });
   }
}

blippex.init();