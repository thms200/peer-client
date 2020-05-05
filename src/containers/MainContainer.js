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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const consultant = useSelector(({ user: { userInfo: { id } } }) => id);
  const consultings = useSelector(({ user: { consultings } }) => consultings);

  const onGetConsultings = async(consultant, customer) => {
    try {
      const token = localStorage.getItem('x-access-token');
      setIsLoading(true);
      const consultings = await fetchConsultings(token, consultant, customer);
      const historyCustomers = getHistoryCustomers(consultings.data);
      dispatch(getConsultings(consultings.data));
      setHistoryCustomers(historyCustomers);
      setIsLoading(false);
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
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
      <Consultings consultings={consultings} isLoading={isLoading} />
    </Wrapper>
  );
}
