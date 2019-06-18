import React, { PureComponent } from 'react';

// components
import CompareMaps from 'components/compare/compare-maps';
import CompareSummaries from 'components/compare/CompareSummaries';
import CompareWidgetList from 'components/compare/CompareWidgetList';

class CompareList extends PureComponent {
  render() {
    return (
      <div className="c-comparelist">
        <div className="comparelist-content">
          <CompareMaps />
          <CompareSummaries {...this.props} />
          <CompareWidgetList {...this.props} />
        </div>
      </div>
    );
  }
}

export default CompareList;
