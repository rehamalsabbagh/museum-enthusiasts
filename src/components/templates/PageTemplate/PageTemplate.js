import React from 'react';
import Container from '../../atoms/Container/Container';
import Spacing from '../../atoms/Spacing/Spacing';
import AddPost from '../../organisms/AddPost/AddPost';

function PageTemplate(props) {
  return (
    <Container className={'arten_page'}>
      <AddPost />
      <Container className={'arten_page_header'}>{props.header}</Container>
      <Spacing space={{ lg: 100, xs: 80 }} />
      <Container className={'arten_page_body page_container'}>
        {props.body}
      </Container>
      <Spacing space={{ lg: 50, xs: 35 }} />
    </Container>
  );
}

export default PageTemplate;
