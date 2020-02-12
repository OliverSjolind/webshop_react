import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.tab = React.createRef();
        this.activeTab = this.activeTab.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.activeTab()
        }
    }

    componentDidMount() {
        this.activeTab()
    }


    activeTab() {
        console.log(this.tab.current)
    }

    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav className="nav-extended grey darken-3">
                        <div className="nav-wrapper container">
                            <div className="brand-logo"> <Link to="/">Name / Logo</Link></div>
                            <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <div id="search-form" className="search-bar-wrapper">
                                    <input placeholder="Search" id="search-bar-input" className="search-bar" type="search" />
                                    <a href="#" className="black-text search-icon" id="search"><i className="material-icons">search</i></a>
                                </div>
                                <div id="signedout" style={{ display: "none" }}>
                                    <a className="btn white black-text" href="/login">Log in</a>
                                    <a className="btn white black-text" href="/signup">Sign up</a>
                                </div>
                                <div id="signedIn" style={{ display: "none" }}>
                                    <a className="dropdown-trigger" data-target="user-dropdown">
                                        <i className="fas fa-user"></i>
                                        <span id="userName"></span>
                                        <i className="fas fa-caret-down"></i>
                                    </a>
                                    <ul id="user-dropdown" className="dropdown-content">
                                        <li id="logOut"><a>Log out</a></li>
                                    </ul>
                                </div>
                            </ul>
                            <a className=" cart">
                                <i className="material-icons">shopping_cart</i>
                            </a>
                        </div>
                        <div className="nav-content container center">
                            <ul className="tabs tabs-transparent">

                                <li className="tab" ref={this.tab}><Link to="/c/computers">Computers</Link></li>
                                <li className="tab" ref={this.tab}><Link to="/c/components">Components</Link></li>
                                <li className="tab" ref={this.tab}><Link to="/c/peripherals">Peripherals</Link></li>
                                <li className="tab" ref={this.tab}><Link to="/c/phones">Phones</Link></li>
                                <li className="tab" ref={this.tab}><Link to="/c/gaming">Gaming</Link></li>
                                <li className="tab" ref={this.tab}><Link to="/c/network">Network</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <ul className="sidenav" id="mobile-demo">
                    <li><a href="/c/computers">computers</a></li>
                    <li><a href="/c/components">components</a></li>
                    <li><a href="/c/peripherals">peripherals</a></li>
                    <li><a href="/c/phones">phones</a></li>
                    <li><a href="/c/gaming">gaming</a></li>
                    <li><a href="/c/network">network</a></li>
                    <form>
                        <input placeholder="Search" className="search-bar" type="search" />
                    </form>
                    <div className="buttons">
                        <a className="btn grey darken-3" >Log in</a>
                        <a className="btn grey darken-3" >Sign up</a>
                    </div>
                </ul></div>
        )
    }
}



// let tabs = document.getElementsByClassName('tab')
// for (let i = 0; i < tabs.length; i++) {
//     if (window.location.pathname == tabs[i].firstChild.pathname) {
//         tabs[i].classList.add('active');
//     } else {
//         tabs[i].classList.remove('active');
//     }
// }

export default Navbar;