
window.addEventListener('DOMContentLoaded', function() {
  function shouldRedirectToHomePage(user, isLoginPage) {
    return user && isLoginPage;
  }

  function shouldRedirectToLoginPage(user, isLoginPage) { 
    return !user && !isLoginPage;
  }

  CometChatWidget.init({
    "appID": `${config.CometChatAppId}`,
    "appRegion": `${config.CometChatRegion}`,
    "authKey": `${config.CometChatAuthKey}`
  }).then(response => {
    CometChatWidget.CometChat.getLoggedinUser().then(
      user => {
          // check current page is the login page, or not.
          const isLoginPage = window.location.href.includes('login');
          if(shouldRedirectToHomePage(user, isLoginPage)){
            window.location.href = '/';
          }else if(shouldRedirectToLoginPage(user, isLoginPage)) {
            window.location.href = '/login.html';
          }
      }, error => {
      }
    );
  });
});