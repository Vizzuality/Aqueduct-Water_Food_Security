import React from 'react';

class Spinner extends React.Component {

  render() {
    const loading = (this.props.isLoading) ? '-loading' : '';

    return (
      <div className={`c-spinner ${loading}`}>
        <div className="spinner-box">
          <div className="icon" />
        </div>
      </div>
    );
  }
}

Spinner.propTypes = {
  isLoading: React.PropTypes.bool
};

export default Spinner;
