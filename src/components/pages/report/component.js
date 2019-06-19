import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import WidgetList from 'components/widgets/widget-list';
import Summary from 'components/summary';
import Map from 'components/map';
import Legend from 'components/map/legend';

class ReportPage extends PureComponent {
  componentWillMount() {
    const { updateReportUrl } = this.props;

    updateReportUrl();
  }

  render() {
    const {
      filters: {
        scope,
        country
      },
    } = this.props;

    return (
      <div id="l-report" className="l-report c-report">
        <div className="content">
          <header>
            <h2 className="report-title">Aqueduct Food report</h2>
          </header>

          {scope === 'country' && country && (<Summary />)}
          <WidgetList />

          {/* Map */}
          <div className="c-map-container">
            <Map
              mapControls={false}
              legend={false}
            />
            <Legend
              className="-map"
              expanded
            />
          </div>
        </div>
        <button
          type="button"
          className="c-btn -primary -light no-print"
          style={{
            position: 'fixed',
            zIndex: 10000,
            bottom: 20,
            right: 20
          }}
          onClick={() => { window.print(); }}
        >
          Download
        </button>
      </div>
    );
  }
}

ReportPage.propTypes = {
  filters: PropTypes.object.isRequired,
  updateReportUrl: PropTypes.func.isRequired
};

export default ReportPage;
