import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CartPage extends Component {
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
        if (localStorage.length) {
            let localCart = localStorage.getItem('cart')
            localCart = JSON.parse(localCart)
            let ids = []
            for (let i = 0; i < localCart.length; i++) {
                ids.push(localCart[i].id)
            }
            let url = `/getProductsById?id=${ids.join('-')}`
            fetch(url)
                .then(res => res.json())
                .then(products => this.setState({ products: products }))
        } else {
            this.setState({ products: [] })
        }
    }

    render() {
        console.log(this.state.products);

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

        const { products } = this.state
        let localCart = localStorage.getItem('cart')
        localCart = JSON.parse(localCart)

        for (let i = 0; i < products.length; i++) {
            let current = products.map(function (e) { return e.id; }).indexOf(localCart[i].id)
            products[current].amount = localCart[i].amount
        }
        console.log(products);

        return (
            <div className="row" id="cart">
                {
                    localStorage.length ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table className="cartTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableHead"></TableCell>
                                            <TableCell className="tableHead">Name </TableCell>
                                            <TableCell align="center" className="tableHead">Quantity </TableCell>
                                            <TableCell align="center" className="tableHead">Price </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map(product => (
                                            <TableRow>
                                                <TableCell component="th" scope="row"><img src={require(`../../assets/images/${product.image}`)} /></TableCell>
                                                <TableCell component="th">{product.name}</TableCell>
                                                <TableCell component="th" align="center" scope="row">{product.amount}</TableCell>
                                                <TableCell align="center">{product.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                        : (<div id="emptyCart"><div id="emptyCartIcon" class="material-icons">
                            remove_shopping_cart
                            </div>
                            <h3>Cart is empty</h3>
                        </div>
                        )}
            </div>
        )
    }
}

export default CartPage