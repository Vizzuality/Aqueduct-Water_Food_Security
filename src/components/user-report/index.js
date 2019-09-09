import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserReport extends PureComponent {
  render() {
    const { router: { location: { pathname } } } = this.props;

    if (pathname === '/report') return null;

    return (
      <button
        type="button"
        className="c-user-report"
        onClick={() => window !== 'undefined' && window._urq.push(['Feedback_Open'])}
      >
        Feedback
      </button>
    );
  }
}

UserReport.propTypes = { router: PropTypes.object.isRequired };

export default UserReport;
