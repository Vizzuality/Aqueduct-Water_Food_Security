import React from 'react';
import PropTypes from 'prop-types';
import WidgetChart from 'components/widgets/widget/chart';
import { Spinner } from 'aqueduct-components';

// utils
import { getObjectConversion } from 'utils/filters';

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

  getName(widgetParsed) {
    const { filters } = this.props;
    const { name, widgetConfig } = widgetParsed;

    const proyection = (filters.year === 'baseline') ? 'baseline' : 'future';

    return (widgetConfig.titleConfig) ? widgetConfig.titleConfig[proyection] : name;
  }

  render() {
    const notAvailable = 'Not available';
    const { widget, filters } = this.props;
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

                  {metadata && metadata.info && metadata.info.sources &&
                    <dt>Source:</dt>
                  }
                  {metadata && metadata.info && metadata.info.sources &&
                    <dd>
                      {metadata.info.sources.map((s, i) => {
                        if (s.sourceUrl) {
                          return (
                            <span>
                              {i !== 0 && ', '}
                              <a
                                key={s.sourceName}
                                rel="noopener noreferrer"
                                target="_blank"
                                href={s.sourceUrl}
                              >
                                {s.sourceName}
                              </a>
                            </span>
                          );
                        }

                        return (
                          <span>
                            {i !== 0 && ', '}
                            {s.sourceName}
                          </span>
                        );
                      })}
                    </dd>
                  }
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
  widget: PropTypes.object,
  filters: PropTypes.object,
  topics: PropTypes.array
};
