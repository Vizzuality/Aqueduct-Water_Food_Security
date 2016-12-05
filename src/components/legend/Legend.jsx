import React from 'react';
import Accordion from 'components/ui/Accordion';
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
    <ul>
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
      <div className={`c-legend ${this.props.className}`}>
        <Accordion title="View legend">
          <SortableList
            axis="y"
            lockAxis="y"
            lockToContainerEdges
            lockOffset="50%"
            items={this.props.layers}
          />
        </Accordion>
      </div>
    );
  }
}

Legend.propTypes = {
  layers: React.PropTypes.array,
  className: React.PropTypes.string
};
