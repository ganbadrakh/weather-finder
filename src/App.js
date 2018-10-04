import React, { Component } from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

const API_KEY = 'a505196bc2feae8cc7de035269be0cd2';

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    
    if(data.cod === 404){ this.setState({ temperature: undefined, city: undefined, country: undefined, humidity: undefined, description: undefined, error: 'Please make sure your inputs are valid.', min_temperature: undefined, max_temperature: undefined, icon: null, wind: undefined }); 
  } else if(city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the expected values!'
      });
    } 
  }

  render() {
    return (
      <div>
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
          <div className="ml-auto">
          <div className="row">
              <div className="col-md-5 title-container">
                <Titles />
              </div>
              <div className="col-md-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}  
                />
              </div>
            </div>
          </div>  
          </div>
        </div>
      </div>  
      </div>
    );
  }
}

export default App;
        