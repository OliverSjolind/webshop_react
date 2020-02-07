import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }


    // Fetch the list on first mount
    componentDidMount() {
        this.getProducts();
    }

    // Retrieves the list of items from the Express app
    getProducts = () => {
        fetch('/getFrontpageProducts')
            .then(res => res.json())
            .then(products => this.setState({ products }))
    }

    render() {
        const { products } = this.state;
        console.log(this.state)
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
