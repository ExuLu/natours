import axios from 'axios';
import { showAlert } from './alerts';
/* eslint-disable */
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    const message =
      err.response?.data?.message || 'Something went wrong. Please try again.';
    showAlert('error', message);
  }
};
