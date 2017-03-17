import React from 'react';
import { Spinner } from 'aqueduct-components';
import Widget from 'containers/widgets/Widget';

export default class EmbedPage extends React.Component {

  componentWillMount() {
    this.props.getWidget();
  }

  render() {
    return (
      <div className="l-embed l-fullheight">
        {this.props.error}
        {!this.props.error && <Spinner isLoading={!this.props.widget} />}
        {!this.props.error && this.props.widget && <Widget className="-embed" widget={this.props.widget} filters={this.props.filters} />}
      </div>
    );
  }
}


EmbedPage.propTypes = {
  filters: React.PropTypes.object,
  getWidget: React.PropTypes.func,
  widget: React.PropTypes.object,
  error: React.PropTypes.string
};
