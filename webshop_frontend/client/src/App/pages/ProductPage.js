import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount() {
        this.getProduct();
    }

    // Fetch the list on first mount
    // componentDidUpdate(prevProps) {
    //     if (this.props !== prevProps) {
    //         this.getProduct();
    //     }
    // }

    // Retrieves the list of items from the Express app
    getProduct = () => {
        fetch(this.props.match.url)
            .then(res => res.json())
            .then(product => this.setState({ product }))
    }

    render() {
        console.log(this.state.product)
        if (!this.state.product) {
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
        const { product } = this.state;
        return (
            <div>
                {
                    product ?
                        (
                            <div className="row">
                                <div className="row">
                                    <div className="product-page">
                                        <div className="col s5">
                                            <img src={require(`../../assets/images/${product.image}`)} />
                                        </div>
                                        <div className="col s7">
                                            <h4>{product.name}</h4>
                                            <p> {product.description} </p>
                                            <p className="page-price">{product.price} €</p>
                                            <a href="#" className="btn grey darken-3">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>No product found</h2>
                            </div>
                        )
                }
            </div>
        )
    }
}


export default ProductPage;