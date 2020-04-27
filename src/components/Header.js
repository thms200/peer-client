import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions';
import styled from 'styled-components';

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
  font-family: 'Pacifico', cursive;
  font-size: 40px;
  margin: 0;
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

export default function Header() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
  };

  return (
    <Wrapper>
      <HeaderDiv>
        <Titile>Peer</Titile>
        <nav>
          <HeaderUi>
            <HeaderLi><Link to="/">Home</Link></HeaderLi>
            <HeaderLi><Link to="/consulting">Consulting</Link></HeaderLi>
            <HeaderLi><Link to="/install">Install</Link></HeaderLi>
            <HeaderLi><Link to="/demo">Demo</Link></HeaderLi>
            <HeaderLi><Button onClick={onLogout}>Logout</Button></HeaderLi>
          </HeaderUi>
        </nav>
      </HeaderDiv>
      <hr />
    </Wrapper>
  );
}
