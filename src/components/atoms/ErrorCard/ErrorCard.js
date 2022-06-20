import React from 'react';
import Card from '../../atoms/Card/Card';

function ErrorCard(props) {
  let style = {
    boxShadow: 'none',
    backgroundColor: '#fef3f3',
    borderColor: '#eadada',
  };
  return (
    <Card {...props} style={style}>
      {props.children}
    </Card>
  );
}

export default ErrorCard;
