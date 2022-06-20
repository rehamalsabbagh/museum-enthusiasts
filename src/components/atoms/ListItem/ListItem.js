import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import Icon from '../Icon/Icon';
import Row from '../Row/Row';
import Text from '../Text/Text';

function ListItem(props) {
  let _listItemStyle = {
    padding: '10px 0px',
    borderTop: props.index === 0 ? '' : '1px solid #f7f7f7',
  };

  return (
    <Link to={props.link} onClick={props.onClick}>
      <Container style={_listItemStyle}>
        <Row spacing={10} verticalAlign={'middle'}>
          <Icon
            size={'xlg'}
            style={{ borderRadius: '500px' }}
            src={props.image}
          />
          <Text text={props.text} />
        </Row>
      </Container>
    </Link>
  );
}

export default ListItem;
