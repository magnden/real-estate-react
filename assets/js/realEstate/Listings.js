import React, { Component} from 'react';



export default class Listings extends Component {
  constructor () {
    super()

    this.loopListings = this.loopListings.bind(this);
  }


  loopListings(){

    const {listingsData} = this.props;

    if(listingsData == undefined || listingsData.length == 0){
      return "Sorry, your filters did not match any results."
    }

    return listingsData.map((listing, index) => {
      if (this.props.globalState.view == 'list') {

        // THE COLLECTION VIEW
        return (<div className="listing animated fadeIn" key={index}>
         <div className="listing-img" style={{'backgroundImage': `url("${listing.img}")`,backgroundRepeat: "no-repeat", backgroundAttachment:"center",backgroundPosition: "center", backgroundSize: "cover"}}>
           <span className="address">{listing.address}</span>
           <div className="details">
             <div className="listing-details-grid">
               <div className="user-img" style={{'backgroundImage': `url("${listing.posterImg}")`,backgroundRepeat: "no-repeat", backgroundAttachment:"center",backgroundPosition: "center", backgroundSize: "cover"}}> </div>
               <div className="user-details">
                 <span className="user-name">{listing.posterName}</span>
                 <span className="post-date">05/01/2017</span>
               </div>
               <div className="listing-details">
                 <div className="floor-space">
                   <i className="fas fa-square"></i>
                   <span>{listing.floorSpace}ft&sup2;</span>
                 </div>

                 <div className="bedrooms">
                   <i className="fas fa-bed"></i>
                   <span>{listing.bedRooms} bedrooms</span>
                 </div>
               </div>
               <div className="view-btn">View Listing</div>
             </div>
           </div>
         </div>
         <div className="bottom-info">
           <span className="price">${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
           <span className="location"><i className="fas fa-map-marker-alt"></i> {listing.city}, {listing.state[1]}</span>
         </div>
       </div>)
     } else {

       // THE LIST VIEW
       return (<div className="listing animated fadeIn col-md-12 col-lg-6" key={index}>
        <div className="listing-img" style={{'backgroundImage': `url("${listing.img}")`,backgroundRepeat: "no-repeat", backgroundAttachment:"center",backgroundPosition: "center", backgroundSize: "cover"}}>
          <span className="address">{listing.address}</span>
          <div className="details">
            <div className="listing-details-grid">
              <div className="user-img" style={{'backgroundImage': `url("${listing.posterImg}")`,backgroundRepeat: "no-repeat", backgroundAttachment:"center",backgroundPosition: "center", backgroundSize: "cover"}}> </div>
              <div className="user-details">
                <span className="user-name">{listing.posterName}</span>
                <span className="post-date">05/01/2017</span>
              </div>
              <div className="listing-details">
                <div className="floor-space">
                  <i className="fas fa-square"></i>
                  <span>{listing.floorSpace}ft&sup2;</span>
                </div>

                <div className="bedrooms">
                  <i className="fas fa-bed"></i>
                  <span>{listing.bedRooms} bedrooms</span>
                </div>
              </div>
              <div className="view-btn">View Listing</div>
            </div>
          </div>
        </div>
        <div className="bottom-info">
          <span className="price">${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
          <span className="location"><i className="fas fa-map-marker-alt"></i> {listing.city}, {listing.state[1]}</span>
        </div>
      </div>)
     }
    })


  }
  render () {
    return (
      <section id="listings">


        <section className="sortby-area">
        <section className="search-area">
          <input type="text" name="search" placeholder="Search for a city" onChange={this.props.change} />
        </section>
          <div className="results">{this.props.listingsData.length} results found</div>
          <div className="sort-options">
            <select name="sortby" className="sortby" onChange={this.props.change}>
              <option value="price-dsc">Lowest Price</option>
              <option value="price-asc">Highest Price</option>
            </select>
            <div className="view">
            <i className={"fas fa-list " + (this.props.globalState.view == "list" ? "selected" : "")} onClick={this.props.changeView.bind(null, "list")}></i>
            <i className={"fas fa-th " + (this.props.globalState.view == "collection" ? "selected" : "")} onClick={this.props.changeView.bind(null, "collection")}></i>
            </div>
          </div>
        </section>



        <section className={"listings-results " + (this.props.globalState.view == "collection" ? "collectionView" : "")}>

          {this.loopListings()}

        </section>

        <section id="pagination">
          <ul className="pages">
            <li className='active'>1</li>
            <li>2</li>
            <li>3</li>
            <li>Next</li>
          </ul>
        </section>
      </section>
    )
  }
}
