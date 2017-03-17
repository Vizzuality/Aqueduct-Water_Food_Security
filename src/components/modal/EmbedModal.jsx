import React from 'react';
import WidgetChart from 'components/widgets/WidgetChart';
import { Spinner, CustomSelect } from 'aqueduct-components';

const embedOptions = [
  { label: 'Small (320x420 pixels)', value: '320x420' },
  { label: 'Medium (600x420 pixels)', value: '600x420' },
  { label: 'Large (900x420 pixels)', value: '900x420' }
];

export default class EmbedModal extends React.Component {

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

    range.selectNodeContents(this.code);
    selection.removeAllRanges();
    selection.addRange(range);

    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (e) {} // eslint-disable-line no-empty

    this.setState({
      copyError: !successful
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
    return `${location.origin + location.pathname}embed?state=${btoa(JSON.stringify(state))}`;
  }

  toggleLoading(loading) {
    this.mounted && this.setState({ loading });
  }

  render() {
    let copyButtonContent = 'Copy code';
    if (this.state.copyError === false) {
      copyButtonContent = 'Copied!';
    } else if (this.state.copyError === true) {
      copyButtonContent = 'Copy it manually';
    }

    return (
      <div className="c-embed">
        <div className="row expanded">
          <div className="small-12 medium-8 columns">
            <div className="title">
              {this.props.widget.name}
              {this.props.widget.subtitle && <span className="subtitle">{this.props.widget.subtitle}</span>}
            </div>
            <div className="widget">
              <Spinner isLoading={this.state.loading} />
              <WidgetChart config={this.props.widget.widgetConfig} filters={this.props.filters} toggleLoading={this.toggleLoading} />
            </div>
          </div>
          <div className="small-12 medium-4 columns sidebar">
            <h2>Embed size</h2>
            <CustomSelect
              options={embedOptions}
              value={this.state.selectedOption.value}
              onValueChange={this.onChangeSize}
            />
            <textareara className="code" ref={node => this.code = node} readOnly>
              {this.getCode()}
            </textareara>
            <button className="c-btn -primary -light -fluid" type="button" onClick={() => this.onCopy()}>
              {copyButtonContent}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EmbedModal.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object
};
