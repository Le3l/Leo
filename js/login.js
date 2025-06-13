const form = document.getElementById('login-form');
const togglePass = document.getElementById('toggle-pass');
const passwordField = document.getElementById('password');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = passwordField.value;
  console.log('Login attempt', { username, password });
  if (!username || !password) {
    form.classList.add('error');
    setTimeout(() => form.classList.remove('error'), 500);
  }
});

togglePass.addEventListener('click', () => {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    togglePass.textContent = 'Hide';
  } else {
    passwordField.type = 'password';
    togglePass.textContent = 'Show';
  }
});
