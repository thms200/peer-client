import React from 'react';
import { shallow } from 'enzyme';
import Header, { HeaderLi } from './Header';

const userInfo = {
  picture: 'https://www.test.com',
};

describe('<Header>', () => {
  const header = shallow(<Header onClick={jest.fn()} userInfo={userInfo} />);
  it('should render five menus with link in header', () => {
    expect(header.find(HeaderLi).at(0).at(0).props().children.props.to).toEqual('/');
    expect(header.find(HeaderLi).at(1).at(0).props().children.props.to).toEqual('/consulting');
    expect(header.find(HeaderLi).at(2).at(0).props().children.props.to).toEqual('/install');
    expect(header.find(HeaderLi).at(3).at(0).props().children.props.to).toEqual('/demo');
  });

  it('should render user picutre in header', () => {
    expect(header.find(HeaderLi).at(5).at(0).props().children.props.src).toEqual('https://www.test.com');
  });
});
