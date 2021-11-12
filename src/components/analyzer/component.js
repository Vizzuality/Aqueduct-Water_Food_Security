import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SegmentedUi,
  RadioGroup
} from 'aqueduct-components';
import CustomTable from 'components/ui/Table/Table';
import { ExportToCsv } from 'export-to-csv';
import {
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';
import {
  extractTableValues,
} from 'constants/analyzer'
import CropFilter from 'components/filters/filter-items/crops/crop-select'
import BtnMenu from 'components/ui/BtnMenu';

// TODO: Remove this file once the analyzer is connected
import RESULT_DATA from './TEMP_DATA.json'

// components
import { DownloadableTable } from 'components/ui/analyzer';

const DATA = extractTableValues(RESULT_DATA)

const HEADERS = Object.keys(DATA[0]).map(k => ({ label: k, value: k }))

const Analyzer = ({ filters, setFilters }) => {
  const [imported, setImported] = useState(false)
  const [mapView, setMapView] = useState('all')
  const indicatorKey = filters.indicator ? ID_LOOKUP[filters.indicator] : undefined

  if (!ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE.supply_chain.includes(indicatorKey)) return null
  
  const indicatorSpec = WATER_INDICATORS[indicatorKey]

  const tab = filters.subscope

  const downloadCSV = (event) => {
    if (event) event.preventDefault();
    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${filters.indicator.name}`,
      headers: HEADERS.map(c => c.label)
    });
    csvExporter.generateCsv(DATA);
  };

  return (
    <React.Fragment>
      <div className="analyzer-tabs">
        <SegmentedUi
          className="-tabs-light"
          items={[
            { value: 'overall', label: 'Select Crops' },
            { value: 'analyzer', label: 'Supply Chain Analyzer' },
          ]}
          selected={filters.subscope || 'overall'}
          onChange={selected => setFilters({ subscope: selected.value })}
        />
      </div>
      <div className="analyzer">
        {tab !== 'analyzer' && (
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
            {imported ? (
              <React.Fragment>
                <h4 className="title">Select Map View</h4>
                <div className="my-1">
                  <RadioGroup
                    name="map-view"
                    items={[
                      { value: 'all', label: 'Display all watersheds' },
                      { value: 'priority', label: 'Display priority watersheds' },
                    ]}
                    onChange={selected => setMapView(selected.value)}
                    selected={mapView}
                    className="-inline"
                  />
                </div>
                <h4 className="title">Supply Chain Analyzer Results</h4>
                <p className="subtitle">
                  <strong>{indicatorSpec.name}</strong> with desired condition set to <strong>&lt;{filters.threshold}{indicatorSpec.unit}</strong>
                </p>
                <div className="downloadable-table">
                  <DownloadableTable
                    onExpandTable={() => {}}
                    hideInstructions
                    noExpand // Should expand eventually
                    downloadOptions={[
                      { name: 'CSV', action: () => downloadCSV() }
                    ]}
                  >
                    <CustomTable
                      columns={HEADERS}
                      data={DATA}
                      pagination={{
                        // enabled: data.length > 10,
                        enabled: true,
                        pageSize: 10,
                        page: 0
                      }}
                    />
                  </DownloadableTable>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>
                  Import File to find priority watersheds in your supply chain.
                </p>
                <div className='my-1'>
                  <BtnMenu
                    className="-theme-white"
                    items={[
                      { label: 'Import File', cb: () => setImported(true) }
                    ]}
                  />
                </div>
              </React.Fragment>
            )}
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
