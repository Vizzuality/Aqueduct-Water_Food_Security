import React from 'react';

export default class Accordion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: props.opened === undefined ? false : props.opened
    };
    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    return (
      <div className={`c-accordion ${this.state.opened || '-closed'}`}>
        <div className="accordion-header">
          <span className="accordion-title">{this.props.title}</span>
          <button className="accordion-btn" type="button" onClick={this.toggle}>Toggle legend</button>
        </div>
        <div className="accordion-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  opened: React.PropTypes.bool,
  title: React.PropTypes.string,
  children: React.PropTypes.object
};
