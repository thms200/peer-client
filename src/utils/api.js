import axios from 'axios';
import { loginUser, setLoading } from '../actions';
import { message } from '../constants/message';

export const logInFacebook = async(dispatch, response) => {
  try {
    const { email, name, picture } = response;
    const picture_url = picture.data.url;
    const payload = { email, name, picture_url };

    return await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/users/login`,
      headers: { 'Content-Type': 'application/json' },
      data: payload
    })
      .then(async(res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
        localStorage.setItem('x-access-token', `Bearer ${data.token}`);
        dispatch(loginUser(data.userInfo));
        dispatch(setLoading(false));
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};

export const getAuth = async(dispatch, history) => {
  try {
    const currentToken = localStorage.getItem('x-access-token');
    if (!currentToken) return;
    return await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/users/auth`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${currentToken}`,
      },
    })
      .then(async(res) => {
        const { data } = res;
        if (data.result === 'ng') {
          localStorage.removeItem('x-access-token');
          return alert(data.errMessage);
        }
        dispatch(loginUser(data.userInfo));
        history.replace({ pathname: '/' });
      });
  } catch (err) {
    console.warn(err);
  }
};

export const saveAudio = async(blob, consultantId, customerName, isFinal) => {
  try {
    const token = localStorage.getItem('x-access-token');
    const formdata = new FormData();
    formdata.append('audio', blob, customerName);
    formdata.append('isFinal', isFinal);
    formdata.append('customer', customerName);

    return await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/users/${consultantId}/consultings`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      data: formdata,
    })
      .then((res) => {
        const { data } = res;
        if (data.result === 'ng') return alert(data.errMessage);
      });
  } catch(err) {
    alert(message.invalidSave);
    console.warn(err);
  }
};
