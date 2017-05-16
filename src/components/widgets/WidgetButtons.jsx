import React from 'react';
import { Icon, DropdownButton } from 'aqueduct-components';

class WidgetButtons extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  /**
   * Event handler executed when the user selects a format in which to
   * download the widget's data
   * @param {string} format
   */
  onDownload(format) {
    if (format === 'json' || format === 'csv') {
      const link = document.createElement('a');
      link.href = `${config.API_URL}/${(this.props.queryUrl || '').replace('query', 'download')}&format=${format}`;
      link.click();
    } else if (format === 'embed' || format === 'image' || format === 'pdf') {
      this.props.triggerAction(format);
    } else {
      // Reserved for other formats.
    }
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
    const downloadOptions = [
      { label: 'Embed widget', value: 'embed' },
      { label: 'Download CSV', value: 'csv' },
      { label: 'Download JSON', value: 'json' },
      { label: 'Download image', value: 'image' },
      { label: 'Download report', value: 'pdf' }
    ];

    return (
      <ul className="c-widget-buttons">
        <li>
          <DropdownButton
            dropdownClassName="-bottom -left"
            options={downloadOptions}
            onSelect={item => this.onDownload(item.value)}
          >
            <button className="widget-button">
              <Icon name="icon-download" />
            </button>
          </DropdownButton>
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
