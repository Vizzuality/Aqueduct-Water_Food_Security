import React from 'react';
import { Icon } from 'aqueduct-components';

class WidgetButtons extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  // HELPERS
  // - getDownloadUrl
  getDownloadUrl() {
    const downloadUrl = this.props.queryUrl || '';
    return `${config.API_URL}/${downloadUrl.replace('query', 'download')}`;
  }

  // UI EVENTS
  // - triggerAction
  triggerAction(e) {
    const action = e.currentTarget.dataset.action;
    this.props.triggerAction(action);
  }

  render() {
    return (
      <ul className="c-widget-buttons">
        <li>
          <a href={this.getDownloadUrl()} target="_blank" rel="noopener noreferrer" className="widget-button">
            <Icon name="icon-download" />
          </a>
        </li>
        <li>
          <button data-action="info" className="widget-button" onClick={this.triggerAction}>
            <Icon name="icon-info" />
          </button>
        </li>
      </ul>
    );
  }
}

WidgetButtons.propTypes = {
  queryUrl: React.PropTypes.string,
  triggerAction: React.PropTypes.func
};


export default WidgetButtons;
