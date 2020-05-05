import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCamera, FaMicrophone } from 'react-icons/fa';

const Wrapper = styled('section')`
  width: 85%;
  height: 91vh;
  margin-top: 9vh;
`;

export const Loading = styled('div')`
  width: 85%;
  height: 91vh;
  margin-top: 9vh;
  line-height: 90vh;
  font-size: 30px;
  text-align: center;
`;

const FlexWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const ConsultingsBoxWrapper = styled('ul')`
  width: 28%;
  height: 170px;
  margin: 20px calc(16% / 6);
  padding: 10px;
  border-radius: 10px;
  border: 0.8px solid grey;
  box-sizing: border-box;
  list-style: none;
  box-shadow: 2px 2px 5px 0px black;
  background-color: white;
`;

const ConsultingsBox = styled('li')`
  color: #b0a9a9;
  font-size: 15px;
  margin: 5px;

  ${props => {
    if (props.name) {
      return '&{ display: flex; justify-content: space-between; align-items: baseline;}';
    }
  }}
`;

export const ConsultingBoxName = styled('div')`
  color: black;
  font-size: 28px;
`;

export const ConsultingBoxIcon = styled('div')`
  width: 20px;
  height: 25%;
  border-radius: 50%;
  padding: 5px;
  text-align: center;
  line-height: 20%;
  background-color: #4c4848;
`;

const Audio = styled('audio')`
  width: 100%;
  height: 30px;
  margin-top: 15px;
  &:focus {
    outline: none;
  }
`;

const makeConsultingMode = (isVoice) => {
  return isVoice
    ? <ConsultingBoxIcon><FaMicrophone size={18} color="white" /></ConsultingBoxIcon>
    : <ConsultingBoxIcon><FaCamera size={18} color="white" /></ConsultingBoxIcon>;
};

export default function Consultings({ consultings, isLoading }) {
  if (isLoading) {
    return (
      <Loading>
        Loading...
      </Loading>
    );
  }
  return (
    <Wrapper>
      <FlexWrapper>
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
      </FlexWrapper>
    </Wrapper>
  );
}

Consultings.prototype = {
  consultings: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

