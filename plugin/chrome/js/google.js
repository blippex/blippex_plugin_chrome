var google = {
  engine:  'google',
  query:    '',
  init: function() {
    this.setListeners();
    chrome.extension.sendMessage({
      'action': 'search',
      'engine': this.engine,
      'query':  this.getQueryFromURL()
    });
    setInterval(function(){
       if (google.href != document.location.href){
          google.href = document.location.href
          chrome.extension.sendMessage({
            'action': 'search',
            'engine': google.engine,
            'query':  google.getQueryFromURL()
          });
       }
    }, 500);
    document.querySelector("[name=q]").addEventListener('keyup', function(){
        var query = google.getQuery();
    
        var fn = function(){ google.qsearch(); };
    
        if(e.keyCode == 40 || e.keyCode == 38)
            fn = function(){ google.qsearch(true); };
    
        clearTimeout(ddg_timer);
        ddg_timer = setTimeout(function(){
            fn();
        }, 700);
        document.getElementsByClassName("gssb_c")[0].onclick = function(){
            google.qsearch(true);
        };
    }, true);
    document.querySelector("[name=btnG]").addEventListener('click', function(){
      google.qsearch();
    }, true);
  },
  setListeners: function() {
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      switch (request.type) {
        case 'search':
          if (document.getElementById(request.where.id)) {
            var pLayer = document.getElementById('blippex');
            var newDiv = document.createElement('div');
            newDiv.innerHTML = request.tpl;
            if (pLayer) {
              pLayer.parentNode.replaceChild(newDiv, pLayer);
            } else if (request.where.position == 'end') {
              document.getElementById(request.where.id).appendChild(newDiv);
            } else {
              document.getElementById(request.where.id).insertBefore(newDiv, document.getElementById(request.where.id).firstChild);
            }
            //google.addEventListener('blippex-button-close', function(){
            //  document.getElementById('blippex-layout-confirmation').style.display = '';
            //  document.getElementById('blippex-layout-results').style.display = 'none';
            //});
            //google.addEventListener('blippex-button-confrim-yes', function(){
            //  newDiv.style.display = 'none';
            //  chrome.extension.sendMessage({
            //    'action':   'disable_overlay',
            //    'engine':   google.engine
            //  });
            //});
            //google.addEventListener('blippex-button-confrim-no', function(){
            //  document.getElementById('blippex-layout-confirmation').style.display = 'none';
            //  document.getElementById('blippex-layout-results').style.display = '';
            //});
          }
          break;
        default:
      }
    });
  },
	addEventListener: function(id, handler, event){
    event = event || 'click';
		document.getElementById(id).parentNode.replaceChild(document.getElementById(id).cloneNode(true), document.getElementById(id));
		document.getElementById(id).addEventListener(event, handler);
	},
  getQueryFromURL: function() {
    var regex = new RegExp('[\?\&]q=([^\&#]+)');
    if (regex.test(window.location.href)) {
      var q = window.location.href.split(regex);
      q = q[q.length - 2].replace(/\+/g, " ");
      return decodeURIComponent(q);
    }
  },
  getQuery: function(direct) {
      var instant = document.getElementsByClassName("gssb_a");
      if (instant.length !== 0 && !direct){
          var selected_instant = instant[0];
          
          var query = selected_instant.childNodes[0].childNodes[0].childNodes[0].
                      childNodes[0].childNodes[0].childNodes[0].innerHTML;
          query = query.replace(/<\/?(?!\!)[^>]*>/gi, '');
  
          return query;
      } else {
          return document.getElementsByName('q')[0].value;
      }
  },
  qsearch: function(direct){
    var query = google.getQuery(direct);
    google.query = query;
    chrome.extension.sendMessage({
      'action': 'search',
      'engine': google.engine,
      'query':  query
    });
  }
}

google.init();