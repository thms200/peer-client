import React from 'react';
import styled from 'styled-components';

const LoaderDiv = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  line-height: 99vh;
  color: white;
  font-size: 70px;
  text-align: center;
  background-color: black;
`;

export default function Loader() {
  return (
    <LoaderDiv>
      Welcome!
    </LoaderDiv>
  );
}
