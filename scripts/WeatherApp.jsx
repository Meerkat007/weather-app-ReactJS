(function () {
    'use strict';
    /* container for the whole weather display area */
    class WeatherApp extends React.Component {
        constructor() {
            super();
            this.state = {
                temp: '',
                condition: ''
            };
            this.location = 'toronto,on'; // TODO autodetect location
            this.currentWeatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
            this.forecastQuery = 'api.openweathermap.org/data/2.5/forecast/weather?q=';
        }

        /* convert Unix time to UTC time. */
        convertUnixTime(unixTime) {
            var date = new Date(unixTime * 1000);
            var hours = date.getHours();
            var minutes = '0' + date.getMinutes();
            return hours + ':' + minutes.substr(-2);
        }

        //TODO convert unix time to local time.

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

    /* Display the current location for retrieving the weather data. */
    class LocationDisplay extends React.Component {
        constructor() {
            super();
            this.state = {
                location: 'Toronto'
            }
        }

        render() {
            return (
                <div className="location-display">
                    <span className="city">{this.props.city}</span>
                </div>
            );
        }
    }

    /* container for the search bar */
    class SearchBar extends React.Component {
        constructor() {
            super();
            this.state = {
                searchContent: '',
            };
        }

        /* handle search location change */
        handleSearchLocationChange(event) {
            this.setState({ searchContent: event.target.value });
        }

        /* functoin to perform when search button is clicked */
        handleSubmit(event) {
            event.preventDefault();
            this.props.onSearchSubmit(this.state.searchContent);
        }

        render() {
            return (
                <div className="searchbox-wrapper">
                    <form className="input-group" onSubmit={(this.handleSubmit).bind(this) }>
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                        </div>
                        <input type="text" className="form-control" placeholder="Search for location" onChange={(this.handleSearchLocationChange).bind(this) } name="srch-term" id="srch-term"></input>
                    </form>
                </div>
            );
        }
    }

    /* container for the weather data area */
    class WeatherData extends React.Component {
        render() {
            var iconUrl = `http://openweathermap.org/img/w/${this.props.data.conditionIcon}.png`;
            return (
                <div className="data-container">
                    <div className="city-tablet-above">
                        <span>city name</span>
                    </div>
                    <div className="temperature-container">
                        <div className="condition-icon">
                            <img src={iconUrl} />
                        </div>
                        <div className="temperature">
                            <span id="temperature-value">{this.props.data.temp}</span>
                            <span id="unit">&#8451; </span>
                        </div>
                        <span className="condition">{this.props.data.condition}</span>
                    </div>
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

    /* other conditions including wind, pressure, sunrise, sunset, humidity */
    class OtherConditions extends React.Component {
        render() {
            return (
                <div className="other-conditions-wrapper">
                    <ul className="other-conditions">
                        <li className="wind">
                            <span><strong>Wind</strong></span>
                            <span>{this.props.wind}</span>
                        </li>
                        <li className="pressure">
                            <span><strong>Pressure</strong></span>
                            <span>{this.props.pressure}</span>
                        </li>
                        <li>
                            <span><strong>Sunrise/Sunset</strong></span>
                            <span>{this.props.sunRise}</span>
                            <span>{this.props.sunSet}</span>
                        </li>
                        <li>
                            <span><strong>Humidity</strong></span>
                            <span>1222</span>
                        </li>
                    </ul>
                </div>
            );
        }
    }

    /* list of forcasts */
    class ForecastList extends React.Component {
        render() {
            var forecastListNode = [];
            for (var key in this.props.listData) {
                if (this.props.listData.hasOwnProperty(key)) {
                    forecastListNode.push(
                        <ForecastListItem 
                            itemData={this.props.listData[key]}
                            key={key}
                        />
                    );
                }
            }
            return (
                <div>
                    {forecastListNode}
                </div>
            );
        }
    }

    /* an item displaying the forecast of a given day */
    class ForecastListItem extends React.Component {
        render() {
            return (
                <div className="forecast-list-item">
                    <div className="forecast-date">Tue Jun 7</div>
                    <div className="main-forecast-data">
                        <span>{this.props.itemData.condition}</span>
                        <div className="forecast-temperature">
                            27 - 10
                        </div>
                    </div>
                    <div className="other-conditions-forecast">
                        <OtherForecastCondition />
                    </div>
                </div>
            );
        }
    }

    /* forecast conditions */
    function OtherForecastCondition(props) {
        return (
            <div>
            <div className="other-list-condition-item">
                <div className="other-condition-label">POP</div>
                <span>40%</span>
            </div>
            <div className="other-list-condition-item">
                <div className="other-condition-label">Wind</div>
                <span>10km/h</span>
            </div>
            </div>
        );
    }

    var forecastData = {
        0: {
            temp_max: 20,
            temp_min: 10,
            pop: 0.2,
            wind: 10,
            condition: "mainly sunny"
        },
        1: {
            temp_max: 20,
            temp_min: 10,
            pop: 0.2,
            wind: 10,
            condition: "mainly sunny"
        },
        2: {
            temp_max: 20,
            temp_min: 10,
            pop: 0.2,
            wind: 10,
            condition: "mainly sunny"
        },
        3: {
            temp_max: 20,
            temp_min: 10,
            pop: 0.2,
            wind: 10,
            condition: "mainly sunny"
        },
        4: {
            temp_max: 20,
            temp_min: 10,
            pop: 0.2,
            wind: 10,
            condition: "mainly sunny"
        }
    };


    ReactDOM.render(
        <WeatherApp
            forecastData={forecastData}
        />,
        document.getElementById('content')
    );
})();
