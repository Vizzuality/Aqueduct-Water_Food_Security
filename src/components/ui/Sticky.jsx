
import React from 'react';
import _ from 'lodash';

class Sticky extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFixed: false
    };
  }

  componentDidMount() {
    this._setVars();
    this._setEventListeners();
  }

  componentWillUnmount() {
    this.onScrollElem.removeEventListener('scroll', this.throttledScroll);
  }

  _setVars() {
    this.onScrollElem = this.props.onScrollElem ?
      document.querySelector(this.props.onScrollElem) : window;

    this.throttledScroll = _.throttle(() => this._onScroll(), 300);
  }

  _setEventListeners() {
    this.onScrollElem.addEventListener('scroll', this.throttledScroll);
  }

  _onScroll() {
    const currentScroll = this.onScrollElem.scrollTop;

    if (this.state.isFixed === false) {

    }

    if (currentScroll >= this.props.topLimit && this.state.isFixed === false) {
      this.setState({
        isFixed: true
      });

      if (this.props.onFixed) {
        this.props.onFixed();
      }
    }

    if (this.props.bottomLimit) {
      if (currentScroll >= this.props.bottomLimit && this.state.isFixed === true) {
        console.log('no sticky')
        this.setState({
          isFixed: false
        });
      }
    }


    // if (this.state.isFixed === true) {
    //   console.log('!!!!')
    //   if (this.props.bottomLimit) {
    //     if (currentScroll >= this.props.bottomLimit) {
    //       console.log('?????')
    //       this.setState({
    //         isFixed: false
    //       });
    //
    //       if (this.props.onNoFixed) {
    //         this.props.onNoFixed();
    //       }
    //     }
    //   } else {
    //     this.setState({
    //       isFixed: false
    //     });
    //
    //     if (this.props.onNoFixed) {
    //       this.props.onNoFixed();
    //     }
    //   }
    // }
  }

  render() {
    return (
      <div className={`c-sticky ${this.props.className} ${this.state.isFixed ? this.props.customFixedClassName : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

Sticky.defaultProps = {
  customFixedClassName: '-fixed'
};

Sticky.propTypes = {
  bottomLimit: React.PropTypes.number,
  className: React.PropTypes.string,
  customFixedClassName: React.PropTypes.string,
  onFixed: React.PropTypes.func,
  onNoFixed: React.PropTypes.func,
  onScrollElem: React.PropTypes.string,
  topLimit: React.PropTypes.number
};

export default Sticky;
