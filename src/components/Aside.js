import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCamera, FaMicrophone } from 'react-icons/fa';

const Wrapper = styled('aside')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  height: 91vh;
  margin-top: 9vh;
  border-right: 1px solid grey;
  overflow-y: auto;
`;

const CustomerBox = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-size: 25px;
  text-align: center;
  box-shadow: 2px 2px 5px 0px black;
  background-color: rgb(105, 115, 251);
  ${props => {
    if (props.isHome) {
      return '&:hover{ cursor: pointer; background-color: black; text-decoration: underline; }';
    }
  }}
`;

const AsideH1 = styled('h1')`
  align-self: baseline;
  margin: 5px 20px;
`;

const InfoWrapper = styled('div')`
  display: flex;
  align-self: baseline;
  width: 100%;
`;

const InfoDiv = styled('div')`
  margin: 1px 20px;
  color: grey;
  font-size: 14px;
`;

const AllButton = styled('button')`
  border-radius: 50%;
  border-style: none;
  color: white;
  background-color: #a9a6a6;
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
      <AsideH1>{title}</AsideH1>
      {makeInfoDiv(isHome)}
      {customers && customers.map((customer) => {
        const customerName = customer.nickname;
        const isVoice = customer.mode === 'Voice';
        return (
          <CustomerBox
            key={customer.id}
            isHome={isHome}
            onClick={handleClick}
          >
            {customer.mode && isVoice && <FaMicrophone style={{ margin: 5 }} />}
            {customer.mode && !isVoice && <FaCamera style={{ margin: 5 }} />}
            {customerName}
          </CustomerBox>
        );
      })}
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
