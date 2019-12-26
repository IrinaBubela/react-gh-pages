import React from "react";
function Weather(props) {
    return (
        <div className="infoWeather">
            {props.city &&
                <div>
                    <p>Location: {props.city}, {props.country} </p>
                    <p>Temperature: {props.temp}℃ </p>
                    <p>Humidity: {props.humidity}%</p>
                    <p>Sunrise at: {props.sunrise} </p>
                    <p>Sunset at: {props.sunset} </p>
                </div>
            }
            <p className="error">{props.error}</p>
        </div>
    )
}

export default Weather;