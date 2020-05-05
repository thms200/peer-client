import React from 'react';
import { shallow } from 'enzyme';
import ConsultingModal, { Close } from './ConsultingModal';

describe('<ConsultingModal>', () => {
  afterEach(() => {
    window.alert.mockClear();
  });
  window.alert = jest.fn();
  const consultingModal = shallow(
    <ConsultingModal onToggleConsulting={jest.fn()}/>
  );

  it('', () => {
    consultingModal.find(Close).simulate('click');
    expect(window.alert).toBeCalledWith('상담 완료 후 종료하면 상담연결도 함께 종료됩니다.');
  });
});
