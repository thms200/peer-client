import React, { useState, useEffect, useRef } from 'react';
import { FaRegIdBadge, FaRegLaughWink, FaSlideshare, FaHeadset } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

export default function CameraScreen({
  onConsultant,
  offConsultant,
  onStartConsulting,
  onEndConsulting,
  consultantStream,
  customerStream,
  customers,
  customerName,
  isVoice
}) {
  const [activeOn, setActiveOn] = useState(false);
  const [activeStart, setActiveStart] = useState(false);
  const consultantRef = useRef(null);
  const customerRef = useRef(null);

  useEffect(() => {
    if (consultantRef.current) consultantRef.current.srcObject = consultantStream;
  }, [consultantStream]);

  useEffect(() => {
    if (customerRef.current) customerRef.current.srcObject = customerStream;
  }, [customerStream]);

  const handleOnConsultant = () => {
    if (activeOn) return alert(alertMsg.alreadyOn);
    setActiveOn(true);
    onConsultant();
  };

  const handleOffConsultant = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (activeStart) return alert(alertMsg.invalidOff);
    setActiveOn(false);
    offConsultant();
  };

  const handleStartConsulting = async() => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (activeStart) return alert(alertMsg.alreadyStart);
    if (!customers) return alert(alertMsg.noCustomer);
    setActiveStart(true);
    onStartConsulting();
  };

  const handleEndConsulting = () => {
    if (!activeOn) return alert(alertMsg.invalidOn);
    if (!activeStart) return alert(alertMsg.invalidStart);
    setActiveStart(false);
    onEndConsulting();
  };

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
        {customerName
          ? <H1Text><FaRegLaughWink size={20} /> {customerName}님</H1Text>
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
          <Button activeOn={activeOn} onClick={handleOnConsultant}>On</Button>
          <Button onClick={handleOffConsultant}>Off</Button>
        </div>
        <div>
          <Button activeStart={activeStart} onClick={handleStartConsulting}>Start</Button>
          <Button onClick={handleEndConsulting}>End</Button>
        </div>
      </ButtonWrapper>
    </Section>
  );
}

CameraScreen.prototype = {
  onConsultant: PropTypes.func.isRequired,
  offConsultant: PropTypes.func.isRequired,
  onStartConsulting: PropTypes.func.isRequired,
  onEndConsulting: PropTypes.func.isRequired,
  consultantStream: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  customerStream: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  customers: PropTypes.array.isRequired,
  customerName: PropTypes.string.isRequired,
  isVoice: PropTypes.bool.isRequired,
};
