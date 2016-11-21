import React from 'react';

class WidgetButtons extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(e) {
    const action = e.currentTarget.dataset.action;
    this.props.triggerAction(action);
  }

  render() {
    const { shareable, downloadable } = this.props.buttons;
    return (
      <ul className="c-widget-buttons">
        {(shareable) &&
          <li>
            <button data-action="share" className="widget-button" onClick={this.triggerAction}>
              <svg className="c-icon"><use xlinkHref="#icon-cross" /></svg>
            </button>
          </li>
        }

        {(downloadable) &&
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
  // PROPS
  buttons: React.PropTypes.object,
  triggerAction: React.PropTypes.func
};


export default WidgetButtons;
