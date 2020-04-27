import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';
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
  width: 70%;
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

const Video = styled('video')`
  width: 100%;
  height: 100%;
  border-radius: 10px;
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
  const currentCustomer = useSelector(({ customers: { currentCustomer } }) => currentCustomer);
  const [activeOn, setActiveOn] = useState(false);
  const [activeStart, setActiveStart] = useState(false);
  const consultantRef = useRef(null);
  const customerRef = useRef(null);

  useEffect(() => {
    socket && socket.on('currentCustomers', currentCustomers => {
      dispatch(getCustomers(currentCustomers));
    });
  }, [socket]);

  const onConsultant = () => {
    if (activeOn) return alert(alertMsg.alreadyOn);
    setActiveOn(true);
    const initailSocket = io(process.env.REACT_APP_API_URL);
    initailSocket.emit('onConsulting', consultant, (message) => {
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
      dispatch(initialSocket());
      socket.disconnect();
    });
  };

  const onStartConsulting = async() => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (activeStart) return alert(alertMsg.alreadyStart);
    if (!customers || !customers.length) return alert(alertMsg.noCustomer);
    setActiveStart(true);

    let streamConsultant;
    try {
      streamConsultant = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });;
      if (consultantRef.current) consultantRef.current.srcObject = streamConsultant;
    } catch (err) {
      alert('카메라와 마이크 접근 권한을 허락해주세요!');
    }

    socket.emit('startConsulting', consultant, (socketData) => {
      alert(socketData.message);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamConsultant,
      });

      const customerId = socketData.customerInfo.id;
      peer.on('signal', signal => {
        socket.emit('acceptCustomer', { signal, to: customerId });
      });
      peer.on('stream', stream => {
        if (customerRef.current) customerRef.current.srcObject = stream;
      });
      peer.signal(socketData.customerInfo.signal);
      if (socketData.customerInfo) dispatch(getCurrentCustomer(socketData.customerInfo));
    });
  };

  const onEndConsulting = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (!activeStart) return alert(alertMsg.invalidStart);
    setActiveStart(false);
    socket.emit('endConsulting', currentCustomer.nickname, (message) => {
      alert(message);
      dispatch(initialCurrentCustomer());
    });
  };

  return (
    <Section>
      <div>Brand</div>
      <VideoWrapper>
        <Video
          playsInline
          autoPlay
          ref={consultantRef}
        />
      </VideoWrapper>
      {currentCustomer.nickname
        ? <div>{currentCustomer.nickname}님</div>
        : <div>상담을 시작하세요.</div>
      }
      <VideoWrapper>
        <Video
          playsInline
          autoPlay
          ref={customerRef}
        />
      </VideoWrapper>
      <ButtonWrapper>
        <Button onClick={onConsultant}>On</Button>
        <Button onClick={offConsultant}>Off</Button>
        <Button onClick={onStartConsulting}>Start</Button>
        <Button onClick={onEndConsulting}>End</Button>
      </ButtonWrapper>
    </Section>
  );
}
