import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';
import { FaRegIdBadge, FaRegLaughWink, FaSlideshare, FaHeadset } from 'react-icons/fa';
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
  width: ${props => {
    if (props.isVoice) return '0%';
    return '100%';
  }};
  height: ${props => {
    if (props.isVoice) return '0%';
    return '100%';
  }};
  border-radius: 10px;
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled('button')`
  margin: 10px;
  border-radius: 10px;
  width: 100px;
  color: white;
  background-color: ${props => {
    if (props.activeOn || props.activeStart) return 'black';
    else return 'rgb(105, 115, 251)';
  }};
  &:hover {
    cursor: pointer;
    background-color: black;
    text-decoration: underline;
  }
`;

const H1Text = styled('h1')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: rgb(105, 115, 251);
  text-align: center;
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

  const isVoice = currentCustomer.mode === 'Voice';
  return (
    <Section>
      <div>
        <H1Text><FaRegIdBadge size={21}/>Brand</H1Text>
        <VideoWrapper>
          {isVoice && <FaHeadset size={150} color={'rgb(105, 115, 251)'} />}
          <Video
            playsInline
            autoPlay
            ref={consultantRef}
            isVoice={isVoice}
          />
        </VideoWrapper>
      </div>
      <div>
        {currentCustomer.nickname
          ? <H1Text><FaRegLaughWink size={20} /> {currentCustomer.nickname}님</H1Text>
          : <H1Text><FaSlideshare size={20} />상담을 시작하세요.</H1Text>
        }
        <VideoWrapper>
          {isVoice && <FaHeadset size={150} color={'rgb(105, 115, 251)'} />}
          <Video
            playsInline
            autoPlay
            ref={customerRef}
            isVoice={isVoice}
          />
        </VideoWrapper>
      </div>
      <ButtonWrapper>
        <div>
          <Button activeOn={activeOn} onClick={onConsultant}>On</Button>
          <Button onClick={offConsultant}>Off</Button>
        </div>
        <div>
          <Button activeStart={activeStart} onClick={onStartConsulting}>Start</Button>
          <Button onClick={onEndConsulting}>End</Button>
        </div>
      </ButtonWrapper>
    </Section>
  );
}
