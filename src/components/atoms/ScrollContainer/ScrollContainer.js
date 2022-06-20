import React from 'react';
import Container from '../Container/Container';

function ScrollContainer(props) {
  let scrollConStyle = {
    height: '250px',
    overflow: 'hidden',
    overflowY: 'scroll',
  };
  return (
    <Container style={{ ...scrollConStyle, ...props.style }}>
      {props.children}
    </Container>
  );
}

export default ScrollContainer;
