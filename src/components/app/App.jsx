import React from 'react';
import { Header } from 'aqueduct-components';
import Modal from 'containers/ui/Modal';

export default class App extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
    this.props.getCountries();
  }

  render() {
    return (
      <div className="l-app">
        <Header />
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getCountries: React.PropTypes.func,
  getDatasets: React.PropTypes.func
};
