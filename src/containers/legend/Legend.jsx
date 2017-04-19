import { connect } from 'react-redux';
import Legend from 'components/legend/Legend';

const mapStateToProps = state => ({
  filters: state.filters,
  countries: state.countries
});

export default connect(mapStateToProps, null)(Legend);
