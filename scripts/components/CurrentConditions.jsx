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