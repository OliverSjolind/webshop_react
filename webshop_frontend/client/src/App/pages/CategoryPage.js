import React, { Component } from 'react';
import ProductCards from '../components/ProductCards';
import { Route, Switch } from 'react-router-dom';
import FilterBar from '../components/FilterBar'

class CategoryPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="container products">
                <Route path='/c/:category' component={FilterBar} />
                <Route path='/c/:category' component={ProductCards} />
            </div>
        )
    }
}

export default CategoryPage