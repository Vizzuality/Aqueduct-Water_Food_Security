import React from 'react';
import WidgetChart from 'components/widgets/WidgetChart';
import Spinner from 'components/ui/Spinner';

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

    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{this.props.widget.name}</span>
            {this.props.widget.subtitle &&
              <span className="info-subtitle">{this.props.widget.subtitle}</span>
            }
          </div>
          {/* <button className="c-btn -primary" type="button">Download</button> */}
        </div>
        <div className="info-content">
          <div className="row expanded">
            <div className="small-12 medium-8 columns">
              <div className="info-widget">
                <div className="widget-content">
                  <Spinner isLoading={this.state.loading} />
                  <WidgetChart config={this.props.widget.widgetConfig} filters={this.props.filters} toggleLoading={this.toggleLoading} />
                </div>
              </div>
            </div>
            <div className="small-12 medium-4 columns">
              <div className="info-description">
                <dl>
                  <dt>Description:</dt>
                  <dd>{this.props.widget.metadata && this.props.widget.metadata.description || notAvailable}</dd>
                  <dt>Language:</dt>
                  <dd>{this.props.widget.metadata && this.props.widget.metadata.language || notAvailable}</dd>
                  <dt>Source:</dt>
                  <dd>{this.props.widget.metadata && this.props.widget.metadata.source || notAvailable}</dd>
                  <dt>Citation:</dt>
                  <dd>{this.props.widget.metadata && this.props.widget.metadata.citation || notAvailable}</dd>
                  <dt>License:</dt>
                  <dd>{this.props.widget.metadata && this.props.widget.metadata.license || notAvailable}</dd>
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
