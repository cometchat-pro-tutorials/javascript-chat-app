window.addEventListener('DOMContentLoaded', function() {
  // hide loading indicator.
  hideLoading();
  // get authenticated user
  CometChatWidget.init({
    "appID": `${config.CometChatAppId}`,
    "appRegion": `${config.CometChatRegion}`,
    "authKey": `${config.CometChatAuthKey}`
  }).then(response => {
    CometChatWidget.CometChat.getLoggedinUser().then(
      user => {
          if (user) {
            // get logout button
            const logoutButon = document.getElementById('header__logout');
            // show authenticated user on the header. 
            const headerRight = document.getElementById('header__right');
            const userImage = document.getElementById('user__image');
            const userName = document.getElementById('user__name');
            if (headerRight && userImage && userName && user && user.uid) {
              headerRight.classList.remove('header__right--hide');
              userImage.src = user.avatar;
              userName.innerHTML = `Hello, ${user.name}`; 
            }
            // launch cometchat widget
            if (user && user.uid) {
              CometChatWidget.launch({
                "widgetID": `${config.CometChatWidgetId}`,
                "target": "#cometchat",
                "roundedCorners": "false",
                "height": "100%",
                "width": "100%",
                "defaultID": `${user.uid}`, //default UID (user) or GUID (group) to show,
                "defaultType": 'user' //user or group
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
                    // redirect to login page.
                    window.location.href = '/login.html';
                  });
                }
              });
            }
          } else { 
            // redirect user to the login page.
            window.location.href = '/login.html';
          }
      }, error => {
      }
    );
  });
});
