import React from 'react';
import { useAppContext } from '../../../context';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Container from '../../atoms/Container/Container';
import ListItem from '../../atoms/ListItem/ListItem';
import Popup from '../../atoms/Popup/Popup';
import ScrollContainer from '../../atoms/ScrollContainer/ScrollContainer';
let account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';

function AccountsList(props) {
  const { usersStore } = useAppContext();

  function getUsers() {
    let _users = [];
    for (const key in props.usersIds) {
      let _user = usersStore.users[props.usersIds[key].user];
      if (_user) _users = [..._users, ...[_user]];
    }
    return _users;
  }

  let _users = getUsers();
  return (
    <Popup popupStore={props.popupStore}>
      <Container className={'page_container'}>
        <Card>
          <Align align={'start'}>
            <ScrollContainer>
              {_users &&
                _users.map((user, key) => (
                  <ListItem
                    link={'/' + user.username}
                    key={key}
                    index={key}
                    text={user.username}
                    image={user.image ? user.image : account_src}
                    onClick={() => props.popupStore.setState('close')}
                  />
                ))}
            </ScrollContainer>
          </Align>
        </Card>
      </Container>
    </Popup>
  );
}

export default AccountsList;
