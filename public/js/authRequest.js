/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const pending = new Map();

const authRequest = async (method, route, data) => {
  try {
    const key = `${method}:${route}`;
    if (pending.has(key)) return pending.get(key);

    const resOptions = {
      method,
      url: `/api/v1/users/${route}`,
    };

    if (data && method !== 'GET') {
      resOptions.data = data;
    }

    const req = axios(resOptions);
    pending.set(key, req);
    const res = await req;
    pending.delete(key);

    return res;
  } catch (err) {
    const key = `${method}:${route}`;
    pending.delete(key);
    const message =
      err.response?.data?.message || 'Something went wrong. Please try again.';
    showAlert('error', message);
    return null;
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

  if (res?.data?.status === 'success') {
    alertRedirect('Logged in successfully!');
  }
};

export const signUp = async (name, email, password, confirmPassword) => {
  const res = await authRequest('POST', 'signup', {
    name,
    email,
    password,
    passwordConfirm: confirmPassword,
  });

  if (res?.data?.status === 'success') {
    alertRedirect('Signed up successfully!');
  }
};

export const logout = async () => {
  const res = await authRequest('GET', 'logout', 'Logout successfully!');

  if (res?.data?.status === 'success') {
    location.reload(true);
  }
};
