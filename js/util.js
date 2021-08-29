const loading = document.getElementById('loading');

function hideLoading() {
  loading.classList.add('loading--hide');
}

function showLoading() {
  loading.classList.remove('loading--hide');
  loading.classList.add('loading--active');
}

function getAuthenticatedUser() {
  const authenticatedUser = localStorage.getItem('auth');
  return authenticatedUser ? JSON.parse(authenticatedUser) : null;
}

function removeAuthenticatedUser() { 
  localStorage.removeItem('auth');
}