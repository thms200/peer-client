import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Login from '../components/Login';

const Loader = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 3;
  color: white;
  font-size: 50px;
  text-align: center;
  font-family: 'Baloo Tammudu 2', cursive;
`;

function App() {
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
  } else {
    return (
      <div>Main</div>
    );
  }
}

export default App;
