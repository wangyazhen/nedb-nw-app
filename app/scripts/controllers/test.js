
sesameApp.controller('testCtrl', ['$scope', 'todoService', 'Id', function($scope, todoService, Id) {
		$scope.hello = '新年好！';
		$scope.get = function() {
			todoService.findOne({id: 1}, function(err, obj) {
				console.log(obj);
			});
		};

		$scope.add = function() {
			var nextId = Id.nextId();
			console.log('nextId: ', nextId);
			todoService.save({id: nextId, name: 'wwww'}, function() {
				alert('ok save ');
			});
		};
	}])
	.controller('listCtrl', ['$scope', 'todoService', function($scope, todoService) {
		
		//$scope.list = [1,2,3,4,5,6,7,8, 2];
		
		$scope.list = todoService.query();
		$scope.list.$promise.then(function(data){
			console.log(data, '长度： '+ data.length);
		});
		/*todoService.query().$promise.then(function(data) {
			$scope.list = 	data;
		});*/
	}]);