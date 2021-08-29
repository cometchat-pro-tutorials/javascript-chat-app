window.addEventListener('DOMContentLoaded', function() {
  // hide loading indicator.
  hideLoading();
  // get authenticated user
  const currentUser = getAuthenticatedUser();
  // get logout button
  const logoutButon = document.getElementById('header__logout');
  // show authenticated user on the header. 
  const headerRight = document.getElementById('header__right');
  const userImage = document.getElementById('user__image');
  const userName = document.getElementById('user__name');
  if (headerRight && userImage && userName && currentUser && currentUser.id) {
    headerRight.classList.remove('header__right--hide');
    userImage.src = currentUser.avatar;
    userName.innerHTML = `Hello, ${currentUser.email}`; 
  }
  // launch cometchat widget
  if (currentUser && currentUser.id) {
    CometChatWidget.init({
      "appID": `${config.cometChatAppId}`,
      "appRegion": `${config.cometChatRegion}`,
      "authKey": `${config.cometChatAuthKey}`
    }).then(response => {
      console.log("Initialization completed successfully");
      CometChatWidget.launch({
        "widgetID": `${config.cometChatWidgetId}`,
        "target": "#cometchat",
        "roundedCorners": "false",
        "height": "100%",
        "width": "100%",
        "defaultID": `${currentUser.id}`, //default UID (user) or GUID (group) to show,
        "defaultType": 'user' //user or group
      });
    }, error => {
      console.log("Initialization failed with error:", error);
      //Check the reason for error and take appropriate action.
    });
  }

  // add event for logout
  if (logoutButon) {
    logoutButon.addEventListener('click', function() { 
      const isLeaved = confirm('Do you want to log out?');
      if (isLeaved) {
        // logout from cometchat and then clear storage.
        CometChatWidget.logout().then(response => {
          // User successfully logged out.
          // Perform any clean up if required.
          removeAuthenticatedUser();
          // redirect to login page.
          window.location.href = '/login.html';
        });
      }
    });
  }
});
