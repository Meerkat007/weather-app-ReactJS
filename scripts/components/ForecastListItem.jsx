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