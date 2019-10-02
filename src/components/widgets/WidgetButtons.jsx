import React from 'react';
import PropTypes from 'prop-types';
import { Icon, DropdownButton } from 'aqueduct-components';

// utils
import { logEvent } from 'utils/analytics';

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
    const {
      widget: { name },
      queryUrl,
      triggerAction
    } = this.props;
    logEvent(`[AQ-Food] Widget - ${name}`, 'select widget download format', format);
    if (format === 'json' || format === 'csv') {
      const link = document.createElement('a');
      link.href = `${config.API_URL}/${(queryUrl || '').replace('query', 'download')}&format=${format}`;
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(link);
      link.click();
      body.removeChild(link);
    } else if (format === 'embed' || format === 'image' || format === 'pdf') {
      triggerAction(format);
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
    const { queryUrl } = this.props;
    const downloadOptions = [
      { label: 'Embed widget', value: 'embed' },
      ...queryUrl ? [{ label: 'Download CSV', value: 'csv' }] : [],
      ...queryUrl ? [{ label: 'Download JSON', value: 'json' }] : [],
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
  queryUrl: PropTypes.string,
  triggerAction: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired
};

WidgetButtons.defaultProps = { queryUrl: null };


export default WidgetButtons;
