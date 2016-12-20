import React from 'react';

class LegendGraph extends React.Component {

  getLegendGraph() {
    const config = this.props.config;
    switch (config.type) {
      case 'basic': {
        return null;
      }

      case 'cluster': {
        return (
          <div className={`graph -${config.type}`}>
            <div className="graph-units">Units: {config.units}</div>
            <div className="graph-description">{config.description}</div>
            <div className="graph-list">
              {config.items.map((item, i) => {
                return (
                  <div className="graph-list-item" key={i}>
                    <span className="color" style={{ background: item.color }} />
                    <span className="label">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'choropleth': {
        return (
          <div className={`graph -${config.type}`}>
            <div className="graph-list">
              {config.items.map((item, i) => {
                return (
                  <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={i}>
                    <span className="color" style={{ background: item.color }} />
                  </div>
                );
              })}
            </div>
            <div className="graph-list">
              {config.items.map((item, i) => {
                return (
                  <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={i}>
                    <span className="label">{item.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="graph-list">
              {config.items.map((item, i) => {
                return (
                  <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={i}>
                    <span className="value">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      default: {
        console.error('No type specified');
        return null;
      }
    }
  }

  render() {
    return (
      <div className="c-legend-graph">
        {this.getLegendGraph()}
      </div>
    );
  }
}

LegendGraph.propTypes = {
  // PROPS
  config: React.PropTypes.object
};


export default LegendGraph;
