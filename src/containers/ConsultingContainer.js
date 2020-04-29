import React, { useEffect, useState } from 'react';
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
  getMediaRecorder,
  initialStream,
  initialSocket,
  initialCustomers,
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
  const socket = useSelector(({ socket: { socket } }) => socket);
  const customers = useSelector(({ customers: { customers } }) => customers);
  const currentCustomer = useSelector(({ customers: { currentCustomer } }) => currentCustomer);
  const waitingCustomers = useSelector(({ customers: { customers } }) => customers);
  const consultantStream = useSelector(({ mediaStream: { consultantStream } }) => consultantStream);
  const customerStream = useSelector(({ mediaStream: { customerStream } }) => customerStream);
  const mediaRecorder = useSelector(({ mediaStream: { mediaRecorder } }) => mediaRecorder);
  const [isVoice, setIsVoice] = useState(false);
  const customerName = currentCustomer.nickname;

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

  const onStartConsulting = () => {
    socket.emit('startConsulting', consultant, async(socketData) => {
      alert(socketData.message);
      const { nickname, mode } = socketData.customerInfo;
      let streamConsultant;
      const isVoice = mode === 'Voice';

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
      mediaRecorder.start(5000);
      mediaRecorder.ondataavailable = (blob) => {
        const newBlob = new Blob([blob.data]);
        saveAudio(newBlob, consultant, nickname, false);
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
      saveAudio(newBlob, consultant, customerName, true);
    };
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
        customerName={customerName}
        isVoice={isVoice}
      />
    </Wrapper>
  );
}
