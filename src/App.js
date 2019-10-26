import React, { Component } from "react";
import axios from "axios";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "8c2ed5fc9965b36aaa3b0bda6d4e874a";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  } //initial state^^

  async componentDidMount() {
    const response = await axios.get('http://localhost:8080/favorites');

    const favorites = response.data;
    this.setState(favorites[favorites.length - 1])
  }

  getWeather = async (e) => {
    e.preventDefault(); //arrow function instead of using 'constructor' allows you to use 'this' more freely
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`); //template strings used to inject variables into a URL (Units=metric: celsius)
    const data = await api_call.json(); //converts data from API into a readable format, JSON format.
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "not sure what you're looking for..."
      });
    }
  }
  // IF city & state are searched it will pull the data above. ELSE return undefined and error "please enter the values"
  render() {
    const {temperature, humidity, city, country, description, error} = this.state
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-6 title-container">
                  <Titles />
                </div>
                <section className="col-6 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={temperature} 
                    humidity={humidity}
                    city={city}
                    country={country}
                    description={description}
                    error={error}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

//Form is a prop. Accesses Form.js
//before invoking 'e' or giving it an argument. The website would reload on submit. e is event object in javascript. (e.preventDefault) prevents this behavior.


export default App;