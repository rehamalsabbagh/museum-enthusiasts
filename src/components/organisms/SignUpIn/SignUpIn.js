import React, { useState } from 'react';
import Spacing from '../../atoms/Spacing/Spacing';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import Button from '../../atoms/Button/Button';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { useAppContext } from '../../../context';
import { observer } from 'mobx-react-lite';
import Form from '../Form/Form';
let signin_button_text = "I don't have an account";
let signup_button_text = 'I have an account';

function SignUpIn() {
  const [state, setState] = useState('signin');
  let { signUpStore } = useAppContext();
  let { signInStore } = useAppContext();

  function switchState() {
    if (state === 'signin') setState('signup');
    if (state === 'signup') setState('signin');
  }

  function switchButton(_switch_button_text) {
    return (
      <Button
        onClick={() => switchState()}
        shape={'bordered'}
        text={{
          text: _switch_button_text,
        }}
      />
    );
  }

  let _fields;
  let _errMsgs;
  if (state === 'signin') {
    _errMsgs = signInStore.errorMessages;
    _fields = [<SignIn />, switchButton(signin_button_text)];
  }
  if (state === 'signup') {
    _errMsgs = signUpStore.errorMessages;
    _fields = [<SignUp />, switchButton(signup_button_text)];
  }

  return (
    <React.Fragment>
      <TextLogo text={'Letshangout'} level={{ lg: 'h2' }} />
      <Spacing space={{ lg: 20 }} />
      <Form fields={_fields} errorMessages={_errMsgs} />
    </React.Fragment>
  );
}

export default observer(SignUpIn);
