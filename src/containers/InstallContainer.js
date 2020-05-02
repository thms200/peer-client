import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Code from '../components/Code';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 91vh;
  align-items: center;
`;

const InstallTitleWrapper = styled('div')`
  margin-top: 10%;
  text-align: center;
`;

const InstallTitle = styled('h1')`
`;

const CodeWrapper = styled('div')`
  width: 50%;
  height: 38%;
  border-radius: 10px;
  border: 1px solid grey;
  overflow: scroll;
  background-color: white;
`;

const InstallInfo = styled('div')`
  margin: 10px;
  color: #b9b5b5;
`;

export default function InstallContainer() {
  const consultantId = useSelector(({ user: { userInfo: { id } } }) => id);
  const consultantName = useSelector(({ user: { userInfo: { name } } }) => name);
  return (
    <Wrapper>
      <InstallTitleWrapper>
        <InstallTitle>이제 사이트에 상담 버튼만 설치하면,</InstallTitle>
        <InstallTitle>고객들과 쉽게 상담을 시작할 수 있습니다.</InstallTitle>
      </InstallTitleWrapper>
      <CodeWrapper>
        <Code consultantId={consultantId} consultantName={consultantName}/>
      </CodeWrapper>
      <InstallInfo>코드를 홈페이지의  &lt;head&gt; 태그와 &lt;body&gt; 태그에 복붙하시면 설치가 완료됩니다.</InstallInfo>
    </Wrapper>
  );
}
