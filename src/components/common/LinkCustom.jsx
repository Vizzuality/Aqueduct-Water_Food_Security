import React from 'react';
import { browserHistory } from 'react-router';

class LinkCustom extends React.Component {
  constructor(props) {
    super(props);

    // BINDINGS
    this.onClickNavigate = this.onClickNavigate.bind(this);
  }

  onClickNavigate(e) {
    e && e.preventDefault();
    browserHistory.push(this.props.to);
  }

  render() {
    return (
      <a href={this.props.to} onClick={this.onClickNavigate}>{this.props.children}</a>
    );
  }
}

LinkCustom.propTypes = {
  children: React.PropTypes.string,
  // ACTIONS
  to: React.PropTypes.string
};

export default LinkCustom;
