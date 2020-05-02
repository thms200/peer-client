import React, { useState } from 'react';
import styled from 'styled-components';
import ModeModal from '../components/ModeModal';
import ConsultingModal from '../components/ConsultingModal';
import { MESSAGE } from '../constants/message';

const Wrapper = styled('div')`
  display: flex;
  font-family: 'Gamja Flower', cursive;

  button {
    background-color: transparent;
    font-family: 'Gamja Flower', cursive;
  }

  button:focus {
    outline: none;
  }

  button:hover {
    cursor: pointer;
  }
`;

const Chatbot = styled('button')`
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  background-color: transparent;
`;

const InfoWrapper = styled('div')`
  margin: 100px 0 0 50px;
  font-family: 'PT Sans', sans-serif;
`;

const InfoRow = styled('div')`
  margin: 50px 0;
`;

const Info = styled('h3')`
  color: #888484;
  transition-duration: 2s;
`;

export default function DemoContainer() {
  const [isModeShow, setIsModeShow] = useState(false);
  const [isConsultingShow, setIsConsultingShow] = useState(false);

  const toggleSelectMode = () => setIsModeShow(!isModeShow);
  const toggleConsulting = () => setIsConsultingShow(!isConsultingShow);
  const requestConsulting = () => {
    toggleSelectMode();
    toggleConsulting();
    alert(MESSAGE.MODAL_INFO_MODE);
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <h1>체험해보세요!</h1>
        <Info>하단 오른쪽에 있는 채팅 버튼을 클릭해보세요!</Info>
        {isModeShow && <InfoRow>
          <Info>고객이 원하는 상담 모드를 선택할 수 있어요!</Info>
          <Info>Camera 혹은 Voice를 클릭해보세요!</Info>
        </InfoRow>}
        {isConsultingShow && <InfoRow>
          <Info>고객이 선택한 모드로 상담을 진행하시면됩니다!</Info>
        </InfoRow>}
      </InfoWrapper>
      <Chatbot onClick={toggleSelectMode}>
        <img
          src="https://img.icons8.com/nolan/96/chat.png"
          alt="chatBot"
        />
      </Chatbot>
      {isModeShow && <ModeModal
        onToggleSelectMode={toggleSelectMode}
        onRequestConsulting={requestConsulting}
      />}
      {isConsultingShow && <ConsultingModal
        onToggleConsulting={toggleConsulting}
      />}
    </Wrapper>
  );
}
