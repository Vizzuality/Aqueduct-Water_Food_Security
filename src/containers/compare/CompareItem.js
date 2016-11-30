import { connect } from 'react-redux';
import CompareItem from 'components/compare/CompareItem';
import { setCompareCountry } from 'actions/compare';
import { updateCompareUrl } from 'actions/url';

const mapStateToProps = ({ countries }) => ({
  countries
});

const mapDispatchToProps = dispatch => ({
  setCompareCountry: (country) => {
    dispatch(setCompareCountry(country));
    dispatch(updateCompareUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareItem);
