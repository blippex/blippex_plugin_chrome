if (typeof blippex == 'undefined'){
	blippex = {
		'define': function(MODULE, OBJECT){
			var _module = MODULE.split('.').reverse();
			_module.pop();
			loader = blippex;
			while (_module.length){
				var subModule = _module.pop();
				if (typeof loader[subModule] == 'undefined'){
					loader[subModule] = _module.length == 0 ? OBJECT : {};
				}
				loader = loader[subModule];
			}
		}
	}
}