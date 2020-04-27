import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  width: 30%;
  height: 90vh;
  border-right: 1px solid grey;
`;

const CustomerBox = styled('div')`
  width: 200px;
  height: 80px;
  padding: 20px;
  margin: 20px;
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
