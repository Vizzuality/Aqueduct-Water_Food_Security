import React from 'react';
import PropTypes from 'prop-types';
import WidgetChart from 'components/widgets/widget/chart';
import { Spinner, CustomSelect } from 'aqueduct-components';

// utils
import { getObjectConversion } from 'utils/filters';
import { logEvent } from 'utils/analytics';

const embedOptions = [
  { label: 'Small (320x465 pixels)', value: '320x465' },
  { label: 'Medium (600x465 pixels)', value: '600x465' },
  { label: 'Large (900x465 pixels)', value: '900x465' }
];

export default class WidgetEmbedModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      copyError: null,
      selectedOption: embedOptions[1]
    };

    this.onChangeSize = this.onChangeSize.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Copy the embed code to the clipboard
   * The status of the operation is stored to the state
   */
  onCopy() {
    const range = document.createRange();
    const selection = getSelection();
    logEvent('[AQ-Food] Map', 'user copies share URL', '');

    range.selectNodeContents(this.code);
    selection.removeAllRanges();
    selection.addRange(range);

    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (e) {} // eslint-disable-line no-empty

    this.setState({
      copyError: !successful
    }, () => {
      setTimeout(() => {
        if (this.code) {
          this.setState({ copyError: null });
          selection.removeAllRanges();
        }
      }, 2500);
    });
  }

  /**
   * Set the selected option in the state
   * @param {object} option Selected option
   */
  onChangeSize(option) {
    this.setState({ selectedOption: option });
  }

  /**
   * Generate the embed code
   * @returns {string}
   */
  getCode() {
    const width = this.state.selectedOption.value.split('x')[0];
    const height = this.state.selectedOption.value.split('x')[1];
    return `<iframe src="${this.getEmbedURL()}" width="${width}" height="${height}" frameborder="0" style="border:0" allowfullscreen></iframe>`;
  }

  /**
   * Generate the embed URL
   * @returns {string}
   */
  getEmbedURL() {
    const state = {
      filters: this.props.filters,
      embed: { id: this.props.widget.dataset }
    };

    return `${location.origin}/#/embed?state=${btoa(JSON.stringify(state))}`;
  }

  toggleLoading(loading) {
    this.mounted && this.setState({ loading });
  }

  getName(widgetParsed) {
    const { filters } = this.props;
    const { name, widgetConfig } = widgetParsed;

    const proyection = (filters.year === 'baseline') ? 'baseline' : 'future';

    return (widgetConfig.titleConfig) ? widgetConfig.titleConfig[proyection] : name;
  }

  render() {
    let copyButtonContent = 'Copy code';
    if (this.state.copyError === false) {
      copyButtonContent = 'Copied!';
    } else if (this.state.copyError === true) {
      copyButtonContent = 'Copy it manually';
    }

    const { widget, filters } = this.props;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.params_config,
      widget.widgetConfig.sql_config
    );

    const { name, description, widgetConfig, queryUrl } = widgetParsed;

    return (
      <div className="c-embed">
        <div className="row expanded">
          <div className="small-12 large-8 columns">
            <div className="title">
              {this.getName(widgetParsed)}
            </div>
            <div className="widget">
              <Spinner isLoading={this.state.loading} />
              <WidgetChart
                widget={widget}
                filters={filters}
                toggleLoading={this.toggleLoading}
              />
            </div>
          </div>
          <div className="small-12 large-4 columns sidebar">
            <h2>Embed size</h2>
            <CustomSelect
              options={embedOptions}
              value={this.state.selectedOption.value}
              onValueChange={this.onChangeSize}
            />
            <textareara className="code" ref={node => this.code = node} readOnly>
              {this.getCode()}
            </textareara>
            <button className="c-btn -primary -light" type="button" onClick={() => this.onCopy()}>
              {copyButtonContent}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

WidgetEmbedModal.propTypes = {
  widget: PropTypes.object,
  filters: PropTypes.object
};
