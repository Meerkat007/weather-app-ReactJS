/* container for the whole weather display area */
class WeatherApp extends React.Component {
    render() {
        return (
          <div>weathercontainer 
            <SearchBar />
            <WeatherData data={this.props.data} />
          </div>
        );
    }
}

/* container for the search bar */
class SearchBar extends React.Component {
    render() {
        return (
          <div>search bar</div>   
        );
    }
}

/* container for the weather data area */
class WeatherData extends React.Component {
    render() {
        return (
          <div className="data-container">
            <div className="city">
                <span>{this.props.data[0].city}</span>
            </div>
            <div className="temperature">
                <span>{this.props.data[0].temperature}</span>
            </div>
          </div>   
        );
    }
}

var data = [
   {city: "Toronto", temperature: 20},
   {city: "Vancouver", temperature: 24}  
];

ReactDOM.render(
  <WeatherApp data={data} />,
  document.getElementById('content')
);
