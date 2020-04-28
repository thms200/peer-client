import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 90vh;
  border-right: 1px solid grey;
`;

const CustomerBox = styled('div')`
  width: 80%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-size: 25px;
  text-align: center;
  background-color: rgb(105, 115, 251);;
  &:hover {
    cursor: pointer;
    background-color: black;
    text-decoration: underline;
  }
`;

export default function Aside({ customers }) {
  return (
    <Wrapper>
      {customers && customers.map((customer) => {
        const customerName = customer.nickname;
        return (
          <CustomerBox key={customer.id}>
            {customerName}
          </CustomerBox>
        );
      })}
    </Wrapper>
  );
}

Aside.prototype = {
  customers: PropTypes.array.isRequired,
};
