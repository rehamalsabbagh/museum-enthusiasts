import React, { useState } from 'react';
import { useAppContext } from '../../../Context';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Container from '../../atoms/Container/Container';
import Input from '../../atoms/Input/Input';
import ListItem from '../../atoms/ListItem/ListItem';
import Popup from '../../atoms/Popup/Popup';
import ScrollContainer from '../../atoms/ScrollContainer/ScrollContainer';
import Spacing from '../../atoms/Spacing/Spacing';
let account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';

function SearchAccounts(props) {
  const { usersStore } = useAppContext();
  const [filteredUsers, setFilteredUsers] = useState(null);
  if (!filteredUsers) filterUsers('');

  function filterUsers(string) {
    let _filteredUsers = [];
    for (const key in usersStore.users) {
      if (usersStore.users[key].username.indexOf(string) > -1)
        _filteredUsers.push(usersStore.users[key]);
    }
    setFilteredUsers(_filteredUsers);
  }

  return (
    <Popup popupStore={props.popupStore}>
      <Container className={'page_container'}>
        <Card>
          <Align align={'start'}>
            <Input
              placeholder={'Search account'}
              onChange={(e) => filterUsers(e.target.value)}
            />
            <Spacing space={17} />
            <ScrollContainer>
              {filteredUsers &&
                filteredUsers.map((user, key) => (
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

export default SearchAccounts;
