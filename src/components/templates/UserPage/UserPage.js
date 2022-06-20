import React from 'react';
import { useAppContext } from '../../../context';
import Container from '../../atoms/Container/Container';
import Spacing from '../../atoms/Spacing/Spacing';
import PostsGrid from '../../organisms/PostsGrid/PostsGrid';
import UserProfile from '../../organisms/UserProfile/UserProfile';
import './UserPage.css';

function UserPage(props) {
  let { usersStore } = useAppContext();
  let user = usersStore.retriveUser(props.match.params.username);
  return (
    <Container className={'lho_user_page'}>
      <UserProfile user={user} />
      <Spacing space={{ lg: 40, xs: 30 }} />
      <Container style={{ borderBottom: '1px solid #e4e4e4' }} />
      <Spacing space={{ lg: 50, xs: 30 }} />
      <PostsGrid user={user} />
    </Container>
  );
}

export default UserPage;
