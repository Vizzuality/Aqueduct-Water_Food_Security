import React from 'react';
import classnames from 'classnames';

import Modal from 'containers/ui/Modal';
import Tooltip from 'containers/ui/Tooltip';
import Toastr from 'react-redux-toastr'

export default class App extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
    this.props.getCountries();
  }

  render() {
    const mainClass = classnames({
      'l-main': true,
      'l-content': true,
      '-no-header': !this.props.header
    });

    return (
      <div className="l-app">
        {this.props.header}

        <main role="main" className={mainClass}>
          {this.props.main}
        </main>

        <Modal />

        <Tooltip />

        <Toastr
          preventDuplicates
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }
}

App.propTypes = {
  header: React.PropTypes.element,
  main: React.PropTypes.element,
  getCountries: React.PropTypes.func,
  getDatasets: React.PropTypes.func
};
