import React from 'react';
import Transition from '../Transition/Transition';
import Fade from '../Fade/Fade';

function Expand(props) {
  function wrapper(_props, child) {
    if (_props.fade)
      return (
        <Fade {..._props} height={'unset'}>
          {child}
        </Fade>
      );
    return child;
  }

  return (
    <Transition
      {...props}
      property={'max-height'}
      from={0}
      to={props.height}
      width={'100%'}
      height={'unset'}
      overflow={'hidden'}
    >
      {wrapper(props, props.children)}
    </Transition>
  );
}

Expand.defaultProps = {
  duration: '0.6s',
  delay: '0.0s',
  curve: 'linear',
  appear: true,
  height: '400px',
  fade: true,
};

export default Expand;
