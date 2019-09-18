import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import WidgetChart from 'components/widgets/widget/chart';
import { Spinner } from 'aqueduct-components';

// utils
import { getObjectConversion } from 'utils/filters';

export default class InfoModal extends PureComponent {
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

  getName(widgetParsed) {
    const { filters } = this.props;
    const { name, widgetConfig } = widgetParsed;

    const proyection = (filters.year === 'baseline') ? 'baseline' : 'future';

    return (widgetConfig.titleConfig) ? widgetConfig.titleConfig[proyection] : name;
  }

  toggleLoading(loading) {
    if (this.mounted) this.setState({ loading });
  }

  render() {
    const notAvailable = 'Not available';
    const { widget, filters } = this.props;
    const { loading } = this.state;
    const widgetParsed = getObjectConversion(
      widget,
      filters,
      widget.widgetConfig.dictionary || 'widget-2010',
      widget.widgetConfig.params_config,
      widget.widgetConfig.sql_config
    );
    const { metadata } = widgetParsed;

    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{this.getName(widgetParsed)}</span>
          </div>
        </div>
        <div className="info-content">
          <div className="row expanded">
            <div className="small-12 medium-8 columns">
              <div className="info-widget">
                <div className="widget-content">
                  <Spinner isLoading={loading} />
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
                  <dd>{(metadata && metadata.description) || notAvailable}</dd>

                  {(metadata && metadata.units) && (
                    <Fragment>
                      <dt>Units:</dt>
                      <dd>{metadata.units}</dd>
                    </Fragment>
                  )}

                  {(metadata && metadata.scenario) && (
                    <Fragment>
                      <dt>Scenario:</dt>
                      <dd>{metadata.scenario}</dd>
                    </Fragment>
                  )}

                  {(metadata && metadata.resolution) && (
                    <Fragment>
                      <dt>Resolution:</dt>
                      <dd>{metadata.resolution}</dd>
                    </Fragment>
                  )}

                  {metadata && metadata.info && metadata.info.sources && (
                    <Fragment>
                      <dt>Source:</dt>
                      <dd>
                        {metadata.info.sources.map((s, i) => {
                          if (s['source-url']) {
                            return (
                              <span key={s['source-name']}>
                                {i !== 0 && ', '}
                                <a
                                  href={s['source-url']}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {s['source-name']}
                                </a>
                              </span>
                            );
                          }

                          return (
                            <span key={s['source-name']}>
                              {i !== 0 && ', '}
                              {s['source-name']}
                            </span>
                          );
                        })}
                      </dd>
                    </Fragment>
                  )}
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
  widget: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
};
