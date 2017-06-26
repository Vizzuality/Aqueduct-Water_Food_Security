import React from 'react';
import PropTypes from 'prop-types';

export default function InfoWindow(props) {
  const { country } = props;

  return (
    <div className="c-infowindow">
      <h3>{country}</h3>
    </div>
  );
}

InfoWindow.propTypes = {
  country: PropTypes.string
};
