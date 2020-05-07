import React from 'react';
import styled from 'styled-components';
import { makePrivacy } from '../utils';

const Wrapper = styled('div')`
  display: flex;
`;

const PrivacyPre = styled('pre')`
  margin-top: 70px;
`;

export default function Privacy() {
  return (
    <Wrapper>
      <PrivacyPre>
        {makePrivacy()}
      </PrivacyPre>
    </Wrapper>
  );
}
