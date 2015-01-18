"use strict";
sesameApp.controller('todoCtrl', ['$scope', 'todoService', 'Id',  function($scope, todoService, Id) {

	//$scope.message = message;

	function getTodos() {
		$scope.todos = todoService.query();
	}
	getTodos();

	$scope.todoAdd = function() {
		//$scope.matter
		var todoObj = {
			id: Id.nextId(),
			name: $scope.matter
		};
		if ($scope.matter.length > 0) {
			todoService.save(todoObj, function(e, r) {
				if (r) {
					$scope.matter = '';
					_.each($scope.todos, function(todo) {
						todo.first = false;
					});
					r.first = true;
					$scope.todos.unshift(r);
					console.log('新增了啊');
					$scope.$apply();
				}
			});
		}
	};
	$scope.todoAddKey = function(e) {
		if (e.keyCode === 13) {
			$scope.todoAdd();
		}
	};

	$scope.deleteTodo = function(id) {
		//console.log('删除收到id：', id);
		todoService.remove(id, function(err, res) {
			
			getTodos();
		});
	};

	// 完成或恢复待办事项        // 看看lodash 引用
	$scope.completeOrRecoverTodo = function(todo) {
		if (!todo) {
			return;
		}
		if (todo.completed === true) {
			todo.completed = false;
			console.info('恢复');		
		} else {
			todo.completed = true;
			console.info('完成');			
		}
		todoService.updateTodo(todo, function(e, res) {
			console.info(e, '代办事项已修改返回' , res);
			//getTodos();
		});
	};

	$scope.editTodo = function(todo) {
		// todos 
		angular.forEach($scope.todos, function(val){
			val.edit = false;
		});
		todo.edit = true;
		$scope.newContent = todo.name;
	};
	$scope.doUpdateTodoContent = function() {		
		var editedTodo; /* = angular.forEach($scope.todos, function(val){
			return val.edit == true;
		});*/
		for (var i =0, len = $scope.todos.length; i < len ; i ++) {
			if ($scope.todos[i].edit == true) {
				editedTodo = $scope.todos[i];
			}
		}
		if ($scope.newContent && $scope.newContent.length < 1 && editedTodo) {
			alert('不能为空');
			return;
		}
		editedTodo.name = $scope.newContent;
		console.info('要修改的代表事项的ID：',editedTodo.id);
		todoService.updateTodo(editedTodo, function(e, res) {
			console.info(e, '代办事项修改水电费 内容返回' , res);
			//getTodos();
		});
	};

}]);