import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  height: 10vh;
`;

export default function Header() {
  return (
    <Wrapper>
      <div>Peer</div>
      <hr />
    </Wrapper>
  );
}
