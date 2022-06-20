import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Row from '../Row/Row';

function MenuItem(props) {
  require('./MenuItem.css');
  return (
    <Row
      className={'lho_menu_item'}
      style={{ lg: { opacity: props.active ? 1 : 0.6, cursor: 'pointer' } }}
      spacing={{ lg: 7 }}
    >
      <Icon src={props.iconSrc} />
      <Text text={props.title} level={{ lg: 'h6' }} />
    </Row>
  );
}

MenuItem.defaultProps = {
  active: false,
  className: '',
  style: {},
  title: '',
  iconSrc: '',
  onClick: () => {},
};

export default MenuItem;
