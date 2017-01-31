import React from 'react';

export default class MobileSwipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: props.active || 0
    };

    // Bindings
    this.swipeItem = this.swipeItem.bind(this);
  }

  getActiveItem() {
    return this.props.items[this.state.active];
  }

  swipeItem(evt) {
    const item = +evt.currentTarget.getAttribute('data-item');
    this.setState({
      active: item
    });
    this.props.onChange && this.props.onChange(item);
  }

  render() {
    return (
      <div className="c-mobile-swipe">
        <div className="mobile-swipe-content">
          {this.getActiveItem()}
        </div>
        <ul className="mobile-swipe-nav">
          {
            this.props.items.map((item, index) => {
              const cName = index === this.state.active ? '-active' : '';
              return <li className={cName} key={index}><a data-item={index} onClick={this.swipeItem}></a></li>;
            })
          }
        </ul>
      </div>
    );
  }
}

MobileSwipe.propTypes = {
  items: React.PropTypes.array,
  active: React.PropTypes.number,
  onChange: React.PropTypes.func
};
