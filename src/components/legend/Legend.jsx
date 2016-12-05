import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ layer, index }) => { // eslint-disable-line
  return (
    <li className="c-legend-item" key={index}>
      <span>{layer.title}</span>
    </li>
  );
});

const SortableList = SortableContainer(({ items }) => { // eslint-disable-line
  return (
    <ul className="c-legend">
      {items.map((layer, index) =>
        <SortableItem
          key={index}
          index={index}
          layer={layer}
        />
      )}
    </ul>
  );
});

export default class Legend extends React.Component {

  render() {
    return (
      <SortableList
        axis="y"
        lockAxis="y"
        lockToContainerEdges
        lockOffset="50%"
        items={this.props.layers}
      />
    );
  }
}

Legend.propTypes = {
  layers: React.PropTypes.array
};
