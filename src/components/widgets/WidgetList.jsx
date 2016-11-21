import React from 'react';
import Widget from 'components/widgets/Widget';
import Spinner from 'components/common/Spinner';

class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="c-widget-list">
        {this.props.widgets.widgetsLoading && <Spinner isLoading={this.props.widgets.widgetsLoading} />}
        <div className="row collapse">
          {this.props.widgets.widgetsList.map((widget, i) => {
            return (
              <div key={i} className={`column ${widget.size}`}>
                <Widget widget={widget} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

WidgetList.propTypes = {
  // PROPS
  widgets: React.PropTypes.object
};


export default WidgetList;
