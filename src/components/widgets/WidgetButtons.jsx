import React from 'react';
import PropTypes from 'prop-types';
import { Icon, DropdownButton } from 'aqueduct-components';
import { saveAs } from 'file-saver';
import dateFnsFormat from 'date-fns/format';

// utils
import { logEvent } from 'utils/analytics';
import { getObjectConversion } from 'utils/filters';

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
      widget,
      filters,
      triggerAction
    } = this.props;
    const { name, widgetConfig } = widget;
    logEvent(`[AQ-Food] Widget - ${name}`, 'select widget download format', format);
    if (['json', 'csv'].includes(format)) {
      if (widgetConfig && widgetConfig.data && Array.isArray(widgetConfig.data)) {
        const dataURL = widgetConfig.data.find(_data => Object.keys(_data).includes('url'));

        if (!dataURL) return null;

        const { url: urlString } = dataURL;
        const url = new window.URL(urlString);
        const searchParams = new URLSearchParams(url.searchParams);
        const fileName = `${name}-${dateFnsFormat(Date.now(), 'yyyy-MM-dd\'T\'HH:mm:ss')}.${format}`;

        if (widget.widgetConfig.params_config || widget.widgetConfig.sql_config) {
          const widgetParsed = getObjectConversion(
            widget,
            filters,
            widget.widgetConfig.dictionary || 'widget-2010',
            widget.widgetConfig.params_config,
            widget.widgetConfig.sql_config
          );
          const dataUrlParsedString = widgetParsed.widgetConfig.data.find(_data => Object.keys(_data).includes('url'));
          const dataUrlParsed = new window.URL(dataUrlParsedString.url);
          const dataUrlParsedSearchParams = new URLSearchParams(dataUrlParsed.searchParams);

          searchParams.delete('q');
          searchParams.append('q', dataUrlParsedSearchParams.get('q'));
        }

        searchParams.append('format', format);
        url.search = searchParams.toString();

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(url.href, fileName);
        } else {
          saveAs(url.href, fileName);
        }
      }
    } else if (['embed', 'image', 'pdf'].includes(format)) {
      triggerAction(format);
    }

    return true;
  }

  // UI EVENTS
  // - triggerAction
  triggerAction(e) {
    const { triggerAction } = this.props;
    const { action } = e.currentTarget.dataset;
    triggerAction(action);
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
            <button type="button" className="widget-button">
              <Icon name="icon-download" />
            </button>
          </DropdownButton>
        </li>
        <li>
          <button type="button" data-action="info" className="widget-button" onClick={this.triggerAction}>
            <Icon name="icon-info" />
          </button>
        </li>
      </ul>
    );
  }
}

WidgetButtons.propTypes = {
  triggerAction: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
};


export default WidgetButtons;
