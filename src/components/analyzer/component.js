import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SegmentedUi,
} from 'aqueduct-components';
import {
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';
import CropFilter from 'components/filters/filter-items/crops/crop-select'

// components
import { DownloadableTable } from 'components/ui/analyzer';

const Analyzer = ({ filters, setFilters }) => {
  const [tab, setTab] = useState('overall')

  const indicatorKey = filters.indicator ? ID_LOOKUP[filters.indicator] : undefined

  if (!ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE.supply_chain.includes(indicatorKey)) return null
  
  const indicatorSpec = WATER_INDICATORS[indicatorKey]

  return (
    <React.Fragment>
      <div className="analyzer-tabs">
        <SegmentedUi
          className="-tabs-light"
          items={[
            { value: 'overall', label: 'Select Crops' },
            { value: 'analyzer', label: 'Supply Chain Analyzer' },
          ]}
          selected={tab}
          onChange={selected => setTab(selected.value)}
        />
      </div>
      <div className="analyzer">
        {tab === 'overall' && (
          <React.Fragment>
            <div className="row expanded collapse align-justify align-bottom">
              <div className="small-12 medium-6 columns">
                <CropFilter
                  hideHelpIcon
                  crop={filters.crop}
                  irrigation={filters.irrigation}
                  onCropChange={crop => setFilters({ crop: crop.value })}
                  onIrrigationChange={irrigation => setFilters({ irrigation: irrigation.value })}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        {tab === 'analyzer' && (
          <React.Fragment>
            <h4 className="title">Supply Chain Analyzer</h4>
            <p className="subtitle">
              <strong>{indicatorSpec.name}</strong> with desired condition set to <strong>&lt;{filters.threshold}{indicatorSpec.unit}</strong>
            </p>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

Analyzer.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default Analyzer;
