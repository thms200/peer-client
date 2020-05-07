import React from 'react';
import { shallow } from 'enzyme';
import Aside, { AsideH2, CustomerBox, InfoDiv, AllButton } from './Aside';

const mockWaitingCustomers = [
  {
    nickname: 'minsun',
    mode: 'Voice',
    consultant: 'consultantOne',
    signal: { type: 'offer', sdp: 'ake937ska' },
    id: 'selrjl209384',
  },
  {
    nickname: 'davin',
    mode: 'Voice',
    consultant: 'consultantTwo',
    signal: { type: 'offer', sdp: 'aek1029zk' },
    id: 'kekae0193sk',
  }
];

const mockCustomerHistory = [
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
    isVoice: true,
    name: 'hoho',
    timestamp: 1588243837606,
  }
];

describe('<Aside>', () => {
  describe('<Case MainContainer>', () => {
    const asideMain = shallow(
      <Aside
        customers={mockCustomerHistory}
        onClick={() => {}}
        page="home"
        title="History"
        consultant="consultantOne"
      />
    );

    it('should be a suitable message on the main container.', () => {
      expect(asideMain.find(AsideH2).text()).toEqual('History');
      expect(asideMain.find(InfoDiv).text()).toEqual('Select your custmer!');
    });

    it('should show all button if cusotmer name click', () => {
      expect(asideMain.find(AllButton).length).toBe(0);

      asideMain.find(CustomerBox).at(0).simulate('click', { currentTarget: 'test' });
      expect(asideMain.find(AllButton).length).toBe(1);
      expect(asideMain.find(AllButton).text()).toBe('all');
    });
  });

  describe('<Case ConsultingContainer>', () => {
    const asideConsulting = shallow(
      <Aside
        customers={mockWaitingCustomers}
        page="consulting"
        title="Waiting Customer"
      />
    );

    it('should be a suitable message on the consulting container.', () => {
      expect(asideConsulting.find(AsideH2).text()).toBe('Waiting Customer');
      expect(asideConsulting.find(InfoDiv).text()).toBe('The customer is waiting for you!');
    });
  });
});
