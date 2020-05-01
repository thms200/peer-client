import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Aside from '../components/Aside';
import Consultings from '../components/Consultings';
import { getConsultings } from '../actions';
import { fetchConsultings } from '../utils/api';
import { getHistoryCustomers } from '../utils';

const Wrapper = styled('div')`
  display: flex;
`;

export default function MainContainer() {
  const [historyCustomers, setHistoryCustomers] = useState([]);
  const dispatch = useDispatch();
  const consultant = useSelector(({ user: { userInfo: { id } } }) => id);
  const consultings = useSelector(({ user: { consultings } }) => consultings);
  const onGetConsultings = async(consultant, customer) => {
    const consultings = await fetchConsultings(consultant, customer);
    const historyCustomers = getHistoryCustomers(consultings.data);
    dispatch(getConsultings(consultings.data));
    setHistoryCustomers(historyCustomers);
  };

  useEffect(() => {
    onGetConsultings(consultant, 'all');
  }, []);

  return (
    <Wrapper>
      <Aside
        customers={historyCustomers}
        onClick={onGetConsultings}
        page="home"
        title="History"
        consultant={consultant}
      />
      <Consultings consultings={consultings} />
    </Wrapper>
  );
}
