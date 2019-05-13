import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';
import Widget from 'components/widgets/Widget';

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
  filters: PropTypes.object,
  getWidget: PropTypes.func,
  widget: PropTypes.object,
  error: PropTypes.string
};
