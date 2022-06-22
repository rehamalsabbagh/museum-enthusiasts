import React from 'react';
import Animation from '../Animation/Animation';
import Container from '../Container/Container';
import './Popover.css';

function Popover(props) {
  let content_classname = 'arten_popover_content arten_popover_' + props.position;
  return (
    <Container className={'arten_popover_container'}>
      {props.trigger}
      <Animation appear={props.appear}>
        <Container className={content_classname}>{props.content}</Container>
      </Animation>
    </Container>
  );
}

export default Popover;
