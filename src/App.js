import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/atoms/Container/Container';
import PageTemplate from './components/templates/PageTemplate/PageTemplate';
import Header from './components/organisms/Header/Header';
import SignUpIn from './components/organisms/SignUpIn/SignUpIn';
import { useAppContext } from './context';
import CentralPage from './components/templates/CentralPage/CentralPage';
import { Switch, Route, withRouter } from 'react-router-dom';
import UserPage from './components/templates/UserPage/UserPage';
import NewsFeed from './components/templates/NewsFeed/NewsFeed';
import './App.css';
import BottomBar from './components/organisms/BottomBar/BottomBar';
import ExplorePage from './components/templates/ExplorePage/ExplorePage';
import OptionsPage from './components/templates/OptionsPage/OptionsPage';
import GeneratePage from './components/templates/GeneratePage/GeneratePage';

function App() {
  let { usersStore } = useAppContext();

  return (
    <Container className={'App'} dir={'ltr'}>
      {usersStore.authUser && (
        <PageTemplate
          header={<Header />}
          body={
            <Switch>
              <Route exact={true} path={'/'} render={() => <OptionsPage />} />
              <Route exact={true} path={'/explore'} render={() => <ExplorePage />} />
              <Route exact={true} path={'/generate'} render={() => <GeneratePage />} />

              <Route
                exact={true}
                path={'/:username'}
                render={(props) => (
                  <UserPage user={usersStore.authUser} {...props} />
                )}
              />
            </Switch>
          }
        // bottomBar={<BottomBar />}
        />
      )}
      {!usersStore.authUser && <SignUpIn />}
    </Container>
  );
}

export default withRouter(observer(App));
