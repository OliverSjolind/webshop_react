import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilterBar extends Component {
    render() {
        return (
            <div>
                <div className="input-field col s3">
                    <input id="category-search" type="text" autocomplete="off" />
                    <label for="category-search">Search</label>
                </div>

                <div className="col s5 mt5">
                    <div id="price-slider"></div>
                    <div className="price-range-filter"><input type="number" className="priceInput" id="minInput" />€ - <input type="number" className="priceInput" id="maxInput" />€ <a href="#" id="setprice">Set price range</a>
                    </div>
                </div>

                <div className="input-field col s3 offset-s1">
                    <select id="order" name="order">
                        <option value="" disabled selected>Order by</option>
                        <option id="lowHigh" className="orderOption" name="lowHigh" value="?ob=priceAsc">price: low-high</option>
                        <option className="orderOption" value="?ob=priceDesc">price: high-low</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default FilterBar