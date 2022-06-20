import React from 'react';
import Input from '../../atoms/Input/Input';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context/index.js';

function SignIn() {
  const { signInStore } = useAppContext();
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  return (
    <React.Fragment>
      <Input
        error={signInStore.user.username.error}
        value={signInStore.user.username.value}
        placeholder={'Username'}
        onChange={(e) => signInStore.onChange('username', e.target.value)}
      />
      {fields_spacing}
      <Input
        error={signInStore.user.password.error}
        value={signInStore.user.password.value}
        placeholder={'Password'}
        type={'password'}
        onChange={(e) => signInStore.onChange('password', e.target.value)}
      />
      {fields_spacing}
      <Button
        text={{ text: 'Sign In' }}
        onClick={() => {
          signInStore.signIn();
        }}
      />
    </React.Fragment>
  );
}

export default observer(SignIn);
