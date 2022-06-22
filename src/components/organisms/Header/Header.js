import React from 'react';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import PopupStore from '../../atoms/Popup/PopupStore';
import SearchAccounts from '../../templates/SearchAccounts/SearchAccounts';
import './Header.css';
import { useVm } from '../../../context';

const account_src =
  'https://i.ibb.co/grzPnFq/avatar-circle-grey-512dp.png';
const signout_src =
  'https://i.ibb.co/S7rLfgT/logout.png';
const search_src =
  'https://i.ibb.co/GTZgMYF/search-interface-symbol-1.png';


function Header() {
  const { signInStore } = useAppContext();
  const { usersStore } = useAppContext();
  const popupStore = useVm(PopupStore);
  const iconStyle = { cursor: 'pointer' };
  const userImage = usersStore.authUser.image
    ? usersStore.authUser.image
    : account_src;

  return (
    <React.Fragment>
      <SearchAccounts popupStore={popupStore} />
      <Container className={'arten_header'}>
        <Container className={'page_container'}>
          <Row portitions={{ lg: [0.5, 0.5] }} verticalAlign={'middle'}>
            <Align align={{ lg: 'start' }}>
              <Link to={'/'}>
                <TextLogo text={'artenthusiasts'} />
              </Link>
            </Align>
            <Align align={{ lg: 'end' }}>
              <Row spacing={{ lg: 15 }} verticalAlign={'middle'}>
                <Icon
                  src={search_src}
                  size={'md'}
                  style={iconStyle}
                  onClick={() => popupStore.setState('open')}
                />
                <Link to={'/'}>
                  <Icon
                    src={signout_src}
                    size={'md'}
                    style={iconStyle}
                    onClick={() => signInStore.signOut()}
                  />
                </Link>
                <Link to={'/' + usersStore.authUser.username}>
                  <Icon
                    src={userImage}
                    size={'lg'}
                    style={{ ...iconStyle, ...{ borderRadius: '500px' } }}
                  />
                </Link>
              </Row>
            </Align>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Header;
