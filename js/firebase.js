const firebaseConfig = {
  apiKey: `${config.apiKey}`,
  authDomain: `${config.authDomain}`,
  databaseURL: `${config.databaseURL}`,
  projectId: `${config.projectId}`,
  storageBucket: `${config.storageBucket}`,
  messagingSenderId: `${config.messagingSenderId}`,
  appId: `${config.appId}`,
  measurementId: `${config.measurementId}`
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const realTimeDb = app.database();
const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();