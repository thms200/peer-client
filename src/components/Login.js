import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  background: url("https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_1280.jpg");
  background-size: cover;
`;

const Title = styled('div')`
  color: white;
  font-size: 100px;
  font-family: 'Pacifico', cursive;
  text-align: center;
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

export default function Login({ onClick, callback }) {
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

Login.prototype = {
  onClick: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};
