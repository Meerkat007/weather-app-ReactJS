'use strict';
// var createFragment = require('react-addons-create-fragment');
/* container for the whole weather display area */
class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            condition: ''
        };
    }
    
    loadDataFromServer() {
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
		this.loadDataFromServer();
	}
    
    render() {       
        return (
          <div className="weather-app-wrapper"> 
            <span className="city">Toronto, ON</span>
            <SearchBar />
            <WeatherData 
                temp={this.state.temp}
                condition={this.state.condition}
            />
          </div>
        );
    }
}

/* container for the search bar */
class SearchBar extends React.Component {
    render() {
        return (
          <div className="search-bar-wrapper">
            <input id="search-text-field" type="search" placeholder="Search for location" autocomplete="on"></input>  
          </div>
        );
    }
}

/* container for the weather data area */
class WeatherData extends React.Component {
    render() {
        return (
          <div className="data-container">
            <div className="city-tablet-above">
                <span>city name</span>
            </div>
            <div className="temperature-container">
                <span id="temperature-value">{this.props.temp}</span>
                <span id="unit">&#8451;</span>
            </div>
            <div className="condition-container">
                <span>{this.props.condition}</span>
            </div>
          </div>   
        );
    }
}


var currentCondition = {
 "query": {
  "count": 1,
  "created": "2016-06-03T16:15:11Z",
  "lang": "en-GB",
  "results": {
   "channel": {
    "item": {
     "condition": {
      "code": "32",
      "date": "Fri, 03 Jun 2016 11:00 AM EDT",
      "temp": "18",
      "text": "Sunny"
     }
    }
   }
  }
 }
};
 
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'toronto%2C%20on')%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

ReactDOM.render(
  <WeatherApp url={url} />,
  document.getElementById('content')
);
