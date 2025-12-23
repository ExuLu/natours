import '@babel/polyfill';
import { login, signUp } from './authRequest';
import { displayMap } from './leaflet';

const map = document.getElementById('map');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    signUp(name, email, password, confirmPassword);
  });
}
