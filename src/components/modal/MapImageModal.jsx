import React from 'react';
import domtoimage from 'dom-to-image';
import snakeCase from 'lodash/snakeCase';
import WidgetChart from 'containers/widgets/WidgetChart';
import { Spinner, getObjectConversion, saveAsFile } from 'aqueduct-components';

export default class WidgetImageModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  getCanvas() {
    const { name } = this.props.widget;

    domtoimage.toPng(this.canvasContent)
      .then((png) => {
        saveAsFile(png, 'image/png', `${snakeCase(name)}.png`);
      });
  }

  toggleLoading(bool) {
    this.mounted && this.setState({ loading: bool });
  }

  getName(widgetParsed) {
    const { filters } = this.props;
    const { name, widgetConfig } = widgetParsed;

    const proyection = (filters.year === 'baseline') ? 'baseline' : 'future';

    return (widgetConfig.titleConfig) ? widgetConfig.titleConfig[proyection] : name;
  }

  render() {
    const { widget, filters } = this.props;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.paramsConfig,
      widget.widgetConfig.sqlConfig
    );

    const { name, description } = widgetParsed;

    return (
      <div className="c-widget-image-modal">
        <div className="row expanded">
          <div className="small-12 large-8 columns">
            <div className="canvas-content" ref={el => this.canvasContent = el}>
              <div className="title">{this.getName(widgetParsed)}</div>
              <div className="widget">
                <div className="c-widget" >
                  <div>
                    <header className="widget-header">
                      <div className="widget-titles">
                        <h3 className="widget-description">{description}</h3>
                      </div>
                    </header>
                    <div className="widget-content">
                      <Spinner isLoading={this.state.loading} />
                      <WidgetChart
                        widget={widget}
                        filters={filters}
                        toggleLoading={() => this.toggleLoading()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="small-12 large-4 columns sidebar">
            <button className="c-btn -primary -light" onClick={() => this.getCanvas()}>Download image</button>
          </div>
        </div>
      </div>
    );
  }
}

WidgetImageModal.propTypes = {
  filters: React.PropTypes.object,
  widget: React.PropTypes.object
};
