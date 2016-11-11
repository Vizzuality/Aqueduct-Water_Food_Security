import React from 'react';
import Header from '../common/Header';

class App extends React.Component {

  render() {
    return (
      <div>
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
