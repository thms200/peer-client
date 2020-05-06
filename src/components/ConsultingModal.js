import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiMic, FiXSquare } from 'react-icons/fi';
import { MESSAGE } from '../constants/message';

const Wrapper = styled('div')`
  position: absolute;
  left: calc(50% - 100px);
  top: 125px;
  border-radius: 10px;
  width: 600px;
  height: 620px;
  box-shadow: 0 0 10px;
  background-color: rgb(79, 91, 255);
`;

export const Close = styled('button')`
  padding-top: 8px;
  margin-left: 94%;
  border: none;
`;

const ScreenWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    color: white;
    font-size: 20px;
    font-family: 'Gamja Flower', cursive;
  }
`;

const VideoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  width: 470px;
  height: 235px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0px;
  background-color: white;
`;

export default function ConsultingModal({ onToggleConsulting }) {
  const disConnect = () => {
    onToggleConsulting();
    alert(MESSAGE.MODAL_INFO_END);
  };
  return (
    <Wrapper>
      <Close onClick={disConnect}>
        <FiXSquare size={20} color="white" />
      </Close>
      <ScreenWrapper>
        <div>Your Here</div>
        <VideoWrapper>
          <FiMic size={150} color={'rgb(79, 91, 255)'} />
        </VideoWrapper>
        <div>Customer Here</div>
        <VideoWrapper>
          <FiMic size={150} color={'rgb(79, 91, 255)'} />
        </VideoWrapper>
      </ScreenWrapper>
    </Wrapper>
  );
}

ConsultingModal.propTypes = {
  onToggleConsulting: PropTypes.func.isRequired,
};
