'use strict';

var React = require('react/addons');
var listStore = require('../../stores/list');
var listActions = require('../../actions/list');
var LayoutStore = require('../../stores/layout');
var Button = React.createFactory(require('../modules/button.jsx'));
var ListItem = React.createFactory(require('../modules/listItem.jsx'));

function getListState() {
    return {
        items: listStore.getAll(),
        position: '0px'
    }
}

listActions.getAll();

var ListComponent = React.createClass({
    mixins: [listStore.mixin],
    statics: {
        willTransitionFrom: function(transition, component) {
            LayoutStore.setScrollPos('list', document.querySelector('.layout').scrollTop);
        },
        willTransitionTo: function() {
            setTimeout(function() {
                document.querySelector('.layout').scrollTop = LayoutStore.getScrollPos('list');
            }, 1)
        }
    },

    getInitialState: function() {
        return getListState();
    },
    render: function() {
        var allItems = this.state.items;
        var items = [];

        for (var key in allItems) {
            items.push(<ListItem key={key} item={allItems[key]} />);
        }
        
        return (
            /* jshint ignore:start */
            <ul className="items">
                {items}
            </ul>
            /* jshint ignore:end */
        );
    },

    _onChange: function() {
        this.setState(getListState());
    }

});

module.exports = ListComponent;
