import React, { useState } from 'react';
import { useAppContext, useVm } from '../../../context';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import PopupStore from '../../atoms/Popup/PopupStore';
import Text from '../../atoms/Text/Text';
import { observer } from 'mobx-react';
import UploadImage from '../UploadImage/UploadImage';
import AccountsList from '../../organisms/AccountsList/AccountsList';
import './UserProfile.css';

const account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';

function UserProfile(props) {
  const [usersIds, setUsersIds] = useState({});
  const { postsStore } = useAppContext();
  const { usersStore } = useAppContext();
  const popupStore = useVm(PopupStore);

  let _user = props.user;
  let _isAuthUser = usersStore.authUser.username === _user.username;
  let _posts = !postsStore.posts ? '0' : Object.keys(postsStore.posts).length;
  let _followers = !_user.followers ? '0' : Object.keys(_user.followers).length;
  let _following = !_user.following ? '0' : Object.keys(_user.following).length;
  let _followingId = followId(usersStore.authUser, props.user.id, 'following');
  let _followerId = followId(props.user, usersStore.authUser.id, 'followers');
  let _profileInfoProps = {
    level: { xs: 'span' },
    style: {
      lg: { cursor: 'pointer' },
      xs: { cursor: 'pointer', fontSize: '0.8rem' },
    },
  };

  function followId(searchIn, searchFor, searchKey) {
    let _followId = null;
    for (const key in searchIn[searchKey]) {
      if (searchIn[searchKey][key].user === searchFor) _followId = key;
    }
    return _followId;
  }

  function userImage(_isAuthUser, _user) {
    let _backgroundUrl = _user.image !== undefined ? _user.image : account_src;
    let _style = {
      backgroundImage: 'url(' + _backgroundUrl + ')',
      backgroundSize: 'cover',
      borderRadius: '500px',
    };
    return !_isAuthUser ? (
      <Container className={'lho_userimage'} style={_style} />
    ) : (
      <UploadImage
        className={'lho_userimage'}
        style={_style}
        onUpload={(image) => usersStore.setUserImage(image)}
        directory={'/userimage/' + usersStore.authUser.id}
      />
    );
  }

  function profileInfoText(count, key, onClick) {
    return (
      <Text
        {..._profileInfoProps}
        text={count + ' ' + key}
        onClick={() => {
          if (onClick) onClick(key);
        }}
      />
    );
  }

  function showUsers(key) {
    if (!_user[key]) return;
    setUsersIds(_user[key]);
    popupStore.setState('open');
  }

  return (
    <React.Fragment>
      <AccountsList popupStore={popupStore} usersIds={usersIds} />
      <Align align={'start'}>
        <Row spacing={{ lg: 50, xs: 20 }} verticalAlign={'middle'}>
          {userImage(_isAuthUser, _user)}
          <Container>
            <Text text={_user.username} level={{ lg: 'h4', xs: 'h5' }} />
            <Spacing space={{ lg: 15, xs: 10 }} />
            <Row spacing={{ lg: 50, xs: 13 }}>
              {profileInfoText(_posts, 'posts')}
              {profileInfoText(_followers, 'followers', showUsers)}
              {profileInfoText(_following, 'following', showUsers)}
            </Row>
            <Spacing space={{ lg: 15, xs: 10 }} />
            {!_isAuthUser && (
              <Button
                text={{ text: _followingId ? 'Unfollow' : 'Follow' }}
                primaryColor={'#ffffff'}
                secondaryColor={'#454545'}
                onClick={() =>
                  _followingId
                    ? usersStore.unfollow(_user.id, _followingId, _followerId)
                    : usersStore.follow(_user.id)
                }
              />
            )}
          </Container>
        </Row>
      </Align>
    </React.Fragment>
  );
}

export default observer(UserProfile);
