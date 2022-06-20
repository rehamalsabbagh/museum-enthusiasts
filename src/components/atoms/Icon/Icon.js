import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';
import Image from '../Image/Image';

function Icon(props) {
  require('./Icon.css');
  let _props = {
    ...props,
    ...{
      className: props.className + ' fa-' + props.size + ' lho_icon',
      style: GeneralUtil.responsiveObj(props.style),
    },
  };
  return (
    <div
      className={_props.className}
      style={{ ..._props.style, ...{ display: 'inline-block' } }}
    >
      {!props.src ? <i {..._props} /> : <Image {..._props} />}
    </div>
  );
}

Icon.defaultProps = {
  className: '',
  style: {},
  size: 'sm',
  src: null,
  onClick: () => {},
};

export default Icon;
