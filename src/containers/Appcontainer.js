import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../components/Login';

function App() {
  const isLogin = useSelector(state => state.user.isLogin);

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
