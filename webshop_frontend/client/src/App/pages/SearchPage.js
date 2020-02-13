import React, { Component } from 'react';
import ProductCards from '../components/ProductCards';
import { Route, Switch } from 'react-router-dom';

class SearchPage extends Component {
    render() {
        console.log(this.props.match.params.searchinput)
        return (
            <div>
                <h4>Search results for {this.props.match.params.searchinput}:</h4>
                <Switch>
                    <Route path='/s/:searchinput' component={ProductCards} />
                </Switch>
            </div>
        )
    }
}

export default SearchPage
