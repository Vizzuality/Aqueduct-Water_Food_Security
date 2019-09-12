import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Toastr from 'react-redux-toastr';

// components
import Modal from 'components/modal';
import Tooltip from 'components/tooltip';
import UserReport from 'components/user-report';
import { Icons } from 'vizzuality-components';

class App extends PureComponent {
  componentWillMount() {
    const { getDatasets, getCountries } = this.props;

    getDatasets();
    getCountries();
  }

  render() {
    const { header, main } = this.props;
    const mainClass = classnames(
      'l-main l-content',
      { '-no-header': !header }
    );

    return (
      <div className="l-app">
        <Icons />
        {header}

        <main role="main" className={mainClass}>
          {main}
        </main>

        <Modal />

        <Tooltip />

        <Toastr
          preventDuplicates
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />

        <UserReport {...this.props} />
      </div>
    );
  }
}

App.propTypes = {
  header: PropTypes.element,
  main: PropTypes.element.isRequired,
  getCountries: PropTypes.func.isRequired,
  getDatasets: PropTypes.func.isRequired
};

App.defaultProps = { header: null };

export default App;
