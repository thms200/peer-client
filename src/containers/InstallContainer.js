import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { makeCode } from '../utils';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 91vh;
  align-items: center;
`;

const TitleWrapper = styled('div')`
  margin-top: 12%;
  text-align: center;
`;

const CodeWrapper = styled('div')`
  width: 50%;
  height: 30%;
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
  const code = makeCode(consultantId, consultantName);

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>이제 사이트에 상담 버튼만 설치하면,</h1>
        <h1>고객들과 쉽게 상담을 시작할 수 있습니다.</h1>
      </TitleWrapper>
      <InstallInfo>
        코드를 홈페이지의  &lt;body&gt; 태그에 복사/붙여넣기 하시면 설치가 완료됩니다.
      </InstallInfo>
      <CodeWrapper>
        <pre>{code}</pre>
      </CodeWrapper>
      <InstallInfo>
        &lt;div&gt;태그 2줄과 &lt;script&gt; 태그를 운영하고 계신 홈페이지 &lt;body&gt; 태그 안에 입력하세요!
      </InstallInfo>
    </Wrapper>
  );
}
