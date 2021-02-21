// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyANMokJs_WcEzX25aBK-iLE6fS_ExDB-ow",
    authDomain: "chaperone-auth-manager.firebaseapp.com",
    projectId: "chaperone-auth-manager",
    storageBucket: "chaperone-auth-manager.appspot.com",
    messagingSenderId: "1076647341387",
    appId: "1:1076647341387:web:41c869d3cb0e90a28f8cce"
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;