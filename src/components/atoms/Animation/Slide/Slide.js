import React from 'react';
import Transition from '../Transition/Transition';
import Fade from '../Fade/Fade';

function Slide(props) {
  function wrapper(_props, child) {
    if (_props.fade) return <Fade {..._props}>{child}</Fade>;
    return child;
  }

  return wrapper(
    props,
    <Transition property={props.direction} from={props.distance} to={0} {...props}>
      {props.children}
    </Transition>,
  );
}

Slide.defaultProps = {
  duration: '0.4s',
  delay: '0.0s',
  curve: 'linear',
  appear: true,
  direction: 'left', /// left, right, top, bottom
  distance: '60px',
  fade: true,
};

export default Slide;
