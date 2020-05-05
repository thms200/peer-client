import React from 'react';
import { mount } from 'enzyme';
import Aside from './Aside';

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
    const asideMain = mount(
      <Aside
        customers={mockCustomerHistory}
        onClick={() => {}}
        page="home"
        title="History"
        consultant="consultantOne"
      />
    );

    it('should be a suitable message on the main container.', () => {
      expect(asideMain.find('h2').text()).toBe('History');
      expect(asideMain.find('[className="sc-AxhUy gafbfX"]').text()).toBe('Select your custmer!');
    });

    it('should show all button if cusotmer name click', () => {
      expect(asideMain.find('[className="sc-AxgMl kyXOZM"]').length).toBe(0);

      asideMain.find('[className="sc-AxirZ greCUl"]').at(0).simulate('click');
      expect(asideMain.find('[className="sc-AxgMl kyXOZM"]').length).toBe(1);
      expect(asideMain.find('[className="sc-AxgMl kyXOZM"]').text()).toBe('all');
    });
  });

  describe('<Case ConsultingContainer>', () => {
    const asideConsulting = mount(
      <Aside
        customers={mockWaitingCustomers}
        page="consulting"
        title="Waiting Customer"
      />
    );

    it('should be a suitable message on the consulting container.', () => {
      expect(asideConsulting.find('h2').text()).toBe('Waiting Customer');
      expect(asideConsulting.find('[className="sc-AxhUy gafbfX"]').text())
        .toBe('The customer is waiting for you!');
    });
  });
});
