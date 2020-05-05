import React from 'react';
import { shallow } from 'enzyme';
import CameraScreen, { Button } from './CameraScreen';

const consultantStream = {
  active: true,
  id: '3kl3jk1293'
};

const customerStream = {
  acitve: false,
  id: 'alek1j234'
};

describe('<CameraScreen>', () => {
  const cameraScreen = shallow(
    <CameraScreen
      onConsultant={jest.fn()}
      offConsultant={jest.fn()}
      onStartConsulting={jest.fn()}
      onEndConsulting={jest.fn()}
      consultantStream={consultantStream}
      customerStream={customerStream}
      consultantName="minsun"
      customers={[]}
      customerName=""
      isVoice={true}
    />
  );
  describe('should alert with a suitable message if on/off/start/end button', () => {
    afterEach(() => {
      window.alert.mockClear();
      cameraScreen.find(Button).at(1).simulate('click');
    });
    window.alert = jest.fn();

    it('case1) off, start, end', () => {
      cameraScreen.find(Button).at(1).simulate('click');
      expect(window.alert).toBeCalledWith('On 버튼을 눌러 상담 모드를 진행해주세요.');

      cameraScreen.find(Button).at(2).simulate('click');
      expect(window.alert).toBeCalledWith('On 버튼을 눌러 상담 모드를 진행해주세요.');

      cameraScreen.find(Button).at(3).simulate('click');
      expect(window.alert).toBeCalledWith('On 버튼을 눌러 상담 모드를 진행해주세요.');
    });

    it('case2) on -> start', () => {
      cameraScreen.find(Button).at(0).simulate('click');
      cameraScreen.find(Button).at(2).simulate('click');
      expect(window.alert).toBeCalledWith('대기 중인 고객이 없습니다.');
    });
    
    it('case3) on -> on', () => {
      cameraScreen.find(Button).at(0).simulate('click');
      cameraScreen.find(Button).at(0).simulate('click');
      expect(window.alert).toBeCalledWith('이미 상담 모드입니다. 상담 모드를 종료 하시려면 Off 버튼을 클릭하세요.');
    });

    it('case4) on -> end', () => {
      cameraScreen.find(Button).at(0).simulate('click');
      cameraScreen.find(Button).at(3).simulate('click');
      expect(window.alert).toBeCalledWith('상담이 시작되지 않았습니다. Start 버튼을 눌러 상담을 시작하세요.');
    });
  });
});
