import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            search: false,
            price: null
        }
        this._handleKeyDown = this._handleKeyDown.bind(this)
    }

    componentDidUpdate() {
        this.updatePrice()
    }

    componentDidMount() {
        window.addEventListener("storage", this.updatePrice(), false);
    }

    handleInput(e) {
        this.setState({ searchValue: e.target.value })
    }


    handleSearch() {
        if (this.state.searchValue) {
            this.setState({ search: true })
        }
    }

    _handleKeyDown(e) {
        this.setState({ search: false })
        if (e.key === 'Enter') {
            this.handleSearch()
        }
    }

    updatePrice = () => {
        let localCart = localStorage.getItem('cart');
        localCart = JSON.parse(localCart)
        console.log(localCart);
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="navbar">
                        <Typography variant="h6" noWrap>
                            LOGO
                         </Typography>
                        <div className="row">
                            <InputBase
                                placeholder="Search…"
                                className="search-icon"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <SearchIcon />

                            <NavLink className="cart" to="/shoppingcart">
                                <i className="material-icons">shopping_cart</i>
                            </NavLink>
                        </div>

                        {/* <div>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon className="menuBtn" />
                            </IconButton>
                        </div> */}
                    </Toolbar>
                </AppBar>
                <div className="nav-content container center">
                    <AppBar position="static">
                        <Tabs
                            variant="fullWidth"
                            aria-label="nav tabs example"
                        >
                            <Tab label="Computers" >
                                <NavLink className="tab" activeClassName="active" to="/c/computers"></NavLink>
                            </Tab>
                            <Tab label="Page Two" href="/trash" />
                            <Tab label="Page Three" href="/spam" />
                        </Tabs>
                    </AppBar>

                </div>
            </div>
            // <div>
            //     {this.state.search && <Redirect push to={`/s/${this.state.searchValue}`} />
            //     }
            //     <div className="navbar-fixed">
            //         <nav className="nav-extended grey darken-3">
            //             <div className="nav-wrapper container">
            //                 <div className="brand-logo"> <Link to="/">Name / Logo</Link></div>
            //                 <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
            //                 <ul id="nav-mobile" className="right hide-on-med-and-down">
            //                     <div id="search-form" className="search-bar-wrapper">
            //                         <input placeholder="Search" id="search-bar-input" className="search-bar" type="search" value={this.state.searchValue} onInput={this.handleInput.bind(this)} onKeyDown={this._handleKeyDown} />
            //                         <Link className="black-text search-icon" id="search" to={`/s/${this.state.searchValue}`}><i className="material-icons">search</i>
            //                         </Link>
            //                     </div>

            //                     <div id="signedout" style={{ display: "none" }}>
            //                         <a className="btn white black-text" href="/login">Log in</a>
            //                         <a className="btn white black-text" href="/signup">Sign up</a>
            //                     </div>
            //                     <div id="signedIn" style={{ display: "none" }}>
            //                         <a className="dropdown-trigger" data-target="user-dropdown">
            //                             <i className="fas fa-user"></i>
            //                             <span id="userName"></span>
            //                             <i className="fas fa-caret-down"></i>
            //                         </a>
            //                         <ul id="user-dropdown" className="dropdown-content">
            //                             <li id="logOut"><a>Log out</a></li>
            //                         </ul>
            //                     </div>
            //                 </ul>
            //                 <NavLink className="cart" to="/shoppingcart">
            //                     <i className="material-icons">shopping_cart</i>
            //                 </NavLink>
            //             </div>
            //             <div className="nav-content container center">
            //                 <ul className="tabs tabs-transparent">

            //                     <li><NavLink className="tab" activeClassName="active" to="/c/computers">Computers</NavLink></li>
            //                     <li><NavLink className="tab" activeClassName="active" to="/c/components">Components</NavLink></li>
            //                     <li><NavLink className="tab" activeClassName="active" to="/c/peripherals">Peripherals</NavLink></li>
            //                     <li><NavLink className="tab" activeClassName="active" to="/c/phones">Phones</NavLink></li>
            //                     <li><NavLink className="tab" activeClassName="active" to="/c/gaming">Gaming</NavLink></li>
            //                     <li><NavLink className="tab" activeClassName="active" to="/c/network">Network</NavLink></li>
            //                 </ul>
            //             </div>
            //         </nav>
            //     </div>
            //     <ul className="sidenav" id="mobile-demo">
            //         <li><a href="/c/computers">computers</a></li>
            //         <li><a href="/c/components">components</a></li>
            //         <li><a href="/c/peripherals">peripherals</a></li>
            //         <li><a href="/c/phones">phones</a></li>
            //         <li><a href="/c/gaming">gaming</a></li>
            //         <li><a href="/c/network">network</a></li>
            //         <form>
            //             <input placeholder="Search" className="search-bar" type="search" />
            //         </form>
            //         <div className="buttons">
            //             <a className="btn grey darken-3" >Log in</a>
            //             <a className="btn grey darken-3" >Sign up</a>
            //         </div>
            //     </ul></div >
        )
    }
}

export default Navbar;