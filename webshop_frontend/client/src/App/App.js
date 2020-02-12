import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './partials/Navbar';
import ProductCards from './components/product-cards';
import ProductPage from './pages/ProductPage';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Navbar />
                <div className="container products">
                    <div>
                        <Switch>
                            <Route exact path='/' component={ProductCards} />
                            <Route path='/c/:category' component={ProductCards} />
                            <Route path='/p/:product' component={ProductPage} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
        return (
            <Switch>
                <App />
            </Switch>
        );
    }
}

export default App;