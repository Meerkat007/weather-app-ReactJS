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
        this.currentWeatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
        this.forecastQuery = 'api.openweathermap.org/data/2.5/forecast/weather?q=';
    }

    /* convert Unix time to UTC time. */
    convertUnixTime(unixTime) {
        var time = moment.unix(unixTime);
        //TODO convert time to the location's local time
        var timeFormatted = moment(time, 'HH:MM').format('h:mm a')
        return timeFormatted;
    }

    /* Prepare query for server request. */
    prepareQuery(query, location) {
        return query + location + '&units=metric&APPID=82bd3d882ba68631b4379a30406c018b';
    }

    /* Send perpared query to webserver. */
    sendQuery(queryType, location) {
        var query = this.prepareQuery(queryType, location);
        this.makeQueryCall(query);
    }

    makeQueryCall(query) {
        $.ajax({
            url: query,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var mainData = data.main;
                var weatherDescription = data.weather[0];
                this.setState({
                    city: data.name,
                    country: data.sys.country,
                    condition: weatherDescription.description,
                    conditionIcon: weatherDescription.icon,
                    temp: Math.round(mainData.temp),
                    wind: data.wind.speed,
                    pressure: mainData.pressure,
                    humidity: mainData.humidity,
                    sunRise: this.convertUnixTime(data.sys.sunrise),
                    sunSet: this.convertUnixTime(data.sys.sunset)
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    /* Send query for current weather conditions. */
    sendCurrentWeatherQuery(location) {
        this.sendQuery(this.currentWeatherQuery, location);
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