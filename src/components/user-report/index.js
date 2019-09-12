import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

class UserReport extends PureComponent {
  static handleClick() {
    toastr.info('', { component: () => (
      <div className="toastr-info">
        <span>Button not working? Please temporarily disable content blocking and whitelist
          this website in any tracker blockers. If you are using Mozilla Firefox
          you can get more info&nbsp;
        </span>
        <a href="https://support.mozilla.org/en-US/kb/content-blocking" target="_blank" rel="noopener noreferrer">here</a>.
      </div>
    ) });

    if (window !== 'undefined') window._urq.push(['Feedback_Open']);
  }

  render() {
    const { router: { location: { pathname } } } = this.props;

    if (pathname === '/report') return null;

    return (
      <button
        type="button"
        className="c-user-report"
        onClick={() => { UserReport.handleClick(); }}
      >
        Feedback
      </button>
    );
  }
}

UserReport.propTypes = { router: PropTypes.object.isRequired };

export default UserReport;
