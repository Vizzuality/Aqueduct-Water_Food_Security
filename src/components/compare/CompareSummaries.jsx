import React from 'react';
import PropTypes from 'prop-types';

import Summary from 'components/summary/Summary';

export default class CompareSummaries extends React.Component {
  render() {
    const items = Array.from(Array(this.props.items));

    return (
      <div className="c-compareitem-summaries">
        <div className="c-compareitem-row">
          {items.map((item, i) => {
            const country = this.props.countries[i];

            if (!country) {
              return null;
            }

            const filters = Object.assign({}, this.props.filters, {
              country,
              countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
            });

            return (
              <div key={country} className="compareitem-column">
                <Summary
                  filters={filters}
                  countries={this.props.countryList}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CompareSummaries.propTypes = {
  context: PropTypes.string,
  countryList: PropTypes.array,
  country: PropTypes.string,
  loading: PropTypes.bool,
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array
};
