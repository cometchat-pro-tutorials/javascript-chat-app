// hide loading indicator.
hideLoading();
// get sign up container.
const signUpContainer = document.getElementById('signup');  
// set up event for sign up close btn
const signUpCloseBtn = document.getElementById('signup__close-btn');
// set up event for create new account button.
const createNewAccountBtn = document.getElementById('login__create-account-btn');
// get input information from the input elements and validate those values.
const emailInputElement = document.getElementById('signup__email');
const passwordInputElement = document.getElementById('signup__password');
const confirmPasswordInputElement = document.getElementById('signup__confirm-password');

const emailLoginInputElement = document.getElementById('login__email');
const passwordLoginInputElement = document.getElementById('login__password');
// get sign up button.
const signUpBtn = document.getElementById('signup__btn');
// get login button.
const loginBtn = document.getElementById('login__submit-btn');

/**
 * hide sing up modal.
 */
function hideSignUp() {
  // add hide class to hide the sign up.
  signUpContainer.classList.add('signup--hide');
  // clear the input elements. 
  if (emailInputElement && passwordInputElement && confirmPasswordInputElement) {
    emailInputElement.value = '';
    passwordInputElement.value = '';
    confirmPasswordInputElement.value = '';
  }
}

// add event for sign up close button.
if (signUpCloseBtn) {
  signUpCloseBtn.addEventListener('click', function() {
    hideSignUp();
  });
}

// add event for create a new account button.
if (createNewAccountBtn) {
  createNewAccountBtn.addEventListener('click', function() {
    signUpContainer.classList.remove('signup--hide');
  });
}

/**
 * validate input user's information when creating a new account.
 * @param {*} object - user's information that needs to be validated. 
 * @returns valid, or not.
 */
function validateNewAccount({ email, password, confirmPassword }) { 
  if (!validator.isEmail(email)) {
    alert("Please input your email");
    return false;
  }
  if (validator.isEmpty(password) || !validator.isLength(password, {min: 6})) {
    alert("Please input your password. You password must have at least 6 characters");
    return false;
  }
  if (validator.isEmpty(confirmPassword)) {
    alert("Please input your confirm password");
    return false;
  }
  if (password !== confirmPassword) {
    alert("Confirm password and password must be the same");
    return false;
  }
  return true;
}

/**
 * generate user's avatar
 * @returns user's avatar.
 */
function generateAvatar() {
  // hardcode list of user's avatars for the demo purpose.
  const avatars= [
    'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
    'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
    'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
    'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
    'https://data-us.cometchat.io/assets/images/avatars/wolverine.png'
  ];
  const avatarPosition = Math.floor(Math.random() * avatars.length);
  return avatars[avatarPosition];
}

/**
 * register a new account - register with firebase and cometchat.
 * @param {*} object - user's information that will be used to register.
 */
function registerNewAccount({email, password, confirmPassword}) {
  if (validateNewAccount({email, password, confirmPassword})) {
    // show loading indicator.
    showLoading();
    // get user avatar.
    const userAvatar = generateAvatar();
    // create new user's uuid.
    const userUuid = uuid.v4(); 
    // call firebase and cometchat service to register a new account.
    auth.createUserWithEmailAndPassword(email, password).then((userCrendentials) => {
      if (userCrendentials) {
        // call firebase real time database to insert a new user.
        realTimeDb.ref(`users/${userUuid}`).set({
          id: userUuid,
          email,
          avatar: userAvatar
        }).then(() => {
          alert(`${userCrendentials.user.email} was created successfully! Please sign in with your created account`);
          // call cometchat service to register a new account.
          const user = new CometChatWidget.CometChat.User(userUuid);
          user.setName(email);
          user.setAvatar(userAvatar);
          CometChatWidget.init({
            "appID": `${config.CometChatAppId}`,
            "appRegion": `${config.CometChatRegion}`,
            "authKey": `${config.CometChatAuthKey}`
          }).then(response => {
            CometChatWidget.createOrUpdateUser(user).then(user => {
              hideLoading();
            } ,error => {
              hideLoading();
            });
            hideSignUp();
          }, error => {
            //Check the reason for error and take appropriate action.
          });
        });
      }
    }).catch((error) => {
      hideLoading();
      alert(`Cannot create your account, ${email} might be existed, please try again!`);
    }); 
  }
}

// add event for sign up button.
if (signUpBtn) {
  signUpBtn.addEventListener('click', function() {  
    if (emailInputElement && passwordInputElement && confirmPasswordInputElement) {
      const email = emailInputElement.value;
      const password = passwordInputElement.value;
      const confirmPassword = confirmPasswordInputElement.value;

      if (validateNewAccount({email, password, confirmPassword})) {
        registerNewAccount({email, password, confirmPassword});
      }
    }
  });
}

/**
 * check user's credentials is valid, or not.
 * @param {*} object - user's credentials. 
 * @returns valid, or not.
 */
function isUserCredentialsValid({email, password}) { 
  return email && password && validator.isEmail(email) && validator.isLength(password, {min: 6});
}

// add event for login button.
if (loginBtn) {
  loginBtn.addEventListener('click', function() {
    // show loading indicator.
    showLoading();
    // get input user's credentials.
    const email = emailLoginInputElement ? emailLoginInputElement.value : null;
    const password = passwordLoginInputElement ? passwordLoginInputElement.value : null;
    if(isUserCredentialsValid({email, password})) {
      // if the user's credentials are valid, call Firebase authentication service.
      auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        const userEmail = userCredential.user.email;
        realTimeDb.ref().child('users').orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
          const val = snapshot.val();
          if (val) {
            const keys = Object.keys(val);
            const user = val[keys[0]];
            if (user && user.id) {
              CometChatWidget.init({
                "appID": `${config.CometChatAppId}`,
                "appRegion": `${config.CometChatRegion}`,
                "authKey": `${config.CometChatAuthKey}`
              }).then(response => {
                CometChatWidget.login({uid: user.id}).then((loggedInUser) => {
                  // User loged in successfully.
                  // hide loading.
                  hideLoading();
                  // redirect to home page.
                  window.location.href = '/';
                });
              }, error => {
                //Check the reason for error and take appropriate action.
              });
            } else { 
              // hide loading indicator.
              hideLoading();
              alert(`Your user's name or password is not correct`);
            }
          }
        });
      })
      .catch((error) => {      
        // hide loading indicator.
        hideLoading();
        alert(`Your user's name or password is not correct`);
      });
    } else { 
      // hide loading indicator.
      hideLoading();
      alert(`Your user's name or password is not correct`);
    }
  });
}