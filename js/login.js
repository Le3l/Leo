const form = document.getElementById('login-form');
const togglePass = document.getElementById('toggle-pass');
const passwordField = document.getElementById('password');
const statusDiv = document.getElementById('login-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = passwordField.value;

  if (!username || !password) {
    form.classList.add('error');
    setTimeout(() => form.classList.remove('error'), 500);
    statusDiv.textContent = 'Please enter username and password';
    return;
  }

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('../php/login.php', {
    method: 'POST',
    body: formData
  })
    .then(r => r.text())
    .then(text => {
      statusDiv.textContent = text;
    })
    .catch(() => {
      statusDiv.textContent = 'Error contacting server';
    });
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
