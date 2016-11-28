import React from 'react';

class FiltersLayers extends React.Component {
  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerToggleDataset = this.triggerToggleDataset.bind(this);
  }

  getLayers() {
    const widgetList = [];
    const currentFilters = this.props.filters[this.props.filters.scope];
    let widget;
    let activeClass;
    this.props.datasets.list.forEach((dataset, index) => {
      if (dataset.widget.length) {
        widget = dataset.widget[0].attributes;
        activeClass = (currentFilters.datasetsIds.indexOf(dataset.id) !== -1) ? '-active' : null;
        // Vega type widget doesn't have 'type' property
        if (!Object.prototype.hasOwnProperty.call(widget.widgetConfig, 'type')) {
          widgetList.push(
            <li
              key={index}
              data-id={dataset.id}
              className={activeClass}
              onClick={this.triggerToggleDataset}
            >
              {Math.random().toString(36).substr(2, Math.floor(5 + (Math.random() * 5)))}
              {/* {widget.name} */}
            </li>
          );
        }
      }
    });
    return widgetList;
  }

  /**
   * UI EVENTS
   * - triggerToggleDataset
   */
  triggerToggleDataset(e) {
    this.props.onChange({
      value: e.currentTarget.dataset.id
    });
  }

  render() {
    return (
      <div className="c-filters-layers">
        <ul>
          {this.getLayers()}
        </ul>
      </div>
    );
  }
}

FiltersLayers.propTypes = {
  filters: React.PropTypes.object,
  datasets: React.PropTypes.object,
  onChange: React.PropTypes.func
};


export default FiltersLayers;
