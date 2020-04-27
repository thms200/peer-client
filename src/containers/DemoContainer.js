import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
`;

export default function DemoContainer() {
  return (
    <Wrapper>
      <div>Demo Page</div>
    </Wrapper>
  );
}
