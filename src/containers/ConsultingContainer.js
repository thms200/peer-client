import React from 'react';
import { useSelector } from 'react-redux';
import Aside from '../components/Aside';
import CameraScreen from '../components/CameraScreen';
import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
`;

export default function ConsultingContainer() {
  const waitingCustomers = useSelector(({ customers: { customers } }) => customers);

  return (
    <Wrapper>
      <Aside customers={waitingCustomers} />
      <CameraScreen />
    </Wrapper>
  );
}
