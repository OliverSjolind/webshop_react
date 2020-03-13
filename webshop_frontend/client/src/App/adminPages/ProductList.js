import React, { Component } from 'react';
import MaterialTable from 'material-table';

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        fetch('/getAllProducts')
            .then(res => res.json())
            .then(products => this.setState({ products: products }))
    }

    render() {

        if (!this.state.products) {
            return <div></div>
        }

        const { products } = this.state

        return (
            <div style={{ maxWidth: "90%", margin: "100px auto" }}>
                <MaterialTable
                    columns={[
                        { title: "Id", field: "id" },
                        { title: "Name", field: "name" },
                        { title: "Price", field: "price", type: "numeric" },
                        { title: "Description", field: "description" }
                    ]}
                    data={products}
                    title="Products"
                />
            </div>
        );
    }
}

export default ProductList;