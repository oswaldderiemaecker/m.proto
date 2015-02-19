'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var listConstants = require('../constants/list');

var _items = [];

var ListStore = new Store({

	getAll: function() {
		return _items;
	}

});

ListStore.dispatcherToken = Dispatcher.register(function(payload) {

	var action = payload.action;

	switch(action.actionType) {
		case listConstants.GET_ALL:
			_items = action.items;
			ListStore.emitChange();
		break;
	}

});

module.exports = ListStore;
