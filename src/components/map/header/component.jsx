import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MapHeader as Header } from 'aqueduct-components';

// helpers
import { getDictionary, getMapHeaderTemplate } from './helpers';

class MapHeader extends PureComponent {
  render() {
    const { filters, countries } = this.props;

    return (
      <Header
        dictionary={getDictionary(filters, countries)}
        filters={filters}
        template={getMapHeaderTemplate(filters)}
      />
    );
  }
}

MapHeader.propTypes = {
  filters: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired
};

export default MapHeader;
