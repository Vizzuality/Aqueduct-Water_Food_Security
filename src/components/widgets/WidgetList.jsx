import React from 'react';
import Widget from 'containers/widgets/Widget';
import Spinner from 'components/ui/Spinner';

export default class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // Return a array of Widget components
  getWidgets() {
    const widgetList = [];
    this.props.widgetsActive.forEach((widget, index) => {
      widgetList.push(
        <div key={index} className={'column small-12'}>
          <Widget widget={widget} filters={this.props.filters} />
        </div>
      );
    });
    return widgetList;
  }

  render() {
    const widgetList = this.getWidgets();
    return (
      <div className="c-widget-list">
        {this.props.loading ? <Spinner isLoading={this.props.loading} /> :
          <div className="row collapse">
            {widgetList}
          </div>
        }
      </div>
    );
  }
}

WidgetList.propTypes = {
  // STORE
  loading: React.PropTypes.bool,
  filters: React.PropTypes.object,
  // SELECTOR
  widgetsActive: React.PropTypes.array
};
