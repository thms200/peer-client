import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from '../components/Login';
import Header from '../components/Header';
import MainContainer from './MainContainer';
import ConsultingContainer from './ConsultingContainer';
import InstallContainer from './InstallContainer';
import DemoContainer from './DemoContainer';
import { logoutUser, setLoading } from '../actions';
import { logInFacebook, getAuth } from '../utils/api';
import { alertMsg } from '../constants/message';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'PT Sans', sans-serif;
    overflow: scroll;
    background-color: #ededed;
  }
  a {
    text-decoration: none;
    color: black;
    padding: 3px 8px;

    &:hover {
      border-radius: 10px;
      background-color: #e4dcdc;
      color: black;
    }
  }
  button {
    cursor: pointer;
    font-size: 15px;
    font-family: 'PT Sans', sans-serif;
    &:focus {
      outline: none;
    }
  }
`;

function AppContainer() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const isLoading = useSelector(state => state.loading.isLoading);
  const userInfo = useSelector(({ user: { userInfo } }) => userInfo);
  const history = useHistory();
  const home = { pathname: '/' };

  const onGetAuth = async() => await getAuth(dispatch, history);
  const onClickLogin = () => dispatch(setLoading(true));
  const responseFacebook = async(response) => {
    try {
      await logInFacebook(dispatch, response);
      history.replace(home);
    } catch (err) {
      alert(alertMsg.invalidLogin);
    }
  };
  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('x-access-token');
    history.replace({ pathname: '/login' });
  };
  const privateRoute = (Component) => {
    return isLogin ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  };

  useEffect(() => {
    onGetAuth();
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Header onClick={onLogout} userInfo={userInfo} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => privateRoute(MainContainer)}
        />
        <Route
          path="/consulting"
          render={() => privateRoute(ConsultingContainer)}
        />
        <Route
          path="/install"
          render={() => privateRoute(InstallContainer)}
        />
        <Route
          path="/demo"
          render={() => privateRoute(DemoContainer)}
        />
        <Route
          path="/login"
          render={() => {
            return (<Login
              isLogin={isLogin}
              isLoading={isLoading}
              onClick={onClickLogin}
              callback={responseFacebook}
            />
            );
          }}
        />
        <Redirect to={'/'} />
      </Switch>
    </Fragment>
  );
}

export default AppContainer;
