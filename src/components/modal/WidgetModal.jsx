import React from 'react';
import WidgetChart from 'containers/widgets/WidgetChart';
import { Spinner, getObjectConversion } from 'aqueduct-components';

export default class InfoModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    // BINDINGS
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleLoading(loading) {
    this.mounted && this.setState({ loading });
  }

  render() {
    const notAvailable = 'Not available';

    const { widget, filters } = this.props;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.paramsConfig,
      widget.widgetConfig.sqlConfig
    );

    const { name, description, metadata, widgetConfig, queryUrl } = widgetParsed;


    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{name}</span>
          </div>
        </div>
        <div className="info-content">
          <div className="row expanded">
            <div className="small-12 medium-8 columns">
              <div className="info-widget">
                <div className="widget-content">
                  <Spinner isLoading={this.state.loading} />
                  <WidgetChart
                    widget={widget}
                    filters={filters}
                    toggleLoading={this.toggleLoading}
                  />
                </div>
              </div>
            </div>
            <div className="small-12 medium-4 columns">
              <div className="info-description">
                <dl>
                  <dt>Description:</dt>
                  <dd>{metadata && metadata.description || notAvailable}</dd>
                  <dt>Language:</dt>
                  <dd>{metadata && metadata.language || notAvailable}</dd>
                  <dt>Source:</dt>
                  <dd>{metadata && metadata.source || notAvailable}</dd>
                  <dt>Citation:</dt>
                  <dd>{metadata && metadata.citation || notAvailable}</dd>
                  <dt>License:</dt>
                  <dd>{metadata && metadata.license || notAvailable}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfoModal.propTypes = {
  widget: React.PropTypes.object,
  filters: React.PropTypes.object,
  topics: React.PropTypes.array
};
