import { connect } from 'react-redux';
import EmbedPage from 'components/pages/EmbedPage';
import { getWidget } from 'actions/embed';

const mapStateToProps = state => ({
  filters: state.filters,
  error: state.embed.error,
  widget: state.embed.data
});

const mapDispatchToProps = dispatch => ({
  getWidget: () => dispatch(getWidget())
});

export default connect(mapStateToProps, mapDispatchToProps)(EmbedPage);
