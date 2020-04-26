import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  width: 30%;
  height: 90vh;
  border-right: 1px solid grey;
`;

export default function Aside({ Customers }) {

  return (
    <Wrapper>
      {Customers.map((customer) => {
        const customerName = Object.keys(customer)[0];
        return (
          <div key={customerName}>
            {customerName}
          </div>
        );
      })}
    </Wrapper>
  );
}
