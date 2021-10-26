import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';

// components
import { DownloadableTable } from 'components/ui/analyzer';

class Analyzer extends PureComponent {
  render() {
    const { filters } = this.props

    const indicatorKey = filters.indicator ? ID_LOOKUP[filters.indicator] : undefined

    if (!ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE.supply_chain.includes(indicatorKey)) return null
    
    const indicatorSpec = WATER_INDICATORS[indicatorKey]

    return (
      <div className="analyzer">
        <h4 className="title">Supply Chain Analyzer</h4>
        <p className="subtitle">
          <strong>{indicatorSpec.name}</strong> with desired condition set to <strong>&lt;{filters.threshold}{indicatorSpec.unit}</strong>
        </p>
        {/* LEFT OFF HERE AT ADDING TABLE AND SUCH */}
      </div>
    );
  }
}

Analyzer.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default Analyzer;
