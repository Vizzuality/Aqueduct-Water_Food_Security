import React from 'react';
import PropTypes from 'prop-types';

// Components
import CompareMaps from 'components/compare/CompareMaps';
import CompareSummaries from 'components/compare/CompareSummaries';
import CompareWidgetList from 'components/compare/CompareWidgetList';

export default class CompareList extends React.Component {
  render() {
    return (
      <div className="c-comparelist">
        <div className="comparelist-content">
          <CompareMaps {...this.props} />
          <CompareSummaries {...this.props} />
          <CompareWidgetList {...this.props} />
        </div>
      </div>
    );
  }
}

CompareList.propTypes = {
  countries: PropTypes.array,
  countryList: PropTypes.array,
  loading: PropTypes.bool,
  items: PropTypes.number,
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array,
  active: PropTypes.number
};
