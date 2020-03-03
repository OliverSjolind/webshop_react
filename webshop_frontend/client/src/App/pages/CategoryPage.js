import React, { Component } from 'react';
import ProductCards from '../components/ProductCards';
import { Route, Switch } from 'react-router-dom';
import FilterBar from '../components/FilterBar'

class CategoryPage extends Component {
    state = { products: {} }
    callbackFunction = (childData) => {
        this.setState({ products: childData })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Route path='/c/:category' render={(props) => <FilterBar {...props} products={this.state.products} />} />
                <Route path='/c/:category' render={(props) => <ProductCards {...props} parentCallback={this.callbackFunction} />} />
            </div>
        )
    }
}

export default CategoryPage