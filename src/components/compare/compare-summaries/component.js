import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Summary from 'components/summary/component';

class CompareSummaries extends PureComponent {
  render() {
    const { compareConfig } = this.props;

    return (
      <div className="c-compareitem-summaries">
        <div className="c-compareitem-row">
          {compareConfig.map(_compareConfig => Object.keys(_compareConfig).length ? (
            <div
              key={_compareConfig.country}
              className="compareitem-column"
            >
              <Summary
                filters={_compareConfig.filters}
                countryName={_compareConfig.filters.countryName}
              />
            </div>
          ) : null)}
        </div>
      </div>
    );
  }
}

CompareSummaries.propTypes = { compareConfig: PropTypes.array.isRequired };

export default CompareSummaries;
