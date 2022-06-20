import React, { useEffect } from 'react';
import { useAppContext, useVm } from '../../../context';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Loader from '../../atoms/Loader/Loader';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Text from '../../atoms/Text/Text';
import PopupStore from '../../atoms/Popup/PopupStore';
import SearchAccounts from '../SearchAccounts/SearchAccounts';
import { observer } from 'mobx-react';
import './NewsFeed.css';
import Post from '../../organisms/Post/Post';
import WalkThrough from '../WalkThrough/WalkThrough';

const no_following_msg1 = 'You are not following any account';
const no_following_msg2 = 'Follow your friends and check their hangouts!';
const no_posts_msg1 = 'Your friends did not post any hangouts yet';
const no_posts_msg2 = 'Check other friends accounts';
const search_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/975/975658.svg';

function NewsFeed() {
  const { usersStore } = useAppContext();
  const { postsStore } = useAppContext();
  const popupStore = useVm(PopupStore);

  const _newsFeedStyle = { lg: { padding: '0px 12%' }, xs: { padding: '0px' } };

  useEffect(() => {
    postsStore.getAllPosts();
    if (usersStore.authUser.walkthroughShown == null)
      popupStore.setState('open');
  }, [postsStore]);

  function posts() {
    let _posts = [];
    let _count = 0;
    for (const key in postsStore.posts) {
      let _post = postsStore.posts[key];
      _posts = [
        ..._posts,
        ...[
          <React.Fragment key={key}>
            <Post
              {..._post}
              showHeader={1}
              user={usersStore.users[_post.user]}
            ></Post>
            {_count !== 0 && <Spacing space={{ lg: 45, xs: 30 }} />}
          </React.Fragment>,
        ],
      ];
      _count++;
    }
    return _posts.reverse();
  }

  function emptyFeedMessage(message1, message2) {
    return (
      <React.Fragment>
        <Container style={{ height: 'calc(100vh - 300px)' }}>
          <Center>
            <Text text={message1} level={'h5'} />
            <Spacing space={7} />
            <Text text={message2} />
            <Spacing space={15} />
            <Row
              spacing={10}
              verticalAlign={'middle'}
              onClick={() => popupStore.setState('open')}
            >
              <Text
                text={'Search accounts'}
                className={'lho_newsfeed_search'}
              />
              <Icon src={search_icon_src} size={'lg'} />
            </Row>
          </Center>
        </Container>
      </React.Fragment>
    );
  }

  let walkthroughShown = usersStore.authUser.walkthroughShown;

  return (
    <React.Fragment>
      {walkthroughShown == null && <WalkThrough popupStore={popupStore} />}
      {walkthroughShown != null && <SearchAccounts popupStore={popupStore} />}
      {postsStore.loading && (
        <Container className={'lho_newsfeed'}>
          <Loader />
        </Container>
      )}
      {!postsStore.loading && (
        <Container className={'lho_newsfeed'}>
          {!usersStore.authUser.following &&
            emptyFeedMessage(no_following_msg1, no_following_msg2)}
          {usersStore.authUser.following &&
            !postsStore.posts &&
            emptyFeedMessage(no_posts_msg1, no_posts_msg2)}
          {usersStore.authUser.following && postsStore.posts && (
            <Container style={_newsFeedStyle}>{posts()}</Container>
          )}
        </Container>
      )}
    </React.Fragment>
  );
}

export default observer(NewsFeed);
