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
        localStorage.setItem('token', data.token);
        dispatch(loginUser(data.userInfo));
        dispatch(setLoading(false));
      });
  } catch (err) {
    alert(message.invalidLogin);
    console.warn(err);
  }
};
