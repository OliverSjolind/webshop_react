import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer'
import ProductCards from './components/ProductCards';
import ProductPage from './pages/ProductPage';
import CategoryPage from '../App/pages/CategoryPage'
import SearchPage from '../App/pages/SearchPage'
import CartPage from '../App/pages/CartPage'

class App extends Component {
    render() {
        const App = () => (
            <div id="body">
                <Navbar />
                <div className="container products">
                    <div>
                        <Switch>
                            <Route exact path='/' component={ProductCards} />
                            <Route path='/c/:category' component={CategoryPage} />
                            <Route path='/p/:product' component={ProductPage} />
                            <Route path='/s/:searchinput' component={SearchPage} />
                            <Route path='/shoppingcart' component={CartPage} />
                        </Switch>
                    </div>
                </div>
                <Footer />
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