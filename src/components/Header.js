import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled('header')`
  position: fixed;
  width: 100%;
  height: 9vh;
  background-color: #202020;
`;

const HeaderDiv = styled('div')`
  display: flex;
  align-items: flex-end;
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

export const HeaderLi = styled('li')`
  margin: 0 8px;
  font-size: 17px;

  a {
    color: white;

    &.active {
      border-radius: 10px;
      background-color: #e4dcdc;
      color: black;
    }
  }
`;

const Titile = styled('h1')`
  display: flex;
  align-items: center;
  margin: 0px;
  font-size: 40px;
  font-family: 'Pacifico', cursive;
  color: white;
`;

const TitleImg = styled('img')`
  width: 50px;
  height: 50px;
`;

const Button = styled('button')`
  padding: 3px 8px;
  border: none;
  font-size: 17px;
  color: white;
  background-color: transparent;

  &:hover {
    border-radius: 10px;
    background-color: #e4dcdc;
    color: black;
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
            <HeaderLi><NavLink exact to="/">Home</NavLink></HeaderLi>
            <HeaderLi><NavLink to="/consulting">Consulting</NavLink></HeaderLi>
            <HeaderLi><NavLink to="/install">Install</NavLink></HeaderLi>
            <HeaderLi><NavLink to="/demo">Demo</NavLink></HeaderLi>
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
