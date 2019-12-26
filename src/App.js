//here i am going to combine our components

import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather"

const API_KEY = "82fe346f33a3b30c1d6d2345e8995c97";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            temp: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            error: undefined,
            cod: ''
        };
    }

    gettingWeather = async (e) => {
        //when we submit we stop updating
        e.preventDefault();

        const city = e.target.elements.city.value;

        if (city) {
            const api_url = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_url.json();
            console.log(data);
            if (data.cod === '404') {
                return this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    error: "City not found"
                });
            }

            var dateSunrise = new Date(data.sys.sunrise * 1000);
            var sunrise_date = String(dateSunrise.getHours()).padStart(2, "0") + ":" + String(dateSunrise.getMinutes()).padStart(2, "0") + ":" + String(dateSunrise.getSeconds()).padStart(2, "0");

            var dateSunset = new Date(data.sys.sunset * 1000);
            var sunset_date = String(dateSunset.getHours()).padStart(2, "0") + ":" + String(dateSunset.getMinutes()).padStart(2, "0") + ":" + String(dateSunset.getSeconds()).padStart(2, "0")

            this.setState({
                temp: Math.floor(data.main.temp - 273.15),
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                sunrise: sunrise_date,
                sunset: sunset_date,
                error: undefined
            });
        }
        else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Search location, please. "
            });
        }
    }


    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather} />
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;