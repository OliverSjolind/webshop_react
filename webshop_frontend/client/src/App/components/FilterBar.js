import React, { Component, forceUpdate } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css'
import { handleQueryParams } from '../js/functions'

class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryParamUrl: '',
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            // let dropDown = document.getElementById('order');
            // dropDown.selectedIndex = "0"
            // console.log(dropDown.selectedIndex)
            this.forceUpdate()
        }
    }

    componentDidMount() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    }

    orderChange = (e) => {
        if (e.target.value) {
            this.props.history.push(`${handleQueryParams(this.props.location.search, e.target.value)}`)
        } else {
            this.props.history.push('?')
        }
    }

    render() {
        return (
            <div className="row filter-bar">
                <div className="input-field col s3">
                    <input id="category-search" type="text" autoComplete="off" />
                    <label htmlFor="category-search">Search</label>
                </div>

                <div className="col s5 mt5">
                    <div id="price-slider"></div>
                    <div className="price-range-filter"><input type="number" className="priceInput" id="minInput" />€ - <input type="number" className="priceInput" id="maxInput" />€ <a href="#" id="setprice">Set price range</a>
                    </div>
                </div>

                <div className="input-field col s3 offset-s1">
                    <select id="order" name="order" onChange={this.orderChange}>
                        <option value="" defaultValue>Order by</option>
                        <option id="lowHigh" className="orderOption" name="lowHigh" value="ob=priceAsc">price: low-high</option>
                        <option className="orderOption" value="ob=priceDesc">price: high-low</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default FilterBar