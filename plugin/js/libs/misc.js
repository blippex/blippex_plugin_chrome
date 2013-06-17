/*
 **	Common functions used widely in the project
 **	@author blippex
 **	@version 1.0
 */
blippex.define('blippex.libs.misc', {
	/*
	 ** Formats the date using format pattern
	 ** @author blippex
	 ** @argument {Date} oArgs.date date object
	 ** @argument {String} oArgs.format format pattern
	 ** @returns {String} formated date representation
	*/
	formatDate: function(oArgs){
		oArgs = oArgs || {};
		var newDate = oArgs.date ||  new Date();
		return ((function format(date){
			var result = '';
			var graph = {
				'Y':	date.getFullYear(),
				'm':	('0' + (date.getMonth() + 1)).slice(-2),
				'd':	('0' + date.getDate()).slice(-2),
				'H':	('0' + date.getHours()).slice(-2),
				'i':	('0' + date.getMinutes()).slice(-2),
				's':	('0' + date.getSeconds()).slice(-2),
				'P':	(-date.getTimezoneOffset() < 0 ? '-' : '+') + ('0' + Math.floor(Math.abs(date.getTimezoneOffset() / 60))).slice(-2) + ((':' + ('0' + Math.abs(date.getTimezoneOffset() % 60)).slice(-2)))
			};
			(oArgs.format || 'Y-m-dTH:i:sP').split('').forEach(function(formatter){
				result += graph[formatter] || formatter;
			});
			return result;
		})(newDate));
	}
});