import { getHistoryCustomers, makeCode } from './index';

const mockData = [
  {
    audio: 'https://test.com/mockdata_1588242957683',
    email: 'test@mock.com',
    isVoice: true,
    name: 'code',
    timestamp: 1588242957683,
  },
  {
    audio: 'https://test.com/mockdata_1589242957683',
    email: 'minsun@mock.com',
    isVoice: true,
    name: 'minsun',
    timestamp: 1589242957683,
  },
  {
    audio: 'https://test.com/mockdata_1586242957683',
    email: 'ken@mock.com',
    isVoice: true,
    name: 'ken',
    timestamp: 1586242957683,
  },
];

describe('<Util Index>', () => {
  describe('<function getHistoryCustomers>', () => {
    it('should get a list of customers in the order you consulted.', () => {
      const result = getHistoryCustomers(mockData);
      expect(result[0].nickname).toEqual('ken');
      expect(result[1].nickname).toEqual('code');
      expect(result[2].nickname).toEqual('minsun');
    });
  });

  describe('<function makeCode>', () => {
    it('should be created code with entered consultantId and consultantName .', () => {
      const result = makeCode('123asdf', 'minsun');
      const consultantId = result.split('<div class="consultant-id" id="')[1].split('"></div>')[0];
      const consultantName = result.split('<div class="consultant-name" id="')[1].split('"></div>')[0];

      expect(consultantId).toEqual('123asdf');
      expect(consultantName).toEqual('minsun');
    });
  });
});

