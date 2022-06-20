import React from 'react';
import Container from '../Container/Container';

function Loader(props) {
  require('./Loader.css');

  return <Container {...props} className={props.className + ' lho_loader'} />;
}

Loader.defaultProps = {};

export default Loader;
