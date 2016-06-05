'use strict';

/* container for the whole weather display area */
class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            condition: ''
        };
    }
    
    sendQuery(location) {
        console.log('sendquery: ' + location);
        $.ajax({
            url: this.props.url,
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
                var result = data.query.results.channel.item.condition;
                this.setState({
                    temp: result.temp,
                    condition: result.text
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
	}
    
    /* Called automatically after the component is rendered for the first time. */
	componentDidMount() {
		// this.sendQuery();
        this.setState({
            temp: this.props.data.main.temp,
            condition: this.props.data.weather[0].description,
            conditionIcon: this.props.data.weather[0].icon,
            wind: this.props.data.wind.speed,
            pressure: this.props.data.main.pressure,
            sunSet: this.props.data.main.sunset,
            sunRise: this.props.data.main.sunrise,
            humidity: this.props.data.main.humidity
        });
	}
    
    render() {       
        return (
          <div className="weather-app-wrapper"> 
            <LocationDisplay />
            <SearchBar 
                onSearchSubmit={(this.sendQuery).bind(this)}
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
            location: 'Toronto, ON'
        }
    }
    
    render() {
        return (
            <div className="location-display">  
                <span className="city">{this.state.location}</span>
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
                    <span className="condition">{this.props.data.condition}</span>
                </div>
            </div>
            <OtherConditions 
                wind = {this.props.data.wind}
                pressure = {this.props.data.pressure}
                sunRise = {this.props.sunRise}
                sunSet = {this.props.sunSet}
                humidity = {this.props.humidity}
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
                    <span>16:00</span>
                    <span>12:00</span>
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
 
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'toronto%2C%20on')%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

ReactDOM.render(
  <WeatherApp url={url} data={currentCondition}/>,
  document.getElementById('content')
);
