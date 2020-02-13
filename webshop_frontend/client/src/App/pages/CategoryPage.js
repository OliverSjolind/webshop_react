import React, { Component } from 'react';
import ProductCards from '../components/ProductCards';
import { Route, Switch } from 'react-router-dom';
import FilterBar from '../components/FilterBar'

class CategoryPage extends Component {
    render() {
        return (
            <div>
                <Route path='/c/:category' component={FilterBar} />
                <Route path='/c/:category' component={ProductCards} />
            </div>
        )
    }
}

export default CategoryPage