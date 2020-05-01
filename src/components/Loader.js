import React from 'react';
import styled from 'styled-components';

const LoaderDiv = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 3;
`;

export default function Loader() {
  return (
    <LoaderDiv />
  );
}
