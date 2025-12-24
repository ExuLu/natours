import axios from 'axios';
import { showAlert } from './alerts';

const updateUser = async (route, data, successMessage) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${route}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', successMessage);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateUserData = async (name, email) => {
  await updateUser('updateMe', { name, email }, 'Data updated successfully!');
};

export const updateUserPassword = async (
  currentPassword,
  password,
  passwordConfirm,
) => {
  await updateUser(
    'updateMyPassword',
    { currentPassword, password, passwordConfirm },
    'Password updated successfully!',
  );
};
