import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { format } from 'd3-format';

const BASELINE_YEARS = ['2005', '2010', '2014'];

class VegaChartTooltip extends React.Component {
  getList() {
    const { data, config } = this.props;

    return (
      <ul className="tooltip-list">
        {config.fields.map((item, i) => {
          return (
            <li className="tooltip-list-item" key={i}>
              <span className="title"> {item.label || item.key}: </span>
              <span className="value"> {this.parseValues(item.key, data[item.key], item)} </span>
            </li>
          );
        })}
      </ul>
    );
  }

  getTable() {
    const { data, config } = this.props;

    const title = this.parseValues(config.table.title.key, data[0][config.table.title.key], config.table.title.parse || {});

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
            {sortBy(data, d => d.impactparameter || d.commodity).map((d, i) => {
              return (
                <tr className="tooltip-list-item" key={i}>
                  {config.table.columns.map((item, j) => {
                    const key = item.key;
                    const parse = item.parse || {};

                    return (
                      <td key={j}>{this.parseValues(key, d[key], parse)}</td>
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

  parseValues(key, value, param) {
    const preffix = param.preffix || '';
    const suffix = param.suffix || '';
    let val = value;

    if (param.format) {
      val = (!isNaN(value)) ? format(param.format)(value) : val;
    }

    if(key === 'year') {
      if(BASELINE_YEARS.includes((value || '').toString())) val = 'Baseline'
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
  data: PropTypes.any,
  config: PropTypes.object
};

export default VegaChartTooltip;
