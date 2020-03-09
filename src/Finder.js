import React from 'react';
import Yelp from 'yelp-fusion';

const YELP_API_KEY = `-HeP8h5vxG9m7oMgl19pfdOInl00TMSuYC7QAMnVxn9QJszINxaiYs5CLHjksNvGEDEBI0T9LF3XEiL7hYIusLAknMfxYEEaQLVhnbIMnV4JemAYVxo0r3Xl_mFTXnYx`;
const YELP_CLIENT_ID = `5Kf0u7VlZDAGDCaueGe1EA`;
const client = Yelp.client(YELP_API_KEY);
const latitude = '43.133949';
const longitude = '-70.918968';

export class Finder extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       keyword: '',
       price: '2',
       radius: '10'
    };
  }

  updateKeyword = (event) => {
    this.setState({keyword: event.target.value});
  };

  updatePrice = (event) => {
    this.setState({price: event.target.value});
  };
  
  updateRadius = (event) => {
    this.setState({radius: event.target.value});
  };

  submit = async event => {
    event.preventDefault();
    // send API call and show map stuff
    const data = this.getRestaurants;
    
    alert(`keyword: ${this.state.keyword}\nprice: ${this.state.price}\nradius: ${this.state.radius} meters`);
  };

  getRestaurants = async() => {
    const res = await client.search({
      url: 'https://api.yelp.com/v3/businesses/search/',
      term: this.state.keyword,
      price: this.state.price,
      radius: this.state.radius,
      latitude: latitude,
      longitude: longitude
    });
    const data = await res.json();
    return data;
  };

  render() {
    const {keyword, price, radius} = this.state;
    return (
      <div>
        <form onSubmit={this.submit}>
            {/* keyword field want to add autocomplete from Yelp API*/}
            <div class='form-group'>
              <label for='keyword'>Keyword:</label><br/>
              <input id='keyword' type='text' class='form-control' value={keyword} onChange={this.updateKeyword}/>
              <br/>
            </div>
          
            {/* price field: in Yelp API prices are 1,2,3,4 */}
            <p>Price:</p>
            <div class='custom-control custom-radio'>
              <input id='super' type='radio' name='price' value='4' class='custom-control-input' checked={price === '4'} onChange={this.updatePrice}/>
              <label for='super' class='custom-control-label'>$$$$</label><br/>
            </div>
            <div class='custom-control custom-radio'>
              <input id='high' type='radio' name='price' value='3' class='custom-control-input' checked={price === '3'} onChange={this.updatePrice}/>
              <label for='high' class='custom-control-label'>$$$</label><br/>
            </div>
            <div class='custom-control custom-radio'>
              <input id='mid' type='radio' name='price' value='2' class='custom-control-input' checked={price === '2'} onChange={this.updatePrice}/>
              <label for='mid' class='custom-control-label'>$$</label><br/>
            </div>
            <div class='custom-control custom-radio'>
              <input id='low' type='radio' name='price' value='1' class='custom-control-input' checked={price === '1'} onChange={this.updatePrice}/>
              <label for='low' class='custom-control-label'>$</label><br/><br/>
            </div>
          
            {/* radius field, in meters */}
            <div class='form-group'>
              <label for='radius'>Radius (meters):</label>
              <input id='radius' type='number' class='form-control' value={radius} onChange={this.updateRadius}/>
              <br />
            </div>
            <button class='btn btn-primary'>Search</button>
          </form>
      </div>
  );
  }
}

export default Finder;
