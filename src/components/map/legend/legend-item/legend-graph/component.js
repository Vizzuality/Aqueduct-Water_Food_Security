import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon, OnlyOn } from 'aqueduct-components';

class LegendGraph extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { groups: {} };

    // BINDINGS
    this.triggerToggleGroup = this.triggerToggleGroup.bind(this);
  }

  getLegendGraph() {
    const { config } = this.props;
    const { groups } = this.state;

    switch (config.type) {
      case 'mask': {
        return null;
      }

      case 'basic': {
        return (
          <div className={`graph -${config.type}`}>
            <div className="graph-list">
              {config.items.map(item => (
                <div className="graph-list-item" key={item.name}>
                  <span className="color" style={{ background: item.color }} />
                  <span className="label">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'group': {
        return (
          <div className={`graph -${config.type}`}>
            {config.items.map((item) => {
              const colorClass = classnames('color', {
                '-transparent': groups[item.name]
              });
              const itemColor = !groups[item.name]
                ? item.color : 'transparent';

              return (
                <div key={item.name} className="graph-group">
                  <div
                    className="graph-group-name"
                    onClick={() => this.triggerToggleGroup(item)}
                  >
                    <span className={colorClass} style={{ background: itemColor }} />
                    {item.name}
                    {!groups[item.name]
                      && <Icon name="icon-arrow-down-2" className="-small" />
                    }
                    {groups[item.name]
                      && <Icon name="icon-arrow-up-2" className="-small" />
                    }
                  </div>
                  {groups[item.name]
                    && (
                      <div className="graph-list">
                        {item.items.map(it => (
                          <div className="graph-list-item" key={it.name}>
                            <span className="color" style={{ background: it.color }} />
                            <span className="label">{it.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
            {config.scenario && (<div className="graph-units">Scenario: {config.scenario}</div>)}
            <div className="graph-description">{config.description}</div>
            <div className="graph-list">
              {config.items.map(item => (
                <div className="graph-list-item" key={item.name}>
                  <span className="color" style={{ background: item.color }} />
                  <span className="label">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'choropleth': {
        return (
          <div className={`graph -${config.type}`}>
            {config.units && <div className="graph-units">Units: {config.units}</div>}
            {config.scenario && (<div className="graph-units">Scenario: {config.scenario}</div>)}
            <OnlyOn device="desktop">
              <div>
                <div className="graph-list">
                  {config.items.map(item => (
                    <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={item.name || item.value}>
                      <span className="color" style={{ background: item.color }} />
                    </div>
                  ))}
                </div>
                <div className="graph-list">
                  {config.items.map(item => (
                    <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={item.name || item.value}>
                      <span className="label">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="graph-list">
                  {config.items.map(item => (
                    <div className="graph-list-item" style={{ width: `${100 / config.items.length}%` }} key={item.name || item.value}>
                      <span className="value">{item.value}</span>
                    </div>
                  ))}
                </div>
                {config.disclaimer
                  && (
                    <div className="graph -basic -disclaimer">
                      <div className="graph-list">
                        {config.disclaimer.map(item => (
                          <div className="graph-list-item" key={item.name}>
                            <span className="color" style={{ background: item.color }} />
                            <span className="label">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </OnlyOn>
            <OnlyOn device="mobile">
              <div className="graph-list">
                {config.items.map(item => (
                  <div className="graph-list-item" key={item.name}>
                    <span className="color" style={{ background: item.color }} />
                    <span className="label">{item.name}</span>
                    <span className="value">{item.value}</span>
                  </div>
                ))}
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

  triggerToggleGroup(group) {
    const { groups } = this.state;
    this.setState({
      groups: {
        ...groups,
        [group.name]: !groups[group.name]
      }
    });
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
  config: PropTypes.object.isRequired
};

export default LegendGraph;
