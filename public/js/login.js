import axios from 'axios';
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
      alert('Logged in successfully!');
      location.assign('/');
    }
  } catch (err) {
    const message =
      err.response?.data?.message || 'Something went wrong. Please try again.';
    alert(message);
  }
};
