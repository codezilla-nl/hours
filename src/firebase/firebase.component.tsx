import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkvaF-lqt8ZxyBwcNlwrHhj-Pp3Ev54pI",
    authDomain: "codezilla-hours.firebaseapp.com",
    databaseURL: "https://codezilla-hours.firebaseio.com",
    projectId: "codezilla-hours",
    storageBucket: "codezilla-hours.appspot.com",
    messagingSenderId: "634823174203",
    appId: "1:634823174203:web:ca40af276111cfae66541e",
    measurementId: "G-DR0KK33WCW",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
