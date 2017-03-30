import React from 'react';
import { format } from 'd3-format';

class VegaChartTooltip extends React.Component {
  getValues() {
    const { data, config } = this.props;

    const list = config.fields.map((item) => {
      return (
        <li className="tooltip-list-item" key={item.key}>
          <span className="title"> {item.label || item.key}: </span>
          <span className="value"> {this.parseValues(data[item.key], item)} </span>
        </li>
      );
    });

    return list;
  }

  parseValues(value, param) {
    const preffix = param.preffix || '';
    const suffix = param.suffix || '';
    let val = value;

    if (param.format) {
      val = (!isNaN(value)) ? format(param.format)(value) : val;
    }

    return `${preffix}${val}${suffix}`;
  }


  render() {
    return (
      <div>
        <ul className="tooltip-list">
          {this.getValues()}
        </ul>
      </div>
    );
  }
}

VegaChartTooltip.propTypes = {
  // Define the chart data
  data: React.PropTypes.object,
  config: React.PropTypes.object
};

export default VegaChartTooltip;
