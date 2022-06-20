import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';
import './Container.css';

function Container(props) {
  let _style = GeneralUtil.responsiveObj(props.style);
  return (
    <div {...props} style={_style}>
      {props.children}
    </div>
  );
}

export default Container;
