import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';

function Center(props) {
  require('./Center.css');

  let _align = 'lho_center_' + props.align;
  let style = GeneralUtil.responsiveObj(props.style);
  return (
    <div
      className={props.className + ' lho_center ' + _align}
      style={style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

Center.defaultProps = {
  className: '',
  style: {},
  align: '',
  onClick: () => {},
};

export default Center;
