import React from 'react'

/* container for the weather data area */
export default class WeatherData extends React.Component {
    render() {
        // var iconUrl = `http://openweathermap.org/img/w/${this.props.data.conditionIcon}.png`;
        var iconUrl = ''

        return (
            <div className="data-container">
  
                <OtherConditions
                    wind = {this.props.data.wind}
                    pressure = {this.props.data.pressure}
                    sunRise = {this.props.data.sunRise}
                    sunSet = {this.props.data.sunSet}
                    humidity = {this.props.data.humidity}
                    />
            </div>
        );
    }
}

