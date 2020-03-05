import React, { Component } from 'react';
import ProductCards from '../components/ProductCards';
import { Route, Switch } from 'react-router-dom';
import FilterBar from '../components/FilterBar'

class CategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = { products: {} }
        this.callbackFunction = this.callbackFunction.bind(this)
    }

    callbackFunction = (childData) => {
        this.setState({ products: childData })
        console.log(childData)
    }

    render() {

        return (
            <div>
                <Route path='/c/:category' render={(props) => <FilterBar {...props} products={this.state.products} />} />
                <Route path='/c/:category' render={(props) => <ProductCards {...props} parentCallback={this.callbackFunction} />} />
            </div>
        )
    }
}

export default CategoryPage