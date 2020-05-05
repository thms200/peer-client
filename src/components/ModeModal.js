import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FiVideo, FiMic, FiXSquare } from 'react-icons/fi';
import { MESSAGE } from '../constants/message';

const ModalWrapper = styled('div')`
  position: absolute;
  right: 0;
  bottom: 100px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 300px;
  box-shadow: 0 0 10px;
  background-color: rgb(79, 91, 255);
`;

export const CloseButton = styled('button')`
  float: right;
  border: none;
`;

const Row = styled('div')`
  margin: 18px 10px;
`;

const Header = styled(Row)`
  color: white;
  font-size: 25px;
`;

const Section = styled(Row)`
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0px;
  font-size: 22px;
  background-color: white;

  div {
    margin: 4px;
  }
  label {
    display: inline-block;
    width: 75px;
    margin: 2px;
  }
  input, button {
    border: 1px solid #bfbdbd;
    border-radius: 7px;
    margin: 2px;
    padding-left: 7px;
    line-height: 22px;
    box-shadow: 2px 2px 0px 0px #717070;
    font-size: 20px;
  }
  input {
    width: 159px;
  }
  input::placeholder {
    font-size: 15px;
    font-style: italic;
    font-family: 'Gamja Flower', cursive;
  }
  button {
    width: 250px;
  }
`;

const Footer = styled(Row)`
  display: flex;
  justify-content: center;

  div, button {
    color: white;
    font-size: 25px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 3px;
    padding: 2px;
    border: 1px solid white;
    border-radius: 8px;
    width: 150px;
    box-shadow: 2px 2px 0px 0px white;
  }
  button {
    border: none;
  }
`;
export default function ModeModal({ onToggleSelectMode, onRequestConsulting }) {
  const onClickName = (e) => {
    e.preventDefault();
    alert(MESSAGE.MODAL_INFO_NAME);
  };

  return (
    <ModalWrapper>
      <CloseButton onClick={onToggleSelectMode}>
        <FiXSquare size={20} color={'white'} />
      </CloseButton>
      <Header>
        <div>상담 품질 향상을 위해,</div>
        <div>모든 상담은 녹음(녹화)됩니다.</div>
      </Header>
      <Section>
        <form>
          <div>
            <label>Nickname</label>
            <input
              name="nickname"
              placeholder="Write your nickname."
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              placeholder="Write your email."
            />
          </div>
          <button onClick={onClickName}>Check</button>
        </form>
      </Section>
      <Footer>
        <div>
          <FiVideo />
          <button onClick={onRequestConsulting}>Camera</button>
        </div>
        <div>
          <FiMic />
          <button onClick={onRequestConsulting}>Voice</button>
        </div>
      </Footer>
    </ModalWrapper>
  );
}

ModeModal.propTypes = {
  onToggleSelectMode: PropTypes.func.isRequired,
  onRequestConsulting: PropTypes.func.isRequired,
};
