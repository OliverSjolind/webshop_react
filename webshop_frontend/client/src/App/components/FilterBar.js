import React, { Component } from 'react';
import M from 'materialize-css'
import { handleQueryParams, removeQueryParam } from '../js/functions'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.handleQuery = this.handleQuery.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            // let dropDown = document.getElementById('order');
            // dropDown.selectedIndex = "0"
            // console.log(dropDown.selectedIndex)
            // document.getElementById('order').selectedIndex = ""
            // console.log(document.getElementById('order').selectedIndex);
            document.getElementById('filterBar').reset()
        }
    }

    componentDidMount() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});

        var slider = document.getElementById('slider');

        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    }

    handleQuery = (e) => {
        if (e.target.value) {
            this.props.history.push(`${handleQueryParams(this.props.location.search, `${e.target.name}=${e.target.value}`)}`)
        } else {
            this.props.history.push(`${removeQueryParam(this.props.location.search, e.target.name)}`)
        }
    }

    // name = query key
    render() {
        return (
            <div className="row filter-bar">
                <form id="filterBar">
                    <div className="input-field col s3">
                        <input name="s" id="category-search" type="text" autoComplete="off" onChange={this.handleQuery} />
                        <label htmlFor="category-search">Search</label>
                    </div>

                    <div className="col s5 mt5">
                        <div id="price-slider"></div>
                        <div className="price-range-filter"><input type="number" className="priceInput" id="minInput" />€ - <input type="number" className="priceInput" id="maxInput" />€ <a href="#" id="setprice">Set price range</a>
                        </div>
                    </div>

                    <div className="input-field col s3 offset-s1">
                        <select id="order" name="ob" onChange={this.handleQuery}>
                            <option value="">Order by</option>
                            <option id="lowHigh" className="orderOption" name="lowHigh" value="priceAsc">price: low-high</option>
                            <option className="orderOption" value="priceDesc">price: high-low</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default FilterBar