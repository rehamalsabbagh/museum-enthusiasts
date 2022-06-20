import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';
import Container from '../Container/Container';
import './Align.css';

function Align(props) {
  let align = GeneralUtil.responsiveObj(props.align);
  return (
    <Container {...props} className={'lho_align_' + align}>
      {props.children}
    </Container>
  );
}

export default Align;
