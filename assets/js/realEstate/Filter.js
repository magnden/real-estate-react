import React, { Component} from 'react';


export default class Filter extends Component {
  constructor () {
    super()

    this.states = this.states.bind(this);
    this.homeTypes = this.homeTypes.bind(this);
    this.bedrooms = this.bedrooms.bind(this);
  }

  componentWillMount() {
    this.props.populateAction()
  }

  states() {
    if (this.props.globalState.populateFormsData.states != undefined) {
      var { states } = this.props.globalState.populateFormsData
      return states.map((item) => {
        return (<option key={item} value={item[1]}>{item[0]}</option>)
      })

    }

  }

  homeTypes() {
    if (this.props.globalState.populateFormsData.homeTypes != undefined) {
      var { homeTypes } = this.props.globalState.populateFormsData
      return homeTypes.map((item) => {
        return (<option key={item} value={item}>{item}</option>)
      })
    }
  }

  bedrooms() {
    if (this.props.globalState.populateFormsData.bedRooms != undefined) {
      var { bedRooms } = this.props.globalState.populateFormsData
      return bedRooms.map((item) => {
        return (<option key={item} value={item}>{item}+ Bedrooms</option>)
      })
    }
  }

  render () {
    return (
      <section id="filter">
      <div className="inside">
        <h4>Filter</h4>
        <select name="state" className="filters state" onChange={this.props.change}>
          <option selected disabled >State</option>
          <option value="All">All</option>
          {this.states()}
        </select>
        <select name="homeType" className="filters housetype" onChange={this.props.change}>
          <option selected disabled >Home Type</option>
          <option value="All">All Home Types</option>
          {this.homeTypes()}
        </select>
        <select name="bedRooms" className="filters bedrooms" onChange={this.props.change}>
          <option selected disabled >Number of bedrooms</option>
          <option value="All">Any</option>
          {this.bedrooms()}
        </select>
        <div className="filters price">
          <span className="title">Price ($)</span>
          <input type="number" name="min_price" className="min-price" value={this.props.globalState.min_price} onChange={this.props.change} step="1000" min="0" max="10000000" />
          <input type="number" min="0" max="10000000" step="1000" name="max_price" className="max-price" value={this.props.globalState.max_price} onChange={this.props.change} />
        </div>
        <div className="filters floor-space">
          <span className="title">Floor Space (ft&sup2;)</span>
          <input type="number" name="min_floor_space" className="min-floor-space" value={this.props.globalState.min_floor_space} min="0" max="10000000" step="100" onChange={this.props.change} />
          <input type="number" name="max_floor_space" className="max-floor-space" value={this.props.globalState.max_floor_space} min="0" max="100000" step="100" onChange={this.props.change} />
        </div>
        <div className="filters age">
          <span className="title">Home Age (yrs)</span>
          <input type="number" min="0" max="10000000" name="min_age" className="min-age" value={this.props.globalState.min_age} onChange={this.props.change} />
          <input type="number" min="0" max="100" name="max_age" className="max-age" value={this.props.globalState.max_age} onChange={this.props.change} />
        </div>
        <div className="filters extras">
        <span className="title">Extras</span>
        <label htmlFor="extras">
          <span>Elevators</span>
          <input type="checkbox" name="elevator" onChange={this.props.change} />
        </label>

        <label htmlFor="extras">
          <span>Basement</span>
          <input type="checkbox" name="basement" onChange={this.props.change} />
        </label>

        <label htmlFor="extras">
          <span>Storage</span>
          <input type="checkbox" name="storage" onChange={this.props.change} />
        </label>

        <label htmlFor="extras">
          <span>Gym</span>
          <input type="checkbox" name="gym" onChange={this.props.change} />
        </label>

        <label htmlFor="extras">
          <span>Swimming Pool</span>
          <input type="checkbox" name="pool" onChange={this.props.change} />
        </label>

        <label htmlFor="extras">
          <span>Balcony</span>
          <input type="checkbox" name="balcony" onChange={this.props.change} />
        </label>
        </div>
        </div>
      </section>
    )
  }
}
