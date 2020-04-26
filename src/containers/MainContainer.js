import React from 'react';
import { useSelector } from 'react-redux';
import Aside from '../components/Aside';
import ConsultingScreen from '../components/ConsultingScreen';
import styled from 'styled-components';

const Wrapper = styled('div')`
  display: flex;
`;

export default function MainContainer() {
  const waitingCustomers = useSelector(({ customers: { customers } }) => customers);

  return (
    <Wrapper>
      <Aside Customers={waitingCustomers} />
      <ConsultingScreen />
    </Wrapper>
  );
}
