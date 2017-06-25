import React from 'react';
import PropTypes from 'prop-types';

import { dispatch } from 'main';
import { setFilters } from 'actions/filters';

export default function InfoWindow(props) {
  const { country } = props;

  return (
    <div className="c-infowindow">
      <h3>{country}</h3>
      {/* <button onClick={() => dispatch(setFilters({ scope: 'country', country: 'USA' }))}>
        Click??
      </button> */}
    </div>
  );
}

InfoWindow.propTypes = {
  country: PropTypes.string
};
