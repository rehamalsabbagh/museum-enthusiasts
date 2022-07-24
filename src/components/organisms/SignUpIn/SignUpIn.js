import React, { useState } from 'react';
import Spacing from '../../atoms/Spacing/Spacing';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import Button from '../../atoms/Button/Button';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { useAppContext } from '../../../context';
import { observer } from 'mobx-react-lite';
import Form from '../Form/Form';
import CentralPage from '../../templates/CentralPage/CentralPage';
import Row from '../../atoms/Row/Row';
import Image from '../../atoms/Image/Image';
import Icon from '../../atoms/Icon/Icon';
let signin_button_text = "I don't have an account";
let signup_button_text = 'I have an account';

function SignUpIn() {
  const [state, setState] = useState('signin');
  const [userSelection, setUserSelection] = useState('');

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
    <div style={{ width: '45%' }}>

      {/* Navigation */}
      {userSelection !== '' ?
        <div
          onClick={() => setUserSelection('')}
          className={'page_container'} style={{ position: 'absolute', textAlign: 'left', left: 0, right: 0, zIndex: '999' }}>
          <Spacing space={{ lg: 100 }} />
          <Row spacing={10}>
            <Icon
              src={'https://websiteimages.b-cdn.net/back_arrow_black.svg'}
              size={'md'}
            ></Icon>
            <h6>{'Back'}</h6>
          </Row>
        </div>
        : null
      }

      <CentralPage body={
        <React.Fragment>

          {userSelection === '' ?
            <React.Fragment>
              <TextLogo text={'artenthusiasts'} level={{ lg: 'h1' }} />
              <p style={{ color: 'gray' }}>{'Your customized museum experience'}</p>
              <Spacing space={{ lg: 60 }} />
            </React.Fragment>
            : null}
          {/* LOGIN OPTIONS */}
          {userSelection === '' ?
            <React.Fragment>
              <h6 style={{ fontWeight: 900 }}>{'Connect your profile to start'}</h6>
              <Spacing space={{ lg: 20 }} />
              <Button
                onClick={() => setUserSelection('qr_code')}
                text={{
                  text: 'Scan QR code with the App',
                }}
              />
              <Spacing space={{ lg: 15 }} />
              <Button
                onClick={() => setUserSelection('login')}
                text={{
                  text: 'Login',
                }}
              />

              {/* DO NOT HAVE APP */}
              <Spacing space={{ lg: 40 }} />
              <h6>{'Do not have the mobile App?'}</h6>
              <Spacing space={{ lg: 20 }} />
              <Button
                onClick={() => setUserSelection('download_app')}
                shape={'bordered'}
                text={{
                  text: 'Download the App',
                }}
              />
              <Spacing space={{ lg: 15 }} />
              <Button
                onClick={() => setUserSelection('guest_mode')}
                shape={'bordered'}
                text={{
                  text: 'Continue as a guest',
                }}
              />
            </React.Fragment>
            : null
          }

          {/* LOGIN FORM */}
          {userSelection === 'login' ?
            <Form fields={_fields} errorMessages={_errMsgs} /> : null
          }

          {/* QR CODE */}
          {userSelection === 'qr_code' ?
            <div >
              <h6 style={{ fontWeight: 900 }}>{'To connect your profile using the mobile App:'}</h6>
              <Spacing space={{ lg: 20 }} />
              <div style={{ textAlign: '' }}>

                <h6 >{'1. Open Artenthusiasts App on your phone.'}</h6>
                <Spacing space={{ lg: 10 }} />
                <h6 >{'2. Go to settings.'}</h6>
                <Spacing space={{ lg: 10 }} />
                <h6 >{'3. Select "Connect with QR code".'}</h6>
              </div>
              <Spacing space={{ lg: 30 }} />
              <Image
                style={{ width: '40%' }}
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1200px-QR_Code_Example.svg.png'}
              ></Image>
            </div>
            : null
          }

          {/* DOWNLOAD APP */}
          {userSelection === 'download_app' ?
            <div >
              <h6 style={{ fontWeight: 900 }}>{'Scan the code below'}</h6>
              <Spacing space={{ lg: 10 }} />
              <h6 style={{ fontWeight: 900 }}>{'with your phone\'s camera to download the App'}</h6>
              {/* <h6 >{'to download the App'}</h6> */}


              <Spacing space={{ lg: 30 }} />
              <Image
                style={{ width: '40%' }}
                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1200px-QR_Code_Example.svg.png'}
              ></Image>
            </div>
            : null
          }
        </React.Fragment>
      } />


    </div>
  );
}

export default observer(SignUpIn);
