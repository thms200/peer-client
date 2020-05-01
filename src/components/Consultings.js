import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCamera, FaMicrophone } from 'react-icons/fa';

const Wrapper = styled('section')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
  height: 100%;
  margin-top: 9vh;
  padding: 1vh 6vh;
`;

const ConsultingsBoxWrapper = styled('ul')`
  width: 40%;
  height: 20%;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 0.8px solid grey;
  list-style: none;
  box-shadow: 2px 2px 5px 0px black;
`;

const ConsultingsBox = styled('li')`
  color: #b0a9a9;
  font-size: 15px;

  ${props => {
    if (props.name) {
      return '&{ display: flex; justify-content: space-between; align-items: baseline;}';
    }
  }}
`;

const ConsultingBoxName = styled('div')`
  color: rgb(105, 115, 251);
  font-size: 35px;
`;

const Audio = styled('audio')`
  width: 100%;
  height: 30px;
  margin-top: 8px;
  &:focus {
    outline: none;
  }
`;

const makeConsultingMode = (isVoice) => {
  return isVoice
    ? <FaMicrophone color={'rgb(105, 115, 251)'} size={25} />
    : <FaCamera color={'rgb(105, 115, 251)'} size={25} />;
};

export default function Consultings({ consultings }) {
  return (
    <Wrapper>
      {consultings && consultings.map((consulting) => {
        const { name, email, timestamp, audio, isVoice } = consulting;
        const date = new Date(timestamp).toString().split('GMT')[0].trim();
        return (
          <ConsultingsBoxWrapper key={timestamp}>
            <ConsultingsBox name={name}>
              <ConsultingBoxName>{name}</ConsultingBoxName>
              {makeConsultingMode(isVoice)}
            </ConsultingsBox>
            <ConsultingsBox>{email}</ConsultingsBox>
            <ConsultingsBox>{date}</ConsultingsBox>
            <ConsultingsBox>{isVoice}</ConsultingsBox>
            <Audio src={audio} controls />
          </ConsultingsBoxWrapper>
        );
      })}
    </Wrapper>
  );
}

Consultings.prototype = {
  consultings: PropTypes.array.isRequired,
};

