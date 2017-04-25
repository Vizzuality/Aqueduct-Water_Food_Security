import { connect } from 'react-redux';
import { Legend } from 'aqueduct-components';

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, null)(Legend);
