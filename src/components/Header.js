import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled('div')`
  height: 10vh;
`;

const HeaderDiv = styled('div')`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 10px;
`;

const HeaderUi = styled('ul')`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const HeaderLi = styled('li')`
  margin: 0 8px;
  font-size: 25px;
`;

const Titile = styled('h1')`
  display: flex;
  align-items: center;
  font-family: 'Pacifico', cursive;
  font-size: 40px;
  margin: 0;
`;

const TitleImg = styled('img')`
  width: 50px;
  height: 50px;
`;

const Button = styled('button')`
  padding: 3px;
  border: none;
  font-size: 23px;
  background-color: transparent;

  &:hover {
    border-radius: 10px;
    background-color: #e4dcdc;
  }
`;

const UserPhoto = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const HeaderHr = styled('hr')`
  margin: 2px;
`;

export default function Header({ onClick, userInfo }) {
  return (
    <Wrapper>
      <HeaderDiv>
        <Titile>
          <TitleImg src="https://img.icons8.com/nolan/96/microphone.png" alt="peer" />
          Peer
        </Titile>
        <nav>
          <HeaderUi>
            <HeaderLi><Link to="/">Home</Link></HeaderLi>
            <HeaderLi><Link to="/consulting">Consulting</Link></HeaderLi>
            <HeaderLi><Link to="/install">Install</Link></HeaderLi>
            <HeaderLi><Link to="/demo">Demo</Link></HeaderLi>
            <HeaderLi><Button onClick={onClick}>Logout</Button></HeaderLi>
            <HeaderLi><UserPhoto src={userInfo.picture} /></HeaderLi>
          </HeaderUi>
        </nav>
      </HeaderDiv>
      <HeaderHr />
    </Wrapper>
  );
}

Header.prototype = {
  onClick: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
