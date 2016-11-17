import React from 'react';
import Widget from 'components/widgets/Widget';

class WidgetList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="c-widget-list">
        <div className="row collapse">
          <div className="column small-12">
            <Widget />
          </div>
          <div className="column small-12 large-6">
            <Widget />
          </div>
          <div className="column small-12 large-6">
            <Widget />
          </div>
          <div className="column small-12">
            <Widget />
          </div>
          <div className="column small-12 large-6">
            <Widget />
          </div>
          <div className="column small-12 large-6">
            <Widget />
          </div>
        </div>
      </div>
    );
  }
}

WidgetList.propTypes = {
};


export default WidgetList;
