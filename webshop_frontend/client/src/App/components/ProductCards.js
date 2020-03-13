import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    // Fetch the list on first mount
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname + this.props.location.search !== prevProps.location.pathname + prevProps.location.search) {
            this.getProducts();
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    // Retrieves the list of items from the Express app
    getProducts = () => {
        let currentUrl;
        switch (this.props.match.url) {
            case '/': currentUrl = '/getFrontpageProducts'
                break;
            default:
                currentUrl = this.props.location.pathname + this.props.location.search
        }
        fetch(currentUrl)
            .then(res => res.json())
            .then(products => this.setState({ products: products }))
    }

    addToCart = (id, name, price) => {
        let currentCart = localStorage.getItem('cart')
        currentCart = JSON.parse(currentCart)

        let duplicatteStatus = false
        if (currentCart) {
            for (let i = 0; i < currentCart.length; i++) {
                if (currentCart[i].id === id) {
                    currentCart[i].amount++
                    duplicatteStatus = true
                    break
                }
            }
            if (duplicatteStatus === false) {
                currentCart.push({ id: id, price: price, amount: 1 })
            }
        } else {
            currentCart = [{ id: id, price: price, amount: 1 }]
        }
        localStorage.setItem('cart', JSON.stringify(currentCart))
    }

    customToast = (name) => {
        return (
            <div>
                Added <span>{name}</span> to shopping cart!
            </div>
        )
    }

    handleClick = (id, name, price) => {
        this.addToCart(id, name, price)
        toast.info(this.customToast(name));
    }

    render() {

        if (!this.state.products) {
            return <div className="loader-wrapper">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        }

        const { products } = this.state;
        return (
            <div className="row" id="productCards">
                {
                    products.length ? (
                        <div>
                            {
                                products.map((item) => {

                                    return (
                                        < div className="col s3 card-container" key={
                                            item.id
                                        } >
                                            <div className="card">
                                                <Link to={`/p/${item.url}`}>
                                                    <div className="card-image">
                                                        <img className="image" src={require(`../../assets/images/${item.image}`)} />
                                                    </div>
                                                    <div className="card-content">
                                                        <span className="card-title">{item.name}</span>
                                                        <p className="card-desc">{item.description}</p>
                                                    </div>
                                                </Link>
                                                <div className="card-action">
                                                    <a className="btn grey darken-3 white-text" onClick={() => this.handleClick(item.product_id, item.name, item.price)}>Add to cart </a>
                                                    <p className="price" value={item.price}>{item.price}€</p>
                                                </div>
                                            </div>
                                        </div >
                                    );
                                })
                            }
                            <ToastContainer autoClose={4000} position="bottom-right" />
                        </div >
                    ) : (
                            <div className="no-product">
                                <h2>No products found</h2>
                            </div>
                        )
                }
            </div >
        );
    }
}

export default ProductCards;