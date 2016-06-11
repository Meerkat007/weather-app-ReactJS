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
                        <img src={iconUrl} alt='weather-icon' />
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