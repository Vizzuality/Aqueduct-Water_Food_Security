import React from 'react';
import { format } from 'd3-format';

class VegaChartTooltip extends React.Component {
  getList() {
    const { data, config } = this.props;

    return (
      <ul className="tooltip-list">
        {config.fields.map((item, i) => {
          return (
            <li className="tooltip-list-item" key={i}>
              <span className="title"> {item.label || item.key}: </span>
              <span className="value"> {this.parseValues(data[item.key], item)} </span>
            </li>
          );
        })}
      </ul>
    );
  }

  getTable() {
    const { data, config } = this.props;

    const title = this.parseValues(data[0][config.table.title.key], config.table.title.parse || {});

    return (
      <div>
        <h3 className="tooltip-title">{title}</h3>
        <table className="tooltip-table">
          <thead>
            <tr>
              {config.table.headers.map((k, j) => {
                return (
                  <th key={j}>{k}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return (
                <tr className="tooltip-list-item" key={i}>
                  {config.table.columns.map((item, j) => {
                    const key = item.key;
                    const parse = item.parse || {};

                    return (
                      <td key={j}>{this.parseValues(d[key], parse)}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    );
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
    const { data } = this.props;

    return (Array.isArray(data)) ? this.getTable() : this.getList();
  }
}

VegaChartTooltip.propTypes = {
  // Define the chart data
  data: React.PropTypes.any,
  config: React.PropTypes.object
};

export default VegaChartTooltip;
