import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  connectSocket,
  getCustomers,
  getCurrentCustomer,
  initialSocket,
  initialCustomers,
  initialCurrentCustomer,
} from '../actions';
import { alertMsg } from '../constants/message';

const Section = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 500px;
  height: 281px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0px;
  background-color: white;
`;

const ButtonWrapper = styled('div')`
  display: flex;
`;

const Button = styled('button')`
  &:hover {
    cursor: pointer;
  }
`;

export default function ConsultingScreen() {
  const dispatch = useDispatch();
  const consultant = useSelector(({ user: { userInfo: { id } } }) => id);
  const socket = useSelector(({ socket: { socket } }) => socket);
  const customers = useSelector(({ customers: { customers } }) => customers);
  const [activeOn, setActiveOn] = useState(false);
  const [activeStart, setActiveStart] = useState(false);
  
  useEffect(() => {
    socket && socket.on('currentCustomers', currentCustomers => {
      dispatch(getCustomers(currentCustomers));
    });
  }, [socket]);

  const onConsultant = () => {
    if (activeOn) return alert(alertMsg.alreadyOn);
    setActiveOn(true);
    const initailSocket = io(process.env.REACT_APP_API_URL);
    initailSocket.emit('onConsultant', consultant, (message) => {
      alert(message);
    });
    dispatch(connectSocket(initailSocket));
  };

  const offConsultant = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (activeStart) return alert(alertMsg.invalidOff);
    setActiveOn(false);
    socket.emit('offConsulting', consultant, (message) => {
      alert(message);
      dispatch(initialCustomers());
      socket.disconnect();
      dispatch(initialSocket());
    });
  };

  const onStartConsulting = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (activeStart) return alert(alertMsg.alreadyStart);
    if (!customers.length) return alert(alertMsg.noCustomer);
    setActiveStart(true);
    socket.emit('startConsulting', consultant, (data) => {
      alert(data.message);
      if (data.customer) dispatch(getCurrentCustomer(data.customer));
    });
  };

  const onEndConsulting = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (!activeStart) return alert(alertMsg.invalidStart);
    setActiveStart(false);
    socket.emit('endConsulting', (message) => {
      alert(message);
      dispatch(initialCurrentCustomer());
    });
  };

  return (
    <Section>
      <VideoWrapper></VideoWrapper>
      <VideoWrapper></VideoWrapper>
      <ButtonWrapper>
        <Button onClick={onConsultant}>On</Button>
        <Button onClick={offConsultant}>Off</Button>
        <Button onClick={onStartConsulting}>Start</Button>
        <Button onClick={onEndConsulting}>End</Button>
      </ButtonWrapper>
    </Section>
  );
}
