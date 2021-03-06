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
import { fetchAudio } from '../utils/api';
import { MESSAGE } from '../constants/message';

const Wrapper = styled('div')`
  display: flex;
`;

export default function ConsultingContainer() {
  const dispatch = useDispatch();
  const consultantId = useSelector(({ user: { userInfo: { id } } }) => id);
  const consultantName = useSelector(({ user: { userInfo: { name } } }) => name);
  const socket = useSelector(({ socket: { socket } }) => socket);
  const waitingCustomers = useSelector(({ customers: { waitingCustomers } }) => waitingCustomers);
  const currentCustomer = useSelector(({ customers: { currentCustomer } }) => currentCustomer);
  const consultantStream = useSelector(({ mediaStream: { consultantStream } }) => consultantStream);
  const customerStream = useSelector(({ mediaStream: { customerStream } }) => customerStream);
  const mediaRecorder = useSelector(({ mediaStream: { mediaRecorder } }) => mediaRecorder);
  const [isVoice, setIsVoice] = useState(false);
  const customerName = currentCustomer.nickname;

  const mixAudio = (audioContext, streams) => {
    const destination = audioContext.createMediaStreamDestination();
    streams.forEach(stream => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(destination);
    });
    return destination.stream.getAudioTracks()[0];
  };

  const saveAudio = async(blob, consultantId, customerName, isFinal, isVoice) => {
    try {
      const token = localStorage.getItem('x-access-token');
      await fetchAudio(blob, consultantId, customerName, isFinal, isVoice, token);
    } catch (err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };
  const socketAPI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3030' : 'https://api.withpeer.site:3030';
  const onConsultant = () => {
    const initailSocket = io(socketAPI);
    initailSocket.emit('onConsulting', consultantId, (message) => {
      alert(message);
    });
    initailSocket.on('currentCustomers', currentCustomers => {
      dispatch(getWaitingCustomers(currentCustomers));
    });
    dispatch(connectSocket(initailSocket));
  };

  const offConsultant = () => {
    socket.emit('offConsulting', consultantId, (message) => {
      alert(message);
      dispatch(initialWaitingCustomers());
      dispatch(initialSocket());
      dispatch(initialStream());
      socket.disconnect();
    });
  };

  const onStartConsulting = () => {
    socket.emit('startConsulting', consultantId, async(socketData) => {
      alert(socketData.message);
      const { nickname, mode, id } = socketData.customerInfo;
      const isVoice = mode === 'Voice';
      let streamConsultant;
      try {
        setIsVoice(isVoice);
        streamConsultant = await navigator.mediaDevices
          .getUserMedia({ audio: true, video: !isVoice });
        dispatch(connectConsultantStream(streamConsultant));
      } catch (err) {
        alert(MESSAGE.REQUEST_PERMISSION);
      }

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamConsultant,
      });

      peer.on('signal', signal => {
        socket.emit('acceptCustomer', { signal, to: id });
      });
      peer.on('stream', stream => {
        const context = new AudioContext();
        const streams = [stream, streamConsultant];
        const mergedStream = mixAudio(context, streams);
        const newStream = new MediaStream();
        newStream.addTrack(mergedStream);

        const type = isVoice ? 'audio/webm' : 'video/webm';
        const mediaRecorder = new MediaRecorder(newStream, { mimeType: type });
        mediaRecorder.start(75000);
        mediaRecorder.ondataavailable = (blob) => {
          const newBlob = new Blob([blob.data]);
          saveAudio(newBlob, consultantId, nickname, false, isVoice);
        };
        dispatch(getMediaRecorder(mediaRecorder));
        dispatch(connectCustomerStream(stream));
      });
      peer.signal(socketData.customerInfo.signal);
      dispatch(getCurrentCustomer(socketData.customerInfo));
    });
  };

  const onEndConsulting = () => {
    socket.emit('endConsulting', currentCustomer.nickname, (message) => {
      alert(message);
      dispatch(initialCurrentCustomer());
    });
    mediaRecorder.stop();
    mediaRecorder.ondataavailable = (blob) => {
      const newBlob = new Blob([blob.data]);
      saveAudio(newBlob, consultantId, customerName, true, isVoice);
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
