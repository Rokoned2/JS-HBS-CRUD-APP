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
    // return { error: err.response.data.message || err.message };
  }
};


export const createUser = async (user) => {
  console.log('createUser', user)
  try {
    console.log('it tries')
    const response = await axios({
      url: `${apiUrl}/api/users`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`,
      },
      data: user,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    // console.log('response createUser', response)
    // return response;
  } catch (err) {
    console.log(err)
    // return { error: err.response.data.message || err.message };
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/${userId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response;
  } catch (err) {
        console.log(err);
    // return { error: err.response.data.message || err.message };
  }
};
