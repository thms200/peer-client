import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from '../components/Login';
import Loader from '../components/Loader';
import Header from '../components/Header';
import MainContainer from './MainContainer';
import ConsultingContainer from './ConsultingContainer';
import InstallContainer from './InstallContainer';
import DemoContainer from './DemoContainer';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Gamja Flower', cursive;
  }
  a {
    text-decoration: none;
    color: black;
    padding: 3px;

    &:hover {
      border-radius: 10px;
      background-color: #e4dcdc;
    }
  }
  button {
    font-family: 'Gamja Flower', cursive;
    cursor: pointer;
    font-size: 15px;
    &:focus {
      outline: none;
    }
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
        <Route path={'/consulting'} component={ConsultingContainer} />
        <Route path={'/install'} component={InstallContainer} />
        <Route path={'/demo'} component={DemoContainer} />
        <Redirect to={'/'} />
      </Switch>
    </Fragment>
  );
}

export default AppContainer;
