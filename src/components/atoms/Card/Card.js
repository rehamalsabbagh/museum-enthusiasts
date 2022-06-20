import React from 'react';
import Container from '../Container/Container';

function Card(props) {
  require('./Card.css');

  return (
    <Container {...props} className={props.className + ' lho_card'}>
      {props.header && (
        <Container className={'lho_card_padding'}>{props.header}</Container>
      )}
      {props.image && (
        <Container className={'lho_card_image'}>{props.image}</Container>
      )}
      <Container className={'lho_card_padding'}>{props.children}</Container>
    </Container>
  );
}

Card.defaultProps = {};

export default Card;
