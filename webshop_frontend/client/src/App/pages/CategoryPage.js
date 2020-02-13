import React, { Component } from 'react';
import ProductCards from '../components/product-cards';
import { Route, Switch } from 'react-router-dom';

class CategoryPage extends Component {
    render() {
        return (
            <div>
                <p>this is CategoryPage</p>
                <Switch>
                    <Route path='/c/:category' component={ProductCards} />
                </Switch>
            </div>
        )
    }
}

export default CategoryPage