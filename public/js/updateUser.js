import axios from 'axios';
import { showAlert } from './alerts';

export const updateUserData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMe',
      data: { name, email },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateUserPassword = async (
  currentPassword,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMyPassword',
      data: { currentPassword, password, passwordConfirm },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
