import axios from 'axios';
import { apiUrl } from './config';
// import { getUserInfo } from './localStorage';

export const getUsers = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
