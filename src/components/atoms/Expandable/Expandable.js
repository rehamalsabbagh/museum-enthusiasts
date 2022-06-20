import React, { useState } from 'react';
import Animation from '../Animation/Animation';
import Spacing from '../Spacing/Spacing';

function Expandable(props) {
  const [appear, setAppear] = useState(props.appear);

  return (
    <React.Fragment>
      <div onClick={() => setAppear(!appear)}>{props.trigger}</div>
      <Spacing space={props.spacing} />
      <Animation type={'expand'} appear={appear} fade={false}>
        {props.target}
      </Animation>
    </React.Fragment>
  );
}

Expandable.defaultProps = {
  spacing: { lg: 0 },
  appear: false,
};

export default Expandable;
