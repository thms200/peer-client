import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCamera, FaMicrophone } from 'react-icons/fa';

const Wrapper = styled('aside')`
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: calc(100% - 9vh);
  margin-top: 9vh;
  padding: 0 5px;
  overflow-y: auto;
`;

export const CustomerBox = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 5px 5%;
  padding: 10px;
  border-bottom: 1px solid #a8a5a5;
  font-size: 15px;
  text-align: center;
  ${props => {
    if (props.isHome) {
      return '&:hover{ cursor: pointer; background-color: black; text-decoration: underline; border-radius: 10px; color: white; }';
    }
  }}
`;

export const AsideH2 = styled('h2')`
  align-self: baseline;
  margin: 20px 20px 5px;
  font-family: 'Gamja Flower', cursive;
`;

const InfoWrapper = styled('div')`
  display: flex;
  align-items: center;
  align-self: baseline;
  width: 100%;
  height: 34px;
  margin-bottom: 15px;
`;

export const InfoDiv = styled('div')`
  margin: 1px 10px 0 20px;
  color: grey;
  font-size: 14px;
  font-family: 'Gamja Flower', cursive;
`;

export const AllButton = styled('button')`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border-style: none;
  color: white;
  background-color: black;
`;

const Privacy = styled('span')`
  position: absolute;
  bottom: 1.8vh;
  left: 1vh;

  & a {
    color: #bdbcbc;
  }

  & a:hover {
    color: grey;
    background-color: transparent;
  }
`;

export default function Aside({ customers, onClick, page, title, consultant }) {
  const [isClicked, setIsClicked] = useState(false);
  const isHome = page === 'home';
  const handleClick = (e) => {
    if (isHome) {
      const customer = e.currentTarget.innerText;
      onClick(consultant, customer);
      setIsClicked(!isClicked);
    }
  };

  const makeInfoDiv = (isHome) => {
    const comment = isHome
      ? <InfoDiv>Select your custmer!</InfoDiv>
      : <InfoDiv>The customer is waiting for you!</InfoDiv>;
    const all = isHome && isClicked && <AllButton onClick={handleClick}>all</AllButton>;
    return (
      <InfoWrapper>
        {comment}
        {all}
      </InfoWrapper>
    );
  };

  return (
    <Wrapper>
      <AsideH2>{title}</AsideH2>
      {makeInfoDiv(isHome)}
      {customers && customers.map((customer) => {
        const customerName = customer.nickname;
        const isVoice = customer.mode === 'Voice';
        const key = customer.timestamp || customer.id;
        return (
          <CustomerBox
            key={key}
            isHome={isHome}
            onClick={handleClick}
          >
            {customer.mode && isVoice && <FaMicrophone style={{ margin: 5 }} />}
            {customer.mode && !isVoice && <FaCamera style={{ margin: 5 }} />}
            {customerName}
          </CustomerBox>
        );
      })}
      <Privacy><Link to="/privacy">Privacy</Link></Privacy>
    </Wrapper>
  );
}

Aside.prototype = {
  customers: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  consultant: PropTypes.string,
};
