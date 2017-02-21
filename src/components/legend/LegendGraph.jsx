import React from 'react';
import { OnlyOn } from 'aqueduct-components';

class LegendGraph extends React.Component {

  getLegendGraph() {
    const config = this.props.config;
    switch (config.type) {
      case 'mask': {
        return null;
      }

      case 'basic': {
        return (
          <div className={`graph -${config.type}`}>
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

      case 'group': {
        return (
          <div className={`graph -${config.type}`}>
            {config.items.map((item, i) => {
              return (
                <div key={i} className="graph-group">
                  <div className="graph-group-name">{item.name}</div>
                  <div className="graph-list">
                    {item.items.map((it, j) => {
                      return (
                        <div className="graph-list-item" key={j}>
                          <span className="color" style={{ background: it.color }} />
                          <span className="label">{it.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
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
            <OnlyOn device="desktop">
              <div>
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
            </OnlyOn>
            <OnlyOn device="mobile">
              <div className="graph-list">
                {config.items.map((item, i) => {
                  return (
                    <div className="graph-list-item" key={i}>
                      <span className="color" style={{ background: item.color }} />
                      <span className="label">{item.name}</span>
                      <span className="value">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </OnlyOn>
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
