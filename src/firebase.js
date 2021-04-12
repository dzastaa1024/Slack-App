// //The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.3.3/firebase-app.js"></script>

// //TODO: Add SDKs for Firebase products that you want to use
//     // https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.3.3/firebase-analytics.js"></script>

// //Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>

 import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/storage';

// const firebaseConfig = {
//      apiKey: "AIzaSyAgYlR_ifGzNx_6w5o5VME80Ook-hRR46Y",
//      authDomain: "react-slack-clone-5bdf0.firebaseapp.com",
//      projectId: "react-slack-clone-5bdf0",
//      storageBucket: "react-slack-clone-5bdf0.appspot.com",
//      messagingSenderId: "829329384765",
//      appId: "1:829329384765:web:976270c988f7d5dd341154",
//      measurementId: "G-M9V07JQ9JC"
//    };

// firebase.initializeApp(firebaseConfig);

export default firebase;

var firebaseConfig = {
  apiKey: "AIzaSyAgYlR_ifGzNx_6w5o5VME80Ook-hRR46Y",
  authDomain: "react-slack-clone-5bdf0.firebaseapp.com",
  databaseURL: "https://react-slack-clone-5bdf0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-slack-clone-5bdf0",
  storageBucket: "react-slack-clone-5bdf0.appspot.com",
  messagingSenderId: "829329384765",
  appId: "1:829329384765:web:976270c988f7d5dd341154",
  measurementId: "G-M9V07JQ9JC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();