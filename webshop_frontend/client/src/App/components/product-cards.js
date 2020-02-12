import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    // Fetch the list on first mount
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getProducts();
        }
    }

    // Retrieves the list of items from the Express app
    getProducts = () => {
        let currentUrl;
        switch (this.props.match.url) {
            case '/': currentUrl = '/getFrontpageProducts'
                break;
            default:
                currentUrl = this.props.match.url
        }
        fetch(currentUrl)
            .then(res => res.json())
            .then(products => this.setState({ products }))
    }

    render() {
        console.log(this.state.products)
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
            <div>
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
                                                < a href={`/p/${item.name}`
                                                }>
                                                    <div className="card-image">
                                                        <img className="image" src={require(`../../assets/images/${item.image}`)} />
                                                    </div>
                                                    <div className="card-content">
                                                        <span className="card-title">{item.name}</span>
                                                        <p className="card-desc">{item.description}</p>
                                                    </div>

                                                </a>
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
                            <div>
                                <h2>No products found</h2>
                            </div>
                        )
                }
            </div >
        );
    }
}

export default ProductCards;
