import React from 'react';
import Container from '../Container/Container';
import Input from '../Input/Input';
import Text from '../Text/Text';
import Spacing from '../Spacing/Spacing';

function Component(props) {
  return (
    <Container
      style={{ lg: { backgroundColor: '#f7f7f7', borderRaduis: '4px' } }}
    >
      <Spacing space={{ lg: 10 }} />
      <Text text={props.name} />
      <Spacing space={{ lg: 10 }} />
      <Input placeholder={'space'} />
      <Spacing space={{ lg: 10 }} />
      <Input placeholder={'portitions'} />
      <Spacing space={{ lg: 10 }} />
    </Container>
  );
}

Component.defaultProps = {
  name: '',
};

export default Component;
