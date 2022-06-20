import React from 'react';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import './CentralPage.css';

function CentralPage(props) {
  return (
    <Container className={'lho_central_page page_container'}>
      <Center>{props.body}</Center>
    </Container>
  );
}

export default CentralPage;
