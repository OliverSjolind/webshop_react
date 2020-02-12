import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer grey darken-3">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Footer Content</h5>
                            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.
                </p>
                            <a className="btn white black-text" href="/adminpage/productlist">admin page</a>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/computers">Computers</Link></li>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/components">Components</Link></li>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/peripherals">Peripherals</Link></li>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/phones">Phones</Link></li>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/gaming">Gaming</Link></li>
                                <li><Link className="grey-text text-lighten-3 footer-link" to="/c/network" >Network</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2019 Copyright Text
        </div>
                </div>
            </footer>
        )
    }
}

export default Footer