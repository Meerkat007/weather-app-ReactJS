'use strict';
/* container for the whole weather display area */
class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            condition: ''
        };
        this.location = 'toronto,on';
        this.currentWeatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
        this.forecastQuery = 'api.openweathermap.org/data/2.5/forecast/weather?q=';
    }
    
    convertUnixTime(unixTime) {
        var date = new Date(unixTime * 1000); 
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        console.log(hours + ':' + minutes.substr(-2));
        return hours + ':' + minutes.substr(-2);
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
            success: function(data) {
                console.log(data);
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
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    
    /* Send query for current weather conditions. */
    sendCurrentWeatherQuery(location) {
        console.log('send currentWeatherQuery called' + this.currentWeatherQuery);
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
                onSearchSubmit={(this.sendCurrentWeatherQuery).bind(this)}
            />
            <WeatherData 
                data={this.state}
            />
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
        console.log(event.target.value);
        this.setState({searchContent: event.target.value});
    }
    
    /* functoin to perform when search button is clicked */
    handleSubmit(event) {
        console.log('submit clicked');
        event.preventDefault();
        this.props.onSearchSubmit(this.state.searchContent);
    }
    
    render() {
        return (
            <div className="searchbox-wrapper">
                <form className="input-group" onSubmit={(this.handleSubmit).bind(this)}>
                    <div className="input-group-btn">
                        <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                    </div>
                    <input type="text" className="form-control" placeholder="Search for location" onChange={(this.handleSearchLocationChange).bind(this)} name="srch-term" id="srch-term"></input>
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
                    <span id="unit">&#8451;</span>
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
class ForeCastList extends React.Component {
    
}

/* an item displaying the forecast of a given day */
class ForeCastListItem extends React.Component {
    
}

var currentCondition = {
  "coord": {
    "lon": -79.42,
    "lat": 43.7
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "cmc stations",
  "main": {
    "temp": 26.48,
    "pressure": 1016,
    "humidity": 49,
    "temp_min": 22,
    "temp_max": 26
  },
  "wind": {
    "speed": 3.1,
    "deg": 120
  },
  "clouds": {
    "all": 1
  },
  "dt": 1464983202,
  "sys": {
    "type": 1,
    "id": 3721,
    "message": 0.0043,
    "country": "CA",
    "sunrise": 1464946644,
    "sunset": 1465001708
  },
  "id": 6167865,
  "name": "Toronto",
  "cod": 200
};
 


ReactDOM.render(
  <WeatherApp data={currentCondition}/>,
  document.getElementById('content')
);
