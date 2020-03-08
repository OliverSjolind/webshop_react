import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { handleQueryParams, removeQueryParam } from '../js/functions'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceRange: null,
            ob: 'placeholder'
        }
        this.handleQuery = this.handleQuery.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.getCurrentCategory = this.getCurrentCategory.bind(this)
        this.handleSlider = this.handleSlider.bind(this)
        this.handleOb = this.handleOb.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.getCurrentCategory()
            if (document.getElementById('filterBar')) {
                document.getElementById('filterBar').reset()

            }
        }
    }

    componentDidMount() {
        this.getCurrentCategory()
    }

    handleQuery = (e) => {
        if (e.target.value && e.target.value != 'placeholder') {
            this.props.history.push(`${handleQueryParams(this.props.location.search, `${e.target.name}=${e.target.value}`)}`)
        } else {
            this.props.history.push(`${removeQueryParam(this.props.location.search, e.target.name)}`)
        }
    }

    handleOb = (e) => {
        this.setState({ ob: e.target.value })
        this.handleQuery(e)
    }

    handleSlider = (e) => {
        if (this.state.priceRange) {
            let prices = []
            let { priceRange } = this.state
            for (let i = 0; i < priceRange.length; i++) {
                prices.push(priceRange[i].price)
            }

            let min = Math.floor(Math.min(...prices))
            let max = Math.ceil(Math.max(...prices))
            let sliderMin = Math.round(e[0])
            let sliderMax = Math.round(e[1])

            console.log(e);
            if ((sliderMin != min) || (sliderMax != max)) {
                this.props.history.push(`${handleQueryParams(this.props.location.search, `pr=${sliderMin}-${sliderMax}`)}`)
            } else {
                this.props.history.push(`${removeQueryParam(this.props.location.search, 'pr')}`)
            }
        }
    }
    getCurrentCategory = () => {
        let currentUrl = `${this.props.location.pathname}/getPriceRange`
        fetch(currentUrl)
            .then(res => res.json())
            .then(prices => this.setState({ priceRange: prices }))
    }

    // name = query key
    render() {
        let prices = []
        if (!this.state.priceRange) {
            prices = [1, 10]
        }
        if (this.state.priceRange) {
            prices = []
            let { priceRange } = this.state
            for (let i = 0; i < priceRange.length; i++) {
                prices.push(priceRange[i].price)
            }
        }
        let min = Math.floor(Math.min(...prices))
        let max = Math.ceil(Math.max(...prices))
        if (prices.length <= 1) {
            return <div></div>
        }

        return (
            <div className="row filter-bar">
                <form id="filterBar">
                    <div className="input-field col s3">
                        <input name="s" id="category-search" type="text" autoComplete="off" onChange={this.handleQuery} />
                        <label htmlFor="category-search">Search</label>
                    </div>

                    <div className="col s5 mt5">
                        <Nouislider step={1} range={{ min: min, max: max }} start={[min, max]} margin={10} tooltips={true} connect onChange={this.handleSlider} />
                        <div className="price-range-filter"><input type="number" className="priceInput" id="minInput" />€ - <input type="number" className="priceInput" id="maxInput" />€ <a href="#" id="setprice">Set price range</a>
                        </div>
                    </div>

                    <div className="col 3 offset-s1">
                        <Select
                            name="ob"
                            id="order"
                            value={this.state.ob}
                            onChange={this.handleOb}
                            fullWidth

                        >
                            <MenuItem className="orderOption" defaultValue value="placeholder">Order by</MenuItem >
                            <MenuItem className="orderOption" value="priceAsc">price: low-high</MenuItem >
                            <MenuItem className="orderOption" value="priceDesc">price: high-low</MenuItem >
                        </Select>
                    </div>
                </form>
            </div>
        )
    }
}

export default FilterBar