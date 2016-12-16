import React from 'react';

class LegendGraph extends React.Component {

  getLegendGraph() {
    const config = this.props.config;
    switch (config.type) {
      case 'basic': {
        return (
          <div className={`graph -${config.type}`}>
            {config.items.map((item, i) => {
              return (
                <div className="graph-item" style={{ width: `${100/config.items.length}%` }} key={i}>
                  <span className="color" style={{ background: item.color }} />
                  <span className="label">{item.name}</span>
                </div>
              );
            })}
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
