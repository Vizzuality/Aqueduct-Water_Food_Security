import React from 'react';

export default function Spinner({ isLoading }) {
  const loading = (isLoading) ? '-loading' : '';
  return (
    <div className={`c-spinner ${loading}`}>
      <div className="spinner-box">
        <div className="icon" />
      </div>
    </div>
  );
}

Spinner.propTypes = {
  isLoading: React.PropTypes.bool
};
