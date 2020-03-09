import React, { Component } from 'react';

class CartPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" id="cart">
                {localStorage.length ? (<div>there is localStorage</div>) : (<div>Cart is empty</div>)}
            </div>
        )
    }
}

export default CartPage