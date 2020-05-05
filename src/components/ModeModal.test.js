import React from 'react';
import { shallow } from 'enzyme';
import ModeModal, { CloseButton } from './ModeModal';

describe('<ConsultingModal>', () => {
  afterEach(() => {
    window.alert.mockClear();
  });
  window.alert = jest.fn();
  const mockToggleSelectMode = jest.fn();
  const mockRequestConsulting = jest.fn();
  const modeModal = shallow(
    <ModeModal
      onToggleSelectMode={mockToggleSelectMode}
      onRequestConsulting={mockRequestConsulting}
    />
  );

  it('should execute onToggleSelectMode function if close button is clicked', () => {
    expect(mockToggleSelectMode.mock.calls.length).toBe(0);
    modeModal.find(CloseButton).simulate('click');
    expect(mockToggleSelectMode.mock.calls.length).toBe(1);
  });

  it('should alert with a comment about checking customer name and email', () => {
    modeModal.find('button').at(0).simulate('click', { preventDefault: () => {} });
    expect(window.alert).toBeCalledWith('고객이 입력한 이름과 이메일이 유효한지 확인합니다.');
  });

  it('should alert with a comment about checking customer name and email', () => {
    expect(mockRequestConsulting.mock.calls.length).toBe(0);
    modeModal.find('button').at(1).simulate('click');
    expect(mockRequestConsulting.mock.calls.length).toBe(1);
  });
});
