import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
            console.log(ids);

            let url = `/getProductsById?id=${ids.join('-')}`
            fetch(url)
                .then(res => res.json())
                .then(products => this.setState({ products: products }))
        } else {
            this.setState({ products: [] })
        }
    }

    removeProduct = (id) => {
        let localCart = localStorage.getItem('cart')
        localCart = JSON.parse(localCart)
        let current = localCart.map(function (e) { return e.id; }).indexOf(id)
        console.log(`id:${id}, current: ${current}`);
        localCart.splice(current, 1)
        if (localCart.length) {
            localStorage.setItem('cart', JSON.stringify(localCart))
        } else {
            localStorage.clear();
        }
        this.getProducts()
    }

    customToast = (name) => {
        return (
            <div>
                removed <span>{name}</span> from shopping cart!
            </div>
        )
    }

    handleRemove = (id, name) => {
        this.removeProduct(id)
        toast.info(this.customToast(name));
    }

    removeAll = () => {
        localStorage.clear();
        this.getProducts()
        toast.info('Removed all items from shopping cart');
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
                                    <caption><Button onClick={this.removeAll} variant="contained" className="button">
                                        Empty cart
                                    </Button>
                                    </caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="tableHead"></TableCell>
                                            <TableCell className="tableHead"></TableCell>
                                            <TableCell className="tableHead">Name </TableCell>
                                            <TableCell align="center" className="tableHead">Quantity </TableCell>
                                            <TableCell align="center" className="tableHead">Price </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map(product => (
                                            <TableRow>
                                                <TableCell>
                                                    <i onClick={() => this.handleRemove(product.id, product.name)} class="material-icons removeItem">
                                                        close
                                                    </i>
                                                </TableCell>
                                                <TableCell component="th" align="center" scope="row"><img src={require(`../../assets/images/${product.image}`)} /></TableCell>
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
                <ToastContainer autoClose={4000} position="bottom-right" />
            </div>
        )
    }
}

export default CartPage