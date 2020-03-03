import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    // Fetch the list on first mount
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getProducts();
            console.log(prevProps);
            if (this.props.parentCallback !== prevProps.parentCallback) {

            }
        }
    }

    componentDidMount() {
        this.sendToParent();
        this.getProducts();
    }

    sendToParent = () => {
        this.props.parentCallback(this.state.products)
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
        console.log(currentUrl);
        fetch(currentUrl)
            .then(res => res.json())
            .then(products => this.setState({ products }))
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
                                                    <a className="btn grey darken-3 white-text" href="#">Add to cart</a>
                                                    <p className="price" value={item.price}>{item.price}€</p>
                                                </div>
                                            </div>
                                        </div >
                                    );
                                })
                            }
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
