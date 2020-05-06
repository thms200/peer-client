import io from 'socket.io-client';
import Peer from 'simple-peer';

describe('<cypress>', () => {
  const payload = {
    email: 'thms200@naver.com',
    name: 'MinSun Cho',
    picture_rul: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2884771511592362&height=50&width=50&ext=1590251250&hash=AeS-OUXOW9vbeH7b',
  };
  let socket;
  let peer;
  before(() => {
    cy.clearLocalStorage();
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/users/login',
      followRedirect: false,
      failOnStatusCode: false,
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('x-access-token', `Bearer ${res.body.token}`);
      });
    cy.visit('https://localhost:3000/');
  });
  after(() => {
    socket = null;
    peer = null;
  });

  it('<Home> ① Load home page, ② Select customer, ③ Click all button, ④ Reload home page', () => {
    cy.wait(1000);
    cy
      .get('aside div')
      .contains('hoho')
      .click();
    cy
      .get('section ul')
      .should('have.length', 2);

    cy.wait(1000);
    cy
      .get('aside button')
      .contains('all')
      .click();

    cy.wait(1000);
    cy
      .get('aside div')
      .should(($div) => {
        expect($div.eq(1)).to.contain('Select your custmer!');
      });
  });

  async function fakePeer() {
    let message;
    const customerStream = await navigator.mediaDevices.getUserMedia({
      video: false, audio: true
    });
    const newPeer = new Peer({
      initiator: true,
      trickle: false,
      stream: customerStream,
    });
    let isFirstSignal = true;
    const newSocket = io('http://localhost:5000');
    socket = newSocket;
    peer = newPeer;
    newPeer.on('signal', data => {
      if (isFirstSignal) {
        newSocket.emit(
          'joinCustomer',
          { nickname: 'minsun', mode: 'Voice', consultant: '5ea1c1f4e4bf16071b0640e9', signal: data },
          (serverMsg) => {
            message = serverMsg;
            isFirstSignal = false;
          });
      }
    });
    return message;
  }

  it('<Consulting> ① Load Consulting page, ② Click On button, ③ Connect fake customer ④ Click Start/End/Off button', () => {
    const message = [];
    cy.on('window:alert', (str) => {
      message.push(str);
    });
    cy.wait(1000);
    cy
      .get('header nav li')
      .contains('Consulting')
      .click();

    fakePeer();
    cy.wait(1000);
    cy
      .get('section button')
      .contains('On')
      .click()
      .then(() => {
        cy.wait(1000);
        cy
          .get('aside div')
          .should(($div) => {
            expect($div.eq(2)).to.contain('minsun');
          });
      });
    
    cy.wait(1000);
    cy
      .get('section button')
      .contains('Start')
      .click()
      .then(() => {
        cy.wait(1000);
        cy
          .get('section h3')
          .should(($h3) => {
            expect($h3.eq(1)).to.contain('minsun');
          });
      });

    cy.wait(1000);
    cy
      .get('section button')
      .contains('End')
      .click()
      .then(() => {
        cy.wait(1000);
        cy
          .get('section h3')
          .should(($h3) => {
            expect($h3.eq(1)).to.contain('상담을 시작하세요.');
          });
      });

    cy.wait(1000);
    cy
      .get('section button')
      .contains('Off')
      .click()
      .then(() => {
        socket.disconnect();
        peer.destroy();
        expect(message[0]).to.contain('상담모드가 시작되었습니다. Start를 누르시면 상담이 시작됩니다.');
        expect(message[1]).to.contain('minsun님과 연결되었습니다.');
        expect(message[2]).to.contain('minsun님과의 상담이 종료되었습니다. 다음 상담을 진행하시려면 Start를 클릭하세요.');
        expect(message[4]).to.contain('상담 모드가 종료되었습니다. on 버튼을 누르시면 다시 상담 모드가 됩니다.');
      });
  });

  it('<Install>', () => {
    cy.wait(1000);
    cy
      .get('header nav li')
      .contains('Install')
      .click();
    cy
      .get('div h1')
      .should(($h1) => {
        expect($h1.eq(1)).to.contain('이제 사이트에 상담 버튼만 설치하면,');
        expect($h1.eq(2)).to.contain('고객들과 쉽게 상담을 시작할 수 있습니다.');
      });
  });

  it('<Demo> ① Load Demo page, ② Click chatbot, ③ Click check and consultant mode ④ Click close button', () => {
    const message = [];
    cy.on('window:alert', (str) => {
      message.push(str);
    });
    cy.wait(1000);
    cy
      .get('header nav li')
      .contains('Demo')
      .click();

    cy.wait(1000);
    cy
      .get('img')
      .eq(2)
      .click();
    cy
      .get('h3')
      .should(($h3) => {
        expect($h3.eq(1)).to.contain('고객이 원하는 상담 모드를 선택할 수 있어요!');
        expect($h3.eq(2)).to.contain('Camera 혹은 Voice를 클릭해보세요!');
      });

    cy.wait(1000);
    cy
      .get('button')
      .contains('Check')
      .click();

    cy.wait(1000);
    cy
      .get('button')
      .contains('Voice')
      .click();
    cy
      .get('h3')
      .should(($h3) => {
        expect($h3.eq(1)).to.contain('고객이 선택한 모드로 상담을 진행하시면됩니다!');
      });

    cy.wait(1000);
    cy
      .get('div div button')
      .eq(2)
      .click()
      .then(() => {
        console.log(message);
        expect(message[0]).to.contain('고객이 입력한 이름과 이메일이 유효한지 확인합니다.');
        expect(message[1]).to.contain('고객이 원하는 상담 모드에 맞춰 상담이 연결됩니다.');
        expect(message[2]).to.contain('상담 완료 후 종료하면 상담연결도 함께 종료됩니다.');
      });
  });

  it('<Logout>', () => {
    cy.wait(1000);
    cy
      .get('header nav li')
      .contains('Logout')
      .click();
  });
});
