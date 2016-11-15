import React from 'react';
import Header from 'components/header/Header';

class App extends React.Component {

  render() {
    return (
      <div className="l-main">
        <Header />
        {this.props.children}
        <div>Footer</div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};


export default App;
