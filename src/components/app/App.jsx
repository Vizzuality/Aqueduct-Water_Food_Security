import React from 'react';
import Header from 'components/header/Header';

class App extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
    this.props.getCountries();
  }

  render() {
    return (
      <div className="l-app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getCountries: React.PropTypes.func,
  getDatasets: React.PropTypes.func
};


export default App;
