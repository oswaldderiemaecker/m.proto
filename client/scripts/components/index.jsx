'use strict';

var React = require('react');
var LayoutStore = require('../stores/layout');
var ListComponent = React.createFactory(require('./modules/list.jsx'));
var TopBarComponent = React.createFactory(require('./modules/topbar.jsx'));
var Button = React.createFactory(require('./modules/button.jsx'));
var Navigation = require('react-router').Navigation;

var IndexComponent = React.createClass({
    mixins: [LayoutStore.mixin, Navigation],
    statics: {
        willTransitionFrom: function(transition, component) {
            LayoutStore.setScrollPos('index', document.querySelector('.layout').scrollTop);
        },
        willTransitionTo: function() {
            setTimeout(function() {
                document.querySelector('.layout').scrollTop = LayoutStore.getScrollPos('index');
            }, 1)
        }
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="page index">
                <TopBarComponent />
                <div className="spotlight">
                    <div className="fp-search">
                        <span className="logo">Logo & Slogan or something</span>
                        <div className="row">
                            <input type="text" className="search" placeholder="City, town, region.." />
                            <Button className="filter-btn" icon="magnifying-glass" onClick={this.filter} />
                        </div>
                    </div>
                </div>
                <ListComponent />
            </div>
            /* jshint ignore:end */
        )
    },

    filter: function() {
        this.transitionTo('filter');
    }
});

module.exports = IndexComponent;
