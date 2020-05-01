import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Aside from '../components/Aside';
import CameraScreen from '../components/CameraScreen';
import styled from 'styled-components';
import {
  connectSocket,
  getWaitingCustomers,
  getCurrentCustomer,
  connectConsultantStream,
  connectCustomerStream,
  getMediaRecorder,
  initialStream,
  initialSocket,
  initialWaitingCustomers,
  initialCurrentCustomer,
} from '../actions';
import { saveAudio } from '../utils/api';
import { alertMsg } from '../constants/message';

const Wrapper = styled('div')`
  display: flex;
`;

export default function ConsultingContainer() {
  const dispatch = useDispatch();
  const consultant = useSelector(({ user: { userInfo: { id } } }) => id);
  const consultantName = useSelector(({ user: { userInfo: { name } } }) => name);
  const socket = useSelector(({ socket: { socket } }) => socket);
  const waitingCustomers = useSelector(({ customers: { waitingCustomers } }) => waitingCustomers);
  const currentCustomer = useSelector(({ customers: { currentCustomer } }) => currentCustomer);
  const consultantStream = useSelector(({ mediaStream: { consultantStream } }) => consultantStream);
  const customerStream = useSelector(({ mediaStream: { customerStream } }) => customerStream);
  const mediaRecorder = useSelector(({ mediaStream: { mediaRecorder } }) => mediaRecorder);
  const [isVoice, setIsVoice] = useState(false);
  const customerName = currentCustomer.nickname;

  const onConsultant = () => {
    const initailSocket = io(process.env.REACT_APP_API_URL);
    initailSocket.emit('onConsulting', consultant, (message) => {
      alert(message);
    });
    initailSocket.on('currentCustomers', currentCustomers => {
      dispatch(getWaitingCustomers(currentCustomers));
    });
    dispatch(connectSocket(initailSocket));
  };

  const offConsultant = () => {
    socket.emit('offConsulting', consultant, (message) => {
      alert(message);
      dispatch(initialWaitingCustomers());
      dispatch(initialSocket());
      dispatch(initialStream());
      socket.disconnect();
    });
  };

  const onStartConsulting = () => {
    socket.emit('startConsulting', consultant, async(socketData) => {
      alert(socketData.message);
      const { nickname, mode } = socketData.customerInfo;
      const isVoice = mode === 'Voice';
      let streamConsultant;
      try {
        setIsVoice(isVoice);
        streamConsultant = await navigator.mediaDevices
          .getUserMedia({ audio: true, video: !isVoice });
        dispatch(connectConsultantStream(streamConsultant));
      } catch (err) {
        alert(alertMsg.requesPermission);
      }

      const type = isVoice ? 'audio/webm' : 'video/webm';
      const mediaRecorder = new MediaRecorder(streamConsultant, { mimeType: type });
      mediaRecorder.start(60000);
      mediaRecorder.ondataavailable = (blob) => {
        const newBlob = new Blob([blob.data]);
        saveAudio(newBlob, consultant, nickname, false, isVoice);
      };
      dispatch(getMediaRecorder(mediaRecorder));

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
      dispatch(getCurrentCustomer(socketData.customerInfo));
    });
  };

  const onEndConsulting = async() => {
    socket.emit('endConsulting', currentCustomer.nickname, (message) => {
      alert(message);
      dispatch(initialCurrentCustomer());
    });
    mediaRecorder.stop();
    mediaRecorder.ondataavailable = (blob) => {
      const newBlob = new Blob([blob.data]);
      saveAudio(newBlob, consultant, customerName, true, isVoice);
    };
  };

  return (
    <Wrapper>
      <Aside
        customers={waitingCustomers}
        page="consulting"
        title="Waiting Customer"
      />
      <CameraScreen
        onConsultant={onConsultant}
        offConsultant={offConsultant}
        onStartConsulting={onStartConsulting}
        onEndConsulting={onEndConsulting}
        consultantStream={consultantStream}
        customerStream={customerStream}
        consultantName={consultantName}
        customers={waitingCustomers}
        customerName={customerName}
        isVoice={isVoice}
      />
    </Wrapper>
  );
}
