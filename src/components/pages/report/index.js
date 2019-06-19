import { connect } from 'react-redux';

// actions
import { updateReportUrl } from 'actions/url';

// selectors
import { parseMapState, getActiveLayers } from 'components/map/selectors';

// component
import ReportPage from './component';

export default connect(
  state => ({
    mapState: parseMapState(state),
    filters: state.filters,
    layers: getActiveLayers(state),
    countries: state.countries.list
  }),
  { updateReportUrl }
)(ReportPage);
