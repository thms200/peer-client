import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from '../components/Login';
import Loader from '../components/Loader';
import Header from '../components/Header';
import MainContainer from './MainContainer';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

function AppContainer() {
  const isLogin = useSelector(state => state.user.isLogin);
  const isLoading = useSelector(state => state.loading.isLoading);

  if (isLoading) {
    return (
      <Loader>Loading...</Loader>
    );
  }

  if (!isLogin) {
    return (
      <Login />
    );
  }

  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path={'/'} component={MainContainer} />
        <Redirect to={'/'} />
      </Switch>
    </Fragment>
  );
}

export default AppContainer;
