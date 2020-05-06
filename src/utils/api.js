import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

export const logInFacebook = (auth) => {
  const { email, name, picture } = auth;
  const picture_url = picture.data.url;
  const payload = { email, name, picture_url };
  return axios({
    method: 'post',
    url: `${API}/api/users/login`,
    headers: { 'Content-Type': 'application/json' },
    data: payload
  });
};

export const getAuth = (token) => {
  return axios({
    method: 'post',
    url: `${API}/api/users/auth`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    },
  });
};

export const fetchAudio = (blob, consultantId, customerName, isFinal, isVoice, token) => {
  const formdata = new FormData();
  formdata.append('audio', blob, customerName);
  formdata.append('customer', customerName);
  formdata.append('isFinal', isFinal);
  formdata.append('isVoice', isVoice);

  return axios({
    method: 'post',
    url: `${API}/api/users/${consultantId}/consultings`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    data: formdata,
  });
};

export const fetchConsultings = (token, consultantId, customer) => {
  return axios({
    method: 'get',
    url: `${API}/api/users/${consultantId}/consultings?customer=${customer}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  });
};
