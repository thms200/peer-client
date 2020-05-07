import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaRegIdBadge, FaRegLaughWink, FaSlideshare, FaHeadset } from 'react-icons/fa';
import { MESSAGE } from '../constants/message';

const Section = styled('section')`
  display: flex;
  justify-content: space-around;
  width: 85%;
  height: 86vh;
  margin-top: 9vh;
  margin-left: 200px;
  padding: 20px;
  border-left: 1px solid #c1c0c0;
`;

const SreenWrapper = styled('div')`
  margin: 5px;
`;

const VideoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 281px;
  margin: 8px;
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
  border-radius: 5px;
`;

const ButtonWrapper = styled('div')`
  text-align: center;
`;

export const Button = styled('button')`
  width: 100px;
  margin: 5px;
  border-radius: 10px;
  border-style: none;
  color: white;
  box-shadow: 2px 2px 5px 0px black;
  background-color: ${props => {
    if (props.activeOn || props.activeStart) return '#202020';
    else return '#7b7979';
  }};
  &:hover {
    cursor: pointer;
    background-color: #202020;
    text-decoration: underline;
  }
`;

const H3Text = styled('h3')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 4px;
  text-align: center;
`;

export default function CameraScreen({
  onConsultant,
  offConsultant,
  onStartConsulting,
  onEndConsulting,
  consultantStream,
  customerStream,
  consultantName,
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
    if (activeOn) return alert(MESSAGE.ALREADY_ON);
    setActiveOn(true);
    onConsultant();
  };

  const handleOffConsultant = () => {
    if (!activeOn) return alert(MESSAGE.INVALID_ON);
    if (activeStart) return alert(MESSAGE.INVALID_OFF);
    setActiveOn(false);
    offConsultant();
  };

  const handleStartConsulting = async() => {
    if (!activeOn) return alert(MESSAGE.INVALID_ON);
    if (activeStart) return alert(MESSAGE.INVALID_START);
    if (!customers || !customers.length) return alert(MESSAGE.NO_CUSTOMER);
    setActiveStart(true);
    onStartConsulting();
  };

  const handleEndConsulting = () => {
    if (!activeOn) return alert(MESSAGE.INVALID_ON);
    if (!activeStart) return alert(MESSAGE.INVALID_START);
    setActiveStart(false);
    onEndConsulting();
  };

  return (
    <Section>
      <ButtonWrapper>
        <Button activeOn={activeOn} onClick={handleOnConsultant}>On</Button>
        <Button onClick={handleOffConsultant}>Off</Button>
      </ButtonWrapper>
      <div>
        <SreenWrapper>
          <H3Text>
            <FaRegIdBadge size={21} style={{ margin: '5px' }} />
            {consultantName}
          </H3Text>
          <VideoWrapper>
            {isVoice && <FaHeadset size={150} />}
            <Video
              playsInline
              autoPlay
              muted
              ref={consultantRef}
              isVoice={isVoice}
            />
          </VideoWrapper>
        </SreenWrapper>
        <SreenWrapper>
          {customerName
            ? (<H3Text>
              <FaRegLaughWink size={20} style={{ margin: '5px' }} />
              {customerName}
            </H3Text>
            ) : (<H3Text>
              <FaSlideshare size={20} style={{ margin: '5px' }} />
              상담을 시작하세요.
            </H3Text>
            )
          }
          <VideoWrapper>
            {isVoice && <FaHeadset size={150} />}
            <Video
              playsInline
              autoPlay
              ref={customerRef}
              isVoice={isVoice}
            />
          </VideoWrapper>
        </SreenWrapper>
      </div>
      <ButtonWrapper>
        <Button activeStart={activeStart} onClick={handleStartConsulting}>Start</Button>
        <Button onClick={handleEndConsulting}>End</Button>
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
  consultantName: PropTypes.string.isRequired,
  customers: PropTypes.array.isRequired,
  customerName: PropTypes.string.isRequired,
  isVoice: PropTypes.bool.isRequired,
};
