import findIndex from 'lodash/findIndex';
import debounce from 'lodash/debounce';
import React from 'react';
import Draggable from 'react-draggable';

class Timeline extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      segmentX: 0
    };

    // BINDINGS
    this.onClick = this.onClick.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  componentDidMount() {
    this.resizeEvent = () => {
      this.setXSegment();
    };
    window.addEventListener('resize', debounce(this.resizeEvent, 100));

    this.setXSegment();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  /**
   * UI EVENTS
   * - onChange
   * - onDrag
  */
  onClick(e) {
    // Send object
    const index = findIndex(this.props.items, { value: e.currentTarget.dataset.value });
    this.props.onChange(this.props.items[index]);
  }

  onStop(e, position) {
    const { segmentX } = this.state;
    const index = Math.round(position.lastX / segmentX);
    this.props.onChange(this.props.items[index]);
  }

  /**
   * DRAG HELPERS
   * - setXSegment
   * - setXPosition
  */
  setXSegment() {
    if (this.handleContainer) {
      const segmentX = (this.handleContainer.clientWidth - 18) / (this.props.items.length - 1);
      this.setState({
        segmentX
      });
    }
  }

  getPosition(i) {
    const { segmentX } = this.state;
    return {
      x: segmentX * i,
      y: -9
    };
  }

  render() {
    const { items, selected } = this.props;
    const { segmentX } = this.state;

    const i = findIndex(items, { value: selected.value });
    const position = this.getPosition(i);

    return (
      <div className="c-timeline">
        <ul className="timeline-list">
          {items.map((item, index) => {
            const selectedClass = (selected.value === item.value) ? '-selected' : '';
            return (
              <li className={`timeline-list-item ${selectedClass}`} key={index} data-value={item.value} onClick={this.onClick}>
                <div className="timeline-label">
                  {item.label}
                </div>
              </li>
            );
          })}
          <div className="timeline-drag-handle-container" ref={(c) => { this.handleContainer = c; }}>
            <Draggable
              axis="x"
              handle=".timeline-drag-handle"
              position={position}
              grid={[segmentX, 0]}
              zIndex={100}
              bounds="parent"
              onStart={this.onStart}
              onStop={this.onStop}
              // onDrag={this.onDrag}
            >
              <div className="timeline-drag-handle" />
            </Draggable>
          </div>
        </ul>
      </div>
    );
  }
}

Timeline.propTypes = {
  items: React.PropTypes.array.isRequired,
  selected: React.PropTypes.any.isRequired,
  onChange: React.PropTypes.func
};

export default Timeline;
