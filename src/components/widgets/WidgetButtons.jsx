import React from 'react';

class WidgetButtons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shareable: true,
      downloadable: true
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(e) {
    const action = e.currentTarget.dataset.action;
    this.props.triggerAction(action);
  }

  render() {
    return (
      <ul className="c-widget-buttons">
        {(this.state.shareable) &&
          <li>
            <button data-action="share" className="widget-button" onClick={this.triggerAction}>
              <svg className="c-icon"><use xlinkHref="#icon-cross" /></svg>
            </button>
          </li>
        }

        {(this.state.downloadable) &&
          <li>
            <button data-action="download" className="widget-button" onClick={this.triggerAction}>
              <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
            </button>
          </li>
        }
      </ul>
    );
  }
}

WidgetButtons.propTypes = {
  triggerAction: React.PropTypes.func
};


export default WidgetButtons;
