import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MapHeader as Header } from 'aqueduct-components';

// helpers
import { getMapHeaderTemplate } from './helpers';

class MapHeader extends PureComponent {
  render() {
    const { dictionary, filters } = this.props;

    // This element isn't shown on the mocks
    if (filters.scope === 'supply_chain') return null

    return (
      <Header
        dictionary={dictionary}
        filters={filters}
        template={getMapHeaderTemplate(filters)}
      />
    );
  }
}

MapHeader.propTypes = {
  filters: PropTypes.object.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default MapHeader;
