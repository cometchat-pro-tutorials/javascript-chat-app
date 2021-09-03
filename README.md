# How to Build a Javascript Chat App [Using CometChat Chat Widget]

Read the full tutorial here: [**>> How to Build a Javascript Chat App [Using CometChat Chat Widget]**](https://www.cometchat.com/tutorials/#)

How to Build a Javascript Chat App [Using CometChat Chat Widget]:

![Javascript Chat Application [Using CometChat Chat Widget]](/screenshots/0.gif)
<center><figcaption>Javascript Chat Application [Using CometChat Chat Widget]</figcaption></center>

## Technology

This demo uses:

- CometChat Widget
- Firebase
- Uuid
- Validator

## Running the demo

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://app.cometchat.com/signup)
2. From the [dashboard](https://app.cometchat.com/apps), add a new app called **"chat-widget"**
3. Select this newly added app from the list.
4. From the Quick Start copy the **APP_ID, APP_REGION and AUTH_KEY**. These will be used later.
5. Also copy the **REST_API_KEY** from the API & Auth Key tab.
6. Navigate to the Users tab, and delete all the default users and groups leaving it clean **(very important)**.
7. Download the repository [here](https://github.com/hieptl/javascript-chat-app/archive/main.zip) or by running `git clone https://github.com/hieptl/javascript-chat-app.git` and open it in a code editor.
8. [Head to Firebase and create a new project](https://console.firebase.google.com)
9. Create a file called **config.js** in the ”js” folder of your project.
10. Import and inject your secret keys in the **config.js** file containing your CometChat and Firebase in this manner.
```js
const config = {
  apiKey: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  authDomain: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  databaseURL: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  projectId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  storageBucket: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  messagingSenderId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  appId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  measurementId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  CometChatAppId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  CometChatRegion: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  CometChatAuthKey: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  CometChatAPIKey: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx,
  CometChatWidgetId: xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx
};
```
11. Make sure to include this file in your gitIgnore file from being exposed online.
12. The application is using HTML, CSS, Javascript. For this reason, you need to have a simple HTTP server to serve our application. In this case, you will use http-server, you can install the http-server by running the following statement. 

```sh
  npm install -g http-server
```
13. After installing the http-server package, you just need to “cd” to your project’s directory and run “http-server .”

Questions about running the demo? [Open an issue](https://github.com/hieptl/javascript-chat-app/issues). We're here to help ✌️

## Useful links

- 🏠 [CometChat Homepage](https://app.cometchat.com/signup)
- 🏠 [CometChat Widget](https://prodocs.cometchat.com/v2.1/docs/web-chat-widget)
- 🚀 [Create your free account](https://app.cometchat.com/apps)
- 📚 [Documentation](https://prodocs.cometchat.com)
- 👾 [GitHub](https://www.github.com/cometchat-pro)
- 🔥 [Firebase](https://console.firebase.google.com)
- ✨ [Live Demo](https://javascript-chat-app.glitch.me)