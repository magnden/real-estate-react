import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Filter from './Filter'
import Listings from './Listings'
import listingsData from './data/listingsData.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      listingsData,
      homeType: 'All',
      state: 'All',
      bedRooms: 'All',
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 50000,
      min_age: 0,
      max_age: 100,
      elevator: false,
      basement: false,
      storage: false,
      gym: false,
      pool: false,
      balcony: false,
      filteredData: listingsData,
      populateFormsData: '',
      sortby:'price-dsc',
      search: '',
      view: 'list'
    }
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForms = this.populateForms.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentWillMount(){

    var sortedListingsData = listingsData.sort((a, b) => {
      return a.price - b.price
    })

    this.setState({
      listingsData
    })
  }

  change(event){
    var name = event.target.name;
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

    this.setState({
      [name]: value
    }, () => {
      this.filteredData()
      console.log(this.state);
    });
  }
  changeView(viewName){
    this.setState({
      view: viewName
    })
  }

  filteredData(){
    // Fliter through the dropdowns
    var newData = this.state.listingsData.filter((item) => {
      return item.price >= this.state.min_price && item.price <= this.state.max_price && item.floorSpace >= this.state.min_floor_space && item.floorSpace <= this.state.max_floor_space && item.age >= this.state.min_age && item.age <= this.state.max_age
    })

    // Filter is 'All' is selected

    if(this.state.state != 'All') {
      newData = newData.filter((item) => {
        return item.state[1] == this.state.state
      });
    }

    if (this.state.homeType != 'All') {
      newData = newData.filter((item) => {
        return item.homeType == this.state.homeType
      });
    }

    if (this.state.bedRooms != 'All') {
      newData = newData.filter((item) => {
        return item.bedRooms >= this.state.bedRooms
      });
    }

    // search
    if (this.state.search !== '') {
      newData = newData.filter((item) => {
        var city = item.city.toLowerCase();
        var searchTerm = this.state.search.toLowerCase();
        var n = city.match(searchTerm);

        if (n != null) {
          return true
        }
      })
    }

    // Filter extras
    if (this.state.elevator) {
      newData = newData.filter((item) => {
        return item.extras.includes('elevator')
      })
    }

    if (this.state.basement) {
      newData = newData.filter((item) => {
        return item.extras.includes('basement')
      })
    }

    if (this.state.storage) {
      newData = newData.filter((item) => {
        return item.extras.includes('storage')
      })
    }

    if (this.state.gym) {
      newData = newData.filter((item) => {
        return item.extras.includes('gym')
      })
    }
    if (this.state.pool) {
      newData = newData.filter((item) => {
        return item.extras.includes('pool')
      })
    }

    if (this.state.balcony) {
      newData = newData.filter((item) => {
        return item.extras.includes('balcony')
      })
    }

    if (this.state.sortby == 'price-dsc') {
      newData.sort((a, b) => {
        return a.price - b.price
      })
    }

    if (this.state.sortby == 'price-asc') {
      newData.sort((a, b) => {
        return b.price - a.price
      })
    }



    this.setState({
      filteredData: newData
    })
  }

  populateForms() {
     // state
     var unfilteredStates = this.state.listingsData.map((item) => {
       return item.state
     })

     // Get rid of duplicates
      var statesTmpArray = [];
      var states = unfilteredStates.filter(function (v) {
        if (statesTmpArray.indexOf(v.toString()) < 0) {
          statesTmpArray.push(v.toString());
          return v;
        }
      });

      // Sort states from A-Z
      function Comparator(a, b) {
         if (a[0] < b[0]) return -1;
         if (a[0] > b[0]) return 1;
         return 0;
       }
      states.sort(Comparator)


     // hometypes
     var unfilteredHomeTypes = this.state.listingsData.map((item) => {
       return item.homeType
     })
     // Get rid of duplicates
     var homeTypesTmpArray = [];
     var homeTypes = unfilteredHomeTypes.filter(function (v) {
       if (homeTypesTmpArray.indexOf(v.toString()) < 0) {
         homeTypesTmpArray.push(v.toString());
         return v;
       }
      });

      homeTypes.sort()

     // bedrooms
     var unfilteredBedrooms = this.state.listingsData.map((item) => {
       return item.bedRooms
     })
     var bedroomsTmpArray = [];
     var bedrooms = unfilteredBedrooms.filter(function (v) {
       if (bedroomsTmpArray.indexOf(v.toString()) < 0) {
         bedroomsTmpArray.push(v.toString());
         return v;
       }
      });

      bedrooms.sort()


     this.setState({
       populateFormsData: {
         homeTypes: homeTypes,
         bedRooms: bedrooms,
         states: states
       }
     })

  }

  render () {
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter change={this.change} globalState={this.state} populateAction={this.populateForms}/>
          <Listings listingsData={this.state.filteredData} change={this.change} globalState={this.state} changeView={this.changeView}/>
        </section>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<App />, app)
