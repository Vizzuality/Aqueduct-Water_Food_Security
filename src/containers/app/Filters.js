import { connect } from 'react-redux';
import Filters from 'components/app/Filters';
import { setFilters, setCurrentFilter } from 'actions/filters';

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps, {
  setFilters,
  setCurrentFilter
})(Filters);
