import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from '../components/Login';
import MainContainer from './MainContainer';
import ConsultingContainer from './ConsultingContainer';
import InstallContainer from './InstallContainer';
import DemoContainer from './DemoContainer';
import Header from '../components/Header';
import { loginUser, logoutUser, setLoading } from '../actions';
import { logInFacebook, getAuth } from '../utils/api';
import { MESSAGE } from '../constants/message';

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
  const history = useHistory();
  const isLogin = useSelector(({ user: { isLogin } }) => isLogin);
  const userInfo = useSelector(({ user: { userInfo } }) => userInfo);
  const isLoading = useSelector(({ loading: { isLoading } }) => isLoading);

  const onLoginClick = () => dispatch(setLoading(true));

  const handleLoginSuccess = (userInfo) => {
    dispatch(loginUser(userInfo));
    dispatch(setLoading(false));
    history.replace({ pathname: '/' });
  };

  const handleLoginFailure = (message, type) => {
    alert(message);
    if (type === 'auth') {
      localStorage.removeItem('x-access-token');
      history.replace({ pathname: '/' });
    }
  };

  const onGetAuth = async() => {
    try {
      const currentToken = localStorage.getItem('x-access-token');
      if (!currentToken) return;
      dispatch(setLoading(true));
      const { data } = await getAuth(currentToken);
      handleLoginSuccess(data.userInfo);
    } catch (err) {
      const { response } = err;
      if (response) return handleLoginFailure(response.data.errMessage, 'auth');
      alert(MESSAGE.GENERAL_ERROR);
    }
  };

  const responseFacebook = async(auth) => {
    try {
      const { data } = await logInFacebook(auth);
      localStorage.setItem('x-access-token', `Bearer ${data.token}`);
      handleLoginSuccess(data.userInfo);
    } catch (err) {
      const { response } = err;
      if (response) return handleLoginFailure(err.response.data.errMessage, 'login');
      alert(MESSAGE.GENERAL_ERROR);
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
              onClick={onLoginClick}
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
