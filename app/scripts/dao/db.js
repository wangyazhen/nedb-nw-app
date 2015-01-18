
sesameApp.service('db', [function() {

	var Datastore = require('nedb'),
		path = require('path'),
		gui  = require('nw.gui'),
		async = require('async');

	var _db = {};
	var db = function(collectionName) {
		return _db[collectionName];
	};

	function initCollection(collectionName, callback) {
		var ds = new Datastore({filename: path.join(_db._dir, collectionName + '.db'), 
			autoload: true, onload: function(err) {
				if (err) {
					callback(err, null);
				} else {
					_db[collectionName] = ds;
					callback();
				}
			}});
	}

	db.initialized = function() {
		return !!_db['todo'];
	};
	db.init = function() {
		_db._dir = "E:/tem";
		async.each(['todo'], initCollection, function(err) {
			if (err) {
				throw err;
			}
			angular.forEach(afterInitCallbackArr, function(cb) {
				cb();
			});
		});
	};
	var afterInitCallbackArr = [];
	db.afterInitCallback = function(cb) {
		if (db.initialized()) {
			cb();
		} else {
			afterInitCallbackArr.push(cb);
		}
	};
	db.destory = function() {
		_db = {};
	};

	return db;
}]);