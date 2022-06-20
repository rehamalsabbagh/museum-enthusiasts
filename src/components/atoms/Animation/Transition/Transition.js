import React from 'react';
import { observer } from 'mobx-react-lite';

function Transition(props) {
  function transition(_props) {
    if (!props.appear && !props.enableExit) props.delay = props.duration;
    if (props.appear && !props.enableEnter) props.delay = props.duration;
    let _transition = props.property + ' ' + props.duration + ' ' + props.curve + ' ' + props.delay;
    return _transition;
  }

  function style(_style, _props) {
    _style[_props.property] = _props.appear ? _props.to : _props.from;
    return _style;
  }

  let _transition = transition(props);
  let _style = {
    overflow: props.overflow,
    position: props.position,
    transition: _transition,
    width: props.width,
    height: props.height,
    bottom: props.bottom,
    pointerEvents: props.appear ? 'unset' : 'none',
  };

  _style = style(_style, props);
  return (
    <div id={props.id} style={_style}>
      {props.children}
    </div>
  );
}

Transition.defaultProps = {
  position: 'relative',
  duration: '0.3s',
  delay: '0.0s',
  curve: 'linear',
  appear: true,
  property: '',
  enableExit: true,
  enableEnter: true,
  from: '',
  to: '',
};

export default observer(Transition);
