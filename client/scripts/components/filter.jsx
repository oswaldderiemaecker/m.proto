'use strict';

var React = require('react/addons');
var FilterStore = require('../stores/filter');
var LayoutStore = require('../stores/layout');
var filterActions = require('../actions/filter');
var Navigation = require('react-router').Navigation;
var Button = React.createFactory(require('./modules/button.jsx'));

function getFilterState() {
    return {
        isOpen: FilterStore.getStatus()
    }
}

var filterComponent = React.createClass({
    mixins: [FilterStore.mixin, Navigation],
    statics: {
        willTransitionFrom: function(transition, component) {
            LayoutStore.setCustomAnimation('filter'); 
        }
    },
    getInitialState: function() {
        return getFilterState();
    },

    render: function() {
        var cx = React.addons.classSet;
        var classString = cx({
            'filter': true,
            'open': this.state.isOpen
        });

        return (
            /* jshint ignore:start */
            <div className={classString}>
                <h3>Filter properties <Button icon="x" className="right" onClick={this.close}/></h3>
                <div className="form">
                    <div className="row">
                        <input className="city" type="text" placeholder="Location (city, region..)" />
                    </div>
                    <div className="row">
                        <input type="text" className="rooms half-width" placeholder="Rooms" />
                        <input type="text" className="surface half-width" placeholder="Surface" />
                    </div>
                    <div className="row">
                        <div className="slider">
                            <div className="bar">
                                <Button icon="indent-more" className="more" onClick={this.budget}/>
                                <Button icon="indent-less" className="less" onClick={this.budget}/>
                            </div>
                            <span className="min">0€</span>
                            <span className="max">900.000€+</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="type">
                            <img src="images/house.png" />
                            <span>Maison</span>
                        </div>
                        <div className="type">
                            <img src="images/private.png" />
                            <span>Appartment</span>
                        </div>
                        <div className="type last">
                            <img src="images/furniture.png" />
                            <span>Something</span>
                        </div>
                    </div>
                    <Button text="Filter" className="submit" onClick={this.goToList}/>
                </div>
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange: function() {
        this.setState(getFilterState());
    },

    close: function() {
        history.back();
    },

    budget: function() {

    },

    goToList: function() {
        this.transitionTo('list');
    }

});

module.exports = filterComponent;
