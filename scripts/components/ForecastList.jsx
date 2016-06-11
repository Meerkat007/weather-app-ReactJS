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
