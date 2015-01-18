sesameApp.factory('Id', function() {
	
	function nextId() {
		return Date.now();
	}
	return {
		nextId : nextId
	}
});