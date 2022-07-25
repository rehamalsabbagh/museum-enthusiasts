import React from 'react';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import './CentralPage.css';

function CentralPage(props) {
  return (
    <Container className={'arten_central_page'}>
      <Center>{props.body}</Center>
    </Container>
  );
}

export default CentralPage;
