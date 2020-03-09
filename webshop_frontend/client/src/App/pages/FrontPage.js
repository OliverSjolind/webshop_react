import React, { Component } from 'react';
import ProductCards from '../components/ProductCards'
import { Route, Switch } from 'react-router-dom';

class FrontPage extends Component {
    render() {
        return (
            <div className="container products">
                <Route path='/' component={ProductCards} />
            </div>
        )
    }
}

export default FrontPage