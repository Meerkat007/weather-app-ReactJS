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