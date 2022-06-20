import React from 'react';
import Center from '../Center/Center';
import { observer } from 'mobx-react-lite';
import Container from '../Container/Container';
import Image from '../Image/Image';

function Poppup(props) {
  require('./Popup.css');
  const className = props.className + ' lho_popup ';

  function close() {
    props.popupStore.setState('close');
    if (props.onClose != null) props.onClose();
  }

  return (
    <Container
      {...props}
      className={className + props.popupStore.state}
      onClick={() => close()}
    >
      <Image
        className={'lho_popup_close'}
        src={'https://flutter-apps.b-cdn.net/goCollect/test/cancel.svg'}
      />
      <Center style={{ cursor: 'auto' }} onClick={(e) => e.stopPropagation()}>
        {props.popupStore.state === 'open' && props.children}
      </Center>
    </Container>
  );
}

export default observer(Poppup);
