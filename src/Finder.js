import React from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

const YELP_API_KEY = `-HeP8h5vxG9m7oMgl19pfdOInl00TMSuYC7QAMnVxn9QJszINxaiYs5CLHjksNvGEDEBI0T9LF3XEiL7hYIusLAknMfxYEEaQLVhnbIMnV4JemAYVxo0r3Xl_mFTXnYx`;

let latitude = null;
let longitude = null;

let data = null;
let restaurant = null;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(setPosition);
} else {
  alert('Geolocation not supported in your browser.');
}

let lat = parseFloat(43.133949);
let lng = parseFloat(-70.918968);
const MyGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter = { { lat: lat, lng: lng } }
    defaultZoom = { 13 }>
    
  </GoogleMap>));


async function setPosition(position) {
  latitude = await position.coords.latitude;
  longitude = await position.coords.longitude;
  alert(`Your Location: latitude: ${latitude} longitude: ${longitude}`);
}

async function getRestaurants(state) {
  const REQ_URL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${state.keyword}&categories=restaurants&latitude=${latitude}&longitude=${longitude}&price=${state.price}&radius=${state.radius}`;
  
  const response = await fetch(REQ_URL,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${YELP_API_KEY}`
      }
    });
  const data = response.json();
  console.log(data);
  alert('check console for Yelp API data');
  return data;
}

export class Finder extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       keyword: '',
       price: '2',
       radius: '40000',
       markers: [],
    }
  }

  updateKeyword = (event) => {
    this.setState({keyword: event.target.value});
  };

  updatePrice = (event) => {
    this.setState({price: event.target.value});
  };
  
  updateRadius = (event) => {
    this.setState({radius: (event.target.value * 1000)});
  };

  submit = event => {
    event.preventDefault();
    // send API call and show map stuff
    const data = getRestaurants(this.state);

    // restaurant = data.businesses[0];
    // console.log(restaurant);

    // const newLat = restaurant.coordinates.latitude;
    // const newLng = restaurant.coordinates.longitude;
    // alert(`Eat at ${restaurant.name}! It is located at ${newLat}, ${newLng}`);
    // this.setState({markers: [{lat: newLat, lng: newLng}]});
  };

  render() {
    const {keyword, price, radius} = this.state;
    
    // let lat = parseFloat(`${latitude}`);
    // let lng = parseFloat(`${longitude}`);
    
    return (
      <div>
        <form onSubmit={this.submit}>
            {/* keyword field want to add autocomplete from Yelp API*/}
            <div>
              <label>Keyword:
              <input id='keyword' type='text' value={keyword} onChange={this.updateKeyword}/>
              </label>
              <br/>
            </div>
          
            {/* price field: in Yelp API prices are 1,2,3,4 */}
            <p>Price:</p>
            <div className='custom-control custom-radio'>
              <input id='super' type='radio' name='price' value='4' checked={price === '4'} onChange={this.updatePrice}/>
              <label htmlFor='super'>$$$$</label><br/>
            </div>
            <div className='custom-control custom-radio'>
              <input id='high' type='radio' name='price' value='3' checked={price === '3'} onChange={this.updatePrice}/>
              <label htmlFor='high'>$$$</label><br/>
            </div>
            <div className='custom-control custom-radio'>
              <input id='mid' type='radio' name='price' value='2' checked={price === '2'} onChange={this.updatePrice}/>
              <label htmlFor='mid'>$$</label><br/>
            </div>
            <div className='custom-control custom-radio'>
              <input id='low' type='radio' name='price' value='1' checked={price === '1'} onChange={this.updatePrice}/>
              <label htmlFor='low'>$</label><br/><br/>
            </div>
          
            {/* radius field, in meters */}
            <div className='form-group'>
              <label>Radius in kilometers (max 40):
              <input id='radius' type='number' value={radius / 1000} onChange={this.updateRadius}/>
              </label>
            </div>
            <button className='btn btn-primary'>Search</button>
          </form>
          <div>
            <MyGoogleMap isMarkerShown={this.state.hasMarker} containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }/>
          </div>
      </div>

  );
  }
}

export default Finder;
