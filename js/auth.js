// get current authenticated user.
const authenticatedUser = localStorage.getItem('auth');
// check current page is the login page, or not.
const isLoginPage = window.location.href.includes('login');

function shouldRedirectToHomePage() {
  return authenticatedUser && isLoginPage;
}

function shouldRedirectToLoginPage() { 
  return !authenticatedUser && !isLoginPage;
}

if (shouldRedirectToHomePage()) { 
  window.location.href = '/';
} else if (shouldRedirectToLoginPage()) {
  window.location.href = '/login.html';
}