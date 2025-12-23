/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const authRequest = async (method, route, successMessage, data) => {
  try {
    const resOptions = {
      method,
      url: `http://localhost:3000/api/v1/users/${route}`,
    };

    if (data) {
      resOptions.data = data;
    }

    const res = await axios(resOptions);

    if (res.data.status === 'success') {
      showAlert('success', successMessage);
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

export const login = async (email, password) => {
  await authRequest('POST', 'login', 'Logged in successfully!', {
    email,
    password,
  });
};

export const signUp = async (name, email, password, confirmPassword) => {
  await authRequest('POST', 'signup', 'Signed up successfully!', {
    name,
    email,
    password,
    confirmPassword,
  });
};

export const logout = async () => {
  await authRequest('GET', 'logout', 'Logout successfully!');
};
