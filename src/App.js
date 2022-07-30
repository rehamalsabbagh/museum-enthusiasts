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
import TourPage from './components/templates/TourPage/TourPage';

function App() {
  let { usersStore } = useAppContext();

  function pageTemplate(body) {
    return <PageTemplate
      header={<Header />}
      body={body}
    // bottomBar={<BottomBar />}
    />
  }

  return (
    <Container className={'App'} dir={'ltr'}>
      {usersStore.authUser && (
        <React.Fragment>
          <Switch>
            <Route exact={true} path={'/'} render={() => pageTemplate(<OptionsPage />)} />
            <Route exact={true} path={'/explore'} render={() => pageTemplate(<ExplorePage />)} />
            <Route exact={true} path={'/generate'} render={() => pageTemplate(<GeneratePage />)} />
            <Route exact={true} path={'/tour'} render={() => <TourPage />} />
            <Route
              exact={true}
              path={'/:username'}
              render={(props) => (
                pageTemplate(<UserPage user={usersStore.authUser} {...props} />)
              )}
            />

          </Switch>
        </React.Fragment>
      )}
      {!usersStore.authUser && <SignUpIn />}
    </Container>
  );
}

export default withRouter(observer(App));
