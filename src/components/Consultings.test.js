import React from 'react';
import { shallow } from 'enzyme';
import Consultings, { Loading, ConsultingBoxName, ConsultingBoxIcon } from './Consultings';

const mockData = [
  {
    audio: 'https://vanilla.com/test123',
    email: '123@naver.com',
    isVoice: true,
    name: 'ken',
    timestamp: 1588242957683,
  },
  {
    audio: 'https://vanilla.com/test456',
    email: 'yellow@gmail.com',
    isVoice: false,
    name: 'hoho',
    timestamp: 1588243837606,
  }
];

describe('<Consultings>', () => {
  it('should render if isLoading is true', () => {
    const consultings = shallow(<Consultings consultings={[]} isLoading={true} />);
    expect(consultings.find(Loading).text()).toEqual('Loading...');
  });
  
  const consultings = shallow(<Consultings consultings={mockData} isLoading={false} />);
  it('should render information realated to consultigns list', () => {
    expect(consultings.find(ConsultingBoxName).at(0).text()).toEqual('ken');
    expect(consultings.find(ConsultingBoxName).at(1).text()).toEqual('hoho');
  });

  it('should render according to selected consulting mode', () => {
    expect(consultings.find(ConsultingBoxIcon).at(0).text()).toEqual('<FaMicrophone />');
    expect(consultings.find(ConsultingBoxIcon).at(1).text()).toEqual('<FaCamera />');
  });
});
