sesameApp.service('todoService', ['db', 'qext', function(db, qext) {
	function save(obj, callback) {
		angular.extend(obj, {completed: false});
		db('todo').insert(obj, callback);
	}

	function findOne(obj, callback) {
		var id;
		if (typeof(obj) === "object" ){
			id = obj.id;
		} else {
			id = obj;
		}		
		var findO = function() {
			db('todo').findOne({id: id}, function(err, res) {
				if (err) {
					console.error('查询出错了 err');
				} else {
					callback(null, res);
				}
			});
		};
		return qext.nfcall({isArray: false, callback: callback}, findO);
	}

	function query(callback) {
		var queryAll = function(callback) {
			db('todo').find({}, function(err, all) {
				callback(err, all);
			});
		};
		return qext.nfcall({isArray: true, callback: callback}, queryAll);
	}

	function remove(id, callback) {
		var deleteTodo = function() {
			if(!id) { return;}
			db('todo').remove({id: id}, {}, callback); // 直接移除			
		};
		return qext.nfcall({isArray: false, callback: callback}, deleteTodo);
	}

	function updateTodo(obj, callback) {
		var doUpdate = function() {
			db('todo').update({id: obj.id}, {$set: obj}, {}, callback);
		};
		return qext.nfcall({isArray: false, callback: callback}, doUpdate);
	}

	
	return {
		save: save,
		findOne: findOne,
		updateTodo: updateTodo,
		remove: remove,
		query: query
	}
}])