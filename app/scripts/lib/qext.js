
sesameApp.factory('qext', ['$q', '$rootScope', function($q, $rootScope) {

	var call = Function.call;
	function uncurryThis(f) {
		return function() {
			return call.apply(f, arguments);
		}
	}	

	var array_slice = uncurryThis(Array.prototype.slice);

	function nfcall(config, fn /* args*/) {
		var defer = $q.defer();
		var value = config.isArray === true ? [] : {};
		value.$resolved = false;
		value.$promise = defer.promise;

		Q(fn).nfapply(array_slice(arguments, 2))
			.then(function(data) {
				if (config.isArray === true && !angular.isArray(data)) {
					angular.forEach(data, function() {
						value.push(data);
					});
				}else{
					angular.extend(value, data);
				}
				console.log('我是resolve ： ', defer.resolve);
				defer.resolve(data);
				value.$resolved = true;
				if (typeof(config.callback) == 'function') {
					config.callback(data);
				} else {
					console.warn('config.callback 不是一个 function');
				}

				if (!$rootScope.$$phase) $rootScope.$apply();
			})
			.fail(function(err) {
				defer.reject(err);
				value.$resolved = true;				
				console.warn('qext fail ------', err);
				if (!$rootScope.$$phase) $rootScope.$apply();
			});
		return value;
	}

	return {
		nfcall: nfcall
	}
}]);