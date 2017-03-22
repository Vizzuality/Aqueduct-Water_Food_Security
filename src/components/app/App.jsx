import React from 'react';
import classnames from 'classnames';
import Modal from 'containers/ui/Modal';

export default class App extends React.Component {

  componentWillMount() {
    // We assume the only page that doesn't have the header is the embed
    // For the embed, we don't need to fetch the list of datasets nor countries
    if (!this.props.header) return;

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
