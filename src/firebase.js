import firebase from "firebase";

import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDsjW5v898GbSFIvA7SEVru7Cw3ZU4nxME",
  authDomain: "form-handler-6499b.firebaseapp.com",
  projectId: "form-handler-6499b",
  storageBucket: "form-handler-6499b.appspot.com",
  messagingSenderId: "237254448804",
  appId: "1:237254448804:web:c9d54ac3dc49643d753831",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
let projectStorage = firebase.storage();
let db = firebase.firestore();
export { projectStorage, db, auth };
