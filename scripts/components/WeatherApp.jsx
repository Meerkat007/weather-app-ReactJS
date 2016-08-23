import React from 'react';
/* container for the whole weather display area */
export class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            condition: '',
            conditionIcon: '01d' // A default value to prevent 404 error when the icon image http request is sent for the first time.
        };
        this.location = 'toronto,on'; // TODO autodetect location
        
    }

    /* convert Unix time to UTC time. */
    convertUnixTime(unixTime) {
        var time = moment.unix(unixTime);
        //TODO convert time to the location's local time
        var timeFormatted = moment(time, 'HH:MM').format('h:mm a')
        return timeFormatted;
    }

    /* Called automatically after the component is rendered for the first time. */
    componentDidMount() {
        this.sendCurrentWeatherQuery(this.location);
    }

    render() {
        return (
            <div className="weather-app-wrapper">
                <LocationDisplay
                    city={this.state.city}
                    country={this.state.country}
                    />
                <SearchBar
                    onSearchSubmit={(this.sendCurrentWeatherQuery).bind(this) }
                    />
                <WeatherData
                    data={this.state}
                    />
                <ForecastList listData={this.props.forecastData} />
            </div>
        );
    }
}