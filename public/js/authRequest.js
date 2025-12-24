/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const authRequest = async (method, route, data) => {
  try {
    const resOptions = {
      method,
      url: `/api/v1/users/${route}`,
    };

    if (data && method !== 'GET') {
      resOptions.data = data;
    }

    const res = await axios(resOptions);

    return res;
  } catch (err) {
    const message =
      err.response?.data?.message || 'Something went wrong. Please try again.';
    showAlert('error', message);
  }
};

const alertRedirect = (successMessage) => {
  showAlert('success', successMessage);
  window.setTimeout(() => {
    location.assign('/');
  }, 1500);
};

export const login = async (email, password) => {
  const res = await authRequest('POST', 'login', {
    email,
    password,
  });

  if (res.data.status === 'success') {
    alertRedirect('Logged in successfully!');
  }
};

export const signUp = async (name, email, password, confirmPassword) => {
  const res = await authRequest('POST', 'signup', {
    name,
    email,
    password,
    confirmPassword,
  });

  if (res.data.status === 'success') {
    alertRedirect('Signed up successfully!');
  }
};

export const logout = async () => {
  const res = await authRequest('GET', 'logout', 'Logout successfully!');

  if (res.data.status === 'success') {
    location.reload(true);
  }
};
