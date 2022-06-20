import React from 'react';
import Transition from '../Transition/Transition';

function Fade(props) {
  return (
    <Transition {...props} property={'opacity'} from={0} to={1}>
      {props.children}
    </Transition>
  );
}

Fade.defaultProps = {
  duration: '0.2s',
  delay: '0.0s',
  curve: 'linear',
  appear: true,
};

export default Fade;
