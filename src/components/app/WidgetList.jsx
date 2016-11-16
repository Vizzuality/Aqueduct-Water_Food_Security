import React from 'react';

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
            <div className="c-widget">
              <div />
            </div>
          </div>
          <div className="column small-12 medium-6">
            <div className="c-widget">
              <div />
            </div>
          </div>
          <div className="column small-12 medium-6">
            <div className="c-widget">
              <div />
            </div>
          </div>
          <div className="column small-12">
            <div className="c-widget">
              <div />
            </div>
          </div>
          <div className="column small-12 medium-6">
            <div className="c-widget">
              <div />
            </div>
          </div>
          <div className="column small-12 medium-6">
            <div className="c-widget">
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WidgetList.propTypes = {
};


export default WidgetList;
