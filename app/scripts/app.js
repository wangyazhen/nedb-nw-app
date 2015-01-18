
var sesameApp = angular.module('sesame', ['ngRoute']);

	sesameApp.config(['$routeProvider', function($routeProvider) {
		var reslove = function () {
			return {
				dbInited: function(db, $q) {					
					var defer = $q.defer();
					db.afterInitCallback(function() {					
						console.log('config 的 resolve 看看');
						defer.resolve();					
					});
					return defer.promise;
				}
			};
		};

		var testResolve = function($q, db) {

			console.log('config 的 resolve 开始跑  dbInited 里面的' );
			var defer = $q.defer();
			db.dbinitAfter(function() {
				setTimeout(function() {
					console.log('config 的 resolve 看看');
					defer.reslove();
				}, 2000);
			});
			return defer.promise;
			
		};

		$routeProvider.
			when('/', {
				templateUrl: 'views/main.html',
				controller: 'testCtrl'
			}).
			when('/list', {
				templateUrl: 'views/list.html',
				controller: 'listCtrl'
			}).
			when('/todo', {
				templateUrl: 'views/todo.html',
				controller: 'todoCtrl',
				resolve: reslove()/*{
					test : ['$q', function($q) {
						var defer = $q.defer();
						setTimeout(function() {			
							console.log('config 的 resolve 看看  响应了');
							defer.resolve();
						}, 2000);
						return defer.promise;
					}]
				}*/
			}).
			otherwise({
				redirectTo: '/'
			});
	}])
	.run(['db', function(db) {
		db.init();
		db.afterInitCallback(function() {
			console.log('初始化ok');			
		});
	}]);