import '@babel/polyfill';
import { login, signUp, logout } from './authRequest';
import { displayMap } from './leaflet';
import { updateUserData, updateUserPassword } from './updateUser';

if (!window.__natoursInit) {
  window.__natoursInit = true;

  const map = document.getElementById('map');
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const logoutButton = document.querySelector('.nav__el--logout');
  const updateUserDataForm = document.querySelector('.form-user-data');
  const updateUserPasswordForm = document.querySelector('.form-user-settings');

  if (map) {
    const locations = JSON.parse(map.dataset.locations);
    displayMap(locations);
  }

  if (loginForm) {
    let loggingIn = false;
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (loggingIn) return;
      loggingIn = true;

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        await login(email, password);
      } finally {
        loggingIn = false;
      }
    });
  }

  if (signUpForm) {
    let signingUp = false;
    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (signingUp) return;
      signingUp = true;

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('password-confirm').value;
      try {
        await signUp(name, email, password, confirmPassword);
      } finally {
        signingUp = false;
      }
    });
  }

  if (updateUserDataForm) {
    updateUserDataForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);

      updateUserData(form);
    });
  }

  if (updateUserPasswordForm) {
    updateUserPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--save-password').innerHTML = 'Updating...';

      const currentPassword = document.getElementById('password-current').value;
      const newPassword = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      await updateUserPassword(currentPassword, newPassword, passwordConfirm);

      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';

      document.querySelector('.btn--save-password').innerHTML = 'Save password';
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    });
  }
}
