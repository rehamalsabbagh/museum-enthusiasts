import React from 'react';
import GeneralUtil from '../../../utils/GeneralUtil';

function Separator(props) {
  require('./Separator.css');
  let width = GeneralUtil.responsiveObj(props.width);
  return <div className="separator" style={{ width: width }}></div>;
}

Separator.defaultProps = {
  width: {},
};

export default Separator;
