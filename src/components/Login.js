import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from './Loader';

const Wrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_1280.jpg");
  background-size: cover;
`;

const Title = styled('div')`
  color: white;
  font-size: 100px;
  text-align: center;
  font-family: 'Pacifico', cursive;
`;

const Row = styled('div')`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: 200px;
  background: #b8b5b596;
  line-height: 200px;
`;

const FacebookRow = styled(Row)`
  top: calc(65%);
  background: transparent;
  text-align: center;

  .facebookButton {
    width: 300px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: #3b5998;
    color: white;
    font-size: 20px;
    font-family: 'Baloo Tammudu 2', cursive;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }

  i {
    margin-right: 12px;
  }
`;

export default function Login({ isLogin, isLoading, onClick, callback }) {
  if (isLoading) return <Loader />;

  if (!isLogin) {
    return (
      <Wrapper>
        <Row>
          <Title>Peer</Title>
        </Row>
        <FacebookRow>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            fields="name,email,picture"
            onClick={onClick}
            callback={callback}
            cssClass="facebookButton"
            icon="fa-facebook"
          />
        </FacebookRow>
      </Wrapper>
    );
  }
   
  return <div></div>;
}

Login.prototype = {
  isLogin: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};
