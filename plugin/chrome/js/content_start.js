(function(){
   if (document.location.href.indexOf("blippex.org") > -1){
      var scr = document.createElement("script");
      scr.type="text/javascript";
      scr.innerText = 'window.blippexExtension = 1;';
      (document.head || document.body || document.documentElement).appendChild(scr);
   }
})();
