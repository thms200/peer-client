import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Aside from '../components/Aside';
import CameraScreen from '../components/CameraScreen';
import styled from 'styled-components';
import {
  connectSocket,
  getCustomers,
  getCurrentCustomer,
  connectConsultantStream,
  connectCustomerStream,
  initialStream,
  initialSocket,
  initialCustomers,
  initialCurrentCustomer,
} from '../actions';

const Wrapper = styled('div')`
  display: flex;
`;

export default function ConsultingContainer() {
  const dispatch = useDispatch();
  const consultant = useSelector(({ user: { userInfo: { id } } }) => id);
  const socket = useSelector(({ socket: { socket } }) => socket);
  const customers = useSelector(({ customers: { customers } }) => customers);
  const currentCustomer = useSelector(({ customers: { currentCustomer } }) => currentCustomer);
  const waitingCustomers = useSelector(({ customers: { customers } }) => customers);
  const consultantStream = useSelector(({ stream: { consultantStream } }) => consultantStream);
  const customerStream = useSelector(({ stream: { customerStream } }) => customerStream);
  const isVoice = currentCustomer.mode === 'Voice';

  useEffect(() => {
    socket && socket.on('currentCustomers', currentCustomers => {
      dispatch(getCustomers(currentCustomers));
    });
  }, [socket]);

  const onConsultant = () => {
    const initailSocket = io(process.env.REACT_APP_API_URL);
    initailSocket.emit('onConsulting', consultant, (message) => {
      alert(message);
    });
    dispatch(connectSocket(initailSocket));
  };

  const offConsultant = () => {
    socket.emit('offConsulting', consultant, (message) => {
      alert(message);
      dispatch(initialCustomers());
      dispatch(initialSocket());
      dispatch(initialStream());
      socket.disconnect();
    });
  };

  const onStartConsulting = async() => {
    let streamConsultant;
    try {
      streamConsultant = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });;
      dispatch(connectConsultantStream(streamConsultant));
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
        dispatch(connectCustomerStream(stream));
      });
      peer.signal(socketData.customerInfo.signal);
      if (socketData.customerInfo) dispatch(getCurrentCustomer(socketData.customerInfo));
    });
  };

  const onEndConsulting = () => {
    socket.emit('endConsulting', currentCustomer.nickname, (message) => {
      alert(message);
      dispatch(initialCurrentCustomer());
    });
  };

  return (
    <Wrapper>
      <Aside customers={waitingCustomers} />
      <CameraScreen
        onConsultant={onConsultant}
        offConsultant={offConsultant}
        onStartConsulting={onStartConsulting}
        onEndConsulting={onEndConsulting}
        consultantStream={consultantStream}
        customerStream={customerStream}
        customers={customers}
        customerName={currentCustomer.nickname}
        isVoice={isVoice}
      />
    </Wrapper>
  );
}
