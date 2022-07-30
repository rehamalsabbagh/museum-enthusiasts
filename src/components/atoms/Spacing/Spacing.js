import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';
import Container from '../Container/Container';

function Spacing(props) {
  let space = GeneralUtil.responsiveObj(props.space);
  return <Container {...props} style={{ ...{ height: space + 'px' }, ...{ ...props.style } }} />;
}

Spacing.defaultProps = {
  space: {},
};

export default Spacing;
