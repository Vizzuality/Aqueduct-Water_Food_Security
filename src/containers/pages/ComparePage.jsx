import { connect } from 'react-redux';
import ComparePage from 'components/pages/ComparePage';

const mapStateToProps = ({ compare, datasets }) => ({
  compare,
  datasets
});

export default connect(mapStateToProps, null)(ComparePage);
