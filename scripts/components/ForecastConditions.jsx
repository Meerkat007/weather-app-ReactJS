import React from 'react';

/* forecast conditions */
export default class ForecastConditions extends React.Component {
    render() {
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